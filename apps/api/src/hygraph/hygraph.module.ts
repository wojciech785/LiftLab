import { BadGatewayException, Controller, Get, Injectable, Module, ServiceUnavailableException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HygraphService {
  constructor(private readonly config: ConfigService) {}
  get isConfigured() { return Boolean(this.config.get<string>("HYGRAPH_CONTENT_API_URL") && this.config.get<string>("HYGRAPH_CONTENT_API_TOKEN")); }
  async query<T>(query: string, variables: Record<string, unknown>): Promise<T> {
    if (!this.isConfigured) throw new ServiceUnavailableException("Hygraph content access is not configured.");
    try {
      const response = await fetch(this.config.getOrThrow<string>("HYGRAPH_CONTENT_API_URL"), {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${this.config.getOrThrow<string>("HYGRAPH_CONTENT_API_TOKEN")}` },
        body: JSON.stringify({ query, variables }), signal: AbortSignal.timeout(10000),
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
