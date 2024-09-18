import Cpf from "../src/Cpf";

describe("validateCpf", () => {
  test.each(["41953697038", "71574446070"])("Deve validar um cpf válido %s", function (value: string) {
    const cpf = new Cpf(value);
    expect(cpf.getValue()).toBe(value);
  });

  test.each(["11111111111", "q157444607e", "419536970"])(
    "Não deve validar um cpf inválido %s",
    function (value: string) {
      expect(() => new Cpf(value)).toThrow(new Error("Invalid cpf"));
    }
  );
});
