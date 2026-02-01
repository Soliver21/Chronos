/* import { Controller, ParseIntPipe, UseGuards, Get, Patch, Param, Body, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UpdateUserDTO } from "./dto/update-user.dto";

@Controller("/api/users")
export class UserController {
    constructor(private readonly service: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get("me")
    async getMyProfile(@Req() req: any) {
        return await this.service.findById(req.user.id);
    }

    @Get(":id")
    async getUserProfileById(@Param("id", ParseIntPipe) id: number){
        return await this.service.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("me")
    async patchMember(@Req() req: any, @Body() member: UpdateUserDTO) {
        return await this.service.updateUser(req.user.id, member);
    }

    @Get(":id/stats")
    async getUserStatistics(@Param("id", ParseIntPipe) id: number) {
        return await this.service.getUserStatistics(id);
    }

} */