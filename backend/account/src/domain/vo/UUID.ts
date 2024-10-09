export default class UUID {
  private value: string;

  constructor(value: string) {
    this.value = value;
  }

  static create() {
    return new UUID(crypto.randomUUID());
  }

  getValue() {
    return this.value;
  }
}
