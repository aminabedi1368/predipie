import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    console.log('Required roles:', requiredRoles); // لاگ کردن نقش‌های مورد نیاز

    if (!requiredRoles) {
      return true; // اگر نقش خاصی وجود نداشته باشد، اجازه دسترسی داده می‌شود
    }

    const { user } = context.switchToHttp().getRequest();
    console.log('User from request:', user); // لاگ کردن کاربر از درخواست

    const hasRole = requiredRoles.some((role) => user.role === role); // بررسی نقش کاربر
    console.log('User has required role:', hasRole); // لاگ کردن نتیجه بررسی نقش

    return hasRole; // برگرداندن نتیجه
  }
}
