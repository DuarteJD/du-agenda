import IMailProvider from '../models/IMailProvider';
import IMailSendDTO from '../dtos/IMailSendDTO';

export default class FakeMailProvider implements IMailProvider {
  private messages: IMailSendDTO[] = [];

  public async sendMail(message: IMailSendDTO): Promise<void> {
    this.messages.push(message);
  }
}
