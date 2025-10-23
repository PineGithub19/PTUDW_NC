import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInternalClientPayload } from '../types/auth-internal-client-payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private clients = {
    actor_service: process.env.ACTOR_SERVICE_SECRET,
    film_service: process.env.FILM_SERVICE_SECRET,
  };

  getToken(body: { client_id: string; client_secret: string }) {
    const { client_id, client_secret } = body;
    if (this.clients[client_id] !== client_secret) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    const token = this.jwtService.sign<AuthInternalClientPayload>({
      sub: client_id,
      scope: 'internal',
    });

    return {
      access_token: token,
    };
  }
}
