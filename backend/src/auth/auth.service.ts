import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as argon2 from "argon2";
import { JwtService } from "@nestjs/jwt";
import { RegisterUserDto } from "./dto/register.dto";
import { LoginUserDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly prisma: PrismaService,
    ) {}

    // Regisztrál egy új felhasználót: ellenőrzi az email egyediségét, hash-eli a jelszót, majd JWT tokent ad vissza.
    async authRegister(user: RegisterUserDto) {
        const exists = await this.prisma.user.findUnique({
            where: { email: user.email },
            select: { id: true },
        });

        if (exists) {
            throw new ConflictException("Email already in use");
        }

        const hashedPasswd = await argon2.hash(user.password);


        const newUser = await this.prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashedPasswd,
                trustLevel: "NEWCOMER",
            },
            select: {
                id: true,
                email: true,
                name: true,
                trustLevel: true,
                role: true,
            },
        });

        const payload = {
            sub: newUser.id,
            email: newUser.email,
            name: newUser.name,
            role: newUser.role,
        };

        return {
            user: newUser,
            token: this.jwtService.sign(payload),
        };
    }

    // Bejelentkeztet egy meglévő felhasználót: ellenőrzi az email/jelszó párost, majd JWT tokent ad vissza.
    async authLogin(user: LoginUserDto) {
        const loginUser = await this.prisma.user.findUnique({
            where: { email: user.email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                trustLevel: true,
                role: true,
            },
        });

        if (!loginUser) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const passwordValid = await argon2.verify(loginUser.password, user.password);

        if (!passwordValid) {
            throw new UnauthorizedException("Invalid email or password");
        }

        const { password, ...userWithoutPassword } = loginUser;

        const payload = {
            sub: userWithoutPassword.id,
            email: userWithoutPassword.email,
            name: userWithoutPassword.name,
            role: userWithoutPassword.role,
        };

        return {
            user: userWithoutPassword,
            token: this.jwtService.sign(payload),
        };
    }
}