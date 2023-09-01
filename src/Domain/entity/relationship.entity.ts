import { ObjectId } from 'mongoose';
import User from './user.entity';
import Chat from './chat.entity';

class Relationship {
  public source: string;
  public target: string;

  constructor(source: string, target: string) {
    this.source = source;
    this.target = target;
  }
}

export default Relationship;
