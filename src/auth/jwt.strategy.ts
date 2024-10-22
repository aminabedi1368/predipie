import { Injectable, UnauthorizedException } from '@nestjs/common'; 
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'fhvkdhskdlshbhsjhchvg', 
    });
  }


async validate(payload: JwtPayload) {
    console.log('Validating payload:', payload);
    const user = await this.userService.findByEmail(payload.email);
    if (!user) {
      console.log('User not found');
      throw new UnauthorizedException();
    }
    console.log('User found:', user);
    return user;
  }
  

}
