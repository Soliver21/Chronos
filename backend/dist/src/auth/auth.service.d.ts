import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
export declare class AuthService {
    private readonly jwtService;
    private readonly prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    authRegister(user: RegisterUserDto): Promise<{
        user: {
            email: string;
            name: string;
            id: number;
            trustLevel: import(".prisma/client").$Enums.TrustLevel;
        };
        accessToken: string;
    }>;
    authLogin(user: LoginUserDto): Promise<{
        user: {
            email: string;
            name: string;
            id: number;
            trustLevel: import(".prisma/client").$Enums.TrustLevel;
        };
        accessToken: string;
    }>;
}
