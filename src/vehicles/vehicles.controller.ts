import { ApiEndpoint, Controller } from "../utils/decorators/api.decorator";

@Controller('vehicles')
export class VehiclesController {
  service: string = 'vehicles/providers/vehicles-service';

  @ApiEndpoint({
    path: '/',
    method: 'get',
    provider: 'getVehicles'
  })
  public getVehicles;

  @ApiEndpoint({
    path: '/{idVehicle}',
    method: 'patch',
    provider: 'patchVehicleStatus'
  })
  public patchVehicleStatus;
}