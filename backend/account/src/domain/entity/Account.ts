import CarPlate from "../vo/CarPlate";
import Cpf from "../vo/Cpf";
import Email from "../vo/Email";
import Name from "../vo/Name";
import Password, { PasswordFactory } from "../vo/Password";
import UUID from "../vo/UUID";

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
    readonly isDriver: boolean,
    passwordType: string = "textplain"
  ) {
    this.accountId = new UUID(accountId);
    this.name = new Name(name);
    this.email = new Email(email);
    this.cpf = new Cpf(cpf);
    if (isDriver) this.carPlate = new CarPlate(carPlate);
    this.password = PasswordFactory.restore(passwordType, password);
  }

  static create(
    name: string,
    cpf: string,
    email: string,
    carPlate: string,
    password: string,
    isPassenger: boolean,
    isDriver: boolean,
    passwordType: string = "textplain"
  ) {
    const accointId = UUID.create();
    const passwordValue = PasswordFactory.create(passwordType, password);
    return new Account(
      accointId.getValue(),
      name,
      cpf,
      email,
      carPlate,
      passwordValue.getValue(),
      isPassenger,
      isDriver,
      passwordValue.type
    );
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

  getPasswordType() {
    return this.password.type;
  }
}
