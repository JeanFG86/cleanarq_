import axios from "axios";

export default class PaymentGateway {
  async processPayment(input: any): Promise<void> {
    const response = await axios.post("http://localhost:3002/process_payment", input);
    return response.data;
  }
}
