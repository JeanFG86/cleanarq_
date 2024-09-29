import AccountRepository from "../../infra/repository/AccountRepository";
import MailerGateway from "../../infra/gateway/MailerGateway";
import Account from "../../domain/entity/Account";
import { inject, Registry } from "../../infra/di/DI";

export default class Signup {
  @inject("accountRepository")
  accountRepository?: AccountRepository;
  @inject("mailerGateway")
  mailerGateway?: MailerGateway;

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
    const accountData = await this.accountRepository?.getAccountByEmail(input.email);
    if (accountData) throw new Error("Duplicated account");
    await this.accountRepository?.saveAccount(account);
    await this.mailerGateway?.send(account.getEmail(), "Welcome!", "...");
    return {
      accountId: account.getAccountId(),
    };
  }
}
