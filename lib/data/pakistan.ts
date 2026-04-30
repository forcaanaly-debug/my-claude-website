export interface PakistanRegion {
  id: string
  name: string
  label: string
  cities: string[]
  heroImage: string
  description: string[]
  highlights: string[]
  tourSlug: string
  duration: number
  priceFrom: number
  difficulty: 'easy' | 'moderate' | 'challenging'
  bestTime: string
}

export const pakistanRegions: PakistanRegion[] = [
  {
    id: 'south',
    name: 'South Pakistan',
    label: 'Punjab, Sindh & Islamabad',
    cities: ['Lahore', 'Islamabad', 'Rawalpindi', 'Multan', 'Karachi', 'Mohenjo-daro'],
    heroImage: 'https://images.unsplash.com/photo-1567611665672-bc6b2a8cfe74?w=1200&q=85',
    description: [
      'South Pakistan is the civilisational heart of the country — the land where Mughal emperors built their greatest monuments, Sufi saints drew millions to their shrines, and the Indus Valley civilisation first raised cities 4,500 years ago. This is Pakistan at its most historically layered, its most culturally dense, and its most immediately accessible.',
      'Lahore is the crown of this region: a city of Mughal mosques and gardens, colonial-era boulevards, and a food culture that is among the richest in South Asia. The Badshahi Mosque and Lahore Fort sit within minutes of each other; the walled city\'s bazaars and havelis are largely intact. To spend three days here with a serious guide is to understand a thousand years of subcontinent history.',
      'The journey south to Sindh adds another dimension entirely: Mohenjo-daro, whose excavated ruins reveal a sophisticated urban civilisation that flourished when Bronze Age Europe was still building timber roundhouses.',
    ],
    highlights: [
      'Badshahi Mosque & Lahore Fort (Mughal)',
      'Shalimar Gardens (UNESCO World Heritage)',
      'Data Darbar — principal Sufi shrine of South Asia',
      'Taxila (UNESCO) — ancient Buddhist university city',
      'Mohenjo-daro (UNESCO) — Indus Valley civilisation',
      'Wagah Border ceremony',
      'Multan — City of Saints and blue-tile craftsmen',
    ],
    tourSlug: 'pakistan-south-cultural',
    duration: 10,
    priceFrom: 3900,
    difficulty: 'easy',
    bestTime: 'October – March',
  },
  {
    id: 'north',
    name: 'North Pakistan',
    label: 'Skardu, Gilgit, Hunza & Chilas',
    cities: ['Skardu', 'Deosai', 'Gilgit', 'Hunza', 'Nagar', 'Chilas', 'Khunjerab'],
    heroImage: 'https://images.unsplash.com/photo-1684230715200-40f32e068bf2?w=1200&q=85',
    description: [
      'Gilgit-Baltistan is among the most extraordinary pieces of geography on earth — a territory where the Karakoram, Himalaya, and Hindu Kush mountain ranges converge. Five of the world\'s fourteen 8,000-metre peaks lie within its borders. The scale here is absolute: gorges so deep that the sun reaches the valley floor for only a few hours a day; glaciers that flow for sixty kilometres; plains at 4,000 metres where brown bears roam.',
      'Skardu is the gateway to K2 and the Baltoro Glacier — the route taken by all serious climbing expeditions. Even without venturing onto the high routes, the Skardu Valley and the adjacent Deosai Plateau offer experiences of rare quality. The Deosai is one of the world\'s highest plateaus: a vast, flat grassland at 4,000 metres where wildlife abounds and the night sky is exceptional.',
      'The Hunza Valley — ancient seat of the Mir of Hunza — is perhaps the most celebrated valley in Pakistan. Altit and Baltit Forts are among the finest examples of mountain fortress architecture in Asia. From here, the road continues to Khunjerab Pass, the world\'s highest paved international border crossing, before descending through the Indus gorges past the rock carvings of Chilas.',
    ],
    highlights: [
      'Deosai Plateau — Himalayan brown bear habitat',
      'Skardu & the K2 gateway',
      'Hunza Valley — Altit & Baltit Forts (700–900 years old)',
      'Khunjerab Pass (4,693m) — world\'s highest paved border',
      'Attabad Lake — turquoise glacial water',
      'Chilas rock carvings — 50,000 petroglyphs, 3,000 years',
      'Passu Cathedral Spires',
    ],
    tourSlug: 'pakistan-north-expedition',
    duration: 12,
    priceFrom: 5400,
    difficulty: 'challenging',
    bestTime: 'May – October',
  },
  {
    id: 'northwest',
    name: 'Northwest Frontier',
    label: 'Chitral, Swat, Phander & Ghizer',
    cities: ['Swat', 'Mingora', 'Chitral', 'Bumburet', 'Rumbur', 'Phander', 'Ghizer'],
    heroImage: 'https://images.unsplash.com/photo-1502003148287-a154dc289a48?w=1200&q=85',
    description: [
      'The northwest is Pakistan\'s most culturally complex corridor — Pashtun heartland and the home of the Kalash, one of the world\'s last polytheistic mountain peoples. It is the region with the deepest Buddhist heritage, the most dramatic Gandharan sculpture, and some of the finest mountain valley scenery in the country.',
      'Swat was the ancient Uddiyana kingdom, where Buddhism flourished for a thousand years before Islam arrived. The valley\'s museums hold Gandharan sculpture of museum-quality excellence. Chitral, overshadowed by Tirich Mir (7,708m — the highest peak of the Hindu Kush), is a town of forts, gem merchants, and the last stronghold of Chitrali polo — a version of the game far older and wilder than its modern descendant.',
      'The Kalash Valleys — Bumburet, Rumbur, and Birir — are unlike anywhere else in Pakistan or Central Asia. The Kalash people maintain a pre-Islamic religion, a distinct material culture of wooden effigies and carved shrines, and a tradition of music and dance that their neighbours have left behind. The drive from Chitral to Gilgit via the Shandur Pass passes through the Phander and Ghizer valleys — some of the least-visited and most beautiful terrain in Pakistan.',
    ],
    highlights: [
      'Swat Museum — finest Gandharan sculpture collection',
      'Buddhist stupas of Butkara (2nd century BC)',
      'Chitral Fort and the Mehtar\'s palace',
      'Kalash Valleys — Bumburet and Rumbur communities',
      'Tirich Mir views (7,708m — highest Hindu Kush peak)',
      'Shandur Pass (3,734m) — the Roof of the World polo ground',
      'Phander Lake — glacial blue-green waters',
    ],
    tourSlug: 'pakistan-northwest-frontier',
    duration: 10,
    priceFrom: 4200,
    difficulty: 'moderate',
    bestTime: 'April – October',
  },
  {
    id: 'balochistan',
    name: 'Balochistan',
    label: 'Makran Coast, Quetta, Khuzdar & Naushki',
    cities: ['Karachi', 'Ormara', 'Gwadar', 'Khuzdar', 'Quetta', 'Naushki'],
    heroImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85',
    description: [
      "Balochistan is Pakistan's largest province and most overlooked destination — a territory the size of France with a population of fourteen million, most of whom live in an ancient and demanding relationship with the desert. It is the land of the Baloch and Brahui peoples, of caravan routes that once connected the Indus Valley to Persia and Mesopotamia, and of a coastline that stretches 750 kilometres along the Arabian Sea.",
      'The Makran Coastal Highway — completed in 2004 — opened one of the world\'s great coastal drives. The road passes through a landscape of extraordinary geological drama: sculpted mud volcanoes, eroded rock formations, the Princess of Hope arch, and long beaches of white sand where fishing communities have operated unchanged for generations. Gwadar, at the end of the drive, sits on a tombolo peninsula and is being developed as a major deep-water port — a city in transformation.',
      'Inland, Quetta is the provincial capital: a city of gardens, dried fruit bazaars, and Afghan influence, surrounded by mountain desert that carries the atmosphere of the American Southwest or the Iranian plateau. The road west to Naushki leads through Chaghai — the ancient corridor that connected the Indus Valley to the Persian Empire — and into the last terrain before the Iranian border.',
    ],
    highlights: [
      'Makran Coastal Highway — 750km of Arabian Sea coastline',
      'Kund Malir Beach — one of Pakistan\'s finest',
      'Princess of Hope rock arch, near Ormara',
      'Gwadar — deep-water port and fishing harbour',
      'Hinglaj Mata temple — Pakistan\'s largest Hindu pilgrimage',
      'Moola Chotok canyon — a hidden gorge with waterfalls',
      'Quetta bazaars — tribal jewellery, dried fruit, Afghan goods',
    ],
    tourSlug: 'pakistan-balochistan',
    duration: 9,
    priceFrom: 3600,
    difficulty: 'moderate',
    bestTime: 'October – March',
  },
]
