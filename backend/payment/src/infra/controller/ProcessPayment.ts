import { inject } from "../di/DI";
import PaymentProcessor from "../fallback/PaymentProcessor";
import PaymentGateway from "../gateway/PaymentGateway";
export default class ProcessPayment {
  @inject("paymentProcessor")
  paymentProcessor!: PaymentProcessor;

  async execute(input: Input): Promise<void> {
    console.log("processPayment", input);
    const inputTransaction = {
      cardHolder: "Cliente Exemplo",
      creditCardNumber: "4012001037141112",
      expDate: "05/2027",
      cvv: "123",
      amount: input.amount,
    };
    try {
      const outputCreateTransaction = await this.paymentProcessor.processPayment(inputTransaction);
      console.log(outputCreateTransaction);
      if (outputCreateTransaction.status === "approved") {
        console.log("pago com sucesso");
      }
    } catch (e: any) {
      console.log(e.message);
    }
  }
}

type Input = {
  rideId: string;
  amount: number;
};
