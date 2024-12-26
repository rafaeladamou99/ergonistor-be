import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';

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

  async uploadToS3(fileName: string, file: Buffer, timestamp: string) {
    const bucket = this.configService.get<string>('S3_BUCKET');
    try {
      const imageUploaded = await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: timestamp + fileName,
          Body: file,
          ContentType: fileName.includes('.svg') ? 'image/svg+xml' : '', // Explicitly set Content-Type
          ContentDisposition: 'inline',
          ACL: 'public-read',
        }),
      );
      if (imageUploaded.$metadata.httpStatusCode === 200) {
        return `https://${bucket}.s3.${this.region}.amazonaws.com/${timestamp + fileName}`;
      }
      throw new Error('Image not saved to S3');
    } catch (error) {
      throw error;
    }
  }

  async upload(fileName: string, file: Buffer) {
    const _fileName = fileName.replaceAll(' ', '_');
    const timestamp = Date.now();

    try {
      const placeholderBuffer = await sharp(file)
        .resize({ width: 100, fit: 'inside' })
        .toBuffer();
      await this.uploadToS3(
        _fileName,
        placeholderBuffer,
        `placeholders/${timestamp}`,
      );
      const originalImgUrl = await this.uploadToS3(
        _fileName,
        file,
        `images/${timestamp}`,
      );
      return originalImgUrl;
    } catch (error) {
      throw error;
    }
  }
}
