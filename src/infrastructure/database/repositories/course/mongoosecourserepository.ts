import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICourse } from 'src/Domain/interfaces/ICourse';
import Course from 'src/Domain/entity/course.entity';
import { createCourseDTO } from 'src/infrastructure/core/common/DTO/course/createCourseDTO';
import Video from 'src/Domain/entity/video.entity';

export class mongooseCourseRepository implements ICourse {
  constructor(
    @InjectModel('Course') private readonly courseModel: Model<Course>,
  ) {}

  createCourse(courseData: createCourseDTO) {
    const newCourse = new this.courseModel({
      CoverImage: courseData.coverUrl,
      Descripton: courseData.description,
      publisherId: courseData.tutorId,
      Title: courseData.title,
      Category: courseData.category,
    });

    return newCourse.save();
  }

  async addVideo(videoDBdata: Video) {
    const updatedCourse = await this.courseModel
      .findByIdAndUpdate(
        videoDBdata.CourseId,
        { $push: { videos: videoDBdata._id } },
        { new: true }, // To get the updated document after the update
      )
      .populate('videos');
  }

  async isTutorAuthorised(userId: string, courseId: string) {
    const response = await this.courseModel.findOne({
      _id: courseId,
      publisherId: userId,
    });

    return response ? true : false;
  }

  async findCourseByPublisherId(tutorId: string) {
    return await this.courseModel.find({ publisherId: tutorId });
  }

  async findCourseById(CourseId: string) {
    return await this.courseModel
      .findById(CourseId)
      .populate('videos')
      .populate('publisherId');
  }

  async findAllCourse() {
    return await this.courseModel.find().sort({ Rating: -1 }).limit(8);
  }
}
