import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ModuloDeEventos } from './../src/eventos/eventos.module';

describe('Eventos (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ModuloDeEventos],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Crear evento válido', () => {
    return request(app.getHttpServer())
      .post('/eventos')
      .expect(201)
      .then(response => {
        expect(response.body.id).toBeDefined();
      });
  });
});
