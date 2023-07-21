import { ObjectId } from "mongoose";

export interface ISuperAdminMiddleware{
   

    isSuperAdmin(id:ObjectId)
  
}

