import { OnModuleInit, OnModuleDestroy, INestApplication } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor();
    enableShutdownHooks(app: INestApplication): Promise<void>;
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
