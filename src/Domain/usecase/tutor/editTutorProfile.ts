import { Injectable } from "@nestjs/common";
import { TutorProfileDto } from "src/infrastructure/core/tutor/dto/tutorProfileDTO";
import { mongooseTutorRepository } from "src/infrastructure/database/repositories/tutor/mongoosetutorRepository";

@Injectable()
class edit_Tutor_Profile{
    private tutorRepository: mongooseTutorRepository;
    constructor(
        tutorRepository : mongooseTutorRepository
    ) {
        this.tutorRepository = tutorRepository;
    }

    async execute(data:TutorProfileDto) {
     return await this.tutorRepository.UpdateProfile(data)
    }

}  



export default edit_Tutor_Profile