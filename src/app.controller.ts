import { Controller, Get, Res, StreamableFile } from '@nestjs/common';
import { AppService } from '@/app.service';
import path from 'path';
import { v1 } from 'uuid'
import { ffcreatorMain } from '@/ffcreator';
import fs, { createReadStream } from 'fs'
import { } from 'fs'
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("/ffcreator")
  async getFFcreator(@Res({passthrough: true}) res: Response) {
    const cacheDir = path.join(__dirname, "..", "output", v1());
    const outputVideoFilePath = path.join(__dirname, "..", "output", v1(), "video.mp4");
    await ffcreatorMain({ cacheDir, outputVideoFilePath });
    await fs.promises.rm(cacheDir, { recursive: true, force: true });
    res.set({
      'Content-Type': "video/mp4",
      'Content-Disposition': `attachment; filename="=?UTF-8?Q?video.mp4?="; filename*=UTF-8''video.mp4`,
      'Content-Length': (await fs.promises.stat(outputVideoFilePath)).size,
    });
    const file = createReadStream(outputVideoFilePath);
    return new StreamableFile(file);
  }
}
