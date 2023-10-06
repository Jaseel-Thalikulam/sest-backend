/// <reference types="multer" />
export declare class ArticleDataDto {
    readonly userId: string;
    readonly timeStamp: string;
    readonly type: string;
    readonly articleTitle: string;
    readonly articleContent: string;
    articleThumbnail: Express.Multer.File;
    articleThumbnailURL?: string;
}
