import { uploadVideoDTO } from 'src/infrastructure/core/common/DTO/video/uploadvideoDTO';
import Video from '../entity/video.entity';

export interface IVideo {
  uploadVideoDetail(vidoeData: uploadVideoDTO): Promise<Video>;
  getvideoDetail(videoId: string): Promise<Video>;
}
