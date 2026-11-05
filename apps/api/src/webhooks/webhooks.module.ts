import { Body, Controller, Headers, HttpCode, Module, Post } from "@nestjs/common";

@Controller("webhooks/hygraph")
class WebhooksController {
  @Post()
  @HttpCode(204)
  receive(@Headers("x-hygraph-signature") _signature: string | undefined, @Body() _payload: unknown) {
    // Future: verify HYGRAPH_WEBHOOK_SECRET before invalidating cached Hygraph results.
  }
}

@Module({ controllers: [WebhooksController] })
export class WebhooksModule {}
