import { ArticleDataDto } from 'src/infrastructure/core/common/DTO/post/articleDataDto';

export default interface IPost {
  UploadArticle(ArticleData: ArticleDataDto);
}
