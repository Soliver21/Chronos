import { PrismaClient, TrustLevel, ListingType, TransactionStatus } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Jelszó hash előállítása
  const hashedPassword = await argon2.hash('Password123!');

  // 1. Felhasználók létrehozása
  console.log('Creating users...');
  
  const user1 = await prisma.user.create({
    data: {
      name: 'Kiss János',
      email: 'kiss.janos@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.VETERAN,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Nagy Katalin',
      email: 'nagy.katalin@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.TRUSTED,
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Szabó Péter',
      email: 'szabo.peter@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.NEWCOMER,
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Tóth Anna',
      email: 'toth.anna@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.TRUSTED,
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: 'Horváth Gábor',
      email: 'horvath.gabor@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.NEWCOMER,
    },
  });

  console.log(`✅ Created ${5} users`);

  // 2. Listings létrehozása
  console.log('Creating listings...');

  // OFFER típusú hirdetések
  const listing1 = await prisma.listing.create({
    data: {
      title: 'Használt laptop eladó',
      description: 'Dell XPS 13, 2 éves, kiváló állapotban. 16GB RAM, 512GB SSD, Intel i7 processzor.',
      category: 'Elektronika',
      type: ListingType.OFFER,
      userId: user1.id,
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      title: 'Kerékpár javítás szolgáltatás',
      description: 'Szakszerű kerékpár szerelés, javítás. Hétvégén is elérhető. Kiszállás Budapesten belül.',
      category: 'Szolgáltatás',
      type: ListingType.OFFER,
      userId: user2.id,
    },
  });

  const listing3 = await prisma.listing.create({
    data: {
      title: 'Házi készítésű lekvár',
      description: 'Bio alapanyagokból készült baracklekvár és szilvalekvár. 500g-os üvegekben.',
      category: 'Élelmiszer',
      type: ListingType.OFFER,
      userId: user1.id,
    },
  });

  const listing4 = await prisma.listing.create({
    data: {
      title: 'Programozás oktatás kezdőknek',
      description: 'Python és JavaScript alapok tanítása online vagy személyesen. Egyéni órák.',
      category: 'Oktatás',
      type: ListingType.OFFER,
      userId: user4.id,
    },
  });

  const listing5 = await prisma.listing.create({
    data: {
      title: 'Antik könyvek gyűjteménye',
      description: 'Régi magyar és világirodalmi könyvek. 1920-1950 közötti kiadások.',
      category: 'Könyv',
      type: ListingType.OFFER,
      userId: user2.id,
    },
  });

  // REQUEST típusú hirdetések
  const listing6 = await prisma.listing.create({
    data: {
      title: 'Keresek használt játékkonzolt',
      description: 'PlayStation 4 vagy Xbox One konzolt keresek jó állapotban. Kontrollerekkel együtt.',
      category: 'Elektronika',
      type: ListingType.REQUEST,
      userId: user3.id,
    },
  });

  const listing7 = await prisma.listing.create({
    data: {
      title: 'Költözködéshez segítség kell',
      description: 'Hétvégén költözöm, keresek 2-3 embert aki segít. Fizetés megbeszélés szerint.',
      category: 'Szolgáltatás',
      type: ListingType.REQUEST,
      userId: user5.id,
    },
  });

  const listing8 = await prisma.listing.create({
    data: {
      title: 'Angol tanár kerestetik',
      description: 'Középhaladó szintű angol tudás fejlesztéséhez keresek magántanárt.',
      category: 'Oktatás',
      type: ListingType.REQUEST,
      userId: user3.id,
    },
  });

  const listing9 = await prisma.listing.create({
    data: {
      title: 'Kerti szerszámok kölcsönkérése',
      description: 'Fűnyíró és sövényvágó kellene 1-2 napra. Ügyelek rá, visszaadom tisztán.',
      category: 'Kert',
      type: ListingType.REQUEST,
      userId: user5.id,
    },
  });

  const listing10 = await prisma.listing.create({
    data: {
      title: 'Baby sitter kerestetik',
      description: '3 éves gyerekemhez keresek megbízható baby sittert alkalmanként este.',
      category: 'Szolgáltatás',
      type: ListingType.REQUEST,
      userId: user4.id,
    },
  });

  console.log(`✅ Created ${10} listings`);

  // 3. Transactions létrehozása
  console.log('Creating transactions...');

  const transaction1 = await prisma.transaction.create({
    data: {
      userId: user3.id,
      listingId: listing1.id,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      userId: user4.id,
      listingId: listing2.id,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction3 = await prisma.transaction.create({
    data: {
      userId: user5.id,
      listingId: listing3.id,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction4 = await prisma.transaction.create({
    data: {
      userId: user1.id,
      listingId: listing6.id,
      status: TransactionStatus.PENDING,
    },
  });

  const transaction5 = await prisma.transaction.create({
    data: {
      userId: user2.id,
      listingId: listing7.id,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction6 = await prisma.transaction.create({
    data: {
      userId: user3.id,
      listingId: listing4.id,
      status: TransactionStatus.CANCELLED,
    },
  });

  const transaction7 = await prisma.transaction.create({
    data: {
      userId: user4.id,
      listingId: listing5.id,
      status: TransactionStatus.PENDING,
    },
  });

  console.log(`✅ Created ${7} transactions`);

  // 4. Reviews létrehozása (csak COMPLETED tranzakciókhoz)
  console.log('Creating reviews...');

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Kiváló laptop, pontosan a leírásnak megfelelő állapotban. Gyors és korrekt ügyintézés. Ajánlom!',
      userId: user3.id,
      transactionId: transaction1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Profi szakember, gyorsan és szakszerűen megjavította a biciklit. Tiszta munka!',
      userId: user4.id,
      transactionId: transaction2.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Finom lekvár, természetes íz. Kicsit drágább, de megéri. Legközelebb is tőle veszek.',
      userId: user5.id,
      transactionId: transaction3.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Nagyon segítőkész volt a költözésnél. Megbízható, erős srác. Csak ajánlani tudom!',
      userId: user5.id,
      transactionId: transaction5.id,
    },
  });

  console.log(`✅ Created ${4} reviews`);

  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - ${5} users created`);
  console.log(`   - ${10} listings created (${5} OFFER, ${5} REQUEST)`);
  console.log(`   - ${7} transactions created`);
  console.log(`   - ${4} reviews created`);
  console.log('');
  console.log('🔑 Test login credentials:');
  console.log('   Email: kiss.janos@example.com');
  console.log('   Password: Password123!');
  console.log('');
  console.log('   (All users have the same password: Password123!)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:');
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });