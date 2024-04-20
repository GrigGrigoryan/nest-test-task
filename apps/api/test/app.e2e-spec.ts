import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ApiModule } from '../src/api.module';
import { afterEach, beforeEach, describe, it } from 'node:test';
import axios from 'axios';
import { Server } from 'http';

describe('ApiController (e2e)', () => {
  let app: INestApplication;
  let server: Server;
  let serverUrl: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ApiModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    server = app.getHttpServer();
    const address = server.address();

    // Extract the server URL
    if (typeof address === 'string') {
      serverUrl = address;
    } else {
      // If the address is an object, extract the port from it
      const { port } = address;
      serverUrl = `http://localhost:${port}`;
    }
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/gateway/save-db (GET)', async () => {
    const response = await axios.get(`${serverUrl}/api/gateway/save-db`);

    expect(response.status).toBe(200);
    // expect(response.data).toBe('Hello World!');
  });
});
