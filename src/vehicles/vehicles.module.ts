import { Module } from '../utils/decorators/api.decorator';
import { VehiclesController } from './vehicles.controller';

/**
 * Healthy module
 */
@Module({
    controllers: [VehiclesController]
})
export class VehiclesModule {};