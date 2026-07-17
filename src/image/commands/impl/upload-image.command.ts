export class UploadImageCommand {
  constructor(
    public readonly filename: string,
    public readonly buffer: Buffer,
    public readonly mimetype: string,
  ) {}
}