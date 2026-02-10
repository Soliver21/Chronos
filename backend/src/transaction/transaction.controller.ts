import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
  Req,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiCreatedResponse,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { TransactionService } from "./transaction.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";

@ApiTags("Transactions")
@ApiBearerAuth()
@Controller("transactions")
@UseGuards(JwtAuthGuard)
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * Get all transactions for the authenticated user
   */
  @Get()
  @ApiOperation({ summary: "Felhasználó tranzakcióinak lekérése" })
  @ApiOkResponse({
    description: "A bejelentkezett felhasználó tranzakcióinak listája",
  })
  getUserTransactions(@Req() req: { user: { id: number } }) {
    return this.transactionService.getUserTransactions(req.user.id);
  }

  /**
   * Get a specific transaction by ID
   */
  @Get(":id")
  @ApiOperation({ summary: "Tranzakció lekérése azonosító alapján" })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Tranzakció azonosító",
  })
  @ApiOkResponse({
    description: "A kért tranzakció adatai",
  })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.transactionService.findById(id);
  }

  /**
   * Create a new transaction
   */
  @Post()
  @ApiOperation({ summary: "Új tranzakció létrehozása" })
  @ApiBody({ type: CreateTransactionDto })
  @ApiCreatedResponse({
    description: "Sikeresen létrehozott tranzakció",
  })
  create(
    @Req() req: { user: { id: number } },
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionService.createTransaction(req.user.id, dto);
  }

  /**
   * Client confirms work is done and completes transaction
   */
  @Post(":id/complete")
  @ApiOperation({
    summary: "Tranzakció teljesítése (munka kész, pénz felszabadítása)",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Tranzakció azonosító",
  })
  @ApiOkResponse({
    description: "A tranzakció sikeresen lezárva",
  })
  completeTransaction(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionService.completeTransaction(id, req.user.id);
  }

  /**
   * Cancel a transaction
   */
  @Post(":id/cancel")
  @ApiOperation({
    summary: "Tranzakció megszakítása (ügyfél vagy szolgáltató)",
  })
  @ApiParam({
    name: "id",
    type: Number,
    description: "Tranzakció azonosító",
  })
  @ApiOkResponse({
    description: "A tranzakció sikeresen megszakítva",
  })
  cancelTransaction(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionService.cancelTransaction(id, req.user.id);
  }
}
