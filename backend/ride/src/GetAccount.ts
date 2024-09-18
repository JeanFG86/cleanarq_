import AccountRepository from "./AccountRepository";
import Email from "./Email";

export default class GetAccount {
  constructor(readonly accountRepository: AccountRepository) {}

  async execute(accountId: string) {
    const account = await this.accountRepository.getAccountById(accountId);
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
