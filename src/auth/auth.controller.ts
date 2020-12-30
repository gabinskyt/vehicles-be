import { ApiEndpoint, Controller } from "../utils/decorators/api.decorator";

@Controller('auth')
export class AuthController {
  service: string = 'auth/providers/auth-service';

  @ApiEndpoint({
    path: '/',
    method: 'get',
    provider: 'getAuth'
  })
  public getAuth;
}