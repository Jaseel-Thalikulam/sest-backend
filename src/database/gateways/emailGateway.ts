import { IemailGateway } from 'src/services/interfaces/email.interfaces';
import { DataBase } from '../database.handler'

import { Injectable } from '@nestjs/common';
import { Schema } from 'mongoose';


@Injectable()
export class emailGateway implements IemailGateway {
    private readonly dataBase: DataBase;

    constructor(dataBase: DataBase) {
        this.dataBase = dataBase;
    }
    

async addexpiryOTP(OTP: number, id: Schema.Types.ObjectId) {
    this.dataBase.addexpiryOTP(id,OTP)
}
}
