import { Injectable } from '@nestjs/common';
import { createCourseDTO } from '../../DTO/course/createCourseDTO';
import cloudinaryUploaduseCase from 'src/Domain/usecase/upload/cloudinary.uploaduseCase';
import createCourseUseCase from 'src/Domain/usecase/common/course/createCourseuseCase';
import { uploadVideoDTO } from '../../DTO/video/uploadvideoDTO';
import { mongoosevideoRepository } from 'src/infrastructure/database/repositories/video/mongoosevideorepository';
import { mongooseCourseRepository } from 'src/infrastructure/database/repositories/course/mongoosecourserepository';
import Video from 'src/Domain/entity/video.entity';
@Injectable()
export class CourseService {
  private readonly cloudinary: cloudinaryUploaduseCase;
  private readonly mongooseVideoRepository: mongoosevideoRepository;
  private readonly mongoosecourseRepository: mongooseCourseRepository;
  private readonly createCourseuseCase: createCourseUseCase;
  constructor(
    cloudaniryuploaduseCase: cloudinaryUploaduseCase,
    createcourse: createCourseUseCase,
    mongoosevideoRepository: mongoosevideoRepository,
    mongoosecourseRepository: mongooseCourseRepository,
  ) {
    this.cloudinary = cloudaniryuploaduseCase;
    this.createCourseuseCase = createcourse;
    this.mongooseVideoRepository = mongoosevideoRepository;
    this.mongoosecourseRepository = mongoosecourseRepository;
  }

  async createCourse(courseData: createCourseDTO) {
    courseData.coverUrl = await this.cloudinary.execute(courseData.coverImage);

    delete courseData.coverImage;

    return await this.createCourseuseCase.execute(courseData);
  }

  async getVideodata(videoId: string) {
    return this.mongooseVideoRepository.getvideoDetail(videoId);
  }

  async addVideo(videoData: uploadVideoDTO) {
    const isTutorAuthorised =
      await this.mongoosecourseRepository.isTutorAuthorised(
        videoData.userId,
        videoData.courseId,
      );

    if (isTutorAuthorised) {
      const videoDBdata: Video =
        await this.mongooseVideoRepository.uploadVideoDetail(videoData);

      await this.mongoosecourseRepository.addVideo(videoDBdata);

      return { success: true, message: 'successFully Added', videoDBdata };
    } else {
      return {
        success: false,
        message: 'Authorization Failed',
        videoDBdata: null,
      };
    }
  }

  async findCourseByPublisherId(tutorId: string) {
    return await this.mongoosecourseRepository.findCourseByPublisherId(tutorId);
  }

  async findCourseById(CourseId: string) {
    return await this.mongoosecourseRepository.findCourseById(CourseId);
  }
}
