import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterUserDto} from "./dto/register.dto";
import { LoginUserDto } from "./dto/login.dto";
import { Public } from "./public.decorator";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiBody,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // Registers a new user and returns the created user object with a JWT access token.
    @Public()
    @ApiOperation({ summary: "Felhasználó regisztrálása" })
    @ApiBody({ type: RegisterUserDto })
    @ApiCreatedResponse({ description: "Sikeres regisztráció – visszaadja a felhasználó adatait és az access tokent" })
    @ApiBadRequestResponse({ description: "Érvénytelen bemeneti adatok (validációs hiba)" })
    @ApiConflictResponse({ description: "Az email cím már foglalt" })
    @Post("register")
    async register(@Body() registerDto: RegisterUserDto) {
        return await this.authService.authRegister(registerDto);
    }

    // Authenticates a user with email and password, and returns a JWT access token on success.
    @Public()
    @ApiOperation({ summary: "Felhasználó bejelentkeztetése" })
    @ApiBody({ type: LoginUserDto })
    @ApiOkResponse({ description: "Sikeres bejelentkezés – visszaadja a felhasználó adatait és az access tokent" })
    @ApiBadRequestResponse({ description: "Érvénytelen bemeneti adatok (validációs hiba)" })
    @ApiUnauthorizedResponse({ description: "Hibás email cím vagy jelszó" })
    @Post("login")
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginUserDto) {
        return await this.authService.authLogin(loginDto);
    }
}
