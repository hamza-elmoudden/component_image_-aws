import { IsNotEmpty, IsString } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  @IsString()
  filename: string;

  @IsNotEmpty()
  buffer: Buffer;

  @IsString()
  mimetype: string;
}
