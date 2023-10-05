"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    await app.listen(4000);
    const CorsOptions = {
        origin: '*',
        methods: 'GET, POST, PUT, DELETE, OPTIONS',
        allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    };
    app.enableCors(CorsOptions);
}
bootstrap();
//# sourceMappingURL=main.js.map