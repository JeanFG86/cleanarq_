import RideCompletedEvent from "../../domain/event/RideCompletedEvent";
import { inject } from "../../infra/di/DI";
import PaymentGateway from "../../infra/gateway/PaymentGateway";
import PositionRepository from "../../infra/repository/PositionRepository";
import RideRepository from "../../infra/repository/RideRepository";

export default class FinishRide {
  @inject("rideRepository")
  rideRepository?: RideRepository;
  @inject("positionRepository")
  positionRepository?: PositionRepository;
  @inject("paymentGateway")
  paymentGateway?: PaymentGateway;

  async execute(input: Input): Promise<void> {
    const ride = await this.rideRepository?.getRideById(input.rideId);
    if (!ride) throw new Error();
    ride.register(RideCompletedEvent.eventName, async (event: any) => {
      await this.rideRepository?.updateRide(ride);
      await this.paymentGateway?.processPayment(event);
    });
    const positions = await this.positionRepository?.getPositionsByRideId(input.rideId);
    ride.finish(positions!);
  }
}

type Input = {
  rideId: string;
};
