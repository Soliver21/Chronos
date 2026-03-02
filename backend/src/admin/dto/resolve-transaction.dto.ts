import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum ResolveAction {
  COMPLETE = 'complete',
  CANCEL = 'cancel',
}

export class ResolveTransactionDto {
  @ApiProperty({ enum: ResolveAction, example: ResolveAction.CANCEL, description: 'Action to force on the transaction: complete or cancel' })
  @IsEnum(ResolveAction)
  action: ResolveAction;
}
