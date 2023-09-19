import { ObjectId } from 'mongoose';


class Subscription {
  public _id!: ObjectId;
  public Name: string;
  public TutorID: string;
  public StudentID: string;
  public IsLifeTime: boolean;
  public SubscribedTime: Date;
  public Expirytime: Date;
  constructor(
    Name: string,
    TutorID: string,
    StudentID: string,
    IsLifeTime: boolean,
    SubscribedTime: Date,
    Expirytime: Date,
  ) {
    this.Name = Name;
    this.TutorID = TutorID;
    this.StudentID = StudentID;
    this.IsLifeTime = IsLifeTime;
    this.SubscribedTime = SubscribedTime;
    this.Expirytime = Expirytime;
  }
}

export default Subscription;
