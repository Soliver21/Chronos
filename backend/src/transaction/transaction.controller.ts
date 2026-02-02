import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * Get all transactions for the authenticated user
   */
  @Get()
  getUserTransactions(@Req() req: { user: { id: number } }) {
    return this.transactionService.getUserTransactions(req.user.id);
  }

  /**
   * Get a specific transaction by ID
   */
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.transactionService.findById(id);
  }

  /**
   * Create a new transaction
   */
  @Post()
  create(
    @Req() req: { user: { id: number } },
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionService.createTransaction(req.user.id, dto);
  }

  /**
   * Client confirms work is done and completes transaction (releases funds to provider)
   */
  @Post(':id/complete')
  completeTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionService.completeTransaction(id, req.user.id);
  }

  /**
   * Cancel a transaction (client or provider can cancel)
   */
  @Post(':id/cancel')
  cancelTransaction(
    @Param('id', ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionService.cancelTransaction(id, req.user.id);
  }
}