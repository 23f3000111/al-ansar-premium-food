/*
  Shared content for both concepts.
  Facts taken from the client's own flyers & packaging are marked (client).
  Anything marked PLACEHOLDER must be confirmed with Al Ansar before launch.
*/
window.AA = window.AA || {};

AA.company = {
  name: 'Al Ansar Premium Food Sdn Bhd',
  short: 'Al Ansar',
  regNo: '1587431-W', // (client) printed on cartons
  tagline: 'Bringing homemade taste to your freezer', // (client) flyer
  whatsapp: '60142828238', // (client)
  phoneDisplay: '+60 14-282 8238', // (client)
  phone2Display: '04-539 0329', // (client) printed on cartons
  phone2: '+6045390329',
  email: 'alansarpremiumfood@hotmail.com', // (client)
  address: 'Bandar Perda, Bukit Mertajam, Pulau Pinang', // PLACEHOLDER — full address from client
  hours: 'Mon–Sat, 9am–6pm', // PLACEHOLDER
  halal: 'Halal certified · MS1500', // (client) flyer shows MS1500 1 146-03/2025
  social: {
    facebook: 'https://www.facebook.com/ALANSARPREMIUMFOODSDNBHD',
    instagram: 'https://www.instagram.com/alansarpremiumfood',
    linktree: 'https://linktr.ee/alansarpremiumfood'
  }
};

AA.wa = function (text) {
  return 'https://wa.me/' + AA.company.whatsapp + (text ? '?text=' + encodeURIComponent(text) : '');
};

AA.products = [
  {
    slug: 'roti-canai',
    variantImgs: ['assets/img/decor/dough-2.webp', 'assets/img/products/extra/roti-butter.webp'],
    name: 'Roti Canai',
    local: 'Doh roti canai',
    range: 'Dough & half-cooked',
    tagline: 'Flaky, buttery layers, the way the mamak makes it.',
    intro: 'Our best-known product. Soft dough balls, rested and portioned, plus a half-cooked roti you can take straight from freezer to pan.',
    variants: [
      { name: 'Roti canai dough', note: 'Frozen dough balls, rested and oiled. Stretch, fold and cook on the tawa.' },
      { name: 'Instant roti canai', note: 'Half-cooked. Pan-fry from frozen and serve in minutes.' }
    ],
    facts: [
      { icon: 'timer', label: 'Ready in', value: '3–5 min' },
      { icon: 'snowflake', label: 'Keep frozen', value: 'below −18°C' },
      { icon: 'package', label: 'Pack', value: 'Retail & bulk cartons' } // PLACEHOLDER pack size
    ],
    steps: [
      { title: 'Straight from the freezer', text: 'No need to thaw the half-cooked roti.', time: '0:00' },
      { title: 'Heat the tawa', text: 'Medium heat. No oil needed.', time: '0:30' },
      { title: 'Cook both sides', text: '1–2 minutes a side, until golden and flaky.', time: '3:00' },
      { title: 'Scrunch & serve', text: 'Clap it to open the layers. Serve with dhal or curry.', time: '5:00' }
    ],
    badges: ['halal', 'vegetarian', 'preservatives', 'malaysia'],
    pairs: ['Dhal curry', 'Fish curry', 'Sambal', 'Teh tarik'],
    price: null,
    bestseller: true,
    img: 'roti-canai',
    alt: 'A stack of golden, flaky roti canai',
    a: { accent: '#E0A93B' },
    b: { bg: '#FFB81C', deep: '#F29400', ink: '#422600', tint: '#FFE6A6' }
  },
  {
    slug: 'chapati-puri',
    variantImgs: ['assets/img/products/extra/chapati-stack.webp', 'assets/img/products/extra/puri.webp'],
    name: 'Chapati & Puri',
    local: 'Half-cooked chapati & puri',
    range: 'Instant, half-cooked',
    tagline: 'Soft, fluffy and perfectly puffed.',
    intro: 'Whole-wheat chapati that puffs up on the pan, and puri that blows up golden in the fryer. Both half-cooked, so every piece comes out the same.',
    variants: [
      { name: 'Instant chapati', note: '5 pieces a pack. No preservatives, no trans fat, no oil needed.' }, // (client) pack
      { name: 'Instant puri', note: 'Half-cooked. Fry for seconds until it puffs.' }
    ],
    facts: [
      { icon: 'timer', label: 'Ready in', value: '1–2 min' },
      { icon: 'snowflake', label: 'Keep frozen', value: 'below −18°C' }, // (client)
      { icon: 'package', label: 'Pack', value: '5 pieces' } // (client) chapati
    ],
    steps: [
      { title: 'Straight from the freezer', text: 'No thawing, no rolling.', time: '0:00' },
      { title: 'Heat a dry pan', text: 'Medium heat. Chapati needs no oil.', time: '0:30' },
      { title: 'Cook until it puffs', text: '30–40 seconds a side. Press gently and watch it rise.', time: '1:30' },
      { title: 'Or fry the puri', text: 'Hot oil, 20–30 seconds a side, until golden and round.', time: '2:00' }
    ],
    badges: ['halal', 'preservatives', 'transfat', 'malaysia'],
    pairs: ['Chicken curry', 'Potato masala', 'Dhal', 'Raita'],
    price: 'Under RM0.80 a piece', // (client) chapati poster
    img: 'chapati-puri',
    alt: 'Two soft chapati on a plate',
    a: { accent: '#C98B47' },
    b: { bg: '#FF8A3D', deep: '#F26A12', ink: '#471A00', tint: '#FFD6B8' }
  },
  {
    slug: 'thosai-batter',
    variantImgs: ['assets/img/products/extra/thosai-plain.webp', 'assets/img/products/extra/idli.webp'],
    name: 'Thosai Batter',
    local: 'Thosai mavvu & idli batter',
    range: 'Fermented, ready to pour',
    tagline: 'Crisp at the edges, soft in the middle.',
    intro: 'Rice and urad dal batter, fermented the traditional way. Pour thin for crisp thosai, or steam in moulds for soft idli.',
    variants: [
      { name: 'Thosai batter', note: 'Spread thin on a hot tawa for crisp, golden thosai.' },
      { name: 'Idli batter', note: 'Steam in greased moulds for soft, fluffy idli.' }
    ],
    facts: [
      { icon: 'timer', label: 'Ready in', value: '2–3 min' },
      { icon: 'snowflake', label: 'Keep frozen', value: 'below −18°C' },
      { icon: 'package', label: 'Pack', value: 'Tubs & bulk' } // PLACEHOLDER
    ],
    steps: [
      { title: 'Thaw and stir', text: 'Thaw in the chiller overnight, then stir well.', time: '0:00' },
      { title: 'Heat the tawa', text: 'Grease lightly and heat until a drop of water sizzles.', time: '0:30' },
      { title: 'Pour & spread', text: 'One ladle, spread thin in circles from the centre.', time: '1:00' },
      { title: 'Crisp & fold', text: 'Drizzle ghee, cook until golden, fold and serve.', time: '3:00' }
    ],
    badges: ['halal', 'vegetarian', 'preservatives', 'malaysia'],
    pairs: ['Coconut chutney', 'Sambar', 'Tomato chutney', 'Podi'],
    price: null,
    img: 'thosai-batter',
    alt: 'A golden thosai served on a banana leaf',
    a: { accent: '#D2733A' },
    b: { bg: '#4CB944', deep: '#2F9A28', ink: '#0E3A0A', tint: '#CDEFC5' }
  },
  {
    slug: 'mee-goreng-sambal',
    variantImgs: ['assets/img/products/extra/mee-2.webp'],
    name: 'Mee Goreng Sambal',
    local: 'Mee goreng sambal',
    range: 'Heat & eat',
    tagline: 'Wok-fried noodles with a proper sambal kick.',
    intro: 'Yellow noodles in our house sambal, ready to heat. Toss them in a hot wok and they taste like they came off the stall.',
    variants: [
      { name: 'Mee goreng sambal', note: 'Stir-fry from frozen, or microwave for a quick lunch.' }
    ],
    facts: [
      { icon: 'timer', label: 'Ready in', value: '3–4 min' },
      { icon: 'snowflake', label: 'Keep frozen', value: 'below −18°C' },
      { icon: 'flame', label: 'Spice', value: 'Medium sambal' } // PLACEHOLDER
    ],
    steps: [
      { title: 'Heat the wok', text: 'A splash of oil, high heat.', time: '0:00' },
      { title: 'Add from frozen', text: 'Break up the noodles as they warm through.', time: '0:30' },
      { title: 'Toss for 3 minutes', text: 'Add egg, veg or chicken if you like.', time: '3:30' },
      { title: 'Plate it up', text: 'Finish with lime and fried shallots.', time: '4:00' }
    ],
    badges: ['halal', 'preservatives', 'malaysia', 'quick'],
    pairs: ['Fried egg', 'Lime', 'Keropok', 'Iced tea'],
    price: null,
    img: 'mee-goreng-sambal',
    alt: 'A plate of spicy mee goreng with keropok and cucumber',
    a: { accent: '#C8492F' },
    b: { bg: '#F2422E', deep: '#D3291A', ink: '#4A0B05', tint: '#FFCAC2' }
  },
  {
    slug: 'samosa-curry-puff',
    variantImgs: ['assets/img/products/extra/samosa-plate.webp', 'assets/img/products/extra/curry-puff.webp'],
    name: 'Samosa & Curry Puff',
    local: 'Samosa & karipap',
    range: 'Fry from frozen',
    tagline: 'Crisp pastry, spiced potato filling.',
    intro: 'Samosa and crimped curry puffs filled with spiced potato. They go into the fryer frozen and come out blistered and crisp.',
    variants: [
      { name: 'Samosa', note: 'Triangle pastry with spiced potato and peas.' },
      { name: 'Curry puff', note: 'Crimped karipap with curry potato filling.' }
    ],
    facts: [
      { icon: 'timer', label: 'Ready in', value: '4–5 min' },
      { icon: 'snowflake', label: 'Keep frozen', value: 'below −18°C' },
      { icon: 'package', label: 'Pack', value: 'Party & bulk packs' } // PLACEHOLDER
    ],
    steps: [
      { title: 'Keep them frozen', text: 'Fry straight from frozen for the crispest shell.', time: '0:00' },
      { title: 'Heat the oil', text: '170°C, or an air fryer at 180°C.', time: '0:30' },
      { title: 'Fry until golden', text: '4–5 minutes (10–12 in the air fryer).', time: '5:00' },
      { title: 'Drain & serve', text: 'With mint chutney or chilli sauce.', time: '5:30' }
    ],
    badges: ['halal', 'vegetarian', 'preservatives', 'malaysia'],
    pairs: ['Mint chutney', 'Chilli sauce', 'Teh tarik', 'Kopi O'],
    price: null,
    img: 'samosa-curry-puff',
    alt: 'Golden curry puffs with crimped edges',
    a: { accent: '#C98A2E' },
    b: { bg: '#8B63FF', deep: '#6C43EA', ink: '#1E0B57', tint: '#DDD2FF' }
  },
  {
    slug: 'idiyappam-putu-mayong',
    variantImgs: ['assets/img/products/extra/idiyappam-curry.webp', 'assets/img/products/extra/putu-mayong.webp'],
    name: 'Idiyappam',
    local: 'Idiyappam / putu mayong',
    range: 'Steam & serve',
    tagline: 'Soft rice-noodle nests, sweet or savoury.',
    intro: 'Fine rice-flour strands pressed into nests. Steam them for idiyappam with curry, or top with grated coconut and gula melaka for putu mayong.',
    variants: [
      { name: 'Idiyappam', note: 'Serve with curry, dhal or sothi.' },
      { name: 'Putu mayong', note: 'Top with grated coconut and gula melaka.' }
    ],
    facts: [
      { icon: 'timer', label: 'Ready in', value: '3–5 min' },
      { icon: 'snowflake', label: 'Keep frozen', value: 'below −18°C' },
      { icon: 'package', label: 'Pack', value: 'Nests per pack' } // PLACEHOLDER
    ],
    steps: [
      { title: 'Into the steamer', text: 'Straight from frozen. No thawing.', time: '0:00' },
      { title: 'Steam until soft', text: '3–5 minutes over rolling water.', time: '4:00' },
      { title: 'Go savoury', text: 'Serve with curry, dhal or coconut sothi.', time: '4:30' },
      { title: 'Or go sweet', text: 'Grated coconut and gula melaka for putu mayong.', time: '5:00' }
    ],
    badges: ['halal', 'vegetarian', 'preservatives', 'malaysia'],
    pairs: ['Chicken curry', 'Coconut sothi', 'Gula melaka', 'Grated coconut'],
    price: null,
    img: 'idiyappam-putu-mayong',
    alt: 'Nests of soft idiyappam on a steel plate',
    a: { accent: '#DB86A8' },
    b: { bg: '#FF6FB1', deep: '#EF4790', ink: '#560A2E', tint: '#FFD3E7' }
  },
  {
    slug: 'ginger-shot',
    variantImgs: ['assets/img/products/ginger-shot.webp'],
    name: 'Ginger Shot',
    local: 'Mr. Ginger, honey & lemon',
    range: 'Cold-pressed drink',
    tagline: 'Feel the love in every sip.', // (client) label
    intro: 'Mr. Ginger is our ginger shot with honey and lemon. Fiery, bright and made to finish a heavy meal. Drink it straight, warm or cold.',
    variants: [
      { name: 'Honey & lemon', note: 'One bottle, one shot. Shake well before drinking.' }
    ],
    facts: [
      { icon: 'citrus', label: 'Flavour', value: 'Honey & lemon' }, // (client)
      { icon: 'sun', label: 'Serve', value: 'Cold or warm' }, // (client) display box
      { icon: 'heart', label: 'Best after', value: 'A heavy meal' }
    ],
    steps: [
      { title: 'Shake it', text: 'The good stuff settles. Give it a shake.', time: '0:00' },
      { title: 'Drink it straight', text: 'One shot, cold or warm. After a heavy meal is best.', time: '0:05' },
      { title: 'Or mix it', text: 'Into warm water, tea, sparkling water or juice.', time: '0:10' },
      { title: 'Keep it cold', text: 'Refrigerate after opening.', time: '0:15' } // PLACEHOLDER storage
    ],
    badges: ['halal', 'vitc', 'preservatives', 'malaysia'],
    pairs: ['After nasi kandar', 'Warm water', 'Sparkling water', 'Iced tea'],
    price: 'RM5.99', // (client)
    img: 'ginger-shot',
    alt: 'A bottle of Mr. Ginger ginger shot, honey and lemon',
    a: { accent: '#E6BE3A' },
    b: { bg: '#1FBFB8', deep: '#0E9F99', ink: '#033B39', tint: '#C3F1EE' }
  }
];

AA.badges = {
  halal: { icon: 'badge-check', label: 'Halal certified' },
  vegetarian: { icon: 'leaf', label: 'Vegetarian friendly' },
  preservatives: { icon: 'flask-conical-off', label: 'No added preservatives' },
  transfat: { icon: 'ban', label: 'No trans fat' },
  malaysia: { icon: 'map-pin', label: 'Made in Malaysia' },
  vitc: { icon: 'citrus', label: 'Vitamin C boost' }, // (client) ginger shot poster
  quick: { icon: 'zap', label: 'Ready in minutes' }
};

// PLACEHOLDER — sample nutrition values (per 100 g). Replace with lab-tested figures from the client.
AA.nutrition = [
  { label: 'Energy', value: '— kcal' },
  { label: 'Protein', value: '— g' },
  { label: 'Total fat', value: '— g' },
  { label: 'Carbohydrate', value: '— g' },
  { label: 'Sodium', value: '— mg' }
];

// PLACEHOLDER — testimonials credited by role only. Replace with real, permissioned quotes.
AA.reviews = [
  { quote: 'We switched our morning roti to Al Ansar dough. Same flake, and my cooks stopped coming in at 4am.', who: 'Restaurant owner', where: 'Butterworth' },
  { quote: 'The chapati puffs every single time. For a catering order of 800 pieces that matters.', who: 'Caterer', where: 'Bukit Mertajam' },
  { quote: 'Customers ask if we make the thosai batter ourselves. I just smile.', who: 'Café owner', where: 'George Town' },
  { quote: 'My kids finish the curry puffs before they reach the plate. Freezer never runs out now.', who: 'Home cook', where: 'Seberang Perai' },
  { quote: 'Mr. Ginger after nasi kandar is now a habit for the whole office.', who: 'Office manager', where: 'Bayan Lepas' }
];

AA.faqs = [
  { q: 'Are your products halal?', a: 'Yes. Al Ansar products are made in a halal-certified facility (MS1500). The certificate is available on request.' },
  { q: 'Do I need to thaw before cooking?', a: 'Most products cook straight from frozen: roti, chapati, puri, samosa, curry puff and idiyappam. Thosai batter should be thawed in the chiller overnight.' },
  { q: 'How long do they keep?', a: 'Keep frozen below −18°C and use by the date on the pack. Once thawed, do not refreeze.' },
  { q: 'Do you supply restaurants, cafés and caterers?', a: 'Yes, that is most of what we do. Message us on WhatsApp for the wholesale price list and delivery days in your area.' },
  { q: 'Is there a minimum order?', a: 'Retail packs have no minimum. For wholesale, ask us about carton sizes and minimums.' }, // PLACEHOLDER
  { q: 'Where do you deliver?', a: 'Message us on WhatsApp with your area and we will tell you the delivery days.' } // PLACEHOLDER
];
