import AccountRepository from "./AccountRepository";
import MailerGateway from "./MailerGateway";
import Account from "./Account";

export default class Signup {
  constructor(readonly accountRepository: AccountRepository, readonly mailerGateway: MailerGateway) {}

  async execute(input: any) {
    const account = Account.create(
      input.name,
      input.cpf,
      input.email,
      input.carPlate,
      input.password,
      input.isPassenger,
      input.isDriver
    );
    const accountData = await this.accountRepository.getAccountByEmail(input.email);
    if (accountData) throw new Error("Duplicated account");
    await this.accountRepository.saveAccount(account);
    await this.mailerGateway.send(account.getEmail(), "Welcome!", "...");
    return {
      accountId: account.accountId,
    };
  }
}
