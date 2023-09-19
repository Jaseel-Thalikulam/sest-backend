import { uploadVideoDTO } from 'src/infrastructure/core/common/DTO/video/uploadvideoDTO';

export interface IVideo {
  uploadVideoDetail(vidoeData: uploadVideoDTO);
}
