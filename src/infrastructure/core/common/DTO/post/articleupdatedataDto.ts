export class ArticleUpdateDataDto {
  readonly userId: string;
  readonly type: string;
  readonly postId: string;
  readonly articleTitle: string;
  readonly articleContent: string;
  articleThumbnail: Express.Multer.File;
  articleThumbnailURL?: string;
}
