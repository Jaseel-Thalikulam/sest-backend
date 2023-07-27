
import { ObjectId } from 'mongoose';


interface MiddlewareRepository {
    isSuperAdmin(id:ObjectId):Promise<boolean>
    
}

export default MiddlewareRepository;