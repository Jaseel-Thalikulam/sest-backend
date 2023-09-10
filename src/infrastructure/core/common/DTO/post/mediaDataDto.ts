export class MediaDataDto {
  readonly postId?: string;
  readonly userId: string;
  readonly timeStamp: string;
  readonly type: string;
  readonly mediaCaption: string;
  mediaThumbnail: Express.Multer.File;
  mediaThumbnailURL?: string;
}
