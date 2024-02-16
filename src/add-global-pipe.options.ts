import { INestApplication, ValidationPipe } from "@nestjs/common";

export function addGlobalPipe(app: INestApplication) {
    app.useGlobalPipes(new ValidationPipe());
}