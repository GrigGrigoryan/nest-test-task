import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { MailerModule } from '../src/mailer.module';
import { afterEach, beforeEach, describe, it } from 'node:test';
import axios from 'axios';
import { Server } from 'http';

describe('MailerController (e2e)', () => {
  let app: INestApplication;
  let server: Server;
  let serverUrl: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MailerModule],
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

  it('/ (GET)', async () => {
    const response = await axios.get(`${serverUrl}/`);

    expect(response.status).toBe(200);
    expect(response.data).toBe('Hello World!');
  });
});
