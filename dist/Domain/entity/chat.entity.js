"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Chat {
    constructor(Name, isGroupChat, users, latestMessage, groupAdmin) {
        this.Name = Name;
        this.isGroupChat = isGroupChat;
        (this.users = users),
            (this.latestMessage = latestMessage),
            (this.groupAdmin = groupAdmin);
    }
}
exports.default = Chat;
//# sourceMappingURL=chat.entity.js.map