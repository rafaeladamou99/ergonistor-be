import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly region: string;
  private s3Client;
  constructor(private readonly configService: ConfigService) {
    this.region = this.configService.getOrThrow('AWS_S3_REGION');

    this.s3Client = new S3Client({
      region: this.region,
    });
  }

  async upload(fileName: string, file: Buffer) {
    const bucket = this.configService.get<string>('S3_BUCKET');
    const timestamp = Date.now();

    const _fileName = fileName.replaceAll(' ', '_');

    try {
      const imageUploaded = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: timestamp + _fileName,
          Body: file,
          ACL: 'public-read',
        }),
      );
      if (imageUploaded.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${timestamp + _fileName}`;
      }
      throw new Error('Image not saved to S3');
    } catch (error) {
      throw error;
    }
  }
}
