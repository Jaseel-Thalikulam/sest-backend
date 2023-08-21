import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
import Message from 'src/Domain/entity/message.entity';
import { fetchChatsDto } from 'src/infrastructure/core/common/DTO/chat/fetchChatsDto';
import { FetchAllMessageDTO } from 'src/infrastructure/core/student/DTO/FetchAllMessageDTO';
export class mongooseMessageRepository  {
  constructor(@InjectModel('Message') private readonly messageModel: Model<Message>) {}

async sendMessage(data: SendMessageDTO) {
   const {ChatId,Content,SenderId} =data
    let newmessage = {
        sender: SenderId,
        content: Content,
        chat:ChatId
}
    // Save the message to the database
    const createdMessage = await this.messageModel.create(newmessage)
    
    // Populate the chat field, sender field, and users array
    const populatedMessage = await this.messageModel.findById(createdMessage._id)
        .populate({
            path: "sender",
            model:"User"
      }).populate({
            path: "chat",
            model:"Chat"
      })
      
       
    
    console.log(populatedMessage)
    return populatedMessage
     }
  
  async fetchallMessages(chatId: string) {
    try {
      
  
      if (chatId) {
        
        
        return this.messageModel.find({chat:chatId})
      }
    } catch (err) {
      console.log(err)
    }
 }
  
}
