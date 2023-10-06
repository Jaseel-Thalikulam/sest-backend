import { PaymentDTO } from '../DTO/payment/paymentDTO';
import { ConfigService } from '@nestjs/config';
export declare class PaymentService {
    private readonly configService;
    private stripe;
    constructor(configService: ConfigService);
    executepayment(paymentDetail: PaymentDTO): Promise<{
        success: boolean;
        client_secret: any;
    }>;
}
