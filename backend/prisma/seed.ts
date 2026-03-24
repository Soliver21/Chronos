import { PrismaClient, TrustLevel, ListingType, TransactionStatus, Role } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as argon2 from 'argon2';

const databaseUrl = process.env.DATABASE_URL || 'mysql://root:root@mysql:3306/chronos';

const adapter = new PrismaMariaDb(databaseUrl);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🌱 Seeding database...');


  console.log('Hashing passwords with argon2...');
  const hashedPassword = await argon2.hash('Password123!');


  console.log('Creating categories...');
  
  const catHomeMaintenance = await prisma.listingCategory.create({
    data: { name: 'Home & Maintenance', slug: 'home-maintenance', imageUrl: '/uploads/categories/Home%20%26%20Maintenance.jpg' },
  });

  const catTutoringEducation = await prisma.listingCategory.create({
    data: { name: 'Tutoring & Education', slug: 'tutoring-education', imageUrl: '/uploads/categories/Tutoring%20%26%20Education.jpg' },
  });

  const catITTechHelp = await prisma.listingCategory.create({
    data: { name: 'IT & Tech Help', slug: 'it-tech-help', imageUrl: '/uploads/categories/IT%20%26%20Tech%20Help.jpg' },
  });

  const catErrandsDelivery = await prisma.listingCategory.create({
    data: { name: 'Errands & Delivery', slug: 'errands-delivery', imageUrl: '/uploads/categories/Errands%20%26%20Delivery.jpg' },
  });

  const catChildcareBabysitting = await prisma.listingCategory.create({
    data: { name: 'Childcare & Babysitting', slug: 'childcare-babysitting', imageUrl: '/uploads/categories/Childcare%20%26%20Babysitting.jpg' },
  });

  const catElderlyCare = await prisma.listingCategory.create({
    data: { name: 'Elderly Care & Assistance', slug: 'elderly-care', imageUrl: '/uploads/categories/Elderly%20Care%20%26%20Assistance.jpg' },
  });

  const catHealthWellness = await prisma.listingCategory.create({
    data: { name: 'Health & Wellness', slug: 'health-wellness', imageUrl: '/uploads/categories/health%20%26%20wellness.jpg' },
  });

  const catCreativeDesign = await prisma.listingCategory.create({
    data: { name: 'Creative & Design', slug: 'creative-design', imageUrl: '/uploads/categories/Creative%20%26%20Design.jpg' },
  });

  const catEventsEntertainment = await prisma.listingCategory.create({
    data: { name: 'Events & Entertainment', slug: 'events-entertainment', imageUrl: '/uploads/categories/events%26entertainment.jpg' },
  });

  const catVehiclesTransport = await prisma.listingCategory.create({
    data: { name: 'Vehicles & Transport', slug: 'vehicles-transport', imageUrl: '/uploads/categories/vechile%26transport.png' },
  });

  const catMiscellaneous = await prisma.listingCategory.create({
    data: { name: 'Miscellaneous', slug: 'miscellaneous', imageUrl: '/uploads/categories/vegyes.jpg' },
  });

  console.log(`✅ Created ${11} categories`);


  console.log('Creating admin user...');

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@chronos.com',
      password: hashedPassword,
      role: Role.ADMIN,
      trustLevel: TrustLevel.VETERAN,
      bio: 'Platform administrator.',
      balance: 100,
    },
  });

  console.log('✅ Created admin user (admin@chronos.com)');


  console.log('Creating users...');

  const user1 = await prisma.user.create({
    data: {
      name: 'Kiss János',
      email: 'kiss.janos@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.VETERAN,
      bio: 'Tapasztalt kereskedő, 5 éve aktív a platformon. Megbízható partner!',
      avatar: 'https://i.pravatar.cc/150?img=12',
      balance: 120,
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
      balance: 12,
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
      balance: 5,
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
      balance: 10,
    },
  });

  const user5 = await prisma.user.create({
    data: {
      name: 'Horváth Gábor',
      email: 'horvath.gabor@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.NEWCOMER,
      bio: null, 
      avatar: null, 
      balance: 8,
    },
  });

  console.log(`✅ Created ${5} users (all passwords: Password123!)`);


  console.log('Creating listings...');


  const listing1 = await prisma.listing.create({
    data: {
      title: 'Használt Dell laptop eladó',
      description: 'Dell XPS 13 (2022), 2 éves, kiváló állapotban. Specifikációk: 16GB RAM, 512GB SSD, Intel i7-1165G7 processzor, Full HD kijelző. Eredeti doboz és töltő járnak hozzá. Ár: csere másik eszközre vagy ajánlatot várok.',
      categoryId: catITTechHelp.id,
      type: ListingType.OFFER,
      pricePerHour: 5,
      estimatedHours: 1,
      userId: user1.id,
    },
  });

  const listing2 = await prisma.listing.create({
    data: {
      title: 'Kerékpár javítás és szerelés',
      description: 'Profi kerékpár szerelés, javítás Budapesten. Hétvégén is elérhető. Kiszállás a XIII. kerületben ingyen, egyébként szállítási díj. Gumiabroncs csere, fék- és váltóbeállítás, lánc tisztítás és kenés.',
      categoryId: catHomeMaintenance.id,
      type: ListingType.OFFER,
      pricePerHour: 8,
      estimatedHours: 2,
      userId: user2.id,
    },
  });

  const listing3 = await prisma.listing.create({
    data: {
      title: 'Bio házi lekvár',
      description: 'Házi készítésű baracklekvár és szilvalekvár. Bio alapanyagokból, cukormentesen készült (csak gyümölcsből). 500g-os befőttes üvegekben. Tartósítószer-mentes, természetes íz. Elcserélném más házi készítésű termékre.',
      categoryId: catMiscellaneous.id,
      type: ListingType.OFFER,
      pricePerHour: 3,
      estimatedHours: 1,
      userId: user1.id,
    },
  });

  const listing4 = await prisma.listing.create({
    data: {
      title: 'Python programozás oktatás',
      description: 'Egyéni Python és JavaScript oktatás kezdőknek és haladóknak. Online vagy személyesen Budapesten. Gyakorlatorientált tanítás, projektekkel. Első óra ingyenes konzultáció. Rugalmas időbeosztás.',
      categoryId: catTutoringEducation.id,
      type: ListingType.OFFER,
      pricePerHour: 10,
      estimatedHours: 2,
      userId: user4.id,
    },
  });

  const listing5 = await prisma.listing.create({
    data: {
      title: 'Antik könyvek gyűjteménye',
      description: 'Régi magyar és világirodalmi könyvek. 1920-1950 közötti kiadások. Jó állapotban megőrzött példányok: Petőfi, Arany János, József Attila művek. Eladó vagy elcserélném más régi könyvekre.',
      categoryId: catMiscellaneous.id,
      type: ListingType.OFFER,
      pricePerHour: 4,
      estimatedHours: 1,
      userId: user2.id,
    },
  });


  const listing6 = await prisma.listing.create({
    data: {
      title: 'PlayStation 4 vagy Xbox One kerestetik',
      description: 'Használt PlayStation 4 vagy Xbox One konzolt keresek jó állapotban. Előnyben részesítem, ha kontrollerekkel és néhány játékkal együtt. Budapesten személyes átvétel. Fizetés készpénzben vagy csere másra.',
      categoryId: catITTechHelp.id,
      type: ListingType.REQUEST,
      pricePerHour: 6,
      estimatedHours: 1,
      userId: user3.id,
    },
  });

  const listing7 = await prisma.listing.create({
    data: {
      title: 'Költözködéshez segítség kell',
      description: 'Április 15-én, szombaton délután költözöm a XIII. kerületből a VI. kerületbe. Keresek 2-3 embert aki segít pakolásban és szállításban. Van saját teherautóm. Fizetés megbeszélés szerint vagy csere szolgáltatásra.',
      categoryId: catErrandsDelivery.id,
      type: ListingType.REQUEST,
      pricePerHour: 7,
      estimatedHours: 4,
      userId: user5.id,
    },
  });

  const listing8 = await prisma.listing.create({
    data: {
      title: 'Angol magántanár kerestetik',
      description: 'Középhaladó szintű angol tudásom szeretném fejleszteni, különösen a beszédkészségemet. Heti 2 alkalommal, 1-1,5 órás foglalkozások. Online vagy személyesen Budapesten. Cserébe programozás oktatást tudok nyújtani.',
      categoryId: catTutoringEducation.id,
      type: ListingType.REQUEST,
      pricePerHour: 9,
      estimatedHours: 2,
      userId: user3.id,
    },
  });

  const listing9 = await prisma.listing.create({
    data: {
      title: 'Kerti szerszámok kölcsönkérése',
      description: 'Fűnyíró és sövényvágó kellene április közepére, 2-3 napra. Tavaszi nagytakarítás lesz a kertben. Budapesten élünk (XIV. kerület). Természetesen ügyelek rá és tisztán adom vissza. Kölcsönzési díjat vagy csereszolgáltatást tudok ajánlani.',
      categoryId: catHomeMaintenance.id,
      type: ListingType.REQUEST,
      pricePerHour: 5,
      estimatedHours: 3,
      userId: user5.id,
    },
  });

  const listing10 = await prisma.listing.create({
    data: {
      title: 'Baby sitter kerestetik',
      description: '3 éves kislányomhoz keresek megbízható, tapasztalt baby sittert alkalmanként esténként (általában hékvégén). Budapesten, XIII. kerületben. Referenciát kérek. Óradíjas fizetés vagy esetleg csere más szolgáltatásra.',
      categoryId: catChildcareBabysitting.id,
      type: ListingType.REQUEST,
      pricePerHour: 8,
      estimatedHours: 3,
      userId: user4.id,
    },
  });

  console.log(`✅ Created ${10} listings (${5} OFFER, ${5} REQUEST)`);


  console.log('Creating transactions...');

  const transaction1 = await prisma.transaction.create({
    data: {
      clientId: user3.id,
      providerId: listing1.userId,
      listingId: listing1.id,
      agreedHours: 2,
      totalPrice: 100,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction2 = await prisma.transaction.create({
    data: {
      clientId: user4.id,
      providerId: listing2.userId,
      listingId: listing2.id,
      agreedHours: 3,
      totalPrice: 150,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction3 = await prisma.transaction.create({
    data: {
      clientId: user5.id,
      providerId: listing3.userId,
      listingId: listing3.id,
      agreedHours: 4,
      totalPrice: 200,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction4 = await prisma.transaction.create({
    data: {
      clientId: user1.id,
      providerId: listing6.userId,
      listingId: listing6.id,
      agreedHours: 2,
      totalPrice: 80,
      status: TransactionStatus.PENDING,
    },
  });

  const transaction5 = await prisma.transaction.create({
    data: {
      clientId: user2.id,
      providerId: listing7.userId,
      listingId: listing7.id,
      agreedHours: 5,
      totalPrice: 250,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction6 = await prisma.transaction.create({
    data: {
      clientId: user3.id,
      providerId: listing4.userId,
      listingId: listing4.id,
      agreedHours: 3,
      totalPrice: 120,
      status: TransactionStatus.CANCELLED,
    },
  });

  const transaction7 = await prisma.transaction.create({
    data: {
      clientId: user4.id,
      providerId: listing5.userId,
      listingId: listing5.id,
      agreedHours: 2,
      totalPrice: 90,
      status: TransactionStatus.PENDING,
    },
  });

  const transaction8 = await prisma.transaction.create({
    data: {
      clientId: user1.id,
      providerId: listing4.userId,
      listingId: listing4.id,
      agreedHours: 2,
      totalPrice: 100,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction9 = await prisma.transaction.create({
    data: {
      clientId: user3.id,
      providerId: listing2.userId,
      listingId: listing2.id,
      agreedHours: 1,
      totalPrice: 50,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction10 = await prisma.transaction.create({
    data: {
      clientId: user2.id,
      providerId: listing4.userId,
      listingId: listing4.id,
      agreedHours: 3,
      totalPrice: 150,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction11 = await prisma.transaction.create({
    data: {
      clientId: user2.id,
      providerId: listing1.userId,
      listingId: listing1.id,
      agreedHours: 1,
      totalPrice: 50,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction12 = await prisma.transaction.create({
    data: {
      clientId: user4.id,
      providerId: listing3.userId,
      listingId: listing3.id,
      agreedHours: 2,
      totalPrice: 60,
      status: TransactionStatus.COMPLETED,
    },
  });

  const transaction13 = await prisma.transaction.create({
    data: {
      clientId: user5.id,
      providerId: listing1.userId,
      listingId: listing1.id,
      agreedHours: 1,
      totalPrice: 50,
      status: TransactionStatus.COMPLETED,
    },
  });

  console.log(`✅ Created ${13} transactions`);


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
      userId: user2.id,
      transactionId: transaction5.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Anna kiváló tanár! Türelmes, érthetően magyaráz, és rengeteg hasznos példát hoz. Az első foglalkozás után máris sokat fejlődtem. Csak ajánlani tudom!',
      userId: user1.id,
      transactionId: transaction8.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Katalin szakszerűen javította a kerékpáromat, mindent alaposan átnézett. Kicsit tovább tartott a vártnál, de az eredménnyel nagyon elégedett vagyok.',
      userId: user3.id,
      transactionId: transaction9.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Tóth Anna az egyik legjobb oktatóm. Rugalmas, felkészült, és mindig az én tempómhoz igazodott. Folytatom vele a tanulást!',
      userId: user2.id,
      transactionId: transaction10.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'János gyorsan és korrektül intézte az ügyet. A laptop pontosan olyan volt, ahogy leírta. Megbízható eladó, legközelebb is tőle vennék.',
      userId: user2.id,
      transactionId: transaction11.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'A házi lekvár fenomenális volt! Természetes, édes, tele van ízzel. Már rendeltem is belőle másodszor. János nagyon kedves és megbízható.',
      userId: user4.id,
      transactionId: transaction12.id,
    },
  });

  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Rendben volt minden, a laptop jó állapotban volt. Kicsit nehéz volt az időpontot egyeztetni, de végül gördülékenyen ment. Ajánlom.',
      userId: user5.id,
      transactionId: transaction13.id,
    },
  });

  console.log(`✅ Created ${10} reviews`);


  console.log('Creating website reviews...');

  await prisma.websiteReview.create({
    data: {
      rating: 5,
      comment: 'Fantasztikus platform! Sikerült megtalálnom egy megbízható kerékpárszerelőt, aki gyorsan és olcsón megoldotta a problémámat. Mindenkinek ajánlom!',
      userId: user3.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 5,
      comment: 'Nagyon jó ötlet ez a platform. Könnyen lehet cserélni szolgáltatásokat, és mindenki megbízható. Már több sikeres cserém volt, és nagyon elégedett vagyok.',
      userId: user4.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 4,
      comment: 'Jó platform, egyszerű a használata. Néhány funkciót még lehetne fejleszteni, de összességében nagyon hasznos. Sokat segített a szomszédokkal való kapcsolatban.',
      userId: user5.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 5,
      comment: 'Remek közösség! Az emberek segítőkészek és megbízhatók. Az oldal könnyen kezelhető, és az értékelési rendszer sokat segít a döntésben.',
      userId: user1.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 4,
      comment: 'Nagyon praktikus megoldás a helyi cserékre és szolgáltatásokra. Örülök, hogy rátaláltam erre az oldalra!',
      userId: user2.id,
    },
  });

  console.log(`✅ Created ${5} website reviews`);

  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - ${11} categories created`);
  console.log(`   - 1 admin user created`);
  console.log(`   - ${5} regular users created`);
  console.log(`   - ${10} listings created (${5} OFFER, ${5} REQUEST)`);
  console.log(`   - ${13} transactions created`);
  console.log(`   - ${10} reviews created`);
  console.log(`   - ${5} website reviews created`);
  console.log('');
  console.log('🔐 All users have the same password: Password123!');
  console.log('');
  console.log('🛡️  Admin User:');
  console.log('   0. admin@chronos.com (ADMIN, balance: 100)');
  console.log('');
  console.log('👥 Test Users:');
  console.log('   1. kiss.janos@example.com (VETERAN, balance: 120)');
  console.log('   2. nagy.katalin@example.com (TRUSTED, balance: 12)');
  console.log('   3. szabo.peter@example.com (NEWCOMER, balance: 5)');
  console.log('   4. toth.anna@example.com (TRUSTED, balance: 10)');
  console.log('   5. horvath.gabor@example.com (NEWCOMER, balance: 8)');
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