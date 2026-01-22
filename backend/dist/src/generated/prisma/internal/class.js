"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = require("@prisma/client/runtime/client");
const config = {
    "previewFeatures": [],
    "clientVersion": "7.2.0",
    "engineVersion": "0c8ef2ce45c83248ab3df073180d5eda9e8be7a3",
    "activeProvider": "mysql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider     = \"prisma-client\"\n  output       = \"../src/generated/prisma\"\n  moduleFormat = \"cjs\"\n}\n\ndatasource db {\n  provider = \"mysql\"\n}\n\nenum TrustLevel {\n  NEWCOMER\n  TRUSTED\n  VETERAN\n}\n\nenum ListingType {\n  OFFER\n  REQUEST\n}\n\nenum TransactionStatus {\n  PENDING\n  COMPLETED\n  CANCELLED\n}\n\nmodel User {\n  id       Int    @id @default(autoincrement())\n  name     String\n  email    String @unique\n  password String\n\n  trustLevel TrustLevel\n\n  listings     Listing[]\n  transactions Transaction[]\n  reviews      Review[]\n}\n\nmodel Listing {\n  id          Int         @id @default(autoincrement())\n  title       String\n  description String\n  category    String\n  type        ListingType\n\n  userId Int\n  user   User @relation(fields: [userId], references: [id], onDelete: Cascade)\n\n  transactions Transaction[]\n}\n\nmodel Transaction {\n  id Int @id @default(autoincrement())\n\n  userId    Int\n  listingId Int\n\n  status TransactionStatus\n\n  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)\n  listing Listing @relation(fields: [listingId], references: [id], onDelete: Cascade)\n\n  review Review?\n}\n\nmodel Review {\n  id      Int     @id @default(autoincrement())\n  rating  Int\n  comment String?\n\n  userId        Int\n  transactionId Int @unique\n\n  user        User        @relation(fields: [userId], references: [id], onDelete: Cascade)\n  transaction Transaction @relation(fields: [transactionId], references: [id], onDelete: Cascade)\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"name\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"email\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"password\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"trustLevel\",\"kind\":\"enum\",\"type\":\"TrustLevel\"},{\"name\":\"listings\",\"kind\":\"object\",\"type\":\"Listing\",\"relationName\":\"ListingToUser\"},{\"name\":\"transactions\",\"kind\":\"object\",\"type\":\"Transaction\",\"relationName\":\"TransactionToUser\"},{\"name\":\"reviews\",\"kind\":\"object\",\"type\":\"Review\",\"relationName\":\"ReviewToUser\"}],\"dbName\":null},\"Listing\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"title\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"description\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"category\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"type\",\"kind\":\"enum\",\"type\":\"ListingType\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ListingToUser\"},{\"name\":\"transactions\",\"kind\":\"object\",\"type\":\"Transaction\",\"relationName\":\"ListingToTransaction\"}],\"dbName\":null},\"Transaction\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"listingId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"status\",\"kind\":\"enum\",\"type\":\"TransactionStatus\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"TransactionToUser\"},{\"name\":\"listing\",\"kind\":\"object\",\"type\":\"Listing\",\"relationName\":\"ListingToTransaction\"},{\"name\":\"review\",\"kind\":\"object\",\"type\":\"Review\",\"relationName\":\"ReviewToTransaction\"}],\"dbName\":null},\"Review\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"rating\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"comment\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"userId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"transactionId\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"user\",\"kind\":\"object\",\"type\":\"User\",\"relationName\":\"ReviewToUser\"},{\"name\":\"transaction\",\"kind\":\"object\",\"type\":\"Transaction\",\"relationName\":\"ReviewToTransaction\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => require('node:buffer'));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_bg.mysql.js")),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_bg.mysql.wasm-base64.js"));
        return await decodeBase64AsWasm(wasm);
    }
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map