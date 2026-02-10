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
            },
        });

        const payload = {
            sub: newUser.id,
            email: newUser.email,
            name: newUser.name,
        };

        return {
            user: newUser,
            accessToken: this.jwtService.sign(payload),
        };
    }

    async authLogin(user: LoginUserDto) {
        const loginUser = await this.prisma.user.findUnique({
            where: { email: user.email },
            select: {
                id: true,
                email: true,
                name: true,
                password: true,
                trustLevel: true,
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
        };

        return {
            user: userWithoutPassword,
            accessToken: this.jwtService.sign(payload),
        };
    }
}