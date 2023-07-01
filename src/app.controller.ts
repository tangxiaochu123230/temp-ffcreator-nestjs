import { Controller, Get } from '@nestjs/common';
import { AppService } from '@/app.service';
import path from 'path';
import { v1 } from 'uuid'
import { ffcreatorMain } from '@/ffcreator';
import fs from 'fs'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/ffcreator")
  async getFFcreator(): Promise<string> {
    const cacheDir = path.join(__dirname, "..", "output", v1());
    const outputVideoFilePath = path.join(__dirname, "..", "output", v1(), "video.mp4");
    await ffcreatorMain({ cacheDir, outputVideoFilePath });
    await fs.promises.rm(cacheDir, { recursive: true, force: true });
    return outputVideoFilePath;
  }
}
