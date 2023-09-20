import { Injectable } from '@nestjs/common';
import { PaymentDTO } from '../../DTO/payment/paymentDTO';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class PaymentService {
    private readonly configService: ConfigService
    private stripe;
    constructor(
        configService: ConfigService) {
        this.configService = configService,
        this.stripe = new Stripe(configService.getOrThrow('STRIPE_SECRET_KEY'),{
            apiVersion: '2023-08-16',
          });
  }

  public async executepayment(paymentDetail: PaymentDTO) {
 
      const {client_secret} = await this.stripe.paymentIntents.create({
          amount: paymentDetail.amount,
          currency:"inr"
      })

      
      return {success:true,client_secret}
  }
}
