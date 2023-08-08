import { TutorProfileDto } from 'src/infrastructure/core/tutor/dto/tutorProfileDTO';

interface ITutorRepository {
  UpdateProfile(data: TutorProfileDto);
}

export default ITutorRepository;
