import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetImageUrlQuery } from '../impl/get-image-url.query';
import { ImageService } from 'src/image/image.service';

@QueryHandler(GetImageUrlQuery)
export class GetImageUrlHandler implements IQueryHandler<GetImageUrlQuery> {
  constructor(private readonly s3Service: ImageService) {}

  async execute(query: GetImageUrlQuery): Promise<string> {
    return this.s3Service.getSignedUrl(query.key);
  }
}