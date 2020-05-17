import nodemailer, { Transporter } from 'nodemailer';
import { injectable, inject } from 'tsyringe';

import IMailTemplateProvider from '@shared/container/providers/mailTemplateProvider/models/IMailTemplateProvider';
import IMailProvider from '../models/IMailProvider';
import IMailSendDTO from '../dtos/IMailSendDTO';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider,
  ) {
    // nodemailer
    // .createTestAccount()
    // .then(account => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'teresa53@ethereal.email',
        pass: 'ssrPKchswMfpvqqGbU',
      },
    });

    // console.log(transporter);

    this.client = transporter;
    // })
    // .catch(error => {
    // console.log(error.message);
    // });
  }

  public async sendMail({
    from,
    to,
    subject,
    templateData,
  }: IMailSendDTO): Promise<void> {
    const message = await this.client.sendMail({
      from: {
        name: from?.name || 'Equipe DuAgenda',
        address: from?.email || 'contato@duagenda.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}
