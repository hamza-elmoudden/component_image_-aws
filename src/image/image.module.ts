import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { GetImageUrlHandler } from './commands/handlers/get-image-url.handler';
import { UploadImageHandler } from './commands/handlers/upload-image.handler';

@Module({
  imports: [CqrsModule],
  controllers: [ImageController],
  providers: [ImageService,GetImageUrlHandler,UploadImageHandler],
})
export class ImageModule {}
