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
import { typingDTO } from '../DTO/typingDto';
const FRONTENT_BASEURL = process.env.FRONTENT_BASEURL;
@WebSocketGateway({
  cors: {
    origin: FRONTENT_BASEURL,
    methods: ['GET', 'POST'],
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
    await this.chatService.sendMessage(data);

    this.server.emit(data.ChatId, {
      msg: 'New Message',
      content: data.Content,
      sender: [data.SenderId], // Set SenderId as the 0th value in an array
      timeStamp: data.timeStamp,
    });
  }
  @SubscribeMessage('typing')
  async handleTyping(@MessageBody() data: typingDTO) {
    this.server.emit(`${data.ChatId}display`, {
      data: data,
    });
  }
}
