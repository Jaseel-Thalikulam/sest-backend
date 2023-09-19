import User from '../../../../Domain/entity/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import mongoose from 'mongoose';
import { IVideo } from 'src/Domain/interfaces/IVideo';
import { uploadVideoDTO } from 'src/infrastructure/core/common/DTO/video/uploadvideoDTO';
import Video from 'src/Domain/entity/video.entity';
const ObjectId = mongoose.Types.ObjectId;
export class mongoosevideoRepository implements IVideo {
  constructor(
    @InjectModel('Video') private readonly videoModel: Model<Video>,
  ) {}

  async uploadVideoDetail(videoData: uploadVideoDTO) {
    const newvideo = new this.videoModel({
      Title: videoData.title,
      URL: videoData.URL,
      CourseId: videoData.courseId,
      PublisherId: videoData.userId,
      ThumbnailURL: videoData.ThumbnailURL,
    });

    return newvideo.save();
  }

  async getvideoDetail(videoId: string) {
    return await this.videoModel.findById(videoId);
  }
}
