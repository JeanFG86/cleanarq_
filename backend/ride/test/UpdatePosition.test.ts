import AcceptRide from "../src/application/usecase/AcceptRide";
import GetRide from "../src/application/usecase/GetRide";
import RequestRide from "../src/application/usecase/RequestRide";
import StartRide from "../src/application/usecase/StartRide";
import UpdatePosition from "../src/application/usecase/UpdatePosition";
import { PgPromiseAdapter } from "../src/infra/database/DatabaseConnection";
import { Registry } from "../src/infra/di/DI";
import AccountGateway from "../src/infra/gateway/AccountGateway";
import { PositionRepositoryDatabase } from "../src/infra/repository/PositionRepository";
import { RideRepositoryDatabase } from "../src/infra/repository/RideRepository";

describe("Update position test", () => {
  let accountGateway: AccountGateway;
  let requestRide: RequestRide;
  let getRide: GetRide;
  let acceptRide: AcceptRide;
  let startRide: StartRide;
  let updatePosition: UpdatePosition;

  beforeEach(() => {
    accountGateway = new AccountGateway();
    Registry.getInstance().provide("accountGateway", new AccountGateway());
    Registry.getInstance().provide("databaseConnection", new PgPromiseAdapter());
    Registry.getInstance().provide("rideRepository", new RideRepositoryDatabase());
    Registry.getInstance().provide("positionRepository", new PositionRepositoryDatabase());
    requestRide = new RequestRide();
    getRide = new GetRide();
    acceptRide = new AcceptRide();
    startRide = new StartRide();
    updatePosition = new UpdatePosition();
  });
  it("Deve atualiar a posição de uma corrida", async function () {
    const inputSignupPassenger = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      isPassenger: true,
    };
    const outputSignupPassenger = await accountGateway.signup(inputSignupPassenger);
    const inputSignupDriver = {
      name: "John Doe",
      email: `john.doe${Math.random()}@gmail.com`,
      cpf: "97456321558",
      password: "123456",
      carPlate: "AAA9999",
      isDriver: true,
    };
    const outputSignupDriver = await accountGateway.signup(inputSignupDriver);
    const inputRequestRide = {
      passengerId: outputSignupPassenger.accountId,
      fromLat: -27.584905257808835,
      fromLong: -48.545022195325124,
      toLat: -27.496887588317275,
      toLong: -48.522234807851476,
    };
    const outputRequestRide = await requestRide.execute(inputRequestRide);
    const inputAcceptRide = {
      rideId: outputRequestRide.rideId,
      driverId: outputSignupDriver.accountId,
    };
    await acceptRide.execute(inputAcceptRide);
    const inputStartRide = {
      rideId: outputRequestRide.rideId,
    };
    await startRide.execute(inputStartRide);
    const inputUpdatePosition1 = {
      rideId: outputRequestRide.rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
      date: new Date(),
    };
    await updatePosition.execute(inputUpdatePosition1);
    const inputUpdatePosition2 = {
      rideId: outputRequestRide.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date(),
    };
    await updatePosition.execute(inputUpdatePosition2);
    const inputUpdatePosition3 = {
      rideId: outputRequestRide.rideId,
      lat: -27.584905257808835,
      long: -48.545022195325124,
      date: new Date(),
    };
    await updatePosition.execute(inputUpdatePosition3);
    const inputUpdatePosition4 = {
      rideId: outputRequestRide.rideId,
      lat: -27.496887588317275,
      long: -48.522234807851476,
      date: new Date(),
    };
    await updatePosition.execute(inputUpdatePosition4);
    const outputGetRide = await getRide.execute(outputRequestRide.rideId);
    expect(outputGetRide.distance).toBe(30);
    console.log(outputGetRide.positions);
  });

  afterEach(async () => {
    const connection = Registry.getInstance().inject("databaseConnection");
    await connection.close();
  });
});
