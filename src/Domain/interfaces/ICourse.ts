import { createCourseDTO } from 'src/infrastructure/core/common/DTO/course/createCourseDTO';
import Video from '../entity/video.entity';
import Course from '../entity/course.entity';

export interface ICourse {
  createCourse(courseData: createCourseDTO): Promise<Course>;
  addVideo(videoDBdata: Video): Promise<void>;
  isTutorAuthorised(userId: string, courseId: string): Promise<boolean>;
  findCourseByPublisherId(tutorId: string): Promise<Course[]>;
  findCourseById(CourseId: string): Promise<Course | null>;
  findAllCourse(): Promise<Course[]>;
}
