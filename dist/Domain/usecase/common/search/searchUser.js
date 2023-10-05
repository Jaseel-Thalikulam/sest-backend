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
let search_Query_useCase = class search_Query_useCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async execute(data) {
        if (data.option === 'Playlist') {
        }
        else if (data.option === 'Student') {
            return await this.userRepository.findStudentsByUserId(data);
        }
        else if (data.option === 'Tutor') {
            return await this.userRepository.findTutorsByUserId(data);
        }
    }
};
search_Query_useCase = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mongooseUserRepository_1.mongooseUserRepository])
], search_Query_useCase);
exports.default = search_Query_useCase;
//# sourceMappingURL=searchUser.js.map