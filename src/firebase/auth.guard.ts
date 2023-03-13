import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { FirebaseService } from './services/firebase.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly firebaseService: FirebaseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const { headers } = req;
    if (!headers.authorization) {
      throw new UnauthorizedException();
    }
    const uid = await this.verifyToken(headers.authorization);
    req.userId = uid;
    return true;
  }

  async verifyToken(token: string) {
    try {
      const auth = this.firebaseService.getAuth();
      const { uid } = await auth.verifyIdToken(token.replace('Bearer ', ''));
      return uid;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
