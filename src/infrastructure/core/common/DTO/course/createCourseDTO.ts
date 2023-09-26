export class createCourseDTO {
  coverImage?: Express.Multer.File;
  title: string;
  tutorId: string;
  description: string;
  coverUrl?: string;
  category?: string;
}
