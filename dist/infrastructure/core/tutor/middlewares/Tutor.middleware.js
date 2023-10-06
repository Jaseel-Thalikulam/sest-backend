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
exports.TutorVerifyMiddleware = void 0;
const mongooseMiddlewareRepository_1 = require("../../../database/repositories/middleware/mongooseMiddlewareRepository");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRECT_KEY = process.env.SECRECT_KEY;
let TutorVerifyMiddleware = exports.TutorVerifyMiddleware = class TutorVerifyMiddleware {
    constructor(middlewareRepository) {
        this._MiddlewareRepository = middlewareRepository;
    }
    use(req, res, next) {
        const token = req.headers['token'];
        new Promise((resolve) => {
            jwt.verify(token, SECRECT_KEY, (err, decoded) => {
                if (err) {
                    res.json({ success: false, message: 'Authentication Failed Tutor' });
                }
                else {
                    resolve(decoded);
                    const Isauthorized = this._MiddlewareRepository.isTutor(decoded.userId);
                    if (Isauthorized) {
                        next();
                    }
                    else {
                        res.json({
                            success: false,
                            message: 'Authorization Failed ergrtgr',
                        });
                    }
                }
            });
        });
    }
};
exports.TutorVerifyMiddleware = TutorVerifyMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseMiddlewareRepository_1.mongooseMiddlewareRepository])
], TutorVerifyMiddleware);
//# sourceMappingURL=Tutor.middleware.js.map