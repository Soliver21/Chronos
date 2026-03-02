import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { PrismaService } from "../prisma/prisma.service";

export interface JwtPayload {
    sub: number;
    email: string;
    name: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
    constructor(private readonly prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || "my-secret",
        });
    }

    /** Validates the JWT payload by looking up the user in the database and checking they are active. Returns the user object attached to req.user. */
    async validate(payload: JwtPayload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: {
                id: true,
                email: true,
                name: true,
                trustLevel: true,
                role: true,
                isActive: true,
            },
        });

        if (!user) {
            throw new UnauthorizedException("User not found");
        }

        if (!user.isActive) {
            throw new UnauthorizedException("Your account has been suspended");
        }

        return {
            id: user.id,
            email: user.email,
            name: user.name,
            trustLevel: user.trustLevel,
            role: user.role,
        };
    }
}
