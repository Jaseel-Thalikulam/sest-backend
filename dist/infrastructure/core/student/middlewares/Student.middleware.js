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
exports.StudentVerifyMiddleware = void 0;
const mongooseMiddlewareRepository_1 = require("../../../database/repositories/middleware/mongooseMiddlewareRepository");
const common_1 = require("@nestjs/common");
const mongooseUserRepository_1 = require("../../../database/repositories/common/mongooseUserRepository");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;
let StudentVerifyMiddleware = exports.StudentVerifyMiddleware = class StudentVerifyMiddleware {
    constructor(middlewareRepository, UserRepository) {
        this._MiddlewareRepository = middlewareRepository;
    }
    async use(req, res, next) {
        const token = req.headers['token'];
        try {
            console.log(token, 'token');
            const decoded = jwt.verify(token, SECRECT_KEY);
            const isAuthorized = await this._MiddlewareRepository.isStudent(decoded.userId);
            const isBanned = await this._MiddlewareRepository.isBanned(decoded.userId);
            if (isAuthorized) {
                if (isBanned) {
                    res.json({ success: false, message: 'You Have Been Banned' });
                }
                else {
                    next();
                }
            }
            else {
                res.json({ success: false, message: 'Authorization Failed stud' });
            }
        }
        catch (err) {
            res.json({ success: false, message: 'Authentication Failed student' });
        }
    }
};
exports.StudentVerifyMiddleware = StudentVerifyMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseMiddlewareRepository_1.mongooseMiddlewareRepository,
        mongooseUserRepository_1.mongooseUserRepository])
], StudentVerifyMiddleware);
//# sourceMappingURL=Student.middleware.js.map