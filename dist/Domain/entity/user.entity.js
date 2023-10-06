"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class User {
    constructor(name, username, email, password, role, isVerified, tags = [], subscription = [], phoneNumber, avatarUrl, about, otp, URLs, DOB) {
        this.name = name;
        this.email = email;
        this.username = username;
        this.password = password;
        this.role = role;
        this.phoneNumber = phoneNumber;
        this.avatarUrl = avatarUrl;
        this.about = about;
        this.otp = otp;
        this.URLs = URLs;
        this.DOB = DOB;
        this.isBanned = false;
        this.isVerified = isVerified;
        this.tags = tags;
        this.subscription = subscription;
    }
    getTags() {
        return this.tags;
    }
    addTag(tag) {
        this.tags.push(tag);
    }
    removeTag(tag) {
        const index = this.tags.indexOf(tag);
        if (index !== -1) {
            this.tags.splice(index, 1);
        }
    }
}
exports.default = User;
//# sourceMappingURL=user.entity.js.map