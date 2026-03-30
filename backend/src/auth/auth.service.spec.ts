import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { ConflictException, UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';

const mockPrismaService = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

const mockJwtService = {
  sign: jest.fn().mockReturnValue('mock-token'),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: mockPrismaService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jest.clearAllMocks();
  });

  describe('authRegister', () => {
    it('should throw ConflictException if email already exists', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({ id: 1 });

      await expect(
        service.authRegister({ email: 'test@test.com', name: 'Test', password: '123456' }),
      ).rejects.toThrow(ConflictException);
    });

    it('should create user and return token', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);
      mockPrismaService.user.create.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        name: 'Test',
        trustLevel: 'NEWCOMER',
        role: 'USER',
      });

      const result = await service.authRegister({
        email: 'test@test.com',
        name: 'Test',
        password: '123456',
      });

      expect(result.token).toBe('mock-token');
      expect(result.user.email).toBe('test@test.com');
    });
  });

  describe('authLogin', () => {
    it('should throw UnauthorizedException if user not found', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue(null);

      await expect(
        service.authLogin({ email: 'notfound@test.com', password: '123456' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is wrong', async () => {
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        name: 'Test',
        password: await argon2.hash('correct-password'),
        trustLevel: 'NEWCOMER',
        role: 'USER',
      });

      await expect(
        service.authLogin({ email: 'test@test.com', password: 'wrong-password' }),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should return user and token on valid login', async () => {
      const hashedPassword = await argon2.hash('correct-password');
      mockPrismaService.user.findUnique.mockResolvedValue({
        id: 1,
        email: 'test@test.com',
        name: 'Test',
        password: hashedPassword,
        trustLevel: 'NEWCOMER',
        role: 'USER',
      });

      const result = await service.authLogin({
        email: 'test@test.com',
        password: 'correct-password',
      });

      expect(result.token).toBe('mock-token');
      expect(result.user).not.toHaveProperty('password');
    });
  });
});
