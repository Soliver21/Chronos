import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto} from './dto/register.dto';
import { LoginUserDto } from './dto/login.dto';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('register')
    async register(@Body() registerDto: RegisterUserDto) {
        return await this.authService.authRegister(registerDto);
    }

    @Public()
    @Post('login')
    async login(@Body() loginDto: LoginUserDto) {
        return await this.authService.authLogin(loginDto);
    }
}