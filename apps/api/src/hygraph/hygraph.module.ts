import { Controller, Get, Injectable, Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class HygraphService {
  constructor(private readonly config: ConfigService) {}
  get isConfigured() { return Boolean(this.config.get<string>("HYGRAPH_CONTENT_API_URL") && this.config.get<string>("HYGRAPH_CONTENT_API_TOKEN")); }
  // Future: place generated GraphQL operations and the server-only Hygraph client here.
}

@Controller("content-status")
class HygraphController {
  constructor(private readonly hygraph: HygraphService) {}
  @Get() status() { return { hygraphConfigured: this.hygraph.isConfigured }; }
}

@Module({ controllers: [HygraphController], providers: [HygraphService], exports: [HygraphService] })
export class HygraphModule {}
