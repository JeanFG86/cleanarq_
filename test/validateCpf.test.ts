import { validateCpf } from "../src/validateCpf";

describe("validateCpf", () => {
  it("Deve validar um cpf", function () {
    const cpf = "41953697038";
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(true);
  });

  it("Deve validar um cpf com o digito zero", function () {
    const cpf = "71574446070";
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(true);
  });

  it("Não deve validar um cpf com menos de 11 caracteres", function () {
    const cpf = "4195369703";
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  });

  it("Não deve validar um cpf com todos os caracteres iguais", function () {
    const cpf = "11111111111";
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  });

  it("Não deve validar um cpf com letras", function () {
    const cpf = "q157444607e";
    const isValid = validateCpf(cpf);
    expect(isValid).toBe(false);
  });
});
