import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthInternalClientPayload } from '../types/auth-internal-client-payload';
import { JwtService } from '@nestjs/jwt';
import { AuthExternalClientPayload } from '../types/auth-external-client-payload';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  private internalClients = {
    actor_service: process.env.ACTOR_SERVICE_SECRET,
    film_service: process.env.FILM_SERVICE_SECRET,
  };

  private externalClients = {
    external_client_1: process.env.EXTERNAL_CLIENT_1,
    external_client_2: process.env.EXTERNAL_CLIENT_2,
  };

  getToken(body: { client_id: string; client_secret: string }) {
    const { client_id, client_secret } = body;
    if (this.internalClients[client_id] !== client_secret) {
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

  getExternalClientToken(body: { client_id: string; client_secret: string }) {
    const { client_id, client_secret } = body;
    if (this.externalClients[client_id] !== client_secret) {
      throw new UnauthorizedException('Invalid client credentials');
    }

    const token = this.jwtService.sign<AuthExternalClientPayload>({
      sub: client_id,
      scope: 'read:films_by_actor_name',
      iss: 'http://localhost:3000',
    });

    return {
      access_token: token,
    };
  }
}
