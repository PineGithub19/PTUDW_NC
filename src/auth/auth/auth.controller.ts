import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetTokenDto } from './dto/token.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('token')
  getToken(@Body() body: GetTokenDto) {
    return this.authService.getToken(body);
  }

  @Post('external_token')
  getExternalToken(@Body() body: GetTokenDto) {
    return this.authService.getExternalClientToken(body);
  }
}
