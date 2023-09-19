import { Injectable } from '@nestjs/common';
import { createCourseDTO } from 'src/infrastructure/core/common/DTO/course/createCourseDTO';
import { mongooseCourseRepository } from 'src/infrastructure/database/repositories/course/mongoosecourserepository';

@Injectable()
class createCourseUseCase {
  private readonly CourseRepository: mongooseCourseRepository;

  constructor(courseRepository: mongooseCourseRepository) {
    this.CourseRepository = courseRepository;
  }

  async execute(createCourse: createCourseDTO) {
    const { description, title, tutorId, coverUrl } = createCourse;

    return await this.CourseRepository.createCourse(createCourse);
  }
}

export default createCourseUseCase;
