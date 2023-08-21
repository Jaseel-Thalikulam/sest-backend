import { IChat } from "./Ichat";

interface ICreateChat {
    success: boolean,
    message: string,
    Chat?:IChat
}

export default ICreateChat;
