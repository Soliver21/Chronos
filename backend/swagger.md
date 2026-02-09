🧙🏾‍♂️: Szuper, pont erre való a Swagger / OpenAPI a Nest.js-ben: **automatikusan generált, böngészőben kattintható API-dokumentáció**, amivel **adminisztrálni és tesztelni** is tudod a végpontjaidat (“Try it out” → request megy a szerveredre).

Alább **lépésről lépésre** megmutatom, hogyan működik, és **a te Product module-odra** (a feltöltött fájljaid alapján) rá is húzom a tipikus Swagger-dekorátorokat.

---

## 🧙🏾‍♂️ Mit csinál a Swagger valójában Nest-ben?

A Swagger UI csak a “kirakat”. A lényeg az **OpenAPI specifikáció** (egy JSON), ami leírja:

* milyen útvonalak vannak (pl. `GET /product`, `POST /product`, `DELETE /product/:id`)
* milyen request body-kat vár (DTO-k sémája)
* milyen válaszokat ad (status code-ok, példák)
* paraméterek (path param, query param), auth (Bearer/JWT), stb.

A Nest ezt úgy tudja “kitalálni”, hogy:

* olvassa a Nest dekorátorokat (`@Controller`, `@Get`, `@Param`, `@Body`, …)
* **plusz** a swagger dekorátorokat (`@ApiTags`, `@ApiBody`, `@ApiResponse`, …)
* és TypeScript típus-információkból + reflekt metadata-ból generál.

Fontos:
✅ Swagger = dokumentáció + UI tesztelés
❌ Swagger nem validál helyetted futás közben (azt a `class-validator` + `ValidationPipe` csinálja)

---

## 🧙🏾‍♂️ 1) Telepítés

Terminálban (npm/pnpm/yarn mindegy):

```bash
npm i @nestjs/swagger swagger-ui-express
```

---

## 🧙🏾‍♂️ 2) Bekötés a `main.ts`-ben

A Swagger akkor “kel életre”, ha az app indulásakor létrehozod az OpenAPI doksit, és kiteszed egy URL-re (pl. `/docs`).

**Példa `main.ts`-be:**

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // (Ajánlott) DTO validáció futás közben is
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // kidobja az ismeretlen mezőket
      forbidNonWhitelisted: true, // hibát dob ismeretlen mezőre
      transform: true,            // pl. "123" -> 123 ParseIntPipe/Type() mellett
    }),
  );

  // Swagger config
  const config = new DocumentBuilder()
    .setTitle('My API')
    .setDescription('Nest.js REST API Swagger UI')
    .setVersion('1.0')
    // ha van JWT-d:
    // .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('docs', app, document); // http://localhost:3000/docs

  await app.listen(3000);
}

bootstrap();
```

➡️ Innentől: `http://localhost:3000/docs` alatt lesz egy UI, ahol kattintgatva tesztelsz.

---

## 🧙🏾‍♂️ 3) A te `ProductController`-ed “swaggeresítése”

A jelenlegi controller-ed:

* `GET /product` (listázás)
* `POST /product` (létrehozás DTO-val)
* `DELETE /product/:id` (törlés id-val)

Ehhez Swagger dekorátorok:

* `@ApiTags('Product')` → csoportosítás a UI-ban
* `@ApiOperation({ summary })` → rövid leírás
* `@ApiOkResponse / @ApiCreatedResponse / @ApiNotFoundResponse` → válaszok dokumentálása
* `@ApiParam` → `:id` param dokumentálása
* `@ApiBody` → request body DTO dokumentálása

**Javasolt módosított controller (a te fájlod alapján):**

```ts
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './product.dto';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Összes termék lekérése' })
  @ApiOkResponse({ description: 'Termékek listája' })
  async getAll() {
    return await this.productService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Új termék létrehozása' })
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ description: 'Létrehozott termék' })
  async postProd(@Body() dto: CreateProductDto) {
    return await this.productService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Termék törlése ID alapján' })
  @ApiParam({ name: 'id', type: Number, description: 'A termék azonosítója' })
  @ApiNotFoundResponse({ description: 'Id not found.' })
  @ApiOkResponse({ description: 'Törölt termék ID-ja' })
  async deleteProd(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.remove(id);
  }
}
```

---

## 🧙🏾‍♂️ 4) DTO-k: miért érdemes `@ApiProperty`-t használni?

A te `CreateProductDto`-d már **class-validator** dekorátorokat használ. Ezek a runtime validációhoz jók.

Swagger viszont attól lesz igazán szép és pontos, ha a DTO mezőire ráteszed:

* `@ApiProperty()` (kötelező mező)
* `@ApiPropertyOptional()` (opcionális mező)
* (opcionálisan) `example`, `minimum`, `minLength`, stb.

**Javasolt módosított DTO (a te fájlod alapján):**

```ts
import { Type } from 'class-transformer';
import { IsString, IsNumber, MinLength, IsOptional, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'Kávé', minLength: 1 })
  @IsString()
  @MinLength(1)
  name!: string;

  @ApiProperty({ example: 1990 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  price!: number;

  @ApiPropertyOptional({ example: '250g arabica' })
  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string;

  @ApiProperty({ example: 10 })
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  stock!: number;
}
```

Eredmény: Swagger UI-ban a `POST /product` “Try it out” alatt automatikusan megjelenik egy értelmes JSON minta.

---

## 🧙🏾‍♂️ 5) Hogyan tesztelsz Swagger UI-ból?

1. Nyisd meg: `http://localhost:3000/docs`
2. Keresd meg a `Product` taget (csoportot)
3. Nyisd le pl. `POST /product`
4. Klikk: **Try it out**
5. Írd be pl.:

```json
{
  "name": "Kávé",
  "price": 1990,
  "description": "250g arabica",
  "stock": 10
}
```

6. **Execute**
7. Látod:

   * a küldött curl parancsot
   * request URL-t
   * response body-t és status code-ot

Ugyanez a `DELETE /product/{id}`-nél: beírod az id-t → Execute.

---

## 🧙🏾‍♂️ Tipikus “miért nem jó” hibák (gyors checklist)

* **A DTO validáció nem fut** → nincs `ValidationPipe` globálisan
* **Swagger üres / hiányos** → nincs `@ApiProperty` a DTO mezőkön (nem kötelező, de sokat javít)
* **Auth-os végpontokat nem tudsz tesztelni** → kell `.addBearerAuth()` + `@ApiBearerAuth()` és a UI-ban “Authorize” gomb

---

## 🧙🏾‍♂️ Következő lépés

Szeretnéd, hogy a te projektedhez igazítsam a Swagger beállítást **JWT-s** végpontokkal is (Authorize gomb + Bearer token), vagy egyelőre maradjunk a publikus product végpontok dokumentálásánál? ✅

---

🧙🏾‍♂️: Pontosan érted: a Swagger UI **egy weboldal** (pl. `/docs`), ahol **dokumentáció + interaktív tesztelés** is van. És igen, JWT-s végpontokhoz is szépen be lehet kötni az **Authorize (Bearer token)** gombot. 🔐

## 🧙🏾‍♂️ 1) JWT (Bearer) beállítása Swaggerben

### A) `main.ts` – addBearerAuth()

A Swagger “tudja”, hogy van auth-od, ha a DocumentBuilderben hozzáadod:

```ts
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// ...
const config = new DocumentBuilder()
  .setTitle('My API')
  .setVersion('1.0')
  .addBearerAuth(
    {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      description: 'Ide a JWT tokent írd: Bearer nélkül, csak maga a token.',
    },
    'access-token', // <-- ez egy név (security scheme name)
  )
  .build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('docs', app, document);
```

Ettől megjelenik felül a Swagger UI-ban az **Authorize** gomb.

---

### B) Controller szinten jelzed, melyik végpont védett

Ha egy controller/végpont JWT-s, Swaggerben ezt jelölöd:

```ts
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
```

Példa:

```ts
@ApiTags('Users')
@ApiBearerAuth('access-token') // minden végpontra a controlleren belül
@Controller('users')
export class UsersController { ... }
```

Vagy csak egy metóduson:

```ts
@Get('me')
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('access-token')
@ApiOperation({ summary: 'Aktuális user adatai' })
getMe(@Req() req: any) {
  return req.user;
}
```

**Fontos:** a Swagger dekorátor **csak dokumentál**. A védelmet továbbra is a `@UseGuards(AuthGuard('jwt'))` (vagy saját Guardod) adja.

---

### C) Hogyan tesztelsz JWT-s végpontot a Swagger UI-ból?

1. Hívod a login végpontot (pl. `POST /auth/login`) → kapsz `access_token`.
2. Swagger UI-ban felül: **Authorize** → beilleszted a tokent.
3. Utána a védett végpontok “Try it out”-ja már elküldi a fejlécet:

`Authorization: Bearer <token>`

---

## 🧙🏾‍♂️ 2) “Swagger dokumentáció Word/PDF-ben” – hogyan érdemes?

Igen, képernyőkép is lehet, de iparban általában **nem az a legjobb**, mert:

* gyorsan elavul
* nem kereshető
* nem konzisztens

A Swagger dokumentáció **valódi forrása** az OpenAPI “spec” (JSON/YAML). Ebből lehet szépen generálni PDF/HTML/Word-szerű doksit.

### A) OpenAPI JSON kiexportálása (a legjobb kiindulópont)

Nest-ben a `createDocument()` eredménye maga az OpenAPI objektum. Ki lehet tenni külön végpontra (csak fejlesztésben!), pl.:

```ts
// main.ts-ben, SwaggerModule.setup után:
app.getHttpAdapter().get('/docs-json', (req, res) => {
  res.json(document);
});
```

Így a specifikáció elérhető lesz:

* `/docs-json`

Ezt tudod “forrásként” használni dokumentum-generáláshoz.

---

### B) PDF/nyomtatható forma – egyszerű módszerek

**1) “Print to PDF” a böngészőből**

* Megnyitod `/docs`
* Ctrl+P → Mentés PDF-be

✅ gyors, egyszerű
❌ a Swagger UI nem mindig “szép” nyomtatásban, hosszú végpontlistánál széteshet

**2) Redoc / más OpenAPI renderer**
A gyakoribb workflow:

* OpenAPI JSON → egy “szebb”, nyomtatóbarát HTML
* aztán HTML → PDF

Ehhez tipikus eszköz a ReDoc (vagy hasonlók).
✅ sokkal szebb, rendezettebb
✅ kereshető, jól tördelhető
❌ egy extra lépés

**3) OpenAPI Generator / doksigenerátor**
OpenAPI-ból tudsz generálni statikus dokumentációt is (HTML), amit aztán PDF-be nyomtatsz.

---

### C) Word dokumentumba hogyan?

Két reális út van:

**1) Beágyazás képekkel (képernyőkép / PDF-ből képkivágás)**
✅ gyors
❌ karbantartás rémálom

**2) OpenAPI → HTML → Word (docx)**
Van, aki ezt csinálja, de kicsit “pipeline-os” (külön toolok).
A legpraktikusabb tanári/iskolai környezetben általában:

* OpenAPI → szépen renderelt HTML (ReDoc) → PDF
  és a Word doksiba inkább **a link + pár screenshot + rövid magyarázat** kerül.

---

## 🧙🏾‍♂️ Javaslat tanításhoz / dokumentáláshoz (nagyon működik)

📌 A beadandó/portfólió dokumentációban:

* legyen egy **/docs** link (ha publikus, akkor hostolt környezetben)
* legyen a repo-ban egy **exportált OpenAPI fájl** (pl. `openapi.json`)
* és legyen 2-3 **képernyőkép** (Authorize + 1 sikeres GET + 1 POST példa)

Ez egyszerre “szakmai” és könnyen értékelhető.

---

## 🧙🏾‍♂️ Következő lépés ✅

A JWT-s végpontjaid milyen struktúrában vannak most? (pl. `AuthModule` / `auth.controller.ts`, `login/register`, `JwtAuthGuard`, `RolesGuard` stb.)
Ha feltöltöd az `auth.controller.ts` + `auth.module.ts` (+ ha van guard/strategy), akkor **konkrétan a te kódodba** beírom a Swagger-dekorátorokat: login response példával, `@ApiBearerAuth`-tal, 401/403 válaszokkal. 🧩

---
