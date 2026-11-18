import { BadGatewayException, Controller, ForbiddenException, Get, Injectable, Module, ServiceUnavailableException } from "@nestjs/common";
import { timingSafeEqual } from "node:crypto";
import { ConfigService } from "@nestjs/config";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { print, type DocumentNode } from "graphql";

@Injectable()
export class HygraphService {
  constructor(private readonly config: ConfigService) {}
  get isConfigured() { return Boolean(this.config.get<string>("HYGRAPH_CONTENT_API_URL") && this.config.get<string>("HYGRAPH_CONTENT_API_TOKEN")); }
  async query<T, V extends Record<string, unknown>>(query: TypedDocumentNode<T,V>, variables: NoInfer<V>): Promise<T> {
    if (!this.isConfigured) throw new ServiceUnavailableException("Hygraph content access is not configured.");
    return this.request<T>("HYGRAPH_CONTENT_API_URL", "HYGRAPH_CONTENT_API_TOKEN", query, variables);
  }
  /** Live Preview is on only when a draft token and a long random secret are configured (local/preview deployments). */
  get isPreviewConfigured() {
    return Boolean(this.config.get<string>("HYGRAPH_CONTENT_API_URL") && this.config.get<string>("HYGRAPH_PREVIEW_TOKEN")
      && (this.config.get<string>("HYGRAPH_PREVIEW_SECRET") ?? "").length >= 24);
  }
  /** Draft-stage read for Live Preview; the caller must present the preview secret from the Studio preview URL. */
  async preview<T, V extends Record<string, unknown>>(secret: string, query: TypedDocumentNode<T,V>, variables: NoInfer<V>): Promise<T> {
    if (!this.isPreviewConfigured) throw new ServiceUnavailableException("Live Preview is not configured.");
    const expected = Buffer.from(this.config.getOrThrow<string>("HYGRAPH_PREVIEW_SECRET"));
    const given = Buffer.from(secret);
    if (given.length !== expected.length || !timingSafeEqual(given, expected)) throw new ForbiddenException("Invalid preview secret.");
    return this.request<T>("HYGRAPH_CONTENT_API_URL", "HYGRAPH_PREVIEW_TOKEN", query, variables);
  }
  async mutate<T, V extends Record<string, unknown>>(query: TypedDocumentNode<T,V>, variables: NoInfer<V>): Promise<T> {
    if (!this.config.get<string>("HYGRAPH_MUTATION_API_URL") || !this.config.get<string>("HYGRAPH_MUTATION_API_TOKEN")) {
      throw new ServiceUnavailableException("Workout intent storage is not configured.");
    }
    return this.request<T>("HYGRAPH_MUTATION_API_URL", "HYGRAPH_MUTATION_API_TOKEN", query, variables);
  }
  private async request<T>(urlKey: string, tokenKey: string, query: DocumentNode, variables: Record<string, unknown>): Promise<T> {
    try {
      const response = await fetch(this.config.getOrThrow<string>(urlKey), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.config.getOrThrow<string>(tokenKey)}` },
        body: JSON.stringify({ query: typeof query === "string" ? query : print(query), variables }), signal: AbortSignal.timeout(10000),
      });
      if (!response.ok) throw new Error("Content request failed");
      const payload = await response.json() as { data?: T; errors?: unknown[] };
      if (payload.errors?.length || !payload.data) throw new Error("Invalid content response");
      return payload.data;
    } catch {
      throw new BadGatewayException("Could not retrieve Hygraph content.");
    }
  }
}

@Controller("content-status")
class HygraphController {
  constructor(private readonly hygraph: HygraphService) {}
  @Get() status() { return { hygraphConfigured: this.hygraph.isConfigured }; }
}

@Module({ controllers: [HygraphController], providers: [HygraphService], exports: [HygraphService] })
export class HygraphModule {}
