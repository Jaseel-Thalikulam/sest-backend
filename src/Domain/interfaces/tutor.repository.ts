
import { ObjectId } from 'mongoose';
import User from '../entity/user.entity';
import { TutorProfileDto } from 'src/infrastructure/core/tutor/dto/tutorProfileDTO';

interface TutorRepository {

    UpdateProfile(data: TutorProfileDto)
    
}

export default TutorRepository;