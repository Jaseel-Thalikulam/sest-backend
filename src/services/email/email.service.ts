import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { emailGateway } from 'src/database/gateways/emailGateway';

@Injectable()
export class EmailService {
  private readonly _emailGateway: emailGateway;
  constructor(emailGateway: emailGateway, private mailService: MailerService) {
    this._emailGateway = emailGateway;
   }

  public async SendEmailOTP(toemail,Userid,Username) {

    const OTP = Math.floor(Math.random() * 900000) + 100000;
    
    this._emailGateway.addexpiryOTP(OTP,Userid)

this.mailService.sendMail({
  to: toemail,
      from: "sestverify@gmail.com",
      subject: "Verify",
      html: ` <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Hey,${Username},Verify your Email</title>
        <!--[if mso]><style type="text/css">body, table, td, a { font-family: Arial, Helvetica, sans-serif !important; }</style><![endif]-->
      </head>
      
      <body style="font-family: Helvetica, Arial, sans-serif; margin: 0px; padding: 0px; background-color: #ffffff;">
        <table role="presentation"
          style="width: 100%; border-collapse: collapse; border: 0px; border-spacing: 0px; font-family: Arial, Helvetica, sans-serif; background-color: rgb(239, 239, 239);">
          <tbody>
            <tr>
              <td align="center" style="padding: 1rem 2rem; vertical-align: top; width: 100%;">
                <table role="presentation" style="max-width: 600px; border-collapse: collapse; border: 0px; border-spacing: 0px; text-align: left;">
                  <tbody>
                    <tr>
                      <td style="padding: 40px 0px 0px;">
                        <div style="text-align: left;">
                          <div style="padding-bottom: 20px;"><img src="https://i.ibb.co/Qbnj4mz/logo.png" alt="Company" style="width: 56px;"></div>
                        </div>
                        <div style="padding: 20px; background-color: rgb(255, 255, 255);">
                          <div style="color: rgb(0, 0, 0); text-align: left;">
                            <h1 style="margin: 1rem 0">Verification code</h1>
                            <p style="padding-bottom: 16px">Please use the verification code below to sign up.</p>
                            <p style="padding-bottom: 16px"><strong style="font-size: 130%">${OTP}</strong></p>
                            <p style="padding-bottom: 16px">If you didn’t request this, you can ignore this email.</p>
                            <p style="padding-bottom: 16px">Thanks,<br>The Sest team</p>
                          </div>
                        </div>
                        <div style="padding-top: 20px; color: rgb(153, 153, 153); text-align: center;">
                        
                        </div>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </td>
                        </tr>
                        </tbody>
                        </table>
                        </body>
                        </html>`
                      })
                      
                      return OTP
  }
}
