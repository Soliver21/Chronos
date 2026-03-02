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
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiBadRequestResponse,
} from "@nestjs/swagger";

// Sanitises the original filename by replacing spaces and removing non-alphanumeric characters, then prepends a timestamp to ensure uniqueness.
function safeFilename(originalName: string) {
  const name = originalName
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9._-]/g, "");
  return `${Date.now()}-${name}`;
}

//Builds a full absolute URL from the incoming request's protocol and host combined with a relative path.
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

  // Uploads an image file as the authenticated user's avatar and updates the user record with the new avatar path.
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
          description: "Avatar kép (max 3MB, csak image/*)",
        },
      },
      required: ["file"],
    },
  })
  @ApiCreatedResponse({ description: "Avatar sikeresen feltöltve és felhasználó frissítve" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  @ApiBadRequestResponse({ description: "Nincs fájl mellékelve, vagy a fájl nem képformátum (max 3MB)" })
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

  //Uploads a generic image file (e.g. for a listing) and returns its relative and absolute URLs.
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor("file", imageUploadOptions))
  @ApiOperation({ summary: "Kép feltöltése (pl. hirdetés képe)" })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
          description: "Kép fájl (max 3MB, csak image/*)",
        },
      },
      required: ["file"],
    },
  })
  @ApiCreatedResponse({ description: "Fájl sikeresen feltöltve, visszaadja a relatív és abszolút URL-t" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  @ApiBadRequestResponse({ description: "Nincs fájl mellékelve, vagy a fájl nem képformátum (max 3MB)" })
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
