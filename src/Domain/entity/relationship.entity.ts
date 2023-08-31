import { ObjectId } from 'mongoose';
import User from './user.entity';
import Chat from './chat.entity';

class Relationship {
  public _id!: ObjectId;
  public source:ObjectId
  public target:  ObjectId;


  constructor(
     source:ObjectId,
     target:  ObjectId
  ) {
    this.source = source;
    this.target = target;
  }
}

export default Relationship;
