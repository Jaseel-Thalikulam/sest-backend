import { ObjectId } from 'mongoose';

class Course {
  public _id!: ObjectId;
  public Title: string;
  public Descripton: string;
  public videos: ObjectId[];
  public publisherId: ObjectId;
  public CoverImage: string;

  constructor(
    Title: string,
    Descripton: string,
    videos: ObjectId[],
    publisherId: ObjectId,
    CoverImage: string,
  ) {
    this.Title = Title;
    this.Descripton = Descripton;
    this.videos = videos;
    this.publisherId = publisherId;
    this.CoverImage = CoverImage;
  }
}

export default Course;
