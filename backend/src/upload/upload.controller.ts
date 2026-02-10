import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
  Req,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserService } from "../user/user.service";
import { diskStorage } from "multer";
import { type Request } from "express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";

function safeFilename(originalName: string) {
  const name = originalName
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
  return `${Date.now()}-${name}`;
}

function toAbsoluteUrl(req: Request, path: string) {
  return `${req.protocol}://${req.get("host")}${path}`;
}

const imageUploadOptions = {
  storage: diskStorage({
    destination: "uploads",
    filename: (req: unknown, file: Express.Multer.File, cb: (e: Error | null, name: string) => void) =>
      cb(null, safeFilename(file.originalname)),
  }),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (
    req: unknown,
    file: Express.Multer.File,
    cb: (e: Error | null, accept: boolean) => void,
  ) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new BadRequestException("Only image files are allowed") as any, false);
    }
    cb(null, true);
  },
};

@ApiTags("upload")
@ApiBearerAuth()
@Controller("upload")
export class UploadController {
  constructor(private readonly userService: UserService) {}

@Post("avatar")
@UseGuards(JwtAuthGuard)
@UseInterceptors(FileInterceptor("file", imageUploadOptions))
@ApiOperation({ summary: "Felhasználói avatar feltöltése" })
@ApiConsumes("multipart/form-data")
@ApiBody({
  schema: {
    type: "object",
    properties: {
      file: {
        type: "string",
        format: "binary",
        description: "Avatar kép (max 3MB, csak image)",
      },
    },
    required: ["file"],
  },
})
@ApiOkResponse({
  description: "Avatar sikeresen feltöltve és felhasználó frissítve",
})
async uploadAvatar(
  @Req() req: Request,
  @UploadedFile() file?: Express.Multer.File,
) {
  if (!file) throw new BadRequestException("No file provided");
    const imagePath = `/uploads/${file.filename}`;
    const user = await this.userService.updateUser((req as any).user.id, {
      avatar: imagePath,
    });
    return {
      url: imagePath,
      absoluteUrl: toAbsoluteUrl(req, imagePath),
      user,
    };
}


  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("file", imageUploadOptions))
  @ApiOperation({ summary: "Kép feltöltése" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
          description: "Kép fájl (max 3MB, csak image)",
        },
      },
      required: ["file"],
    },
  })
  @ApiOkResponse({
    description: "Fájl sikeresen feltöltve",
  })
  uploadFile(
    @Req() req: Request,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException("No file provided");

    const imagePath = `/uploads/${file.filename}`;
    return {
      url: imagePath,
      absoluteUrl: toAbsoluteUrl(req, imagePath),
    };
  }
}