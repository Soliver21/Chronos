"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const argon2 = require("argon2");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async authRegister(user) {
        const exists = await this.prisma.user.findUnique({
            where: { email: user.email },
            select: { id: true },
        });
        if (exists) {
            throw new common_1.ConflictException('Email already in use');
        }
        const hashedPasswd = await argon2.hash(user.password);
        const newUser = await this.prisma.user.create({
            data: {
                email: user.email,
                name: user.name,
                password: hashedPasswd,
                trustLevel: 'NEWCOMER',
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
    async authLogin(user) {
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
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const passwordValid = await argon2.verify(loginUser.password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid email or password');
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
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map