import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto} from "./dto/register.dto";
import { LoginUserDto } from "./dto/login.dto";
import { Public } from "./public.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiBody,
} from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @ApiOperation({summary:"Felhasználó regisztrálása"})
    @ApiBody({type: RegisterUserDto})
    @ApiCreatedResponse({description:"Sikeres regisztráció"})
    @Post("register")
    async register(@Body() registerDto: RegisterUserDto) {
        return await this.authService.authRegister(registerDto);
    }

    @Public()
    @ApiOperation({summary:"Felhasználó bejelentkeztetése"})
    @ApiBody({type: LoginUserDto})
    @ApiCreatedResponse({description:"Sikeres bejelentkezés"})
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginUserDto) {
        return await this.authService.authLogin(loginDto);
    }
}