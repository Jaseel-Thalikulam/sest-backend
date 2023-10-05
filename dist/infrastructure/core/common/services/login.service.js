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
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const loginUser_1 = require("../../../../Domain/usecase/common/loginUser");
let LoginService = exports.LoginService = class LoginService {
    constructor(verifyLoginUserUseCase) {
        this._verifyLoginUserUseCase = verifyLoginUserUseCase;
    }
    async verifyUser(User) {
        try {
            const response = await this._verifyLoginUserUseCase.execute(User);
            return {
                success: response.success,
                message: response.message,
                token: response.token,
                data: response.data,
            };
        }
        catch (err) {
            console.log(err);
        }
    }
};
exports.LoginService = LoginService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [loginUser_1.default])
], LoginService);
//# sourceMappingURL=login.service.js.map