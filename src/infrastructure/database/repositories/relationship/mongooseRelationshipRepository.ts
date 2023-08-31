import User from '../../../../Domain/entity/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import IRelationshipRepository from 'src/Domain/interfaces/IRelationshipRepository';

export class mongooseRelationshipRepository implements  IRelationshipRepository{
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}


}
