import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { ModuloDeEventos } from './../src/eventos/eventos.module';
import { addGlobalPipe } from './../src/add-global-pipe.options';

describe('Eventos (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ModuloDeEventos],
    }).compile();

    app = moduleFixture.createNestApplication();
    addGlobalPipe(app);
    await app.init();
  });

  it('Crear evento válido', () => {
    const requestValido = {
      nombre_evento: 'Navidad 2024',
      organizador: {
        nombre: 'Alejandro',
        email: 'ale@gmail.com'
      },
      participantes: [
        {
          nombre: 'Dani',
          email: 'dani@gmail.com'
        }
      ],
      monto_maximo: 25000.00
    }
    return request(app.getHttpServer())
      .post('/eventos')
      .send(requestValido)
      .expect(201)
      .then(response => {
        expect(response.body.id).toBeDefined();
      });
  });

  it('No se puede crear eventos sin nombre', () => {
    return request(app.getHttpServer())
      .post('/eventos')
      .expect(400)
      .then(response => {
        expect(response.body.message).toBeDefined();
        expect(response.body.message[0]).toContain("nombre");
      })
  });

  it('No se puede crear eventos sin nombre de organizador', () => {
    return request(app.getHttpServer())
    .post('/eventos')
    .send({organizador: {}})
    .expect(400)
    .then(response => {
      expect(response.body.message[1]).toContain("nombre");
    })
  });

  it('No se puede crear eventos sin email de organizador', () => {
    return request(app.getHttpServer())
    .post('/eventos')
    .send({organizador: {}})
    .expect(400)
    .then(response => {
      expect(response.body.message[3]).toContain("email");
    })
  });

  it('Un evento debe tener al menos un participante', () => {
    return request(app.getHttpServer())
    .post('/eventos')
    .send({participantes: []})
    .expect(400)
    .then(response => {
      expect(response.body.message[2]).toContain("al menos un participante");
    })
  });

  it('Los participantes deben tener nombre', () => {
    return request(app.getHttpServer())
    .post('/eventos')
    .send({participantes: [{}]})
    .expect(400)
    .then(response => {
      expect(response.body.message[2]).toContain("participantes.0.nombre");
    })
  });

  it('No se puede crear un evento sin un monto máximo establecido', () => {
    return request(app.getHttpServer())
    .post('/eventos')
    .expect(400)
    .then(response => {
      expect(response.body.message[3]).toContain("monto máximo");
    })
  });
});
