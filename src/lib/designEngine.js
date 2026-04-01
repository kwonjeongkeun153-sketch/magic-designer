const FORMAT_LIBRARY = {
  square: {
    id: 'square',
    label: 'Instagram Square',
    width: 1080,
    height: 1080,
    cols: 12,
    rows: 12,
  },
  portrait: {
    id: 'portrait',
    label: 'Portrait Post',
    width: 1080,
    height: 1350,
    cols: 12,
    rows: 14,
  },
  story: {
    id: 'story',
    label: 'Story Vertical',
    width: 1080,
    height: 1920,
    cols: 12,
    rows: 18,
  },
  landscape: {
    id: 'landscape',
    label: 'Wide Banner',
    width: 1600,
    height: 900,
    cols: 16,
    rows: 10,
  },
}

const PALETTES = [
  {
    id: 'amber-dawn',
    tone: 'warm',
    name: 'Amber Dawn',
    canvas: '#f5ecdf',
    surface: '#fff8f0',
    frame: '#e5d3bc',
    ink: '#201712',
    muted: '#6f5a4c',
    accent: '#c96d42',
    accent2: '#efbe6c',
    accentSoft: '#f4d6bf',
    line: 'rgba(32, 23, 18, 0.12)',
    glow: 'rgba(201, 109, 66, 0.26)',
  },
  {
    id: 'sage-paper',
    tone: 'soft',
    name: 'Sage Paper',
    canvas: '#eef1ea',
    surface: '#f7f9f3',
    frame: '#d8ded2',
    ink: '#172117',
    muted: '#5f6c61',
    accent: '#7a9368',
    accent2: '#d0b36b',
    accentSoft: '#d9e4d2',
    line: 'rgba(23, 33, 23, 0.12)',
    glow: 'rgba(122, 147, 104, 0.2)',
  },
  {
    id: 'harbor-blue',
    tone: 'cool',
    name: 'Harbor Blue',
    canvas: '#ebf1f8',
    surface: '#f7faff',
    frame: '#d5dfec',
    ink: '#132033',
    muted: '#61748d',
    accent: '#3c7be0',
    accent2: '#62c7d3',
    accentSoft: '#d6e5fb',
    line: 'rgba(19, 32, 51, 0.12)',
    glow: 'rgba(60, 123, 224, 0.2)',
  },
  {
    id: 'midnight-spruce',
    tone: 'cool',
    name: 'Midnight Spruce',
    canvas: '#0d1620',
    surface: '#132231',
    frame: '#26384b',
    ink: '#edf6f7',
    muted: '#9bb0bf',
    accent: '#45c2b1',
    accent2: '#b9ef9d',
    accentSoft: '#20384a',
    line: 'rgba(237, 246, 247, 0.12)',
    glow: 'rgba(69, 194, 177, 0.24)',
  },
  {
    id: 'petal-noir',
    tone: 'soft',
    name: 'Petal Noir',
    canvas: '#f5edf1',
    surface: '#fff7fb',
    frame: '#e6d5dd',
    ink: '#2a1820',
    muted: '#7f6470',
    accent: '#cf6288',
    accent2: '#f0c76d',
    accentSoft: '#f1d6e2',
    line: 'rgba(42, 24, 32, 0.12)',
    glow: 'rgba(207, 98, 136, 0.2)',
  },
  {
    id: 'electric-citrus',
    tone: 'bold',
    name: 'Electric Citrus',
    canvas: '#101118',
    surface: '#191c26',
    frame: '#2a2d38',
    ink: '#f7f8fb',
    muted: '#a7abc0',
    accent: '#d5ff45',
    accent2: '#ff7a5e',
    accentSoft: '#252a37',
    line: 'rgba(247, 248, 251, 0.12)',
    glow: 'rgba(213, 255, 69, 0.2)',
  },
]

const COPY_GUIDES = [
  {
    match: ['coffee', 'cafe', 'espresso', 'latte', 'roast', 'tea'],
    titles: ['Slow Brew Ritual', 'Golden Hour Roast', 'Meet Me For Coffee'],
    subtitles: [
      'Hand-poured favorites, butter-soft pastries, and a room built for easy mornings.',
      'Fresh roast drops, warm light, and the kind of stop that turns into a ritual.',
      'Seasonal blends, cozy corners, and a neighborhood pace that invites people in.',
    ],
    eyebrow: 'Neighborhood coffee edit',
    detail: 'Fresh beans roasted weekly',
    ctas: ['See Menu', 'Visit Today', 'Order Ahead'],
    images: ['Hero beverage', 'Pastry detail'],
  },
  {
    match: ['skincare', 'beauty', 'cosmetic', 'serum', 'spa'],
    titles: ['Skin That Keeps Up', 'Soft Glow Formula', 'Daily Ritual, Refined'],
    subtitles: [
      'A clean routine with luminous texture, ingredient-first storytelling, and quiet confidence.',
      'Hydrating essentials designed to feel light, look polished, and land beautifully in social.',
      'A softer palette, premium product framing, and just enough contrast to feel modern.',
    ],
    eyebrow: 'Beauty campaign layout',
    detail: 'Texture-led storytelling for launch week',
    ctas: ['Shop The Edit', 'Discover The Line', 'Launch Now'],
    images: ['Product still life', 'Texture crop'],
  },
  {
    match: ['fitness', 'gym', 'pilates', 'wellness', 'training'],
    titles: ['Train With Intention', 'Move Into Focus', 'Built For Momentum'],
    subtitles: [
      'High-energy messaging with enough space to breathe, ideal for promos, class drops, or member pushes.',
      'Sharp hierarchy, quick reads, and a confident visual rhythm for action-first campaigns.',
      'Designed for offers, coaching launches, and class reminders that need to feel alive.',
    ],
    eyebrow: 'Performance campaign',
    detail: 'Bold pacing for high-engagement social',
    ctas: ['Join Class', 'Start Trial', 'Book Today'],
    images: ['Motion shot', 'Studio detail'],
  },
  {
    match: ['ai', 'tech', 'startup', 'app', 'saas', 'product'],
    titles: ['Launch With Clarity', 'Smarter By Design', 'Built For Fast Teams'],
    subtitles: [
      'Clean information hierarchy, modern contrast, and product-forward framing for crisp announcement posts.',
      'A sharp, contemporary direction that balances trust, speed, and a little visual edge.',
      'Flexible enough for feature drops, waitlist campaigns, and early product storytelling.',
    ],
    eyebrow: 'Product launch system',
    detail: 'Fast visual system for feature stories',
    ctas: ['See Features', 'Join Waitlist', 'Explore Product'],
    images: ['Product interface', 'Workflow crop'],
  },
  {
    match: ['travel', 'hotel', 'retreat', 'resort', 'trip'],
    titles: ['Escape Into Color', 'Stay Somewhere Worth Sharing', 'A Better Kind Of Weekend'],
    subtitles: [
      'A destination-forward layout with room for atmosphere, offer framing, and dreamy imagery.',
      'Made for limited-time packages, seasonal experiences, and visual-first travel storytelling.',
      'Editorial structure with a little wanderlust built right into the composition.',
    ],
    eyebrow: 'Destination campaign',
    detail: 'Visual-first storytelling for bookings',
    ctas: ['Reserve Now', 'Plan Your Stay', 'View Getaway'],
    images: ['Destination hero', 'Lifestyle detail'],
  },
  {
    match: ['fashion', 'boutique', 'style', 'clothing', 'jewelry'],
    titles: ['The New Edit', 'Style With Presence', 'Made To Be Seen'],
    subtitles: [
      'A fashion-led composition with clean whitespace, luxe typography, and image-first pacing.',
      'For launch drops, capsule collections, and lookbook moments that need immediate polish.',
      'Quietly premium structure that lets product and styling take the lead.',
    ],
    eyebrow: 'Fashion social direction',
    detail: 'Editorial framing with product focus',
    ctas: ['Shop The Drop', 'View Collection', 'Discover The Edit'],
    images: ['Hero look', 'Material close-up'],
  },
  {
    match: ['food', 'restaurant', 'bakery', 'pizza', 'burger', 'dessert'],
    titles: ['Tonight, Taste Better', 'Fresh Out Of The Oven', 'Built To Crave'],
    subtitles: [
      'A rich, appetite-forward layout with warm contrast, quick reads, and space for irresistible imagery.',
      'Great for menu drops, seasonal specials, and promotions that need a little drama.',
      'Designed to make a single offer feel bigger, brighter, and worth stopping for.',
    ],
    eyebrow: 'Food promotion layout',
    detail: 'Offer-first composition for social promos',
    ctas: ['Order Now', 'Taste The Menu', 'Grab Tonight'],
    images: ['Signature dish', 'Detail crop'],
  },
  {
    match: ['music', 'festival', 'concert', 'party', 'event'],
    titles: ['Make It A Night', 'The Drop Starts Here', 'One Poster, Real Energy'],
    subtitles: [
      'A bold composition that feels immediate, energetic, and ready for announcement graphics.',
      'Built for lineups, live sets, and event launches that need strong contrast and pace.',
      'High-energy structure with flexible text zones for dates, guests, and venue callouts.',
    ],
    eyebrow: 'Event announcement system',
    detail: 'Designed for urgent, high-contrast messaging',
    ctas: ['Get Tickets', 'RSVP Now', 'See Lineup'],
    images: ['Headline performer', 'Crowd texture'],
  },
  {
    match: ['real estate', 'property', 'listing', 'home', 'apartment'],
    titles: ['A Listing Worth The Scroll', 'Open House, Elevated', 'Find The Space'],
    subtitles: [
      'A clean real-estate direction with enough structure for headline features, dates, and property imagery.',
      'Great for listing highlights, open house promos, and refined neighborhood storytelling.',
      'Balanced spacing, premium cues, and straightforward calls to action built for trust.',
    ],
    eyebrow: 'Property spotlight',
    detail: 'Trust-forward layout with clean structure',
    ctas: ['Book A Tour', 'See Details', 'View Listing'],
    images: ['Property facade', 'Interior detail'],
  },
  {
    match: ['course', 'webinar', 'class', 'education', 'workshop'],
    titles: ['Learn In Public', 'Teach The Next Step', 'A Better Workshop Invite'],
    subtitles: [
      'Clear educational hierarchy for workshops, signups, and slide-friendly event promotion.',
      'Enough depth for topic framing, schedule cues, and a strong registration moment.',
      'Designed to feel approachable, useful, and polished on first glance.',
    ],
    eyebrow: 'Workshop announcement',
    detail: 'Structure built for clarity and signups',
    ctas: ['Reserve Seat', 'Join Session', 'Register Now'],
    images: ['Speaker portrait', 'Workshop scene'],
  },
  {
    match: [],
    titles: ['Design It Fast', 'A Sharper Visual Story', 'Make The Idea Look Real'],
    subtitles: [
      'A flexible social-ready layout with clear hierarchy, strong color direction, and room to refine by hand.',
      'Balanced for marketing moments, launches, and quick creative exploration without a backend.',
      'A clean design system for fast iteration, tasteful contrast, and immediate visual polish.',
    ],
    eyebrow: 'Rapid concept generation',
    detail: 'Fast layout system for creative iteration',
    ctas: ['Refine Design', 'Use This Layout', 'Export PNG'],
    images: ['Hero visual', 'Secondary detail'],
  },
]

const THEME_SEQUENCE = ['editorial', 'spotlight', 'modular']

function hashString(value) {
  let hash = 0

  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index)
    hash |= 0
  }

  return Math.abs(hash)
}

function pickFrom(list, seed) {
  if (!list.length) {
    return ''
  }

  return list[seed % list.length]
}

function toTitleCase(value) {
  return value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function withAlpha(hex, alpha) {
  const safeHex = hex.replace('#', '')
  const chunk = safeHex.length === 3
    ? safeHex.split('').map((char) => char + char).join('')
    : safeHex

  const red = Number.parseInt(chunk.slice(0, 2), 16)
  const green = Number.parseInt(chunk.slice(2, 4), 16)
  const blue = Number.parseInt(chunk.slice(4, 6), 16)

  return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

function inferFormat(prompt) {
  const lowerPrompt = prompt.toLowerCase()

  if (/(story|reel|mobile story|vertical)/.test(lowerPrompt)) {
    return FORMAT_LIBRARY.story
  }

  if (/(poster|flyer|pinterest|brochure|portrait)/.test(lowerPrompt)) {
    return FORMAT_LIBRARY.portrait
  }

  if (/(youtube|banner|thumbnail|header|hero|linkedin banner|landscape)/.test(lowerPrompt)) {
    return FORMAT_LIBRARY.landscape
  }

  return FORMAT_LIBRARY.square
}

function inferToneStack(prompt) {
  const lowerPrompt = prompt.toLowerCase()

  if (/(coffee|cafe|espresso|food|restaurant|bakery|dessert|travel|hotel)/.test(lowerPrompt)) {
    return ['warm', 'soft', 'cool', 'bold']
  }

  if (/(beauty|skincare|fashion|boutique|jewelry|spa|wellness)/.test(lowerPrompt)) {
    return ['soft', 'warm', 'cool', 'bold']
  }

  if (/(music|festival|concert|event|party|night|club)/.test(lowerPrompt)) {
    return ['bold', 'cool', 'warm', 'soft']
  }

  if (/(ai|tech|startup|product|saas|app|software)/.test(lowerPrompt)) {
    return ['cool', 'bold', 'soft', 'warm']
  }

  return ['soft', 'cool', 'warm', 'bold']
}

function extractSubject(prompt) {
  const subjectMatch = prompt.match(/\bfor\s+(.+)$/i) || prompt.match(/\babout\s+(.+)$/i)
  const rawSubject = (subjectMatch?.[1] || prompt)
    .replace(/instagram post|instagram story|poster|flyer|banner|thumbnail/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!rawSubject) {
    return 'creative campaign'
  }

  return rawSubject
}

function inferChannel(prompt, format) {
  const lowerPrompt = prompt.toLowerCase()

  if (lowerPrompt.includes('instagram story')) {
    return 'Instagram Story'
  }

  if (lowerPrompt.includes('instagram')) {
    return 'Instagram Post'
  }

  if (lowerPrompt.includes('youtube')) {
    return 'YouTube Thumbnail'
  }

  if (lowerPrompt.includes('linkedin')) {
    return 'LinkedIn Graphic'
  }

  if (lowerPrompt.includes('poster')) {
    return 'Poster Layout'
  }

  if (format.id === 'landscape') {
    return 'Wide Campaign'
  }

  if (format.id === 'story') {
    return 'Story Layout'
  }

  return 'Social Graphic'
}

function findGuide(prompt) {
  const lowerPrompt = prompt.toLowerCase()

  return (
    COPY_GUIDES.find((guide) =>
      guide.match.some((keyword) => lowerPrompt.includes(keyword)),
    ) || COPY_GUIDES.at(-1)
  )
}

function buildCopy(prompt, seed, format) {
  const guide = findGuide(prompt)
  const subject = extractSubject(prompt)
  const subjectLabel = toTitleCase(subject)
  const channel = inferChannel(prompt, format)
  const titleSeed = hashString(`${prompt}-title-${seed}`)
  const subtitleSeed = hashString(`${prompt}-subtitle-${seed}`)
  const ctaSeed = hashString(`${prompt}-cta-${seed}`)
  const title = pickFrom(guide.titles, titleSeed)
  const subtitle = pickFrom(guide.subtitles, subtitleSeed)
  const cta = pickFrom(guide.ctas, ctaSeed)

  return {
    subject: subjectLabel,
    channel,
    eyebrow: `${subjectLabel}`,
    title,
    subtitle,
    cta,
    detail: guide.detail,
    imageLabels: guide.images,
  }
}

function choosePalettes(prompt, seed) {
  const tones = inferToneStack(prompt)
  const used = new Set()
  const picks = []

  tones.forEach((tone, index) => {
    const options = PALETTES.filter((palette) => palette.tone === tone)
    const selected = pickFrom(options, hashString(`${prompt}-${seed}-${tone}-${index}`))

    if (selected && !used.has(selected.id)) {
      used.add(selected.id)
      picks.push(selected)
    }
  })

  PALETTES.forEach((palette) => {
    if (picks.length < 3 && !used.has(palette.id)) {
      used.add(palette.id)
      picks.push(palette)
    }
  })

  return picks.slice(0, 3)
}

function createText(id, role, content, x, y, w, h, style = {}) {
  return {
    id,
    type: 'text',
    role,
    content,
    x,
    y,
    w,
    h,
    style: {
      font: 'sans',
      size: 4.8,
      weight: 600,
      colorRole: 'ink',
      lineHeight: 0.92,
      align: 'left',
      tracking: 'normal',
      uppercase: false,
      layer: 3,
      ...style,
    },
  }
}

function createImage(id, content, x, y, w, h, style = {}) {
  return {
    id,
    type: 'image',
    role: 'image',
    content,
    x,
    y,
    w,
    h,
    style: {
      radius: 2.2,
      tone: 'accent',
      layer: 2,
      caption: 'Drop image',
      ...style,
    },
  }
}

function createShape(id, x, y, w, h, style = {}) {
  return {
    id,
    type: 'shape',
    role: 'shape',
    content: '',
    x,
    y,
    w,
    h,
    style: {
      fillRole: 'accent',
      opacity: 0.9,
      radius: 99,
      layer: 1,
      rotate: 0,
      ...style,
    },
  }
}

function editorialLayout(copy, format) {
  const templates = {
    square: [
      createShape('shape-sun', 8.2, 0.8, 2.8, 2.8, { fillRole: 'accentSoft', opacity: 0.9 }),
      createText('eyebrow', 'eyebrow', copy.channel, 1, 1.1, 3.5, 0.8, {
        font: 'sans',
        size: 1.05,
        weight: 700,
        colorRole: 'muted',
        uppercase: true,
        tracking: '0.26em',
      }),
      createText('title', 'title', copy.title, 1, 2.1, 5.6, 3.4, {
        font: 'serif',
        size: 6.3,
        lineHeight: 0.9,
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1, 6.1, 4.6, 2.2, {
        size: 1.5,
        weight: 500,
        colorRole: 'muted',
        lineHeight: 1.2,
      }),
      createText('cta', 'cta', copy.cta, 1, 9.6, 2.8, 0.9, {
        size: 1.15,
        weight: 700,
        colorRole: 'ink',
      }),
      createImage('image-hero', copy.imageLabels[0], 7, 1.1, 4, 8.6, {
        radius: 2.8,
        tone: 'primary',
      }),
      createImage('image-detail', copy.imageLabels[1], 7.4, 8.5, 3.2, 2.2, {
        radius: 1.9,
        tone: 'secondary',
      }),
    ],
    portrait: [
      createShape('shape-pill', 7.7, 0.9, 3.1, 1.8, { fillRole: 'accentSoft', opacity: 0.85 }),
      createText('eyebrow', 'eyebrow', copy.channel, 1, 1.2, 4, 0.8, {
        font: 'sans',
        size: 1,
        weight: 700,
        colorRole: 'muted',
        uppercase: true,
        tracking: '0.26em',
      }),
      createText('title', 'title', copy.title, 1, 2.1, 6.4, 3.8, {
        font: 'serif',
        size: 6.1,
        lineHeight: 0.9,
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1, 6.6, 4.8, 2.8, {
        size: 1.4,
        weight: 500,
        colorRole: 'muted',
        lineHeight: 1.2,
      }),
      createImage('image-hero', copy.imageLabels[0], 6.8, 1.5, 4.2, 9.1, {
        radius: 2.8,
        tone: 'primary',
      }),
      createImage('image-detail', copy.imageLabels[1], 1, 10.4, 4.3, 2.2, {
        radius: 1.8,
        tone: 'secondary',
      }),
      createText('cta', 'cta', copy.cta, 6.9, 11.6, 3, 0.9, {
        size: 1.1,
        weight: 700,
      }),
    ],
    story: [
      createShape('shape-glow', 7.4, 1, 3.6, 3.6, { fillRole: 'accentSoft', opacity: 0.9 }),
      createText('eyebrow', 'eyebrow', copy.channel, 1.2, 1.3, 4.1, 0.8, {
        font: 'sans',
        size: 0.95,
        weight: 700,
        colorRole: 'muted',
        uppercase: true,
        tracking: '0.26em',
      }),
      createText('title', 'title', copy.title, 1.2, 2.5, 8.6, 4.5, {
        font: 'serif',
        size: 5.8,
        lineHeight: 0.9,
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1.2, 7.6, 6.1, 2.4, {
        size: 1.35,
        weight: 500,
        colorRole: 'muted',
        lineHeight: 1.18,
      }),
      createImage('image-hero', copy.imageLabels[0], 1.2, 11, 9.6, 4.9, {
        radius: 2.8,
        tone: 'primary',
      }),
      createText('cta', 'cta', copy.cta, 1.2, 16.4, 3, 0.9, {
        size: 1.12,
        weight: 700,
      }),
    ],
    landscape: [
      createShape('shape-bar', 9.5, 0.9, 5.2, 1.1, { fillRole: 'accentSoft', radius: 99, opacity: 0.85 }),
      createText('eyebrow', 'eyebrow', copy.channel, 1, 1.2, 4.2, 0.7, {
        font: 'sans',
        size: 0.88,
        weight: 700,
        colorRole: 'muted',
        uppercase: true,
        tracking: '0.24em',
      }),
      createText('title', 'title', copy.title, 1, 2.2, 7.8, 2.7, {
        font: 'serif',
        size: 5.1,
        lineHeight: 0.9,
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1, 5.2, 5.8, 1.7, {
        size: 1.08,
        weight: 500,
        colorRole: 'muted',
        lineHeight: 1.18,
      }),
      createText('cta', 'cta', copy.cta, 1, 7.8, 2.7, 0.7, {
        size: 0.94,
        weight: 700,
      }),
      createImage('image-hero', copy.imageLabels[0], 9.2, 1.2, 5.4, 6.1, {
        radius: 2.5,
        tone: 'primary',
      }),
      createImage('image-detail', copy.imageLabels[1], 6.4, 6.1, 2.1, 2.1, {
        radius: 1.6,
        tone: 'secondary',
      }),
    ],
  }

  return templates[format.id]
}

function spotlightLayout(copy, format) {
  const templates = {
    square: [
      createImage('image-hero', copy.imageLabels[0], 1, 1, 10, 10, {
        radius: 3,
        tone: 'primary',
      }),
      createShape('shape-orb', 8.5, 0.8, 2.7, 2.7, { fillRole: 'accent', opacity: 0.86 }),
      createText('eyebrow', 'eyebrow', copy.subject, 1.4, 1.5, 4.5, 0.8, {
        font: 'sans',
        size: 0.92,
        weight: 700,
        colorRole: 'paper',
        uppercase: true,
        tracking: '0.22em',
      }),
      createText('title', 'title', copy.title, 1.4, 6.8, 7, 2.5, {
        font: 'display',
        size: 5.8,
        colorRole: 'paper',
        lineHeight: 0.9,
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1.4, 9.4, 5.5, 1.5, {
        size: 1.16,
        weight: 500,
        colorRole: 'paperSoft',
        lineHeight: 1.18,
      }),
      createImage('image-detail', copy.imageLabels[1], 8, 7.6, 2.1, 2.1, {
        radius: 1.4,
        tone: 'secondary',
      }),
    ],
    portrait: [
      createImage('image-hero', copy.imageLabels[0], 1, 1, 10, 12, {
        radius: 3.2,
        tone: 'primary',
      }),
      createShape('shape-pill', 7.8, 1.4, 2.6, 1.2, { fillRole: 'accent', radius: 99, opacity: 0.9 }),
      createText('eyebrow', 'eyebrow', copy.subject, 1.5, 1.7, 4.8, 0.8, {
        font: 'sans',
        size: 0.94,
        weight: 700,
        colorRole: 'paper',
        uppercase: true,
        tracking: '0.22em',
      }),
      createText('title', 'title', copy.title, 1.4, 8.8, 8.4, 2.8, {
        font: 'display',
        size: 5.4,
        colorRole: 'paper',
        lineHeight: 0.9,
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1.4, 11.7, 6.2, 1.7, {
        size: 1.12,
        weight: 500,
        colorRole: 'paperSoft',
        lineHeight: 1.18,
      }),
      createText('cta', 'cta', copy.cta, 8.2, 12.5, 2.5, 0.8, {
        size: 1,
        weight: 700,
        colorRole: 'paper',
      }),
    ],
    story: [
      createImage('image-hero', copy.imageLabels[0], 0.9, 1.1, 10.2, 15.8, {
        radius: 3.1,
        tone: 'primary',
      }),
      createShape('shape-pill', 7.7, 1.4, 2.7, 1.2, { fillRole: 'accent', radius: 99, opacity: 0.9 }),
      createText('eyebrow', 'eyebrow', copy.subject, 1.4, 1.8, 4.8, 0.8, {
        font: 'sans',
        size: 0.9,
        weight: 700,
        colorRole: 'paper',
        uppercase: true,
        tracking: '0.22em',
      }),
      createText('title', 'title', copy.title, 1.4, 11.6, 8.8, 3.1, {
        font: 'display',
        size: 5.3,
        colorRole: 'paper',
        lineHeight: 0.9,
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1.4, 14.9, 7, 1.8, {
        size: 1.08,
        weight: 500,
        colorRole: 'paperSoft',
        lineHeight: 1.18,
      }),
    ],
    landscape: [
      createImage('image-hero', copy.imageLabels[0], 1, 1.1, 14, 7.7, {
        radius: 2.7,
        tone: 'primary',
      }),
      createShape('shape-orb', 12.7, 0.9, 2, 2, { fillRole: 'accent', opacity: 0.9 }),
      createText('eyebrow', 'eyebrow', copy.subject, 1.6, 1.6, 4.5, 0.7, {
        font: 'sans',
        size: 0.78,
        weight: 700,
        colorRole: 'paper',
        uppercase: true,
        tracking: '0.22em',
      }),
      createText('title', 'title', copy.title, 1.5, 5.1, 8.8, 2.1, {
        font: 'display',
        size: 4.6,
        colorRole: 'paper',
        lineHeight: 0.9,
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1.5, 7.4, 6.3, 1.1, {
        size: 0.96,
        weight: 500,
        colorRole: 'paperSoft',
        lineHeight: 1.18,
      }),
      createImage('image-detail', copy.imageLabels[1], 12.1, 5.8, 2.2, 2.2, {
        radius: 1.3,
        tone: 'secondary',
      }),
    ],
  }

  return templates[format.id]
}

function modularLayout(copy, format) {
  const templates = {
    square: [
      createText('eyebrow', 'eyebrow', copy.channel, 1, 1.1, 4.2, 0.8, {
        font: 'sans',
        size: 0.95,
        weight: 700,
        colorRole: 'muted',
        uppercase: true,
        tracking: '0.24em',
      }),
      createText('title', 'title', copy.title, 1, 2.2, 7, 2.3, {
        font: 'display',
        size: 5.6,
        lineHeight: 0.88,
      }),
      createImage('image-primary', copy.imageLabels[0], 1, 5, 5, 5.2, {
        radius: 2.2,
        tone: 'primary',
      }),
      createImage('image-secondary', copy.imageLabels[1], 7, 2.2, 4, 3.4, {
        radius: 2.1,
        tone: 'secondary',
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 7, 6.1, 4, 2.4, {
        size: 1.24,
        weight: 500,
        colorRole: 'muted',
        lineHeight: 1.18,
      }),
      createShape('shape-bar', 7, 9.4, 4, 0.8, { fillRole: 'accent', radius: 99, opacity: 0.88 }),
      createText('cta', 'cta', copy.cta, 7.4, 9.45, 2.2, 0.7, {
        size: 0.92,
        weight: 700,
        colorRole: 'paper',
      }),
    ],
    portrait: [
      createText('eyebrow', 'eyebrow', copy.channel, 1, 1.2, 4.5, 0.8, {
        font: 'sans',
        size: 0.95,
        weight: 700,
        colorRole: 'muted',
        uppercase: true,
        tracking: '0.24em',
      }),
      createText('title', 'title', copy.title, 1, 2.3, 7.5, 2.8, {
        font: 'display',
        size: 5.3,
        lineHeight: 0.88,
      }),
      createImage('image-primary', copy.imageLabels[0], 1, 5.7, 4.8, 4.7, {
        radius: 2.2,
        tone: 'primary',
      }),
      createImage('image-secondary', copy.imageLabels[1], 6.2, 5.7, 4.8, 3.1, {
        radius: 2.1,
        tone: 'secondary',
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 6.2, 9.3, 4.6, 2.2, {
        size: 1.16,
        weight: 500,
        colorRole: 'muted',
        lineHeight: 1.18,
      }),
      createShape('shape-bar', 1, 12.1, 4.6, 0.85, { fillRole: 'accent', radius: 99, opacity: 0.88 }),
      createText('cta', 'cta', copy.cta, 1.35, 12.2, 3, 0.7, {
        size: 0.94,
        weight: 700,
        colorRole: 'paper',
      }),
    ],
    story: [
      createText('eyebrow', 'eyebrow', copy.channel, 1.2, 1.4, 5, 0.8, {
        font: 'sans',
        size: 0.9,
        weight: 700,
        colorRole: 'muted',
        uppercase: true,
        tracking: '0.24em',
      }),
      createText('title', 'title', copy.title, 1.2, 2.6, 8.5, 3.1, {
        font: 'display',
        size: 5,
        lineHeight: 0.9,
      }),
      createImage('image-primary', copy.imageLabels[0], 1.2, 6.4, 4.8, 4.8, {
        radius: 2.2,
        tone: 'primary',
      }),
      createImage('image-secondary', copy.imageLabels[1], 6.4, 6.4, 4.4, 4.8, {
        radius: 2.2,
        tone: 'secondary',
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 1.2, 12, 7.5, 2.5, {
        size: 1.12,
        weight: 500,
        colorRole: 'muted',
        lineHeight: 1.18,
      }),
      createShape('shape-bar', 1.2, 15.4, 4.8, 0.9, { fillRole: 'accent', radius: 99, opacity: 0.9 }),
      createText('cta', 'cta', copy.cta, 1.55, 15.52, 3.2, 0.7, {
        size: 0.96,
        weight: 700,
        colorRole: 'paper',
      }),
    ],
    landscape: [
      createText('eyebrow', 'eyebrow', copy.channel, 1.1, 1.2, 4.5, 0.7, {
        font: 'sans',
        size: 0.78,
        weight: 700,
        colorRole: 'muted',
        uppercase: true,
        tracking: '0.24em',
      }),
      createText('title', 'title', copy.title, 1.1, 2.1, 7.2, 2.1, {
        font: 'display',
        size: 4.7,
        lineHeight: 0.88,
      }),
      createImage('image-primary', copy.imageLabels[0], 1.1, 4.7, 4.6, 4.1, {
        radius: 2,
        tone: 'primary',
      }),
      createImage('image-secondary', copy.imageLabels[1], 6.1, 4.7, 4.3, 2.6, {
        radius: 1.8,
        tone: 'secondary',
      }),
      createText('subtitle', 'subtitle', copy.subtitle, 10.7, 4.6, 4.2, 2.5, {
        size: 0.94,
        weight: 500,
        colorRole: 'muted',
        lineHeight: 1.18,
      }),
      createShape('shape-bar', 10.7, 7.9, 3.6, 0.7, { fillRole: 'accent', radius: 99, opacity: 0.9 }),
      createText('cta', 'cta', copy.cta, 11.1, 8.02, 2.3, 0.6, {
        size: 0.82,
        weight: 700,
        colorRole: 'paper',
      }),
    ],
  }

  return templates[format.id]
}

function createBackground(theme, palette) {
  if (theme === 'spotlight') {
    return {
      base: `linear-gradient(150deg, ${palette.surface} 0%, ${palette.canvas} 35%, ${palette.frame} 100%)`,
      overlay: `radial-gradient(circle at 82% 14%, ${palette.glow} 0%, transparent 34%), radial-gradient(circle at 22% 88%, ${withAlpha(palette.accent2, 0.2)} 0%, transparent 28%)`,
      texture: `linear-gradient(135deg, ${withAlpha(palette.ink, 0.04)} 0%, transparent 35%, ${withAlpha(palette.ink, 0.05)} 100%)`,
      inset: `inset 0 0 0 1px ${palette.line}`,
    }
  }

  if (theme === 'modular') {
    return {
      base: `linear-gradient(140deg, ${palette.surface} 0%, ${palette.canvas} 50%, ${withAlpha(palette.accentSoft, 0.72)} 100%)`,
      overlay: `radial-gradient(circle at 12% 18%, ${withAlpha(palette.accent, 0.16)} 0%, transparent 30%), radial-gradient(circle at 85% 78%, ${withAlpha(palette.accent2, 0.16)} 0%, transparent 24%)`,
      texture: `linear-gradient(90deg, ${withAlpha(palette.ink, 0.03)} 0%, transparent 100%)`,
      inset: `inset 0 0 0 1px ${palette.line}`,
    }
  }

  return {
    base: `linear-gradient(140deg, ${palette.canvas} 0%, ${palette.surface} 55%, ${palette.frame} 100%)`,
    overlay: `radial-gradient(circle at 85% 18%, ${palette.glow} 0%, transparent 34%), radial-gradient(circle at 10% 90%, ${withAlpha(palette.accent2, 0.18)} 0%, transparent 28%)`,
    texture: `linear-gradient(135deg, ${withAlpha(palette.ink, 0.04)} 0%, transparent 40%, ${withAlpha(palette.ink, 0.03)} 100%)`,
    inset: `inset 0 0 0 1px ${palette.line}`,
  }
}

function layoutForTheme(theme, copy, format) {
  if (theme === 'spotlight') {
    return spotlightLayout(copy, format)
  }

  if (theme === 'modular') {
    return modularLayout(copy, format)
  }

  return editorialLayout(copy, format)
}

export function generateDesignVariations(prompt, seed = 0) {
  const safePrompt = prompt.trim() || 'Instagram post for coffee shop'
  const format = inferFormat(safePrompt)
  const palettes = choosePalettes(safePrompt, seed)

  return THEME_SEQUENCE.map((theme, index) => {
    const palette = palettes[index % palettes.length]
    const copy = buildCopy(safePrompt, seed + index, format)
    const elements = layoutForTheme(theme, copy, format)

    return {
      id: `${theme}-${slugify(copy.subject)}-${index}`,
      name: theme === 'editorial'
        ? 'Editorial Glow'
        : theme === 'spotlight'
          ? 'Bold Spotlight'
          : 'Modular Bloom',
      theme,
      prompt: safePrompt,
      format,
      palette,
      background: createBackground(theme, palette),
      meta: {
        channel: copy.channel,
        subject: copy.subject,
        detail: copy.detail,
      },
      elements,
    }
  })
}

export function getDefaultPrompt() {
  return 'Instagram post for coffee shop'
}

export function getPromptSuggestions() {
  return [
    'Instagram post for coffee shop',
    'Poster for skincare launch',
    'YouTube thumbnail for AI productivity app',
    'Story ad for boutique hotel weekend getaway',
  ]
}

export function getPaletteTokens(palette) {
  return [palette.canvas, palette.surface, palette.accent, palette.accent2]
}

