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
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiForbiddenResponse,
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

  // Returns all transactions where the authenticated user is either the client or the provider.
  @Get()
  @ApiOperation({ summary: "Felhasználó tranzakcióinak lekérése" })
  @ApiOkResponse({ description: "A bejelentkezett felhasználó tranzakcióinak listája" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  getUserTransactions(@Req() req: { user: { id: number } }) {
    return this.transactionService.getUserTransactions(req.user.id);
  }

  // Returns a single transaction by its ID, including client, provider and listing details.
  @Get(":id")
  @ApiOperation({ summary: "Tranzakció lekérése azonosító alapján" })
  @ApiParam({ name: "id", type: Number, description: "Tranzakció azonosító" })
  @ApiOkResponse({ description: "A kért tranzakció adatai" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  @ApiNotFoundResponse({ description: "A tranzakció nem található" })
  getById(@Param("id", ParseIntPipe) id: number) {
    return this.transactionService.findById(id);
  }

  // Creates a new PENDING transaction; deducts the total price from the client's balance.
  @Post()
  @ApiOperation({ summary: "Új tranzakció létrehozása" })
  @ApiBody({ type: CreateTransactionDto })
  @ApiCreatedResponse({ description: "Sikeresen létrehozott tranzakció" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  @ApiNotFoundResponse({ description: "A hirdetés vagy az ügyfél nem található" })
  @ApiBadRequestResponse({ description: "Érvénytelen listing ID, saját hirdetés, vagy nincs elegendő kredit" })
  create(
    @Req() req: { user: { id: number } },
    @Body() dto: CreateTransactionDto,
  ) {
    return this.transactionService.createTransaction(req.user.id, dto);
  }

  // Marks a PENDING transaction as COMPLETED and releases the held funds to the provider's balance.
  @Post(":id/complete")
  @ApiOperation({ summary: "Tranzakció teljesítése (munka kész, pénz felszabadítása)" })
  @ApiParam({ name: "id", type: Number, description: "Tranzakció azonosító" })
  @ApiOkResponse({ description: "A tranzakció sikeresen lezárva" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  @ApiNotFoundResponse({ description: "A tranzakció nem található" })
  @ApiForbiddenResponse({ description: "Csak az ügyfél zárhatja le a tranzakciót" })
  @ApiBadRequestResponse({ description: "A tranzakció nem PENDING állapotban van" })
  completeTransaction(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionService.completeTransaction(id, req.user.id);
  }

  // Cancels a PENDING transaction and refunds the total price back to the client's balance.
  @Post(":id/cancel")
  @ApiOperation({ summary: "Tranzakció megszakítása (ügyfél vagy szolgáltató)" })
  @ApiParam({ name: "id", type: Number, description: "Tranzakció azonosító" })
  @ApiOkResponse({ description: "A tranzakció sikeresen megszakítva" })
  @ApiUnauthorizedResponse({ description: "Hiányzó vagy érvénytelen JWT token" })
  @ApiNotFoundResponse({ description: "A tranzakció nem található" })
  @ApiForbiddenResponse({ description: "Csak az ügyfél vagy a szolgáltató szakíthatja meg a tranzakciót" })
  @ApiBadRequestResponse({ description: "Csak PENDING állapotú tranzakció szakítható meg" })
  cancelTransaction(
    @Param("id", ParseIntPipe) id: number,
    @Req() req: { user: { id: number } },
  ) {
    return this.transactionService.cancelTransaction(id, req.user.id);
  }
}
