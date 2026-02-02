# Transaction Module Documentation

## Overview
The Transaction module handles the complete lifecycle of transactions in the Chronos application. When a client creates a transaction, credits are frozen. When the client confirms the work is completed, credits are automatically transferred to the provider.

## Visual Flow Diagram

### Successful Transaction Flow
```
┌─────────┐                                    ┌──────────┐
│ CLIENT  │                                    │ PROVIDER │
│ (Alice) │                                    │  (Bob)   │
└────┬────┘                                    └────┬─────┘
     │                                              │
     │ 1. POST /transactions                        │
     │    { listingId: "5", agreedHours: 2 }       │
     ├──────────────────────────────────────────────┤
     │                                              │
     │ ✅ Alice's balance: 100 → 50 (deducted)     │
     │ 📝 Transaction created (PENDING)             │
     │ 💰 Total: $50                                │
     │                                              │
     │          Bob completes the work...           │
     │                                              │
     │ 2. POST /transactions/1/complete             │
     ├──────────────────────────────────────────────┤
     │                                              │
     │                                 ✅ Bob's balance: 20 → 70
     │                                 📝 Status: COMPLETED
     │                                 ⭐ Trust level updated
     │                                              │
```

### Cancelled Transaction Flow
```
┌─────────┐                                    ┌──────────┐
│ CLIENT  │                                    │ PROVIDER │
│ (Alice) │                                    │  (Bob)   │
└────┬────┘                                    └────┬─────┘
     │                                              │
     │ 1. POST /transactions                        │
     ├──────────────────────────────────────────────┤
     │ ✅ Alice's balance: 100 → 50 (deducted)     │
     │                                              │
     │ 2. POST /transactions/1/cancel               │
     ├──────────────────────────────────────────────┤
     │                                              │
     │ ✅ Alice's balance: 50 → 100 (refunded)     │
     │ 📝 Status: CANCELLED                         │
     │                                              │
     │                           Bob receives nothing
```

## Architecture

### Files Structure
```
src/transaction/
├── dto/
│   └── create-transaction.dto.ts
├── transaction.controller.ts
├── transaction.service.ts
└── transaction.module.ts
```

## DTOs (Data Transfer Objects)

### CreateTransactionDto
```typescript
{
  listingId: string;      // The listing ID (will be parsed to number)
  agreedHours: number;    // Hours agreed for the service (min: 0.5)
}
```

## Database Transactions (tx)

### What is `tx`?

`tx` stands for **database transaction context** provided by Prisma. It ensures **atomicity** - meaning all database operations either ALL succeed or ALL fail together.

### Why use `tx`?

**Without database transactions (UNSAFE):**
```typescript
// Step 1: Deduct credits from client
await this.prisma.user.update({ 
  where: { id: clientId },
  data: { balance: { decrement: 100 } }
});

// ❌ PROBLEM: What if the app crashes HERE?
// Client lost 100 credits but transaction wasn't created!

// Step 2: Create transaction
await this.prisma.transaction.create({ ... });
```

**With database transactions (SAFE):**
```typescript
return this.prisma.$transaction(async (tx) => {
  // Step 1: Deduct credits from client
  await tx.user.update({ 
    where: { id: clientId },
    data: { balance: { decrement: 100 } }
  });
  
  // Step 2: Create transaction
  await tx.transaction.create({ ... });
  
  // ✅ If ANYTHING fails, EVERYTHING rolls back
  // Either both operations succeed, or neither does
});
```

### Real-World Example

Imagine a user creates a transaction:
1. Their balance should decrease by 100 credits
2. A transaction record should be created

**What could go wrong without `tx`:**
- ❌ Balance updated, but transaction creation fails → User lost credits for nothing
- ❌ Network error between operations → Inconsistent database state
- ❌ Server crashes mid-operation → Money disappeared

**With `tx`, you're protected:**
- ✅ If transaction creation fails → Balance update is rolled back
- ✅ If any error occurs → Everything reverts to original state
- ✅ Database remains consistent → No lost money, no orphaned records

### When we use `tx` in this module:

1. **createTransaction**: Deduct from client + Create transaction record
2. **completeTransaction**: Credit provider + Update transaction status + Update trust level
3. **cancelTransaction**: Refund client + Update transaction status

All these operations must happen together or not at all.

## API Endpoints

All endpoints require JWT authentication (`@UseGuards(JwtAuthGuard)`).

### 1. Get User Transactions
**GET** `/api/transactions`

Returns all transactions where the authenticated user is either the client (buyer) or provider (seller).

#### Why you need this endpoint:

Users need to see their transaction history from **both perspectives**:

**As a CLIENT (buyer):**
- "What services did I purchase?"
- "How much did I spend?"
- "Which transactions are still pending?"
- "Can I complete this transaction?"

**As a PROVIDER (seller):**
- "Who hired me?"
- "How much did I earn?"
- "Which jobs are completed?"
- "Which transactions are waiting?"

#### Example Usage in Frontend:

```typescript
// Fetch transactions
const response = await fetch('/api/transactions', {
  headers: { 'Authorization': `Bearer ${token}` }
});
const transactions = await response.json();

// Display differently based on user's role
transactions.forEach(tx => {
  if (tx.clientId === currentUserId) {
    // User is the CLIENT (buyer)
    console.log(`You hired ${tx.provider.name}`);
    console.log(`Service: ${tx.listing.title}`);
    console.log(`Paid: ${tx.totalPrice} credits`);
    
    if (tx.status === 'PENDING') {
      // Show "Complete Transaction" button
    }
  } else {
    // User is the PROVIDER (seller)
    console.log(`${tx.client.name} hired you`);
    console.log(`Service: ${tx.listing.title}`);
    console.log(`Earning: ${tx.totalPrice} credits`);
    
    if (tx.status === 'PENDING') {
      // Show "Waiting for client to complete"
    }
  }
});
```

#### Example UI Display:

**Buyer's Dashboard:**
```
My Purchases:
┌────────────────────────────────────────┐
│ ✅ Web Design by Jane Smith            │
│    $50 • Completed • Jan 15, 2024      │
├────────────────────────────────────────┤
│ ⏳ Logo Design by Bob Johnson          │
│    $30 • Pending • Jan 20, 2024        │
│    [Complete Transaction] [Cancel]     │
└────────────────────────────────────────┘
```

**Seller's Dashboard:**
```
My Jobs:
┌────────────────────────────────────────┐
│ ✅ Website for John Doe                │
│    $50 • Completed • Jan 15, 2024      │
├────────────────────────────────────────┤
│ ⏳ Logo for Mary Williams              │
│    $30 • Pending • Jan 20, 2024        │
│    Waiting for client confirmation...  │
└────────────────────────────────────────┘
```

**Response:**
```json
[
  {
    "id": 1,
    "clientId": 2,
    "providerId": 3,
    "listingId": 5,
    "agreedHours": 2,
    "totalPrice": 10,
    "status": "PENDING",
    "createdAt": "2024-01-01T10:00:00.000Z",
    "updatedAt": "2024-01-01T10:00:00.000Z",
    "client": { "id": 2, "name": "John Doe", "avatar": "..." },
    "provider": { "id": 3, "name": "Jane Smith", "avatar": "..." },
    "listing": { "id": 5, "title": "Web Development", ... }
  }
]
```

### 2. Get Transaction by ID
**GET** `/api/transactions/:id`

Returns detailed information about a specific transaction.

**Response:** Same as single transaction object above.

### 3. Create Transaction
**POST** `/api/transactions`

Creates a new transaction and freezes the client's credits.

**Request Body:**
```json
{
  "listingId": "5",
  "agreedHours": 2
}
```

**Process:**
1. Validates listing exists
2. Calculates total price (pricePerHour × agreedHours)
3. Verifies client has sufficient balance
4. Deducts credits from client's balance
5. Creates transaction with `PENDING` status

**Response:** Created transaction object with full relations.

### 4. Complete Transaction (Client)
**POST** `/api/transactions/:id/complete`

Client confirms the work is completed and automatically releases funds to provider.

**Process:**
1. Verifies user is the client
2. Checks transaction is `PENDING`
3. Increments provider's balance by totalPrice
4. Updates status to `COMPLETED`
5. Updates provider's trust level if threshold reached

**Response:** Completed transaction object.

### 5. Cancel Transaction
**POST** `/api/transactions/:id/cancel`

Cancels a transaction and returns frozen credits to client.

**Process:**
1. Verifies user is client or provider
2. Checks transaction is `PENDING`
3. Returns credits to client (increments balance by totalPrice)
4. Updates status to `CANCELLED`

**Response:** Cancelled transaction object.

## Transaction Status Flow

```
PENDING
    ↓ (client confirms work is done)
COMPLETED

OR

PENDING
    ↓ (client/provider cancels)
CANCELLED
```

## Trust Level System

Trust levels are automatically updated based on completed transactions count:

| Completed Transactions | Trust Level  |
|------------------------|--------------|
| 0-4                    | NEWCOMER     |
| 5-19                   | TRUSTED      |
| 20+                    | VETERAN      |

The trust level is updated automatically when a provider completes a transaction.

## Credit System

### Balance
- **balance**: User's available credits (Integer)

### Transaction Flow
1. **Create Transaction**: Client's balance is decremented by totalPrice
2. **Complete Transaction**: Provider's balance is incremented by totalPrice
3. **Cancel Transaction**: Client's balance is incremented back by totalPrice

## Security Features

1. **Authorization Checks**
   - Only client can complete transactions
   - Both parties can cancel pending/in-progress transactions

2. **Validation**
   - Sufficient balance verification
   - Status checks for state transitions
   - Self-transaction prevention

3. **Atomic Operations**
   - All credit transfers use Prisma transactions
   - Ensures data consistency

## Error Handling

The service throws appropriate exceptions:

- `NotFoundException`: Transaction or listing not found
- `ForbiddenException`: User not authorized for action
- `BadRequestException`: Invalid state, insufficient credits, or validation errors

## Helper Functions

### calculateTrustLevel(completedTxCount: number): TrustLevel
Determines trust level based on completed transaction count:
- 0-4 transactions: NEWCOMER
- 5-19 transactions: TRUSTED
- 20+ transactions: VETERAN

### updateTrustLevel(userId: number): Promise<void>
Counts completed transactions where user is provider and updates trust level if threshold crossed.

## Integration

To use the Transaction module in your application:

1. Import `TransactionModule` in `app.module.ts`
2. Ensure PrismaModule is available
3. Ensure JWT authentication is configured

## Example Usage (Frontend)

```typescript
// Create transaction
const response = await fetch('/api/transactions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    listingId: '5',
    agreedHours: 2
  })
});

// Client confirms work is done and completes transaction
await fetch(`/api/transactions/${txId}/complete`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Cancel transaction if needed
await fetch(`/api/transactions/${txId}/cancel`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

## Database Requirements

Your Prisma schema should include:

```prisma
enum TrustLevel {
  NEWCOMER
  TRUSTED
  VETERAN
}

enum TransactionStatus {
  PENDING
  COMPLETED
  CANCELLED
}

model User {
  id         Int        @id @default(autoincrement())
  name       String
  email      String     @unique
  password   String
  bio        String?
  avatar     String?
  balance    Int        @default(0)
  trustLevel TrustLevel @default(NEWCOMER)

  listings              Listing[]
  clientTransactions    Transaction[] @relation("Client")
  providerTransactions  Transaction[] @relation("Provider")
  reviews               Review[]
}

model Transaction {
  id Int @id @default(autoincrement())

  clientId   Int
  providerId Int
  listingId  Int

  agreedHours Float
  totalPrice  Float

  status      TransactionStatus @default(PENDING)
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
  completedAt DateTime?
  cancelledAt DateTime?

  client   User    @relation("Client", fields: [clientId], references: [id], onDelete: Cascade)
  provider User    @relation("Provider", fields: [providerId], references: [id], onDelete: Cascade)
  listing  Listing @relation(fields: [listingId], references: [id], onDelete: Cascade)

  review Review?
}
```

## Testing

Key test scenarios:
1. Create transaction with sufficient/insufficient credits
2. Complete transaction by authorized/unauthorized user
3. Cancel transaction in various states
4. Trust level update after multiple completions
5. Concurrent transaction handling
6. Self-transaction prevention

## Practical Examples

### Example 1: Complete Transaction Flow

```typescript
// User Alice (ID: 1) wants to hire Bob (ID: 2) for web design
// Bob's listing ID is 5, costs $25/hour

// 1. Alice creates a transaction
POST /api/transactions
{
  "listingId": "5",
  "agreedHours": 2  // Total: $50
}

// What happens in the database:
// - Alice's balance: 100 → 50 (deducted immediately)
// - Transaction created with status: PENDING
// - totalPrice: 50

// 2. Bob completes the work, Alice confirms
POST /api/transactions/1/complete

// What happens in the database:
// - Bob's balance: 20 → 70 (credited)
// - Transaction status: PENDING → COMPLETED
// - Bob's completed transactions count: +1
// - Bob's trust level might update (if threshold reached)
```

### Example 2: Cancelled Transaction

```typescript
// Same setup, but Alice cancels before completion

// 1. Alice creates transaction
POST /api/transactions
{
  "listingId": "5",
  "agreedHours": 2
}
// Alice's balance: 100 → 50

// 2. Alice changes her mind and cancels
POST /api/transactions/1/cancel

// What happens in the database:
// - Alice's balance: 50 → 100 (refunded)
// - Transaction status: PENDING → CANCELLED
// - Bob receives nothing
```

### Example 3: Trust Level Progression

```typescript
// Bob starts as NEWCOMER
// Completes his first transaction
// Status: NEWCOMER (0-4 completed)

// Bob completes 5 transactions
// Status: TRUSTED (5-19 completed) ⬆️

// Bob completes 20 transactions
// Status: VETERAN (20+ completed) ⬆️
```

### Example 4: Frontend Integration

```typescript
// Complete transaction page component
const TransactionDetail = ({ transactionId }) => {
  const [transaction, setTransaction] = useState(null);
  const currentUserId = getUserId(); // From auth context
  
  useEffect(() => {
    fetch(`/api/transactions/${transactionId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setTransaction(data));
  }, [transactionId]);
  
  const handleComplete = async () => {
    await fetch(`/api/transactions/${transactionId}/complete`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // Refresh transaction data
  };
  
  const handleCancel = async () => {
    await fetch(`/api/transactions/${transactionId}/cancel`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    // Redirect to transactions list
  };
  
  if (!transaction) return <div>Loading...</div>;
  
  const isClient = transaction.clientId === currentUserId;
  const isProvider = transaction.providerId === currentUserId;
  const isPending = transaction.status === 'PENDING';
  
  return (
    <div>
      <h2>{transaction.listing.title}</h2>
      <p>Hours: {transaction.agreedHours}</p>
      <p>Total: ${transaction.totalPrice}</p>
      <p>Status: {transaction.status}</p>
      
      {isClient && (
        <div>
          <p>Provider: {transaction.provider.name}</p>
          {isPending && (
            <>
              <button onClick={handleComplete}>
                Complete & Release Payment
              </button>
              <button onClick={handleCancel}>Cancel</button>
            </>
          )}
        </div>
      )}
      
      {isProvider && (
        <div>
          <p>Client: {transaction.client.name}</p>
          {isPending && (
            <p>Waiting for client to confirm completion...</p>
          )}
        </div>
      )}
    </div>
  );
};
```

## Notes

- All monetary values use Float type for simplicity
- Balance is stored as Integer (cents/points)
- Transaction creation prevents users from transacting with their own listings
- When the client completes a transaction, credits are automatically transferred to the provider
- The module exports TransactionService for potential use in other modules
- Trust levels are calculated dynamically based on completed transaction count

## Common Pitfalls & Best Practices

### ❌ Common Mistakes

**1. Forgetting to use database transactions:**
```typescript
// BAD - Not atomic
async createTransaction() {
  await this.prisma.user.update({ ... });  // What if this succeeds
  await this.prisma.transaction.create({ ... });  // But this fails?
}
```

**2. Not checking user authorization:**
```typescript
// BAD - Anyone can complete any transaction
async completeTransaction(txId: number) {
  await this.prisma.transaction.update({ 
    where: { id: txId },
    data: { status: 'COMPLETED' }
  });
}
```

**3. Not validating transaction status:**
```typescript
// BAD - Can complete an already completed transaction
async completeTransaction(txId: number) {
  // Missing status check
  await this.prisma.transaction.update({ ... });
}
```

### ✅ Best Practices

**1. Always use database transactions for multi-step operations:**
```typescript
// GOOD
return this.prisma.$transaction(async (tx) => {
  await tx.user.update({ ... });
  await tx.transaction.create({ ... });
});
```

**2. Always verify user permissions:**
```typescript
// GOOD
if (transaction.clientId !== userId) {
  throw new ForbiddenException('Only the client can complete');
}
```

**3. Always validate state before transitions:**
```typescript
// GOOD
if (transaction.status !== TransactionStatus.PENDING) {
  throw new BadRequestException('Must be pending to complete');
}
```

**4. Handle edge cases:**
```typescript
// GOOD - Check sufficient balance before deducting
if (client.balance < totalPrice) {
  throw new BadRequestException('Insufficient credits');
}

// GOOD - Prevent self-transactions
if (listing.userId === clientId) {
  throw new BadRequestException('Cannot transact with own listing');
}
```

**5. Use proper error messages:**
```typescript
// GOOD - Descriptive errors
throw new BadRequestException(
  `Insufficient credits. Required: ${totalPrice}, Available: ${balance}`
);

// BAD - Vague errors
throw new BadRequestException('Error');
```

### 🔒 Security Considerations

1. **JWT Authentication**: All endpoints require valid JWT token
2. **User Isolation**: Users can only access their own transactions
3. **Role-Based Actions**: 
   - Only clients can complete transactions
   - Both parties can cancel pending transactions
4. **Atomic Operations**: Credits can never be lost or duplicated
5. **Status Validation**: Prevents invalid state transitions

### 📊 Performance Tips

1. **Use includes wisely**: Only include relations you need
2. **Index foreign keys**: Ensure clientId, providerId, listingId are indexed
3. **Batch queries**: For listing multiple transactions, use single query with OR
4. **Cache trust levels**: Only recalculate when transactions complete

### 🧪 Testing Checklist

- [ ] Create transaction with sufficient balance
- [ ] Create transaction with insufficient balance
- [ ] Create transaction with own listing (should fail)
- [ ] Complete transaction as client (should succeed)
- [ ] Complete transaction as provider (should fail)
- [ ] Complete already completed transaction (should fail)
- [ ] Cancel pending transaction (should succeed)
- [ ] Cancel completed transaction (should fail)
- [ ] Verify trust level updates after 5, 20 completions
- [ ] Test concurrent transactions don't cause race conditions
- [ ] Verify credits are never lost during failures