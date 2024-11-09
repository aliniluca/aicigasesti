import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';  
const prisma = new PrismaClient();

async function main() {
  // Define categories with subcategories
  const categories: Record<string, string[]> = {
    'Imobiliare': [
      'Apartamente - Garsoniere de vanzare',
      'Apartamente - Garsoniere de inchiriat',
      'Case de vanzare',
      'Case de inchiriat',
      'Terenuri',
      'Birouri - Spatii comerciale',
      'Parcari si Garaje',
      'Depozite si Hale',
      'Schimburi Imobiliare',
      'Caut coleg - Camere de inchiriat',
      'Alte proprietati',
      'Proprietati Internationale'
    ],
    'Auto, Moto și Ambarcațiuni': [
      'Autoturisme',
      'Autoutilitare',
      'Camioane - Rulote - Remorci',
      'Motociclete',
      'Scutere - ATV - UTV',
      'Ambarcatiuni',
      'Utilaje agricole și industriale'
    ],
    'Electronice și electrocasnice': [
      'Telefoane',
      'Videoproiectoare & Accesorii',
      'Îngrijire Personală',
      'Gadgets, Wearables & Camere foto-video',
      'Casa inteligentă - Smarthome',
      'Reparații electrocasnice, electronice și telefoane în Servicii',
      'Electronice',
      'Rețelistică & Servere',
      'Periferice & Accesorii Laptop-PC-Gaming',
      'Drone & Accesorii',
      'Audio Hi-Fi & Profesionale',
      'Tablete - eReadere',
      'Piese telefoane & tablete',
      'Imprimante, scannere',
      'Componente Laptop-PC',
      'Aparate medicale & Wellness',
      'TV',
      'Laptop-Calculator-Gaming',
      'Home Cinema & Audio',
      'Căști Audio',
      'Accesorii telefoane & tablete'
    ],
    "Moda și accesorii": [
        "Haine damă",
        "Încălțăminte damă",
        "Haine bărbați",
        "Încălțăminte bărbați",
        "Accesorii",
        "Ceasuri",
        "Lenjerie și costume de baie damă",
        "Lenjerie și costume de înot bărbați",
        "Haine pentru gravide",
        "Sănătate și frumusețe",
        "Palării, șepci și bandane",
        "Haine pentru nuntă",
        "Alte accesorii de modă și frumusețe",
        "Servicii de înfrumusețare în Servicii",
        "Cadouri"
    ],
    "Piese auto": [
        "Roti - Jante - Anvelope",
        "Consumabile - Accesorii",
        "Caroserie - Interior",
        "Mecanica - Electrica",
        "Alte piese",
        "Alte Vehicule",
        "Vehicule pentru dezmembrare",
        "Piese utilaje industriale",
        "Piese utilaje agricole"
    ],
    "Locuri de munca": [
        "Agenti - consultanti vanzari",
        "Agricultura - Zootehnie",
        "Bone - Menajere",
        "Confectii - Croitori",
        "Cosmeticieni - Frizeri - Saloane",
        "Educatie - Training",
        "Finante - contabilitate",
        "Ingineri - Meseriasi - Constructori",
        "IT - Telecomunicatii",
        "Lucratori productie - depozit - logistica",
        "Marketing - PR - Media",
        "Munca in strainatate",
        "Personal administrativ - secretariat",
        "Personal hotelier - restaurant",
        "Personal medical",
        "Relatii clienti",
        "Evenimente si divertisment",
        "Casieri - Lucratori comerciali",
        "Paza si protectie",
        "Soferi - Servicii auto - Curierat",
        "Resurse Umane",
        "Administrarea Afacerii"
    ],
    'Casa si gradina': [
      'Articole menaj',
      'Constructii',
      'Decoratiuni pentru interior',
      'Finisaj interior',
      'Gradina',
      'Hale metalice, structuri metalice si containere',
      'Iluminat',
      'Instalatii electrice',
      'Instalatii sanitare',
      'Instalatii termice',
      'Mobila',
      'Scule, unelte, feronerie',
      'Meseriasi - Constructori în Servicii',
      'Arta - Obiecte de colectie în Sport, timp liber, arta',
      'Electrocasnice în Electronice si electrocasnice'
    ],
    'Mama si copilul': [
      'Haine - Incaltaminte copii si gravide',
      'La plimbare',
      'Jocuri - Jucarii',
      'Camera copilului',
      'Alimentatie - Ingrijire',
      'Articole scolare - papetarie',
      'Alte produse copii'
    ],
    'Sport, timp si aer liber': [
    'Airsoft',
    'Alergare',
    'Alpinism, escalada',
    'Baschet',
    'Baseball',
    'Biliard',
    'Box',
    'Biciclete – Fitness - Suplimente',
    'Camping',
    'Dans, gimnastica',
    'Drumetie',
    'Echitatie',
    'Fotbal',
    'Genti, trolere',
    'Golf',
    'Karate - Judo',
    'Moto, enduro, atv',
    'Parapanta',
    'Pescuit',
    'Sporturi de apa',
    'Sporturi de iarna',
    'Tenis',
    'Tir cu arcul',
    'Trambuline',
    'Trotinete, role, skateboard',
    'Vanatoare',
    'Volei',
    'Echipamente sportive si de turism',
    'Arta - Obiecte de colectie',
    'Carti - Muzica - Filme',
    'Evenimente - Divertisment'
  ],
     'Agro si industrie': [
       'Utilaje agricole si industriale',
    'Produse piata - alimentatie',
    'Cereale - plante - pomi',
    'Animale domestice si pasari',
    'Echipamente si articole zootehnie'
  ],
       'Servicii': [
 'Servicii Auto - Transport',
    'Meseriasi - Constructori',
    'Reparatii electrocasnice, electronice si telefoane',
    'Evenimente',
    'Cursuri - Meditatii',
    'Servicii specializate si servicii pentru afaceri',
    'Servicii de infrumusetare',
    'Servicii de curatenie',
    'Servicii diverse',
    'Servicii medicale - Servicii de ingrijire - Croitorie'
  ],
         'Cazare - Turism': [
         'Cazare - Turism',
    'Cazare muncitori',
    'Sejururi si oferte de vacanta'
  ]
  };

  for (const [categoryName, subcategoryNames] of Object.entries(categories)) {
    const categorySlug = slugify(categoryName, { lower: true });

    const category = await prisma.category.upsert({
      where: { slug: categorySlug },
      update: {},
      create: { name: categoryName, slug: categorySlug },
    });

    for (const subcategoryName of subcategoryNames) {
      const subcategorySlug = slugify(subcategoryName, { lower: true });

      await prisma.subcategory.upsert({
        where: { slug: subcategorySlug }, // Use slug as a unique identifier
        update: {},
        create: {
          name: subcategoryName,
          slug: subcategorySlug,
          categoryId: category.id,
        },
      });
    }
  }

  // Seed cities (counties)
  const counties = [
    'Alba', 'Arad', 'Arges', 'Bacau', 'Bihor', 'Bistrita-Nasaud',
    'Botosani', 'Braila', 'Brasov', 'Bucuresti', 'Buzau', 'Calarasi',
    'Caras-Severin', 'Cluj', 'Constanta', 'Covasna', 'Dambovita',
    'Dolj', 'Galati', 'Giurgiu', 'Gorj', 'Harghita', 'Hunedoara',
    'Ialomita', 'Iasi', 'Ilfov', 'Maramures', 'Mehedinti', 'Mures',
    'Neamt', 'Olt', 'Prahova', 'Salaj', 'Satu Mare', 'Sibiu',
    'Suceava', 'Teleorman', 'Timis', 'Tulcea', 'Valcea', 'Vaslui',
    'Vrancea'
];


  for (const county of counties) {
    await prisma.county.create({
      data: { name: county },
    });
  }

  console.log('Categories, Subcategories, and Counties seeding completed!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });