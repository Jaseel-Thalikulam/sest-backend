import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';
import { ChatService } from 'src/infrastructure/core/common/services/chat.service';
import { SendMessageDTO } from 'src/infrastructure/core/student/DTO/sendMessageDTO';
const FRONTENT_BASEURL = process.env.FRONTENT_BASEURL;
@WebSocketGateway({
  cors: {
    origin: FRONTENT_BASEURL,
     methods:["GET","POST"]
  },
})
export class ChatGateway implements OnModuleInit {
  constructor(private chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('Connected');
    });
  }

  @SubscribeMessage('message')
  async handleMessage(@MessageBody() data: SendMessageDTO) {
    console.log(data);
    const response = await this.chatService.sendMessage(data);
    console.log(response);
    this.server.emit(data.ChatId, {
      msg: 'New Message',
      content: data.Content,
      senderId: data.SenderId,
      timeStamp: data.timeStamp,
    });
  }
}
