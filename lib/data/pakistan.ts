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
    name: 'The Civilisations of the Indus',
    label: 'Southern Pakistan',
    cities: ['Karachi', 'Thatta', 'Hyderabad', 'Sehwan Sharif', 'Larkana', 'Sukkur', 'Bahawalpur', 'Multan', 'Harappa', 'Lahore', 'Islamabad'],
    heroImage: 'https://images.unsplash.com/photo-1567611665672-bc6b2a8cfe74?w=1200&q=85',
    description: [
      'No river on earth has more to say than the Indus. For five thousand years it has irrigated civilisations — from the Harappans who built Mohenjo-daro in the third millennium BC, to the Sufi saints who made Sindh a place of pilgrimage, to the Mughal emperors who raised their finest monuments along the Punjab plains.',
      'This sixteen-day journey follows the Indus from its delta at Karachi to the foothills of the Himalayas at Islamabad — traversing five thousand years of South Asian history through its cities, shrines, and buried ruins.',
      'From the Mughal tombs of Thatta to the ecstatic dhammal at Sehwan Sharif, from the grid streets of Mohenjo-daro to the blue-tile workshops of Multan and the Fort of Lahore — this is the most complete cultural journey available in Pakistan.',
    ],
    highlights: [
      'Mohenjo-daro (UNESCO) — 4,500-year-old Indus city',
      'Makli Necropolis (UNESCO) — 125,000 tombs, four dynasties',
      'Shah Jahan Mosque, Thatta — 93 domes, 1647 AD',
      'Lal Shahbaz Qalandar dhammal, Sehwan Sharif',
      'Derawar Fort — Cholistan desert fortress',
      'Multan — City of Saints, kashi blue-tile craft',
      'Harappa — northern twin of Mohenjo-daro',
      'Lahore Fort & Badshahi Mosque (UNESCO)',
      'Shalimar Gardens (UNESCO)',
    ],
    tourSlug: 'indus-civilisations',
    duration: 16,
    priceFrom: 9000,
    difficulty: 'easy',
    bestTime: 'October – March',
  },
  {
    id: 'north',
    name: 'Where Three Empires Meet',
    label: 'Skardu, Shigar, Khaplu, Hunza & Khunjerab',
    cities: ['Islamabad', 'Skardu', 'Shigar', 'Khaplu', 'Gilgit', 'Hunza', 'Sost', 'Khunjerab'],
    heroImage: 'https://images.unsplash.com/photo-1684230715200-40f32e068bf2?w=1200&q=85',
    description: [
      'Gilgit-Baltistan is the place where three of the world\'s greatest mountain ranges — the Karakoram, the Himalaya, and the Hindu Kush — converge in a single extraordinary knot of peaks and valleys. This was the frontier where the Sikh Empire, the British Raj, and the Chinese Qing dynasty all pressed against each other, and where the ancient Silk Road threaded its most vertiginous passage.',
      'This seventeen-day journey moves through the heart of this landscape: from Skardu — gateway to K2 — through the apricot orchards and carved wooden mosques of Shigar Valley to the royal fortress of Khaplu, seat of the Yabgo dynasty. From there the route climbs to Hunza, the most celebrated valley in Pakistan, where Baltit and Altit Forts have watched over the valley for nine centuries.',
      'The journey ends at the roof of the world: Khunjerab Pass at 4,693 metres — the world\'s highest paved international border crossing, where the mountains finally part and the Central Asian steppe begins.',
    ],
    highlights: [
      'Shigar Fort Residence — 17th-century palace-hotel',
      'Khaplu Palace — restored Yabgo dynasty fortress',
      'Chaqchan Mosque, Khaplu — oldest mosque in Pakistan (AD 1370)',
      'Attabad Lake — turquoise waters formed by a 2010 landslide',
      'Baltit Fort, Hunza — nine centuries of mountain kingship',
      'Altit Fort — older twin of Baltit, in pristine old village',
      'Passu Cathedral Spires — the most dramatic skyline in the Karakoram',
      'Khunjerab Pass (4,693m) — world\'s highest paved border crossing',
      'Chilas rock carvings — 50,000 petroglyphs along the ancient Silk Road',
    ],
    tourSlug: 'pakistan-north-expedition',
    duration: 17,
    priceFrom: 9999,
    difficulty: 'moderate',
    bestTime: 'May – October',
  },
  {
    id: 'northwest',
    name: 'Buddha & the Last Pagan Tribes of Kalash',
    label: 'Peshawar, Swat, Chitral & Ghizer',
    cities: ['Peshawar', 'Swat', 'Ayun', 'Bumburet', 'Rumbur', 'Birir', 'Chitral', 'Mastuj', 'Phander', 'Gilgit', 'Skardu'],
    heroImage: 'https://images.unsplash.com/photo-1502003148287-a154dc289a48?w=1200&q=85',
    description: [
      'Khyber Pakhtunkhwa is Pakistan at its most layered: Mughal gateways, Buddhist stupas two thousand years old, Pashtun fortress towns, and the mountain valleys of the Kalash — a people who have maintained a pre-Islamic religion and living festival tradition against the tide of centuries.',
      'The journey begins in Peshawar, the old Mughal gateway to Central Asia, and moves north into Swat — the ancient Uddiyana kingdom where Gandharan Buddhism flourished for a millennium. The Swat Museum and the UNESCO-listed Takht-i-Bahi monastery hold sculpture and architecture of museum quality.',
      'The heart of the programme is the three Kalash Valleys — Bumburet, Rumbur, and Birir — where the Kalash people maintain their ancestral religion, their carved wooden shrines, and the spring festival of Chilim Josh. From Chitral the route crosses the Shandur Pass to the Ghizer Valley, Gilgit, and Skardu — ending with a mountain flight back to Islamabad.',
    ],
    highlights: [
      'Peshawar — Qissa Khwani Bazaar, Mahabat Khan Mosque, Gandharan Museum',
      'Takht-i-Bahi Buddhist monastery (UNESCO, 1st century BC)',
      'Swat Museum — finest Gandharan sculpture collection',
      'Butkara Stupa, Swat (2nd century BC)',
      'Bumburet, Rumbur & Birir — all three Kalash valleys',
      'Chilim Josh spring festival (late April)',
      'Chitral Fort — Great Game frontier stronghold',
      'Tirich Mir (7,708m) — highest peak of the Hindu Kush',
      'Shandur Pass (3,734m) — the Roof of the World polo ground',
      'Phander Lake — glacial blue-green waters',
    ],
    tourSlug: 'pakistan-northwest-frontier',
    duration: 18,
    priceFrom: 8999,
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
