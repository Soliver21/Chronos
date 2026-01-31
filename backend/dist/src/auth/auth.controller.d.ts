import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterUserDto): Promise<{
        user: {
            name: string;
            email: string;
            trustLevel: import(".prisma/client").$Enums.TrustLevel;
            id: number;
        };
        accessToken: string;
    }>;
    login(loginDto: LoginUserDto): Promise<{
        user: {
            name: string;
            email: string;
            trustLevel: import(".prisma/client").$Enums.TrustLevel;
            id: number;
        };
        accessToken: string;
    }>;
}
