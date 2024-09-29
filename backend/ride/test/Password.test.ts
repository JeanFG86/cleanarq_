import Password from "../src/domain/vo/Password";

describe("Password Test", () => {
  it("Deve criar uma senha válida", function () {
    const password = new Password("123456");
    expect(password.getValue()).toBe("123456");
  });

  it("Não criar uma senha inválida", function () {
    expect(() => new Password("1234")).toThrow(new Error("Invalid password"));
  });
});
