import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { diskStorage } from 'multer';
import { type Request } from 'express';

function safeFilename(originalName: string) {
  const name = originalName
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '');
  return `${Date.now()}-${name}`;
}

function toAbsoluteUrl(req: Request, path: string) {
  return `${req.protocol}://${req.get('host')}${path}`;
}

const imageUploadOptions = {
  storage: diskStorage({
    destination: 'uploads',
    filename: (req: unknown, file: Express.Multer.File, cb: (e: Error | null, name: string) => void) =>
      cb(null, safeFilename(file.originalname)),
  }),
  limits: { fileSize: 3 * 1024 * 1024 },
  fileFilter: (
    req: unknown,
    file: Express.Multer.File,
    cb: (e: Error | null, accept: boolean) => void,
  ) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new BadRequestException('Only image files are allowed') as any, false);
    }
    cb(null, true);
  },
};

@Controller('upload')
export class UploadController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file', imageUploadOptions))
  async uploadAvatar(
    @Req() req: Request,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file provided');
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
  @UseInterceptors(FileInterceptor('file', imageUploadOptions))
  uploadFile(
    @Req() req: Request,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file provided');
    const imagePath = `/uploads/${file.filename}`;
    return {
      url: imagePath,
      absoluteUrl: toAbsoluteUrl(req, imagePath),
    };
  }
}
