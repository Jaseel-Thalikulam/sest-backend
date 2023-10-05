"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseUserRepository_1 = require("../../../../infrastructure/database/repositories/common/mongooseUserRepository");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const config_1 = require("@nestjs/config");
const fs = require("fs");
const privatekey = fs.readFileSync('src/private/Key 9_12_2023, 9_33_42 AM.pk');
let createJitsiMeetToken = class createJitsiMeetToken {
    constructor(userRepository, configService) {
        this.configService = configService;
        this.userRepository = userRepository;
    }
    async execute(meetData) {
        const options = {
            header: {
                kid: meetData.kid,
                alg: meetData.alg,
            },
        };
        const payload = {
            aud: meetData.aud,
            context: meetData.context,
            iss: meetData.iss,
            room: meetData.room,
            sub: meetData.sub,
            nbf: parseInt(meetData.nbf),
            exp: parseInt(meetData.exp),
        };
        const token = await jwt.sign(payload, this.configService.getOrThrow('JITSI_PRIVATE_KEY'), options);
        return token;
    }
};
createJitsiMeetToken = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseUserRepository_1.mongooseUserRepository,
        config_1.ConfigService])
], createJitsiMeetToken);
exports.default = createJitsiMeetToken;
//# sourceMappingURL=createJitsiMeetToken.js.map