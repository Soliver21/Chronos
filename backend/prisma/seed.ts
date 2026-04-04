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
    data: { name: 'Otthon és karbantartás', slug: 'home-maintenance', imageUrl: '/uploads/categories/Home%20%26%20Maintenance.jpg' },
  });

  const catTutoringEducation = await prisma.listingCategory.create({
    data: { name: 'Támogatás és oktatás', slug: 'tutoring-education', imageUrl: '/uploads/categories/Tutoring%20%26%20Education.jpg' },
  });

  const catITTechHelp = await prisma.listingCategory.create({
    data: { name: 'Informatikai és technikai segítség', slug: 'it-tech-help', imageUrl: '/uploads/categories/IT%20%26%20Tech%20Help.jpg' },
  });

  const catErrandsDelivery = await prisma.listingCategory.create({
    data: { name: 'Futárkodás és ház körüli feladatok', slug: 'errands-delivery', imageUrl: '/uploads/categories/Errands%20%26%20Delivery.jpg' },
  });

  const catChildcareBabysitting = await prisma.listingCategory.create({
    data: { name: 'Gyermekgondozás és bébiszitterkedés', slug: 'childcare-babysitting', imageUrl: '/uploads/categories/Childcare%20%26%20Babysitting.jpg' },
  });

  const catElderlyCare = await prisma.listingCategory.create({
    data: { name: 'Idősgondozás és segítség', slug: 'elderly-care', imageUrl: '/uploads/categories/Elderly%20Care%20%26%20Assistance.jpg' },
  });

  const catHealthWellness = await prisma.listingCategory.create({
    data: { name: 'Egészséggondozás', slug: 'health-wellness', imageUrl: '/uploads/categories/health%20%26%20wellness.jpg' },
  });

  const catCreativeDesign = await prisma.listingCategory.create({
    data: { name: 'Kreatív és design', slug: 'creative-design', imageUrl: '/uploads/categories/Creative%20%26%20Design.jpg' },
  });

  const catEventsEntertainment = await prisma.listingCategory.create({
    data: { name: 'Események és szórakozás', slug: 'events-entertainment', imageUrl: '/uploads/categories/events%26entertainment.jpg' },
  });

  const catVehiclesTransport = await prisma.listingCategory.create({
    data: { name: 'Járművek és szállítás', slug: 'vehicles-transport', imageUrl: '/uploads/categories/vechile%26transport.png' },
  });

  const catMiscellaneous = await prisma.listingCategory.create({
    data: { name: 'Egyéb', slug: 'miscellaneous', imageUrl: '/uploads/categories/vegyes.jpg' },
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
      avatar: '/uploads/kiss.janos.jpg',
      balance: 120,
      createdAt: new Date('2026-02-25T09:14:00'),
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Nagy Katalin',
      email: 'nagy.katalin@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.TRUSTED,
      bio: 'Szeretek segíteni másoknak. Kerékpár-specialista vagyok.',
      avatar: '/uploads/nagy.katalin.jpg',
      balance: 12,
      createdAt: new Date('2026-03-01T11:30:00'),
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Szabó Péter',
      email: 'szabo.peter@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.NEWCOMER,
      bio: 'Új vagyok itt, de lelkes! Várom a jó ajánlatokat.',
      avatar: '/uploads/szabo.peter.jpg',
      balance: 5,
      createdAt: new Date('2026-03-05T14:22:00'),
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Tóth Anna',
      email: 'toth.anna@example.com',
      password: hashedPassword,
      trustLevel: TrustLevel.TRUSTED,
      bio: 'Tanár vagyok, szívesen tanítok programozást kezdőknek.',
      avatar: '/uploads/toth.anna.jpg',
      balance: 10,
      createdAt: new Date('2026-03-10T08:45:00'),
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
      createdAt: new Date('2026-03-18T16:05:00'),
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

  // transaction1: COMPLETED – user3 → user1, listing1 (Dell laptop)
  const transaction1 = await prisma.transaction.create({
    data: {
      clientId: user3.id,
      providerId: listing1.userId,
      listingId: listing1.id,
      agreedHours: 2,
      totalPrice: 100,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing1.title,
      listingDescription: listing1.description,
      listingType: listing1.type,
      createdAt: new Date('2026-03-06T10:00:00'),
      completedAt: new Date('2026-03-07T15:30:00'),
      updatedAt: new Date('2026-03-07T15:30:00'),
    },
  });

  // transaction2: COMPLETED – user4 → user2, listing2 (kerékpár javítás)
  const transaction2 = await prisma.transaction.create({
    data: {
      clientId: user4.id,
      providerId: listing2.userId,
      listingId: listing2.id,
      agreedHours: 3,
      totalPrice: 150,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing2.title,
      listingDescription: listing2.description,
      listingType: listing2.type,
      createdAt: new Date('2026-03-12T09:00:00'),
      completedAt: new Date('2026-03-13T14:00:00'),
      updatedAt: new Date('2026-03-13T14:00:00'),
    },
  });

  // transaction3: COMPLETED – user5 → user1, listing3 (bio házi lekvár)
  const transaction3 = await prisma.transaction.create({
    data: {
      clientId: user5.id,
      providerId: listing3.userId,
      listingId: listing3.id,
      agreedHours: 4,
      totalPrice: 200,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing3.title,
      listingDescription: listing3.description,
      listingType: listing3.type,
      createdAt: new Date('2026-03-20T11:00:00'),
      completedAt: new Date('2026-03-21T16:00:00'),
      updatedAt: new Date('2026-03-21T16:00:00'),
    },
  });

  // transaction4: PENDING – user1 → user3, listing6 (PS4/Xbox kerestetik)
  const transaction4 = await prisma.transaction.create({
    data: {
      clientId: user1.id,
      providerId: listing6.userId,
      listingId: listing6.id,
      agreedHours: 2,
      totalPrice: 80,
      status: TransactionStatus.PENDING,
      listingTitle: listing6.title,
      listingDescription: listing6.description,
      listingType: listing6.type,
      createdAt: new Date('2026-03-25T13:00:00'),
      updatedAt: new Date('2026-03-25T13:00:00'),
    },
  });

  // transaction5: COMPLETED – user2 → user5, listing7 (költözős segítség)
  const transaction5 = await prisma.transaction.create({
    data: {
      clientId: user2.id,
      providerId: listing7.userId,
      listingId: listing7.id,
      agreedHours: 5,
      totalPrice: 250,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing7.title,
      listingDescription: listing7.description,
      listingType: listing7.type,
      createdAt: new Date('2026-03-19T08:00:00'),
      completedAt: new Date('2026-03-19T18:00:00'),
      updatedAt: new Date('2026-03-19T18:00:00'),
    },
  });

  // transaction6: CANCELLED – user3 → user4, listing4 (Python oktatás)
  const transaction6 = await prisma.transaction.create({
    data: {
      clientId: user3.id,
      providerId: listing4.userId,
      listingId: listing4.id,
      agreedHours: 3,
      totalPrice: 120,
      status: TransactionStatus.CANCELLED,
      listingTitle: listing4.title,
      listingDescription: listing4.description,
      listingType: listing4.type,
      createdAt: new Date('2026-03-08T10:00:00'),
      cancelledAt: new Date('2026-03-10T09:00:00'),
      updatedAt: new Date('2026-03-10T09:00:00'),
    },
  });

  // transaction7: PENDING – user4 → user2, listing5 (antik könyvek)
  const transaction7 = await prisma.transaction.create({
    data: {
      clientId: user4.id,
      providerId: listing5.userId,
      listingId: listing5.id,
      agreedHours: 2,
      totalPrice: 90,
      status: TransactionStatus.PENDING,
      listingTitle: listing5.title,
      listingDescription: listing5.description,
      listingType: listing5.type,
      createdAt: new Date('2026-03-26T14:30:00'),
      updatedAt: new Date('2026-03-26T14:30:00'),
    },
  });

  // transaction8: COMPLETED – user1 → user4, listing4 (Python oktatás)
  const transaction8 = await prisma.transaction.create({
    data: {
      clientId: user1.id,
      providerId: listing4.userId,
      listingId: listing4.id,
      agreedHours: 2,
      totalPrice: 100,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing4.title,
      listingDescription: listing4.description,
      listingType: listing4.type,
      createdAt: new Date('2026-03-14T10:00:00'),
      completedAt: new Date('2026-03-15T12:00:00'),
      updatedAt: new Date('2026-03-15T12:00:00'),
    },
  });

  // transaction9: COMPLETED – user3 → user2, listing2 (kerékpár javítás)
  const transaction9 = await prisma.transaction.create({
    data: {
      clientId: user3.id,
      providerId: listing2.userId,
      listingId: listing2.id,
      agreedHours: 1,
      totalPrice: 50,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing2.title,
      listingDescription: listing2.description,
      listingType: listing2.type,
      createdAt: new Date('2026-03-07T09:00:00'),
      completedAt: new Date('2026-03-07T11:30:00'),
      updatedAt: new Date('2026-03-07T11:30:00'),
    },
  });

  // transaction10: COMPLETED – user2 → user4, listing4 (Python oktatás)
  const transaction10 = await prisma.transaction.create({
    data: {
      clientId: user2.id,
      providerId: listing4.userId,
      listingId: listing4.id,
      agreedHours: 3,
      totalPrice: 150,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing4.title,
      listingDescription: listing4.description,
      listingType: listing4.type,
      createdAt: new Date('2026-03-15T14:00:00'),
      completedAt: new Date('2026-03-16T17:00:00'),
      updatedAt: new Date('2026-03-16T17:00:00'),
    },
  });

  // transaction11: COMPLETED – user2 → user1, listing1 (Dell laptop)
  const transaction11 = await prisma.transaction.create({
    data: {
      clientId: user2.id,
      providerId: listing1.userId,
      listingId: listing1.id,
      agreedHours: 1,
      totalPrice: 50,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing1.title,
      listingDescription: listing1.description,
      listingType: listing1.type,
      createdAt: new Date('2026-03-03T10:00:00'),
      completedAt: new Date('2026-03-03T13:00:00'),
      updatedAt: new Date('2026-03-03T13:00:00'),
    },
  });

  // transaction12: COMPLETED – user4 → user1, listing3 (bio házi lekvár)
  const transaction12 = await prisma.transaction.create({
    data: {
      clientId: user4.id,
      providerId: listing3.userId,
      listingId: listing3.id,
      agreedHours: 2,
      totalPrice: 60,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing3.title,
      listingDescription: listing3.description,
      listingType: listing3.type,
      createdAt: new Date('2026-03-11T11:00:00'),
      completedAt: new Date('2026-03-12T10:00:00'),
      updatedAt: new Date('2026-03-12T10:00:00'),
    },
  });

  // transaction13: COMPLETED – user5 → user1, listing1 (Dell laptop)
  const transaction13 = await prisma.transaction.create({
    data: {
      clientId: user5.id,
      providerId: listing1.userId,
      listingId: listing1.id,
      agreedHours: 1,
      totalPrice: 50,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing1.title,
      listingDescription: listing1.description,
      listingType: listing1.type,
      createdAt: new Date('2026-03-22T09:00:00'),
      completedAt: new Date('2026-03-22T12:00:00'),
      updatedAt: new Date('2026-03-22T12:00:00'),
    },
  });

  // Extra tranzakciók Kiss Jánosnak (provider) az értékelések teszteléséhez
  // transaction14: COMPLETED – user2 → user1, listing3
  const transaction14 = await prisma.transaction.create({
    data: {
      clientId: user2.id,
      providerId: user1.id,
      listingId: listing3.id,
      agreedHours: 1,
      totalPrice: 30,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing3.title,
      listingDescription: listing3.description,
      listingType: listing3.type,
      createdAt: new Date('2026-03-04T10:00:00'),
      completedAt: new Date('2026-03-04T12:30:00'),
      updatedAt: new Date('2026-03-04T12:30:00'),
    },
  });

  // transaction15: COMPLETED – user4 → user1, listing1
  const transaction15 = await prisma.transaction.create({
    data: {
      clientId: user4.id,
      providerId: user1.id,
      listingId: listing1.id,
      agreedHours: 1,
      totalPrice: 50,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing1.title,
      listingDescription: listing1.description,
      listingType: listing1.type,
      createdAt: new Date('2026-03-13T09:00:00'),
      completedAt: new Date('2026-03-13T11:00:00'),
      updatedAt: new Date('2026-03-13T11:00:00'),
    },
  });

  // transaction16: COMPLETED – user3 → user1, listing3
  const transaction16 = await prisma.transaction.create({
    data: {
      clientId: user3.id,
      providerId: user1.id,
      listingId: listing3.id,
      agreedHours: 2,
      totalPrice: 60,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing3.title,
      listingDescription: listing3.description,
      listingType: listing3.type,
      createdAt: new Date('2026-03-09T14:00:00'),
      completedAt: new Date('2026-03-10T10:00:00'),
      updatedAt: new Date('2026-03-10T10:00:00'),
    },
  });

  // transaction17: COMPLETED – user5 → user1, listing1
  const transaction17 = await prisma.transaction.create({
    data: {
      clientId: user5.id,
      providerId: user1.id,
      listingId: listing1.id,
      agreedHours: 1,
      totalPrice: 50,
      status: TransactionStatus.COMPLETED,
      listingTitle: listing1.title,
      listingDescription: listing1.description,
      listingType: listing1.type,
      createdAt: new Date('2026-03-23T10:00:00'),
      completedAt: new Date('2026-03-23T13:00:00'),
      updatedAt: new Date('2026-03-23T13:00:00'),
    },
  });

  console.log(`✅ Created ${17} transactions`);


  console.log('Creating reviews...');

  // userId = a KAPOTT értékelés tulajdonosa (a reviewed person = provider)
  // transaction1: client=user3, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Kiváló laptop, pontosan a leírásnak megfelelő állapotban. A találkozó is gördülékeny volt, János nagyon korrekt volt. Csak ajánlani tudom mindenkinek!',
      userId: user1.id,
      transactionId: transaction1.id,
    },
  });

  // transaction2: client=user4, provider=user2 (Nagy Katalin) → userId=user2
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Profi szakember! Gyorsan és szakszerűen megjavította a kerékpáromat, most újra tökéletesen működik. Az ár is rendben volt. Legközelebb is hozzá fogok fordulni.',
      userId: user2.id,
      transactionId: transaction2.id,
    },
  });

  // transaction3: client=user5, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Finom, házi lekvár, természetes íz. Kicsit drágának találtam, de a minőség megéri. A csomagolás is gondos volt. Legközelebb is tőle veszek, ha kell lekvár.',
      userId: user1.id,
      transactionId: transaction3.id,
    },
  });

  // transaction5: client=user2, provider=user5 (Horváth Gábor) → userId=user5
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Nagyon segítőkész srác volt! A költözésnél sokat segített, erős és megbízható. Időben érkezett és a munkát gyorsan végezte. Mindenkinek ajánlom!',
      userId: user5.id,
      transactionId: transaction5.id,
    },
  });

  // transaction8: client=user1, provider=user4 (Tóth Anna) → userId=user4
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Anna kiváló tanár! Türelmes, érthetően magyaráz, és rengeteg hasznos példát hoz. Az első foglalkozás után máris sokat fejlődtem. Csak ajánlani tudom!',
      userId: user4.id,
      transactionId: transaction8.id,
    },
  });

  // transaction9: client=user3, provider=user2 (Nagy Katalin) → userId=user2
  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Katalin szakszerűen javította a kerékpáromat, mindent alaposan átnézett. Kicsit tovább tartott a vártnál, de az eredménnyel nagyon elégedett vagyok.',
      userId: user2.id,
      transactionId: transaction9.id,
    },
  });

  // transaction10: client=user2, provider=user4 (Tóth Anna) → userId=user4
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Tóth Anna az egyik legjobb oktatóm. Rugalmas, felkészült, és mindig az én tempómhoz igazodott. Folytatom vele a tanulást!',
      userId: user4.id,
      transactionId: transaction10.id,
    },
  });

  // transaction11: client=user2, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'János gyorsan és korrektül intézte az ügyet. A laptop pontosan olyan volt, ahogy leírta. Megbízható eladó, legközelebb is tőle vennék.',
      userId: user1.id,
      transactionId: transaction11.id,
    },
  });

  // transaction12: client=user4, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'A házi lekvár fenomenális volt! Természetes, édes, tele van ízzel. Már rendeltem is belőle másodszor. János nagyon kedves és megbízható.',
      userId: user1.id,
      transactionId: transaction12.id,
    },
  });

  // transaction13: client=user5, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Rendben volt minden, a laptop jó állapotban volt. Kicsit nehéz volt az időpontot egyeztetni, de végül gördülékenyen ment. Ajánlom.',
      userId: user1.id,
      transactionId: transaction13.id,
    },
  });

  // transaction14: client=user2, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 3,
      comment: 'Közepesen voltam elégedve. A lekvár jó volt, de a kommunikáció lassú volt és az egyeztetés nehézkes. Talán máskor jobb lesz.',
      userId: user1.id,
      transactionId: transaction14.id,
    },
  });

  // transaction15: client=user4, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 2,
      comment: 'Sajnos nem voltam elégedett. A laptop egy-két dologban nem volt olyan, ahogy le volt írva. Nem ajánlom.',
      userId: user1.id,
      transactionId: transaction15.id,
    },
  });

  // transaction16: client=user3, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 5,
      comment: 'Kiváló minőségű lekvár, pontosan amit kerestem! János nagyon barátságos és megbízható partner. Biztosan visszatérek!',
      userId: user1.id,
      transactionId: transaction16.id,
    },
  });

  // transaction17: client=user5, provider=user1 (Kiss János) → userId=user1
  await prisma.review.create({
    data: {
      rating: 4,
      comment: 'Jó tapasztalat volt. A laptop rendben volt, az átadás gördülékeny. Kis késlekedés volt, de összességében ajánlom.',
      userId: user1.id,
      transactionId: transaction17.id,
    },
  });

  console.log(`✅ Created ${13} reviews (9 db Kiss Jánosnak – várható átlag: ~4.0)`);
  // Kiss János értékelései: 5+4+4+5+4+3+2+5+4 = 36 / 9 = 4.0


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

  await prisma.websiteReview.create({
    data: {
      rating: 5,
      comment: 'Eddig mindig megbízható emberekkel találkoztam a platformon. Az értékelési rendszer sokat segít dönteni. Nagyszerű ötlet!',
      userId: user1.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 3,
      comment: 'Jó az ötlet, de néhány funkción még lehetne csiszolni. Az alapvető dolgok viszont jól működnek, és hasznos volt számomra.',
      userId: user3.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 5,
      comment: 'Fantasztikus közösség! Minden tranzakció gördülékenyen ment, és az emberek nagyon segítőkészek voltak. Teljes mértékben ajánlom!',
      userId: user4.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 4,
      comment: 'Egyszerű regisztráció, átlátható felület. Pár napja kezdtem el használni, és már sikeresen csináltam egy cserét. Örülök hogy megtaláltam.',
      userId: user5.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 5,
      comment: 'A Chronos teljesen megváltoztatta, hogyan gondolkodom a szomszédsági segítségről. Mindenki profitál belőle – időt és pénzt spórol.',
      userId: user2.id,
    },
  });

  await prisma.websiteReview.create({
    data: {
      rating: 4,
      comment: 'Nagyon ötletes platform, az időalapú csere rendszer különösen tetszik. Remélem egyre több ember fogja használni!',
      userId: user1.id,
    },
  });

  console.log(`✅ Created ${12} website reviews`);

  console.log('');
  console.log('🎉 Seeding completed successfully!');
  console.log('');
  console.log('📊 Summary:');
  console.log(`   - ${11} categories created`);
  console.log(`   - 1 admin user created`);
  console.log(`   - ${5} regular users created`);
  console.log(`   - ${10} listings created (${5} OFFER, ${5} REQUEST)`);
  console.log(`   - ${17} transactions created`);
  console.log(`   - ${13} reviews created (9 db Kiss Jánosnak, várható átlag: 4.0)`);
  console.log(`   - ${12} website reviews created`);
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