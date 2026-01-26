# Chronos Projekt - Optimális 3 Fős Feladatelosztás
## 1 Backend + 2 Frontend Fejlesztő

---

## 👥 CSAPAT SZEREPKÖRÖK ÉS FELELŐSSÉGEK

### **👨‍💻 FEJLESZTŐ #1 - "Backend Fullstack"**
**Fő felelősség:** TELJES Backend egyedül
- Auth, User, Listing, Transaction, Review modulok
- Prisma setup és adatbázis
- Összes API végpont
- Seed adatok
- API dokumentáció

**Tapasztalat:** NestJS, Prisma, TypeScript, PostgreSQL
**Szükséges idő:** ~25-30 óra
**Kihívás:** Nagy felelősség, de jól strukturált munka

---

### **👨‍💻 FEJLESZTŐ #2 - "Frontend Core & State"**
**Fő felelősség:** Alapstruktúra, állapotkezelés, Auth
- React projekt setup
- Zustand stores (Auth, Listing, Transaction, Notification)
- API service layer
- Auth oldalak (Login, Register)
- Dashboard oldal
- Common komponensek (Button, Input, Modal, Card)

**Tapasztalat:** React, TypeScript, State management
**Szükséges idő:** ~20-25 óra

---

### **👨‍💻 FEJLESZTŐ #3 - "Frontend Features & UI"**
**Fő felelősség:** Üzleti funkciók, komplex komponensek
- Listings oldal és komponensek
- Transaction kezelés komponensek
- Profile oldal
- Layout komponensek (Navbar, Footer)
- Tailwind styling finomítás
- Responsiveness

**Tapasztalat:** React, UI/UX, Tailwind CSS
**Szükséges idő:** ~20-25 óra

---

## 📅 FEJLESZTÉSI ÜTEMTERV (3 Hét)

### **1. HÉT - Setup és Alapok**
- **Hétfő-Kedd:** Közös projekt setup
- **Szerda-Péntek:** Backend alapok + Frontend setup
- **Hétvége:** Backend Auth/User + Frontend Auth oldalak

### **2. HÉT - Core Funkciók**
- **Hétfő-Csütörtök:** Backend modulok + Frontend komponensek
- **Péntek:** Első integráció és tesztelés
- **Hétvége:** Hibajavítás

### **3. HÉT - Finalizálás**
- **Hétfő-Szerda:** Utolsó funkciók, polish
- **Csütörtök:** Dokumentáció, README
- **Péntek:** Vizsga előkészítés, prezentáció

---

## 🔧 FEJLESZTŐ #1 (BACKEND) - RÉSZLETES FELADATLISTA

### **NAPOK SZERINT FÁJLOK ÉS TARTALMAK:**

---

### **1. NAP - Prisma Setup és Alapstruktúra**

#### **Fájlok és tartalmak:**

**1. `prisma/schema.prisma`**
- Generator és datasource konfigurálás
- 4 enum definiálás: `TrustLevel`, `ListingType`, `ListingStatus`, `TransactionStatus`
- `User` model: összes mező (id, email, passwordHash, name, bio, avatar, balance, frozenBalance, trustLevel, stb.)
- `Listing` model: kapcsolat User-rel
- `Transaction` model: kapcsolat User (client + provider) és Listing-gel
- `Review` model: kapcsolat Transaction és User-rel
- Indexek hozzáadása: email, trustLevel, status mezőkhöz

**2. `src/prisma/prisma.service.ts`**
**Funkciók:**
- Class extends `PrismaClient`
- `onModuleInit()` metódus: `$connect()` hívás
- `onModuleDestroy()` metódus: `$disconnect()` hívás

**3. `src/prisma/prisma.module.ts`**
**Tartalom:**
- `@Global()` decorator
- `PrismaService` provider-ként
- Export `PrismaService`

**Parancsok:**
```bash
npx prisma init
npx prisma generate
npx prisma migrate dev --name init
npx prisma studio  # Ellenőrzés
```

---

### **2. NAP - Auth Module**

#### **Fájlok és tartalmak:**

**4. `src/auth/dto/register.dto.ts`**
**Validációk:**
- `email`: `@IsEmail()` decorator
- `password`: `@IsString()`, `@MinLength(6)`
- `name`: `@IsString()`, `@MinLength(2)`

**5. `src/auth/dto/login.dto.ts`**
**Validációk:**
- `email`: `@IsEmail()`
- `password`: `@IsString()`

**6. `src/auth/auth.service.ts`**
**Függvények:**
- Constructor: inject `PrismaService`, `JwtService`
- `register(email, password, name)` metódus:
  - Létező user ellenőrzés
  - Jelszó hashelés `bcrypt.hash(password, 10)`
  - User létrehozás Prisma-val
  - JWT token generálás `jwtService.sign()`
  - Return: `{ user, token }`
- `login(email, password)` metódus:
  - User keresés email alapján
  - Jelszó ellenőrzés `bcrypt.compare()`
  - JWT token generálás
  - Return: `{ user, token }`

**7. `src/auth/jwt.strategy.ts`**
**Tartalom:**
- Class extends `PassportStrategy(Strategy)`
- Constructor: super() hívás `secretOrKey` config-gal
- `validate(payload)` metódus:
  - User lekérés Prisma-val `payload.userId` alapján
  - Ha nincs user → `UnauthorizedException`
  - Return: user object

**8. `src/auth/jwt-auth.guard.ts`**
**Tartalom:**
- Class extends `AuthGuard('jwt')`

**9. `src/auth/auth.controller.ts`**
**Végpontok:**
- `@Post('register')` endpoint:
  - `@Body() dto: RegisterDto` paraméter
  - `authService.register()` hívás
- `@Post('login')` endpoint:
  - `@HttpCode(HttpStatus.OK)` decorator
  - `@Body() dto: LoginDto` paraméter
  - `authService.login()` hívás

**10. `src/auth/auth.module.ts`**
**Imports:**
- `PassportModule`
- `JwtModule.register()` konfigurációval (secret, expiresIn)
**Providers:**
- `AuthService`, `JwtStrategy`
**Controllers:**
- `AuthController`
**Exports:**
- `AuthService`

---

### **3. NAP - User Module**

#### **Fájlok és tartalmak:**

**11. `src/user/dto/update-user.dto.ts`**
**Mezők:**
- `name?`: `@IsOptional()`, `@IsString()`
- `bio?`: `@IsOptional()`, `@IsString()`
- `avatar?`: `@IsOptional()`, `@IsString()`

**12. `src/user/user.service.ts`**
**Függvények:**
- Constructor: inject `PrismaService`
- `findById(id)` metódus:
  - Prisma `findUnique` select-tel
  - Ha nincs → `NotFoundException`
- `updateProfile(userId, dto)` metódus:
  - Prisma `update` műveltet
  - Return: frissített user
- `getUserStats(userId)` metódus:
  - User, transactions, reviews párhuzamos lekérés `Promise.all()`-lal
  - Átlagértékelés kalkulálás
  - Return: összes statisztika

**13. `src/user/user.controller.ts`**
**Végpontok:**
- `@UseGuards(JwtAuthGuard)` class-level
- `@Get('me')`: saját profil lekérése `req.user.id`-val
- `@Get(':id')`: publikus profil lekérése
- `@Patch('me')`: profil frissítés `UpdateUserDto`-val
- `@Get(':id/stats')`: user statisztikák

**14. `src/user/user.module.ts`**
**Tartalom:**
- `UserService` provider
- `UserController` controller
- Export `UserService`

---

### **4. NAP - Listing Module**

#### **Fájlok és tartalmak:**

**15. `src/listing/dto/create-listing.dto.ts`**
**Mezők és validációk:**
- `title`: `@IsString()`, `@MinLength(5)`, `@MaxLength(100)`
- `description`: `@IsString()`, `@MinLength(20)`
- `category`: `@IsString()`
- `type`: `@IsEnum(['OFFER', 'REQUEST'])`
- `pricePerHour`: `@IsNumber()`, `@Min(0.5)`, `@Max(50)`
- `estimatedHours?`: `@IsOptional()`, `@IsNumber()`, `@Min(0.5)`

**16. `src/listing/dto/update-listing.dto.ts`**
**Mezők:**
- Összes mező `@IsOptional()` decorator-ral
- `status`: `@IsEnum(['ACTIVE', 'PAUSED', 'CLOSED'])`

**17. `src/listing/listing.service.ts`**
**Függvények:**
- `create(dto, userId)`:
  - Prisma `create` include-dal (user kapcsolat)
- `findAll(filters?)`:
  - Where object építés (category, type, search)
  - Prisma `findMany` include-dal
  - OrderBy: createdAt desc
- `findById(id)`:
  - Prisma `findUnique` teljes include-dal
  - NotFoundException ha nincs
- `update(id, userId, dto)`:
  - Tulajdonos ellenőrzés
  - Prisma `update`
- `delete(id, userId)`:
  - Tulajdonos ellenőrzés
  - Prisma `delete`
- `getUserListings(userId)`:
  - Prisma `findMany` userId szűréssel

**18. `src/listing/listing.controller.ts`**
**Végpontok:**
- `@Get()`: findAll szűrőkkel (Query params: category, type, search)
- `@Get(':id')`: findById
- `@Post()` + JwtAuthGuard: create
- `@Patch(':id')` + JwtAuthGuard: update
- `@Delete(':id')` + JwtAuthGuard: delete
- `@Get('user/me')` + JwtAuthGuard: getUserListings

**19. `src/listing/listing.module.ts`**
**Tartalom:**
- Provider, Controller, Export

---

### **5-6. NAP - Transaction Module (KRITIKUS)**

#### **Fájlok és tartalmak:**

**20. `src/transaction/dto/create-transaction.dto.ts`**
**Mezők:**
- `listingId`: `@IsString()`
- `agreedHours`: `@IsNumber()`, `@Min(0.5)`

**21. `src/transaction/dto/confirm-transaction.dto.ts`**
**Mezők:**
- `completionCode`: `@IsString()`, `@Length(6, 6)`

**22. `src/transaction/transaction.service.ts`**
**Helper függvények:**
- `toNumber(value)`: Decimal → number konverzió
- `generateCompletionCode()`: 6 char HEX generálás `crypto.randomBytes(3)`

**Főbb függvények:**
- `createTransaction(clientId, listingId, agreedHours)`:
  - `prisma.$transaction()` wrapper
  - Listing lekérés
  - Kredit ellenőrzés
  - Kredit zárolás: balance decrement, frozenBalance increment
  - Transaction létrehozás IN_PROGRESS státusszal
  - Completion code generálás
- `findById(id)`:
  - Include: client, provider, listing
- `confirmCompletion(txId, userId, completionCode)`:
  - Transaction lekérés
  - Provider ellenőrzés
  - Kód validálás
  - Status update: AWAITING_CONFIRM
  - providerConfirmed = true
- `completeTransaction(txId, clientId)`:
  - `prisma.$transaction()` wrapper
  - Jogosultság és státusz ellenőrzés
  - Client frozenBalance decrement
  - Provider balance increment
  - Provider completedTxCount increment
  - Status: COMPLETED
  - `updateTrustLevel()` hívás
- `cancelTransaction(txId, userId)`:
  - Státusz ellenőrzés (csak PENDING/IN_PROGRESS)
  - Kredit visszaoldás
  - Status: CANCELLED
- `getUserTransactions(userId)`:
  - OR szűrés (clientId vagy providerId)
  - Include: client, provider, listing
- `updateTrustLevel(tx, userId)` (private):
  - completedTxCount alapján új szint számítás
  - Update ha változott

**23. `src/transaction/transaction.controller.ts`**
**Végpontok:**
- Minden endpoint `@UseGuards(JwtAuthGuard)`
- `@Get()`: getUserTransactions
- `@Get(':id')`: findById
- `@Post()`: createTransaction
- `@Post(':id/confirm')`: confirmCompletion
- `@Post(':id/complete')`: completeTransaction
- `@Post(':id/cancel')`: cancelTransaction

**24. `src/transaction/transaction.module.ts`**

---

### **7. NAP - Review Module és Finalizálás**

#### **Fájlok:**

**25. `src/review/dto/create-review.dto.ts`**
**Mezők:**
- `transactionId`: `@IsString()`
- `rating`: `@IsNumber()`, `@Min(1)`, `@Max(5)`
- `comment?`: `@IsOptional()`, `@IsString()`

**26. `src/review/review.service.ts`**
**Függvények:**
- `create(dto, reviewerId)`:
  - Transaction lekérés + ellenőrzés (COMPLETED, nincs review)
  - ReviewedUserId meghatározás
  - Review létrehozás
  - `updateUserAverageRating()` hívás
- `getUserReviews(userId)`:
  - FindMany where reviewedUserId
  - Include: reviewer, transaction
- `updateUserAverageRating(userId)` (private):
  - Összes review lekérés
  - Átlag számítás
  - User update

**27. `src/review/review.controller.ts`**
**Végpontok:**
- `@Post()`: createReview
- `@Get('user/:userId')`: getUserReviews

**28. `src/review/review.module.ts`**

**29. Guards és Decorators:**
- `src/guards/trust-level.guard.ts`: canActivate implementáció
- `src/decorators/trust-level.decorator.ts`: SetMetadata wrapper

**30. Scheduled:**
- `src/scheduled/trust-level-audit.task.ts`:
  - `@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)`
  - Összes user végigiterálás
  - Trust level frissítés

**31. `src/app.module.ts` - Összes modul import**

**32. `src/main.ts` - CORS, ValidationPipe konfig**

**33. Seed data - `prisma/seed.ts`:**
- 4 teszt user bcrypt hash-elt jelszóval
- 8 listing létrehozás
- 1 befejezett transaction
- 1 review

---

## 🎨 FEJLESZTŐ #2 (FRONTEND CORE) - FELADATLISTA

### **1. NAP - Setup és Alapok**

#### **Projekt setup:**

**1. Vite + React projekt inicializálás:**
```bash
npm create vite@latest frontend -- --template react-ts
cd frontend
npm install
```

**2. Függőségek telepítése:**
```bash
npm install react-router-dom zustand
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**3. `tailwind.config.js` konfiguráció:**
- Content array: index.html, src/**/*.{tsx,ts}
- Theme extend (opcionális)

**4. `src/index.css` frissítése:**
- Tailwind directives (@tailwind base, components, utilities)
- Body styling
- Global reset (*-selector box-sizing)

**5. `vite.config.ts` proxy beállítása:**
- Server port: 5173
- Proxy config: /api → http://localhost:3000

---

### **2. NAP - API Service Layer és Types**

#### **Fájlok:**

**6. `src/services/api.ts`**
**Class és metódusok:**
- `ApiService` class
- `getHeaders()` private metódus: Authorization header hozzáadás token-nel
- `request<T>(endpoint, options)` generic metódus: fetch wrapper, error handling
- `get<T>(endpoint)`: request wrapper GET-hez
- `post<T>(endpoint, data)`: request wrapper POST-hoz
- `patch<T>(endpoint, data)`: PATCH wrapper
- `delete<T>(endpoint)`: DELETE wrapper
- Export: `api` instance

**7. `src/services/auth.service.ts`**
**Funkciók:**
- `login(email, password)`: POST /auth/login
- `register(email, password, name)`: POST /auth/register
- Export: `authService` object

**8. `src/services/listing.service.ts`**
**Funkciók:**
- `getAll(filters?)`: URLSearchParams építés, GET /listings
- `getById(id)`: GET /listings/:id
- `create(data)`: POST /listings
- `update(id, data)`: PATCH /listings/:id
- `delete(id)`: DELETE /listings/:id
- `getMyListings()`: GET /listings/user/me

**9. `src/services/transaction.service.ts`**
**Funkciók:**
- `getAll()`: GET /transactions
- `getById(id)`: GET /transactions/:id
- `create(listingId, agreedHours)`: POST /transactions
- `confirm(id, completionCode)`: POST /transactions/:id/confirm
- `complete(id)`: POST /transactions/:id/complete
- `cancel(id)`: POST /transactions/:id/cancel

**10-13. Types fájlok:**
- `src/types/user.types.ts`: User, UserStats interface
- `src/types/listing.types.ts`: Listing, CreateListingDto interface
- `src/types/transaction.types.ts`: Transaction, CreateTransactionDto interface
- `src/types/index.ts`: export minden type

---

### **3. NAP - Zustand Stores**

#### **Fájlok:**

**14. `src/stores/useAuthStore.ts`**
**State és actions:**
- State: `user`, `token`, `isAuthenticated`
- Actions:
  - `login(user, token)`: set state
  - `logout()`: clear state
  - `updateBalance(balance, frozenBalance)`: user update
  - `setUser(user)`: user set
- Persist middleware: localStorage, key: 'chronos-auth'

**15. `src/stores/useListingStore.ts`**
**State és actions:**
- State: `listings[]`, `filters{}`, `isLoading`
- Actions:
  - `fetchListings()`: async API call
  - `setFilter(key, value)`: filters update
  - `clearFilters()`: filters reset

**16. `src/stores/useTransactionStore.ts`**
**State és actions:**
- State: `transactions[]`, `isLoading`, `error`
- Actions:
  - `fetchTransactions()`: async API call
  - `addTransaction(tx)`: array prepend
  - `updateTransactionStatus(id, status)`: find és update

**17. `src/stores/useNotificationStore.ts`**
**State és actions:**
- State: `notifications[]`
- Actions:
  - `addNotification(notif)`: push + auto-remove setTimeout
  - `removeNotification(id)`: filter
  - `clearNotifications()`: reset

---

### **4. NAP - Auth Oldalak és Common Komponensek**

#### **Fájlok:**

**18. `src/components/common/Button.tsx`**
**Props interface:**
- `children`, `onClick?`, `variant?` (primary/secondary/danger), `disabled?`, `type?`, `className?`
**Render:** button elem conditional styling-gal

**19. `src/components/common/Input.tsx`**
**Props interface:**
- `label?`, `type?`, `value`, `onChange`, `placeholder?`, `required?`, `disabled?`, `error?`
**Render:** label + input + error message

**20. `src/components/common/Card.tsx`**
**Props:** `title?`, `children`, `className?`
**Render:** div wrapper styled card

**21. `src/components/common/Modal.tsx`**
**Props:** `isOpen`, `onClose`, `title`, `children`
**Render:** Conditional render, backdrop, modal container, close button

**22. `src/pages/Login.tsx`**
**State:** `email`, `password`, `error`, `loading`
**Funkciók:**
- `handleSubmit()`: authService.login hívás, useAuthStore.login, navigate
**Render:** Form Input komponensekkel, error megjelenítés, link Register-re

**23. `src/pages/Register.tsx`**
**State:** `name`, `email`, `password`, `error`, `loading`
**Funkciók:**
- `handleSubmit()`: authService.register hívás
**Render:** Hasonló Login-hoz + name mező

---

### **5. NAP - Dashboard**

#### **Fájlok:**

**24. `src/components/dashboard/BalanceCard.tsx`**
**Props:** `balance`, `frozenBalance`, `trustLevel`
**Render:**
- Elérhető kredit nagy számmal
- Zárolt kredit (ha van)
- Trust level badge színkódolva

**25. `src/components/dashboard/TransactionCard.tsx`**
**Props:** `transaction`, `currentUserId`
**Logika:**
- isProvider, isClient meghatározás
- Conditional render státusz alapján
- Completion code input (provider)
- Finalize button (client)
**Funkciók:**
- `handleConfirm()`: transactionService.confirm
- `handleComplete()`: transactionService.complete

**26. `src/components/dashboard/TransactionList.tsx`**
**Props:** `transactions[]`, `isLoading`, `currentUserId`
**Render:**
- Loading state
- Empty state
- Grid TransactionCard komponensekkel

**27. `src/pages/Dashboard.tsx`**
**Hooks:**
- `useAuthStore` - user
- `useTransactionStore` - transactions, fetchTransactions
**useEffect:** fetchTransactions hívás
**Render:**
- Welcome message
- BalanceCard
- TransactionList

---

### **6-7. NAP - Navbar, Footer, App routing**

#### **Fájlok:**

**28. `src/components/layout/Navbar.tsx`**
**Hooks:** `useAuthStore`, `useNavigate`
**Funkciók:**
- `handleLogout()`: logout + navigate
**Render:**
- Logo
- Navigation linkek (Dashboard, Listings, Profile)
- Balance megjelenítés
- Logout button

**29. `src/components/layout/Footer.tsx`**
**Render:**
- 3 column grid
- Company info, links, contact

**30. `src/components/common/Notification.tsx`**
**Hooks:** `useNotificationStore`
**Render:**
- Fixed position top-right
- Map notifications
- Színkódolás type szerint
- Close button

**31. `src/App.tsx`**
**Components:**
- `BrowserRouter` wrapper
- `Navbar`, `Notification`, `Footer`
- `Routes`:
  - /login, /register (public)
  - /, /listings, /profile (protected)
  - /listings/:id, /transactions/:id (protected)
**ProtectedRoute komponens:** isAuthenticated ellenőrzés, redirect

**32. `src/main.tsx`**
**Render:** StrictMode + BrowserRouter + App

---

## 🎨 FEJLESZTŐ #3 (FRONTEND FEATURES) - FELADATLISTA

### **1-2. NAP - Listings Komponensek**

#### **Fájlok:**

**33. `src/components/listings/ListingCard.tsx`**
**Props:** `listing`
**Render:**
- Title, category badge, type badge
- Description (line-clamp-3)
- User info (name, trust level)
- Price
- Details button → navigate

**34. `src/components/listings/FilterBar.tsx`**
**Props:** `filters`, `onFilterChange`
**State:** Local controlled inputs
**Render:**
- Search input
- Type select
- Category select
- onChange handlers

**35. `src/components/listings/CreateListingButton.tsx`**
**State:** `isModalOpen`, `formData`, `loading`
**Funkciók:**
- `handleSubmit()`: listingService.create, reload
**Render:**
- Button (modal trigger)
- Modal CreateListingForm-mal

**36. `src/components/listings/ListingDetail.tsx`**
**Hooks:** `useParams`, `useState` (listing, loading, agreedHours)
**useEffect:** listingService.getById
**Funkciók:**
- `handleOrder()`: balance check, transactionService.create
**Render:**
- Full description
- Provider info
- Order form (hours input, total calc)
- Order button

**37. `src/pages/Listings.tsx`**
**Hooks:** `useListingStore`
**useEffect:** fetchListings when filters change
**Render:**
- Header + CreateListingButton
- FilterBar
- Loading state
- Empty state
- Grid ListingCard[] komponensekkel

---

### **3. NAP - Transaction Detail és Profile**

#### **Fájlok:**

**38. `src/pages/TransactionDetail.tsx`**
**Hooks:** `useParams`, `useState`, `useAuthStore`
**useEffect:** transactionService.getById
**State:** `transaction`, `completionCode`, `loading`, `actionLoading`
**Funkciók:**
- `handleConfirm()`: transactionService.confirm
- `handleComplete()`: transactionService.complete
- `handleCancel()`: transactionService.cancel
**Render:**
- Transaction info card
- Status badge
- Provider confirm section (IN_PROGRESS)
- Client finalize section (AWAITING_CONFIRM)
- Cancel button (PENDING/IN_PROGRESS)

**39. `src/pages/Profile.tsx`**
**Hooks:** `useAuthStore`, `useState`
**State:** `name`, `bio`, `loading`, `message`
**Funkciók:**
- `handleSubmit()`: api.patch /users/me
**Render:**
- Profile form (name, email disabled, bio)
- Stats box (trust level, balance)
- Save button

---

### **4-5. NAP - Utils, Hooks és Polish**

#### **Fájlok:**

**40. `src/utils/formatters.ts`**
**Funkciók:**
- `formatDate(date)`: Intl.DateTimeFormat
- `formatDateTime(date)`: dátum + idő
- `formatCurrency(amount)`: "X.XX kredit"
- `formatHours(hours)`: "X óra"
- `getStatusColor(status)`: Tailwind class string
- `getStatusText(status)`: Magyar szöveg

**41. `src/utils/validators.ts`**
**Funkciók:**
- `validateEmail(email)`: regex check
- `validatePassword(password)`: { valid, message? }
- `validateName(name)`: length check
- `validateHours(hours)`: min/max check
- `validatePrice(price)`: min/max check

**42. `src/utils/constants.ts`**
**Konstansok:**
- `CATEGORIES` array
- `TRUST_LEVELS` object (name, benefits)
- `TRANSACTION_STATUSES` object
- `API_BASE_URL`
- `ROUTES` object

**43. `src/hooks/useAuth.ts`**
**Return object:**
- `user`, `isAuthenticated`
- `handleLogin(email, password)`
- `handleRegister(email, password, name)`
- `handleLogout()`

**44. `src/hooks/useTransaction.ts`**
**Return:**
- `transaction`, `transactions`, `loading`, `error`
- `fetchTransactions()`, `fetchTransaction(id)`
- `createTransaction()`, `confirmTransaction()`, `completeTransaction()`

**45. Responsive finomítások:**
- Breakpoint ellenőrzések
- Grid column változások
- Mobile navigation (hamburger menu opcionális)

---

## 📊 KOORDINÁCIÓ ÉS GIT WORKFLOW

### **Git Branch Stratégia:**

```bash
# Backend fejlesztő:
git checkout -b feature/backend-complete

# Frontend fejlesztők közös branch:
git checkout -b feature/frontend-base

# Fejlesztő #2 saját feature branch:
git checkout -b feature/frontend-core

# Fejlesztő #3 saját feature branch:
git checkout -b feature/frontend-features
```

### **Daily Sync:**
- **Reggel 9:00:** Standup (5-10 perc)
  - Mit csináltam? Mi a terv ma? Van-e blocker?
- **Este 18:00:** Push + mini review
  - Ki mit fejezett be?
  - Holnapi prioritások

### **Integration Points:**

**3. nap vége:**
- Backend: Auth + User API készen
- Frontend #2: Auth oldalak készen
- **TESZT:** Login/Register működik

**5. nap vége:**
- Backend: Listing API készen
- Frontend #3: Listings UI készen
- **TESZT:** Hirdetés létrehozás, böngészés

**7. nap vége:**
- Backend: Transaction API készen
- Frontend #2+#3: Transaction UI készen
- **TESZT:** Teljes workflow (megrendelés → véglegesítés)

### **Code Review Checklist:**

**Backend ellenőrzi:**
- [ ] Minden endpoint működik (Postman/Thunder Client)
- [ ] DTO validáció helyes
- [ ] Prisma relations működnek
- [ ] Error handling minden service-ben
- [ ] Atomikus tranzakciók a Transaction service-ben
- [ ] JWT működik, Guard-ok védik az endpoint-okat
- [ ] Seed data betölthető

**Frontend #2 ellenőrzi:**
- [ ] Zustand stores state-je helyes
- [ ] API calls működnek (Network tab)
- [ ] Token tárolása és küldése működik
- [ ] Auth flow (login/logout) működik
- [ ] Error handling van minden API call-nál

**Frontend #3 ellenőrzi:**
- [ ] Komponensek responsive-ok
- [ ] Minden form validált
- [ ] Loading state-ek vannak
- [ ] Error message-ek megjelennek
- [ ] Navigáció működik

**Közös ellenőrzés (minden nap vége):**
- [ ] Git conflict nincs
- [ ] Build successful (`npm run build`)
- [ ] Console error nincs
- [ ] TypeScript error nincs

---

## 🔄 MERGE STRATÉGIA

### **Kis feature merge (naponta):**
```bash
# Fejlesztő befejez egy részt
git add .
git commit -m "feat: Auth service implemented"
git push origin feature/backend-complete

# Pull request létrehozása
# Code review másik 2 fejlesztő
# Merge main-be
```

### **Nagy feature merge (heti 1x):**
```bash
# Frontend fejlesztők egyesítése
git checkout feature/frontend-base
git merge feature/frontend-core
git merge feature/frontend-features
# Conflict resolve
git push
```

---

## ⚡ GYORS REFERENCIA - KI MIT CSINÁL?

### **BACKEND (1 fő) - 32 fájl:**
```
Day 1: Prisma (schema, service, module) - 3 fájl
Day 2: Auth (DTOs, service, strategy, guard, controller, module) - 6 fájl
Day 3: User (DTOs, service, controller, module) - 4 fájl
Day 4: Listing (DTOs, service, controller, module) - 4 fájl
Day 5-6: Transaction (DTOs, service, controller, module) - 4 fájl
Day 7: Review (DTOs, service, controller, module) + Guards + Scheduled - 7 fájl
       App.module, main.ts, seed.ts - 3 fájl
       .env konfigurálás - 1 fájl
```

### **FRONTEND #2 (Core) - ~15 fájl:**
```
Day 1: Setup (tailwind, vite config, index.css) - 3 fájl
Day 2: Services (api, auth, listing, transaction) + Types - 8 fájl
Day 3: Stores (auth, listing, transaction, notification) - 4 fájl
Day 4: Common (Button, Input, Card, Modal) + Auth pages - 6 fájl
Day 5: Dashboard (BalanceCard, TransactionCard, TransactionList, Dashboard page) - 4 fájl
Day 6-7: Layout (Navbar, Footer, Notification) + App.tsx + main.tsx - 5 fájl
```

### **FRONTEND #3 (Features) - ~13 fájl:**
```
Day 1-2: Listings (ListingCard, FilterBar, CreateListingButton, ListingDetail, Listings page) - 5 fájl
Day 3: Transaction (TransactionDetail) + Profile - 2 fájl
Day 4-5: Utils (formatters, validators, constants) + Hooks (useAuth, useTransaction) - 5 fájl
Day 6-7: Polish, responsive, testing - meglévő fájlok finomítása
```

---

## 📋 NAPI CHECKLIST SABLON

### **Backend Fejlesztő:**
```
□ Reggel: Git pull, branch check
□ Fájl létrehozása
□ Függvények/metódusok implementálása
□ Prisma műveleteket tesztelni Studio-ban
□ Postman collection frissítése
□ Error case-ek kezelése
□ Console.log-ok törlése
□ TypeScript error nincs
□ Commit + push
□ Slack/Discord üzenet: "Auth module kész"
```

### **Frontend Fejlesztő #2:**
```
□ Reggel: Git pull
□ API endpoint elérhetőség ellenőrzés (backend fut?)
□ Komponens/Store létrehozása
□ Props/State interface definiálás
□ API integrálás
□ Loading state implementálás
□ Error handling
□ TypeScript error check
□ Browser-ben tesztelés
□ Commit + push
□ Screenshot küldés csapatnak
```

### **Frontend Fejlesztő #3:**
```
□ Reggel: Git pull
□ Tailwind class-ok használata
□ Responsive check (mobile + desktop)
□ Form validation
□ User feedback (toast, error messages)
□ TypeScript error check
□ Cross-browser teszt (Chrome + Firefox)
□ Commit + push
□ Demo videó vagy screenshot
```

---

## 🎯 SIKERKRITÉRIUMOK

### **Minimum Viable Product (MVP):**
- [x] User regisztráció és bejelentkezés
- [x] Hirdetés létrehozás, böngészés
- [x] Tranzakció létrehozás
- [x] Escrow működik (kredit zárolás)
- [x] Completion code mechanizmus
- [x] Tranzakció véglegesítés
- [x] Profil szerkesztés
- [x] Dashboard működik

### **Nice to Have (ha van idő):**
- [ ] Értékelési rendszer teljes UI
- [ ] Trust Level vizuális indikátorok
- [ ] Hirdetés keresés fejlett szűrőkkel
- [ ] Notification system toast-okkal
- [ ] Dark mode
- [ ] Animációk (fade-in, slide-in)

---

## 🚀 VÉGSŐ ELLENŐRZŐ LISTA (Vizsga előtt)

### **Funkcionális tesztek:**
1. [ ] Regisztráció működik
2. [ ] Bejelentkezés működik
3. [ ] Új hirdetés létrehozható
4. [ ] Hirdetés szűrés működik
5. [ ] Megrendelés leadható (kredit zárolódik)
6. [ ] Provider completion code látható
7. [ ] Completion code beírás működik
8. [ ] Client véglegesítés működik (kredit átmegy)
9. [ ] Trust Level frissül
10. [ ] Profil szerkesztés mentődik

### **Dokumentáció:**
- [ ] README.md frissítve
- [ ] API végpontok dokumentálva
- [ ] Telepítési útmutató
- [ ] Test user credentials
- [ ] Prezentáció elkészítve

### **Code Quality:**
- [ ] Nincs console.log production code-ban
- [ ] TypeScript error nincs
- [ ] ESLint warning nincs (vagy minimális)
- [ ] Git commit history tiszta
- [ ] .env.example fájl naprakész

---

## 💡 TIPPEK A SIKERES EGYÜTTMŰKÖDÉSHEZ

1. **Kommunikáció kulcs:**
   - Slack/Discord channel aktív használat
   - Probléma? → Azonnal jelezd!
   - Blocker? → Segítség kérés

2. **Kis lépések:**
   - Ne várj 3 napot commit nélkül
   - Naponta legalább 1 commit
   - Működő funkciók → push

3. **Backend-Frontend sync:**
   - Backend fejlesztő jelzi: "Listing API kész"
   - Frontend tud rá építeni
   - API contract egyeztetés előre

4. **Code Review:**
   - Ne személyeskedj
   - Konstruktív kritika
   - "Ez nem működik" ❌ → "Mi lenne ha...?" ✅

5. **Pair Programming:**
   - Nehéz rész? → Screen share
   - 2 fő együtt debuggol
   - Tanulási lehetőség

---

## 📞 VÉSZHELYZETI TERV

### **Ha valaki lemarad:**
- Többi fejlesztő átvállalja részfeladatokat
- Egyszerűsítés: minimalizált feature set
- Dokumentáció helyett code comments

### **Ha API nem működik:**
- Frontend: Mock data használata
- Később integráció

### **Ha időhiány van:**
- MVP-re koncentrálás
- Nice-to-have feature-ök kihagyása
- Működő demo > tökéletes code

---

**SIKERES PROJEKTET! 🚀**