import { PrismaClient, TrustLevel, ListingType, TransactionStatus } from '@prisma/client';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Hash password using argon2 (same as your auth.service.ts)
  console.log('Hashing passwords with argon2...');
  const hashedPassword = await argon2.hash('Password123!');

  // 1. Create Users
  console.log('Creating users...');
  
  const user1 = await prisma.user.create({
    data: {
      name: 'Kiss János',
      email: 'kiss.janos@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.VETERAN,
      bio: 'Tapasztalt kereskedő, 5 éve aktív a platformon. Megbízható partner!',
      avatar: 'https://i.pravatar.cc/150?img=12',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Nagy Katalin',
      email: 'nagy.katalin@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.TRUSTED,
      bio: 'Szeretek segíteni másoknak. Kerékpár-specialista vagyok.',
      avatar: 'https://i.pravatar.cc/150?img=47',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Szabó Péter',
      email: 'szabo.peter@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.NEWCOMER,
      bio: 'Új vagyok itt, de lelkes! Várom a jó ajánlatokat.',
      avatar: 'https://i.pravatar.cc/150?img=33',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Tóth Anna',
      email: 'toth.anna@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.TRUSTED,
      bio: 'Tanár vagyok, szívesen tanítok programozást kezdőknek.',
      avatar: 'https://i.pravatar.cc/150?img=20',
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: 'Horváth Gábor',
      email: 'horvath.gabor@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.NEWCOMER,
      bio: null, // Some users might not have a bio
      avatar: null, // Some users might not have an avatar
    },
  });

  console.log(`✅ Created ${5} users (all passwords: Password123!)`);

  // 2. Create Listings
  console.log('Creating listings...');

  // OFFER type listings
  const listing1 = await prisma.listing.create({
    data: {
      title: 'Használt Dell laptop eladó',
      description: 'Dell XPS 13 (2022), 2 éves, kiváló állapotban. Specifikációk: 16GB RAM, 512GB SSD, Intel i7-1165G7 processzor, Full HD kijelző. Eredeti doboz és töltő járnak hozzá. Ár: csere másik eszközre vagy ajánlatot várok.',
      category: 'Elektronika',
      type: ListingType.OFFER,
      userId: user1.id,
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      title: 'Kerékpár javítás és szerelés',
      description: 'Profi kerékpár szerelés, javítás Budapesten. Hétvégén is elérhető. Kiszállás a XIII. kerületben ingyen, egyébként szállítási díj. Gumiabroncs csere, fék- és váltóbeállítás, lánc tisztítás és kenés.',
      category: 'Szolgáltatás',
      type: ListingType.OFFER,
      userId: user2.id,
    },
  });

  const listing3 = await prisma.listing.create({
    data: {
      title: 'Bio házi lekvár',
      description: 'Házi készítésű baracklekvár és szilvalekvár. Bio alapanyagokból, cukormentesen készült (csak gyümölcsből). 500g-os befőttes üvegekben. Tartósítószer-mentes, természetes íz. Elcserélném más házi készítésű termékre.',
      category: 'Élelmiszer',
      type: ListingType.OFFER,
      userId: user1.id,
    },
  });

  const listing4 = await prisma.listing.create({
    data: {
      title: 'Python programozás oktatás',
      description: 'Egyéni Python és JavaScript oktatás kezdőknek és haladóknak. Online vagy személyesen Budapesten. Gyakorlatorientált tanítás, projektekkel. Első óra ingyenes konzultáció. Rugalmas időbeosztás.',
      category: 'Oktatás',
      type: ListingType.OFFER,
      userId: user4.id,
    },
  });

  const listing5 = await prisma.listing.create({
    data: {
      title: 'Antik könyvek gyűjteménye',
      description: 'Régi magyar és világirodalmi könyvek. 1920-1950 közötti kiadások. Jó állapotban megőrzött példányok: Petőfi, Arany János, József Attila művek. Eladó vagy elcserélném más régi könyvekre.',
      category: 'Könyv',
      type: ListingType.OFFER,
      userId: user2.id,
    },
  });

  // REQUEST type listings
  const listing6 = await prisma.listing.create({
    data: {
      title: 'PlayStation 4 vagy Xbox One kerestetik',
      description: 'Használt PlayStation 4 vagy Xbox One konzolt keresek jó állapotban. Előnyben részesítem, ha kontrollerekkel és néhány játékkal együtt. Budapesten személyes átvétel. Fizetés készpénzben vagy csere másra.',
      category: 'Elektronika',
      type: ListingType.REQUEST,
      userId: user3.id,
    },
  });

  const listing7 = await prisma.listing.create({
    data: {
      title: 'Költözködéshez segítség kell',
      description: 'Április 15-én, szombaton délután költözöm a XIII. kerületből a VI. kerületbe. Keresek 2-3 embert aki segít pakolásban és szállításban. Van saját teherautóm. Fizetés megbeszélés szerint vagy csere szolgáltatásra.',
      category: 'Szolgáltatás',
      type: ListingType.REQUEST,
      userId: user5.id,
    },
  });

  const listing8 = await prisma.listing.create({
    data: {
      title: 'Angol magántanár kerestetik',
      description: 'Középhaladó szintű angol tudásom szeretném fejleszteni, különösen a beszédkészségemet. Heti 2 alkalommal, 1-1,5 órás foglalkozások. Online vagy személyesen Budapesten. Cserébe programozás oktatást tudok nyújtani.',
      category: 'Oktatás',
      type: ListingType.REQUEST,
      userId: user3.id,
    },
  });

  const listing9 = await prisma.listing.create({
    data: {
      title: 'Kerti szerszámok kölcsönkérése',
      description: 'Fűnyíró és sövényvágó kellene április közepére, 2-3 napra. Tavaszi nagytakarítás lesz a kertben. Budapesten élünk (XIV. kerület). Természetesen ügyelek rá és tisztán adom vissza. Kölcsönzési díjat vagy csereszolgáltatást tudok ajánlani.',
      category: 'Kert',
      type: ListingType.REQUEST,
      userId: user5.id,
    },
  });

  const listing10 = await prisma.listing.create({
    data: {
      title: 'Baby sitter kerestetik',
      description: '3 éves kislányomhoz keresek megbízható, tapasztalt baby sittert alkalmanként esténként (általában hétvégén). Budapesten, XIII. kerületben. Referenciát kérek. Óradíjas fizetés vagy esetleg csere más szolgáltatásra.',
      category: 'Szolgáltatás',
      type: ListingType.REQUEST,
      userId: user4.id,
    },
  });

  console.log(`✅ Created ${10} listings (${5} OFFER, ${5} REQUEST)`);

  // 3. Create Transactions
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

  // 4. Create Reviews (only for COMPLETED transactions)
  console.log('Creating reviews...');

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Kiváló laptop, pontosan a leírásnak megfelelő állapotban. A találkozó is gördülékeny volt, János nagyon korrekt volt. Csak ajánlani tudom mindenkinek!',
      userId: user3.id,
      transactionId: transaction1.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Profi szakember! Gyorsan és szakszerűen megjavította a kerékpáromat, most újra tökéletesen működik. Az ár is rendben volt. Legközelebb is hozzá fogok fordulni.',
      userId: user4.id,
      transactionId: transaction2.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Finom, házi lekvár, természetes íz. Kicsit drágának találtam, de a minőség megéri. A csomagolás is gondos volt. Legközelebb is tőle veszek, ha kell lekvár.',
      userId: user5.id,
      transactionId: transaction3.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Nagyon segítőkész srác volt! A költözésnél sokat segített, erős és megbízható. Időben érkezett és a munkát gyorsan végezte. Mindenkinek ajánlom!',
      userId: user5.id,
      transactionId: transaction5.id,
    },
  });

  console.log(`✅ Created ${4} reviews`);

  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - ${5} users created (with bio & avatar)`);
  console.log(`   - ${10} listings created (${5} OFFER, ${5} REQUEST)`);
  console.log(`   - ${7} transactions created`);
  console.log(`   - ${4} reviews created`);
  console.log('');
  console.log('🔐 All users have the same password: Password123!');
  console.log('');
  console.log('👥 Test Users:');
  console.log('   1. kiss.janos@example.com (VETERAN)');
  console.log('   2. nagy.katalin@example.com (TRUSTED)');
  console.log('   3. szabo.peter@example.com (NEWCOMER)');
  console.log('   4. toth.anna@example.com (TRUSTED)');
  console.log('   5. horvath.gabor@example.com (NEWCOMER)');
  console.log('');
  console.log('✨ Ready to test! Login with any email and password: Password123!');
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