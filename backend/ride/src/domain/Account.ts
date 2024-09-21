import CarPlate from "./CarPlate";
import Cpf from "./Cpf";
import Email from "./Email";
import Name from "./Name";
import Password from "./Password";
import UUID from "./UUID";

export default class Account {
  private accountId: UUID;
  private name: Name;
  private email: Email;
  private cpf: Cpf;
  private carPlate?: CarPlate;
  private password: Password;

  constructor(
    accountId: string,
    name: string,
    cpf: string,
    email: string,
    carPlate: string,
    password: string,
    readonly isPassenger: boolean,
    readonly isDriver: boolean
  ) {
    this.accountId = new UUID(accountId);
    this.name = new Name(name);
    this.email = new Email(email);
    this.cpf = new Cpf(cpf);
    if (isDriver) this.carPlate = new CarPlate(carPlate);
    this.password = new Password(password);
  }

  static create(
    name: string,
    cpf: string,
    email: string,
    carPlate: string,
    password: string,
    isPassenger: boolean,
    isDriver: boolean
  ) {
    const accointId = UUID.create();
    return new Account(accointId.getValue(), name, cpf, email, carPlate, password, isPassenger, isDriver);
  }

  getAccountId() {
    return this.accountId.getValue();
  }

  getName() {
    return this.name.getValue();
  }

  getCpf() {
    return this.cpf.getValue();
  }

  getEmail() {
    return this.email.getValue();
  }

  getCarPlate() {
    return this.isDriver ? this.carPlate?.getValue() : "";
  }

  getPassword() {
    return this.password.getValue();
  }
}
