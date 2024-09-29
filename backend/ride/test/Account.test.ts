import Account from "../src/domain/entity/Account";

describe("Account test", () => {
  it("Deve criar uma conta", () => {
    const account = Account.create("Jhon Doe", "41953697038", "jhon.doe@gmail.com", "", "123456", true, false);
    expect(account).toBeDefined();
  });

  it("Não deve criar uma conta com nome inválido", () => {
    expect(() => Account.create("Jhon", "41953697038", "jhon.doe@gmail.com", "", "123456", true, false)).toThrow(
      new Error("Invalid name")
    );
  });

  it("Não deve criar uma conta com email inválido", () => {
    expect(() => Account.create("Jhon Doe", "41953697038", "jhon.doegmail.com", "", "123456", true, false)).toThrow(
      new Error("Invalid email")
    );
  });

  it("Não deve criar uma conta com cpf inválido", () => {
    expect(() => Account.create("Jhon Doe", "4195367038", "jhon.doe@gmail.com", "", "123456", true, false)).toThrow(
      new Error("Invalid cpf")
    );
  });

  it("Não deve criar uma conta com placa do carro inválida", () => {
    expect(() => Account.create("Jhon Doe", "41953697038", "jhon.doe@gmail.com", "", "123456", true, true)).toThrow(
      new Error("Invalid car plate")
    );
  });
});
