import { VehiclesModule } from './vehicles/vehicles.module';
import { AWSAppModule } from './utils/interfaces/api-request.interface';
import { AuthModule } from './auth/auth.module';

/**
 * Service endpoint definitions
 */
export const AppModule: AWSAppModule = {
    ...VehiclesModule,
    ...AuthModule
}