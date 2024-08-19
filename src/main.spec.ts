import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

describe('Main App Initialization', () => {
  it('should initialize the application without errors', async () => {
    const app = await NestFactory.create(AppModule);
    expect(app).toBeDefined();
    await app.close();
  });
});
