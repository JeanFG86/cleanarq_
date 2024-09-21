import AccountRepository from "./AccountRepository";
import MailerGateway from "./MailerGateway";
import Account from "./Account";
import { inject, Registry } from "./DI";
import Ride from "./Ride";
import RideRepository from "./RideRepository";

export default class RequestRide {
  @inject("accountRepository")
  accountRepository?: AccountRepository;
  @inject("rideRepository")
  rideRepository?: RideRepository;

  async execute(input: Input): Promise<Output> {
    // const account = await this.accountRepository?.getAccountById(input.passengerId);
    // if (!account) throw new Error("Account does not exist");
    // if (!account.isPassenger) throw new Error("Account must be from a passenger");
    const ride = Ride.create(input.passengerId, input.fromLat, input.fromLong, input.toLat, input.toLong);
    await this.rideRepository?.saveRide(ride);
    return {
      rideId: ride.getRideId(),
    };
  }
}

type Input = {
  passengerId: string;
  fromLat: number;
  fromLong: number;
  toLat: number;
  toLong: number;
};

type Output = {
  rideId: string;
};
