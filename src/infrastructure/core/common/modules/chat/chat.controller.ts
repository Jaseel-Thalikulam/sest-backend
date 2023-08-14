import { ChatService } from './chat.service';
import { Response } from 'express';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { createChatDto } from '../../DTO/creatChatDTO';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('create')
  async createChat(@Body() data:createChatDto , @Res() res: Response) {
   const resposne = await this.chatService.createChat(data)
    }
    
}
