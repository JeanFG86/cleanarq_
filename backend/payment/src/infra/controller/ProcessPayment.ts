import { inject } from "../di/DI";
import PaymentGateway from "../gateway/PaymentGateway";
export default class ProcessPayment {
  @inject("paymentGateway")
  paymentGateway!: PaymentGateway;

  async execute(input: Input): Promise<void> {
    console.log("processPayment", input);
    const inputTransaction = {
      cardHolder: "Cliente Exemplo",
      creditCardNumber: "4012001037141112",
      expDate: "05/2027",
      cvv: "123",
      amount: input.amount,
    };
    await this.paymentGateway.createTransaction(inputTransaction);
  }
}

type Input = {
  rideId: string;
  amount: number;
};
