import { Module } from '../utils/decorators/api.decorator';
import { AuthController } from './auth.controller';

/**
 * Healthy module
 */
@Module({
    controllers: [AuthController]
})
export class AuthModule {};