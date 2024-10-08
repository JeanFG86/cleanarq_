import AccountRepository from "../../infra/repository/AccountRepository";
import { inject } from "../../infra/di/DI";
import Email from "../../domain/vo/Email";

export default class GetAccount {
  @inject("accountRepository")
  accountRepository?: AccountRepository;

  async execute(accountId: string) {
    const account = await this.accountRepository?.getAccountById(accountId);
    if (!account) throw new Error("Account not found");
    return {
      accountId: account.getAccountId(),
      name: account.getName(),
      cpf: account.getCpf(),
      email: account.getEmail(),
      carPlate: account.getCarPlate(),
      password: account.getPassword(),
      isPassenger: account.isPassenger,
      isDriver: account.isDriver,
    };
  }
}
