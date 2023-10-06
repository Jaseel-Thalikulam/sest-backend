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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooseUserRepository = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let mongooseUserRepository = exports.mongooseUserRepository = class mongooseUserRepository {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(user) {
        const createdUser = await this.userModel.create(user);
        return createdUser.toObject();
    }
    async getUserByUsername(username) {
        const data = await this.userModel.findOne({ username: username });
        return data ? true : false;
    }
    async findUserByEmail(email) {
        const foundUser = await this.userModel.findOne({ email }).populate({
            path: 'tags',
            model: 'Category',
        });
        return foundUser ? foundUser.toObject() : null;
    }
    async addExpiryOTP(id, OTP) {
        const StringifiedId = id.toString();
        const filter = { _id: StringifiedId };
        const otpExpiryDate = Date.now() + 30000;
        const update = {
            $set: {
                'otp.code': OTP,
                'otp.expiresAt': otpExpiryDate,
            },
        };
        await this.userModel.findByIdAndUpdate(filter, update, {
            projection: {
                otp: 1,
            },
        });
    }
    async findUserById(id) {
        return await this.userModel.findById(id);
    }
    async SetAsVerified(id) {
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        if (user) {
            user.isVerified = true;
            user.otp = undefined;
        }
        return await user.save();
    }
    async removeUser(id) {
        const result = await this.userModel.deleteOne({ _id: id });
    }
    async UpdatePassword(userDetails) {
        const userData = await this.userModel.findOne({ email: userDetails.email });
        userData.password = userDetails.password;
        return userData.save();
    }
    async UpdateProfile(userdata) {
        try {
            const userDetails = await this.userModel.findById(userdata._id);
            if (userDetails) {
                if (userdata.Number !== '') {
                    userDetails.phoneNumber = userdata.Number;
                }
                if (userdata.About !== '') {
                    userDetails.about = userdata.About;
                }
                if (userdata.DOB) {
                    userDetails.DOB = userdata.DOB;
                }
                if (userdata.githuburl) {
                    const update = {
                        $set: {
                            'URLs.github': userdata.githuburl,
                        },
                    };
                    await this.userModel.findByIdAndUpdate(userdata._id, update, {
                        projection: {
                            URLs: 1,
                        },
                    });
                }
                if (userdata.linkedinurl) {
                    const update = {
                        $set: {
                            'URLs.linkedin': userdata.linkedinurl,
                        },
                    };
                    await this.userModel.findByIdAndUpdate(userdata._id, update, {
                        projection: {
                            URLs: 1,
                        },
                    });
                }
                if (userdata.pinteresturl) {
                    const update = {
                        $set: {
                            'URLs.pinterest': userdata.pinteresturl,
                        },
                    };
                    await this.userModel.findByIdAndUpdate(userdata._id, update, {
                        projection: {
                            URLs: 1,
                        },
                    });
                }
                await userDetails.save();
                const userData = await this.userModel.findById(userdata._id).populate({
                    path: 'tags',
                    model: 'Category',
                });
                return { success: true, message: 'Successfully Updated!', userData };
            }
            else {
                return { success: false, message: 'User not found' };
            }
        }
        catch (err) {
            return { success: false, message: 'Server Error' };
        }
    }
    async findTutorsByUserId(data) {
        const { searchInput } = data;
        const searchInputLowercase = searchInput.toLocaleLowerCase();
        return await this.userModel.find({
            username: { $regex: new RegExp(searchInputLowercase, 'i') },
            role: 'Lead',
        });
    }
    async findStudentsByUserId(data) {
        const { searchInput } = data;
        const searchInputLowercase = searchInput.toLocaleLowerCase();
        return await this.userModel.find({
            username: { $regex: new RegExp(searchInputLowercase, 'i') },
            role: 'Learn',
            isBanned: false,
            isVerified: true,
        });
    }
};
exports.mongooseUserRepository = mongooseUserRepository = __decorate([
    __param(0, (0, mongoose_1.InjectModel)('User')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], mongooseUserRepository);
//# sourceMappingURL=mongooseUserRepository.js.map