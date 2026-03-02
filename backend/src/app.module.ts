import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { RolesGuard } from './auth/roles.guard';
import { UserModule } from './user/user.module';
import { UploadModule } from './upload/upload.module';
import { ListingModule } from './listing/listing.module';
import { CategoryModule } from './category/category.module';
import { TransactionModule } from './transaction/transaction.module';
import { ReviewModule } from './review/review.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    UploadModule,
    ListingModule,
    CategoryModule,
    TransactionModule,
    ReviewModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // JwtAuthGuard runs first: authenticates the request and populates req.user
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // RolesGuard runs second: checks @Roles() decorator against req.user.role
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
