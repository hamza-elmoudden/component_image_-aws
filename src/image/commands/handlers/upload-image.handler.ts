

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UploadImageCommand } from '../impl/upload-image.command';
import { ImageService } from 'src/image/image.service';

@CommandHandler(UploadImageCommand)
export class UploadImageHandler implements ICommandHandler<UploadImageCommand> {
  constructor(private readonly s3Service: ImageService) {}

  async execute(command: UploadImageCommand): Promise<{ url: string; key: string }> {
    const { filename, buffer, mimetype } = command;
    
    const result = await this.s3Service.uploadFile(buffer, filename, mimetype);
    
    return {
      url: result.url,
      key: result.key,
    };
  }
}
