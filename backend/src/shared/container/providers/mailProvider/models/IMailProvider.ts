import IMailSendDTO from '../dtos/IMailSendDTO';

export default interface IMailProvider {
  sendMail(data: IMailSendDTO): Promise<void>;
}
