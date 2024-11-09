import { Injectable } from '@nestjs/common';
import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  // This method will verify the token
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['authorization']?.split(' ')[1];  // Extract token from Authorization header

    if (!token) {
      return false;  // No token provided
    }

    try {
      // Verify the token and add user to the request
      const user = this.jwtService.verify(token);  // This will automatically decode and validate the token
      request.user = user;  // Attach the decoded user to the request object
      return true;  // Token is valid
    } catch (error) {
      return false;  // Token is invalid or expired
    }
  }
}
