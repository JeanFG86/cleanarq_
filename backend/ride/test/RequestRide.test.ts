import { AccountRepositoryDatabase } from "../src/AccountRepository";
import { Registry } from "../src/DI";
import GetAccount from "../src/GetAccount";
import GetRide from "../src/GetRide";
import { MailerGatewayMemory } from "../src/MailerGateway";
import RequestRide from "../src/RequestRide";
import { RideRepositoryDatabase } from "../src/RideRepository";
import Signup from "../src/Signup";

describe("RequestRide", () => {
  let signup: Signup;
  let getAccount: GetAccount;
  let requestRide: RequestRide;
  let getRide: GetRide;

  beforeEach(() => {
    const accountRepository = new AccountRepositoryDatabase();
    const rideRepository = new RideRepositoryDatabase();
    const mailerGateway = new MailerGatewayMemory();
    Registry.getInstance().provide("accountRepository", accountRepository);
    Registry.getInstance().provide("rideRepository", rideRepository);
    Registry.getInstance().provide("mailerGateway", mailerGateway);
    signup = new Signup();
    getAccount = new GetAccount();
    requestRide = new RequestRide();
    getRide = new GetRide();
  });
  it("Deve solicitar uma corrida", async function () {
    const inputSignup = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      isPassenger: true,
    };
    const outputSignup = await signup.execute(inputSignup);
    const inputRequestRide = {
      passengerId: outputSignup.accountId,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    expect(outputRequestRide.rideId).toBeDefined();
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.rideId).toBe(outputRequestRide.rideId);
    expect(outputGetRide.passengerId).toBe(inputRequestRide.passengerId);
    expect(outputGetRide.fromLat).toBe(inputRequestRide.fromLat);
    expect(outputGetRide.fromLong).toBe(inputRequestRide.fromLong);
    expect(outputGetRide.toLat).toBe(inputRequestRide.toLat);
    expect(outputGetRide.toLong).toBe(inputRequestRide.toLong);
    expect(outputGetRide.status).toBe("requested");
  });
});
