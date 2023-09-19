import { createCourseDTO } from 'src/infrastructure/core/common/DTO/course/createCourseDTO';

export interface ICourse {
  createCourse(courseData: createCourseDTO);
}
