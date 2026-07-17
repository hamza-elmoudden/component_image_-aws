import {
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UploadImageCommand } from './commands/impl/upload-image.command';
import { Controller } from '@nestjs/common';
import { GetImageUrlQuery } from './commands/impl/get-image-url.query';

@Controller('image')
export class ImageController {
    constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only image files are allowed');
    }

    const command = new UploadImageCommand(
      file.originalname,
      file.buffer,
      file.mimetype,
    );

    const result = await this.commandBus.execute(command);

    return {
      message: 'Image uploaded successfully',
      data: result,
    };
  }

  @Get('url')
  async getImageUrl(@Query('key') key: string) {
    if (!key) {
      throw new BadRequestException('Key is required');
    }

    const query = new GetImageUrlQuery(key);
    const url = await this.queryBus.execute(query);

    return {
      url,
    };
  }
}
