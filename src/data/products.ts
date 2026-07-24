export interface ProductMaterial {
  id: string;
  name: string;
  colorHex: string;
  finish: 'anodized' | 'frosted' | 'ceramic' | 'matte' | 'brushed';
  previewImage?: string;
}

export interface ExplodedComponent {
  id: string;
  name: string;
  description: string;
  material: string;
  offsetY: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  verified: boolean;
  title: string;
  comment: string;
  avatar: string;
  likes: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'Audio' | 'Wearables' | 'Computing' | 'Mobile' | 'Workspace';
  price: number;
  rating: number;
  reviewsCount: number;
  description: string;
  heroHeadline: string;
  badge?: string;
  isNew?: boolean;
  isFeatured?: boolean;
  image: string;
  gallery: string[];
  accentColor: string;
  materials: ProductMaterial[];
  specs: Record<string, string>;
  explodedComponents: ExplodedComponent[];
  features: { title: string; desc: string; icon: string }[];
  reviews: ProductReview[];
  dimensions?: string;
  weight?: string;
  batteryLife?: string;
  connectivity?: string;
  frequencyResponse?: string;
  stockStatus: 'In Stock' | 'Limited Edition' | 'Pre-Order';
}

export const PRODUCTS: Product[] = [
  {
    id: 'pulse-anc',
    slug: 'pulse-anc',
    name: 'NEXUS Pulse ANC',
    tagline: 'Acoustic Transparency & Beryllium Precision',
    category: 'Audio',
    price: 349,
    rating: 4.9,
    reviewsCount: 328,
    badge: 'Flagship',
    isNew: true,
    isFeatured: true,
    description: 'Precision-engineered wireless earbuds with custom 11mm Beryllium drivers, ultra-low latency spatial audio, and active atmospheric noise suppression up to -48dB.',
    heroHeadline: 'Sound, Sculpted in Air.',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#38bdf8',
    materials: [
      { id: 'obsidian', name: 'Obsidian Black', colorHex: '#0f1115', finish: 'anodized' },
      { id: 'frost', name: 'Frost Titanium', colorHex: '#e2e8f0', finish: 'frosted' },
      { id: 'cyber-green', name: 'Cyber Mint', colorHex: '#10b981', finish: 'matte' }
    ],
    specs: {
      'Driver Size': '11mm Electrostatic Beryllium',
      'Noise Cancellation': '-48dB Hybrid ANC',
      'Battery Life': '12 Hours (42 Hours with Case)',
      'Water Resistance': 'IPX7 Certified',
      'Bluetooth Version': 'Bluetooth 5.4 Ultra-Band',
      'Audio Codec': 'LDAC, aptX Lossless, AAC',
      'Weight': '4.8g per earbud'
    },
    explodedComponents: [
      { id: 'c1', name: 'Acoustic Chamber Case', description: 'Translucent polycarbonate shell with laser-etched antennae', material: 'Polycarbonate', offsetY: 120 },
      { id: 'c2', name: 'Beryllium Driver Unit', description: 'Ultra-thin membrane operating at 10Hz-45kHz frequency range', material: 'Pure Beryllium', offsetY: 60 },
      { id: 'c3', name: 'A1 Neural DSP Chip', description: 'Processes 48,000 noise samples per second in real time', material: 'Silicon / Gold Plated', offsetY: 0 },
      { id: 'c4', name: 'Dual Neodymium Magnets', description: 'High-flux magnetic force for instantaneous transient response', material: 'Neodymium N55', offsetY: -60 },
      { id: 'c5', name: 'Silicone Eartip Matrix', description: 'Biocompatible memory foam hybrid tip', material: 'Liquid Silicone', offsetY: -120 }
    ],
    features: [
      { title: 'Neural ANC 3.0', desc: 'Real-time adaptive noise cancellation dynamically tunes out ambient noise based on ear canal reflection.', icon: 'ShieldCheck' },
      { title: 'Spatial HoloAudio', desc: 'Head-tracking spatial audio engine renders full 3D soundscapes with zero motion delay.', icon: 'Radio' },
      { title: 'Glass Touch Interface', desc: 'Capacitive sapphire glass surface supporting pressure-sensitive gesture control.', icon: 'Fingerprint' }
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Julian Vance',
        rating: 5,
        date: '2026-06-12',
        verified: true,
        title: 'Unbelievable acoustic clarity',
        comment: 'The soundstage on the Pulse ANC makes every flac track feel live. The transparent case design gets endless compliments.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        likes: 42
      },
      {
        id: 'r2',
        author: 'Elena Rostova',
        rating: 5,
        date: '2026-06-20',
        verified: true,
        title: 'A masterpiece of industrial design',
        comment: 'Feels like carrying a piece of sci-fi tech in your pocket. ANC completely silences airplane engine hum.',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
        likes: 19
      }
    ],
    dimensions: '24 x 19 x 21 mm',
    weight: '4.8g',
    batteryLife: '42 Hours Total',
    connectivity: 'Bluetooth 5.4 LE',
    frequencyResponse: '10Hz - 45,000Hz',
    stockStatus: 'In Stock'
  },
  {
    id: 'horizon-overear',
    slug: 'horizon-overear',
    name: 'NEXUS Horizon',
    tagline: 'Reference-Grade Spatial Over-Ear Headphones',
    category: 'Audio',
    price: 599,
    rating: 5.0,
    reviewsCount: 189,
    badge: 'Luxury Reference',
    isNew: true,
    isFeatured: true,
    description: 'Crafted from aerospace-grade aluminum and perforated Nappa leather. Features 50mm Planar Magnetic transducers and active thermal dissipation.',
    heroHeadline: 'Absolute Resonance.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#f59e0b',
    materials: [
      { id: 'raw-titanium', name: 'Raw Aerospace Aluminum', colorHex: '#94a3b8', finish: 'anodized' },
      { id: 'matte-black', name: 'Stealth Matte Black', colorHex: '#18181b', finish: 'matte' },
      { id: 'copper-edition', name: 'Rose Gold Accent', colorHex: '#e0a96d', finish: 'brushed' }
    ],
    specs: {
      'Transducer': '50mm Planar Magnetic',
      'Frequency Response': '5Hz - 52,000Hz',
      'Impedance': '32 Ohms Active',
      'THD': '< 0.02% @ 1kHz',
      'Battery Life': '55 Hours Playback',
      'Charging': '15-min Quick Charge for 8 Hours',
      'Weight': '320g'
    },
    explodedComponents: [
      { id: 'h1', name: 'Milled Aluminum Earcups', description: 'CNC carved from solid aircraft billet aluminum', material: 'AL-7075', offsetY: 140 },
      { id: 'h2', name: 'Memory Foam Nappa Cushion', description: 'Self-cooling gel infused mesh headband', material: 'Nappa Leather & Gel', offsetY: 70 },
      { id: 'h3', name: '50mm Planar Magnetic Array', description: 'Sub-micron planar diaphragm with gold trace lattice', material: 'Mylar & Gold', offsetY: 0 },
      { id: 'h4', name: 'Dual DAC Amplifiers', description: 'Balanced dual-mono high-resolution amplifier circuit', material: 'ESS Sabre DAC', offsetY: -70 },
      { id: 'h5', name: 'Magnetic Gimbal Swivel', description: 'Frictionless dual-axis rotation joint', material: 'Stainless Steel', offsetY: -140 }
    ],
    features: [
      { title: 'Planar Precision', desc: 'Delivers distortion-free sub-bass and ultra-detailed treble clarity impossible with dynamic cone drivers.', icon: 'Sliders' },
      { title: 'Cooling Thermal Gel', desc: 'Earcups dynamically absorb body heat to ensure endless listening sessions without fatigue.', icon: 'Thermometer' }
    ],
    reviews: [
      {
        id: 'hr1',
        author: 'Marcus Vance',
        rating: 5,
        date: '2026-05-18',
        verified: true,
        title: 'Studio monitor sound in a wireless headphone',
        comment: 'I use these both for music production and casual listening. The soundstage depth is staggering.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        likes: 31
      }
    ],
    dimensions: '190 x 180 x 85 mm',
    weight: '320g',
    batteryLife: '55 Hours',
    connectivity: 'Bluetooth 5.4 / USB-C Lossless',
    frequencyResponse: '5Hz - 52,000Hz',
    stockStatus: 'In Stock'
  },
  {
    id: 'chrono-ring',
    slug: 'chrono-ring',
    name: 'NEXUS Halo Ring',
    tagline: 'Sub-Millimeter Bio-Metric Intelligence',
    category: 'Wearables',
    price: 299,
    rating: 4.8,
    reviewsCount: 142,
    badge: 'AI Powered',
    isNew: false,
    isFeatured: true,
    description: 'Ultra-lightweight titanium smart ring equipped with medical-grade optical sensor array, continuous ECG monitoring, core body temp tracking, and 7-day battery life.',
    heroHeadline: 'Intelligence at your Fingertip.',
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#34d399',
    materials: [
      { id: 'ti-silver', name: 'Polished Titanium', colorHex: '#cbd5e1', finish: 'anodized' },
      { id: 'ti-gold', name: 'Champagne Gold', colorHex: '#fef08a', finish: 'anodized' },
      { id: 'ti-black', name: 'PVD Stealth Obsidian', colorHex: '#09090b', finish: 'matte' }
    ],
    specs: {
      'Material': 'Grade 5 Medical Titanium',
      'Weight': '2.4g to 3.1g depending on size',
      'Sensors': 'Quad Photoplethysmography, Skin Temp, 3-Axis Accelerometer',
      'Water Rating': '100m (10 ATM)',
      'Battery': '7 Days Continuous Monitoring'
    },
    explodedComponents: [
      { id: 'r1', name: 'Outer Titanium Shell', description: 'Scratch-resistant PVD coating', material: 'Titanium Grade 5', offsetY: 80 },
      { id: 'r2', name: 'Flexible Micro-PCB', description: 'Curved multi-layer substrate with bio-sensor array', material: 'Polyimide Circuit', offsetY: 0 },
      { id: 'r3', name: 'Inner Resin Comfort Ring', description: 'Hypoallergenic bio-compatible resin lining', material: 'Medical Resin', offsetY: -80 }
    ],
    features: [
      { title: 'Continuous Bio-Metrics', desc: 'Tracks heart rate variability, SpO2, vascular age, and sleep architecture automatically.', icon: 'HeartPulse' }
    ],
    reviews: [
      {
        id: 'r_r1',
        author: 'Dr. Sarah Jenkins',
        rating: 5,
        date: '2026-04-10',
        verified: true,
        title: 'Lightweight & shockingly accurate',
        comment: 'Compared its sleep metrics with clinical sleep lab data. Margin of error is practically zero.',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        likes: 56
      }
    ],
    dimensions: 'Width 7.9mm, Thickness 2.2mm',
    weight: '2.4g',
    batteryLife: '7 Days',
    connectivity: 'Bluetooth Low Energy',
    stockStatus: 'In Stock'
  },
  {
    id: 'glyph-keyboard',
    slug: 'glyph-keyboard',
    name: 'NEXUS Glyph Keyboard',
    tagline: 'Custom Hall-Effect Magnetic Mechanical Keyboard',
    category: 'Computing',
    price: 279,
    rating: 4.9,
    reviewsCount: 215,
    badge: 'Pro Edition',
    isNew: true,
    isFeatured: true,
    description: 'CNC milled solid block aluminum keyboard with custom rapid-trigger magnetic switches, per-key RGB transparent acrylic keycaps, and customizable OLED status display.',
    heroHeadline: 'Tactile Perfection.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#a855f7',
    materials: [
      { id: 'frosted-white', name: 'Frosted Glass White', colorHex: '#f8fafc', finish: 'frosted' },
      { id: 'midnight-black', name: 'Midnight Anodized', colorHex: '#111827', finish: 'anodized' }
    ],
    specs: {
      'Switches': 'NEXUS Magneto-Hall Rapid Trigger (0.1mm - 4.0mm adjustable actuation)',
      'Polling Rate': '8000Hz Ultra Polling',
      'Keycaps': 'Custom Transparent Polycarbonate Poly-Legend',
      'Structure': 'Gasket Mounted with Poron Foam Silencers',
      'Display': '1.47-inch High-Density OLED',
      'Weight': '1.45 kg'
    },
    explodedComponents: [],
    features: [
      { title: 'Rapid Trigger Hall Switches', desc: 'Keys reset the instant you lift your finger up, giving milliseconds advantage in competitive tasks.', icon: 'Zap' }
    ],
    reviews: [
      {
        id: 'kr1',
        author: 'Alex Rivera',
        rating: 5,
        date: '2026-06-01',
        verified: true,
        title: 'The best typing sound and feel ever made',
        comment: 'Deep thock sound straight out of the box. The magnetic switch adjustment lets me switch between gaming and typing modes seamlessly.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        likes: 27
      }
    ],
    dimensions: '320 x 140 x 38 mm',
    weight: '1.45 kg',
    batteryLife: '120 Hours (RGB Off)',
    connectivity: '2.4GHz / Bluetooth / USB-C',
    stockStatus: 'In Stock'
  },
  {
    id: 'vision-monitor',
    slug: 'vision-monitor',
    name: 'NEXUS Vision 32" OLED',
    tagline: '32-inch 4K 240Hz Quantum Dot OLED Reference Monitor',
    category: 'Computing',
    price: 1299,
    rating: 5.0,
    reviewsCount: 94,
    badge: 'Pro Display',
    isNew: true,
    isFeatured: true,
    description: 'The pinnacle of desktop visual fidelity. Featuring 0.03ms GTG response, 1000 nits peak HDR brightness, 99.3% DCI-P3 color accuracy, and zero bezel design.',
    heroHeadline: 'Light Made Visible.',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#3b82f6',
    materials: [
      { id: 'titanium-gray', name: 'Titanium Graphite', colorHex: '#475569', finish: 'anodized' }
    ],
    specs: {
      'Screen Size': '31.5-inch QD-OLED',
      'Resolution': '3840 x 2160 (4K UHD)',
      'Refresh Rate': '240Hz Native',
      'Response Time': '0.03ms GTG',
      'Color Gamut': '99.3% DCI-P3, 100% sRGB Delta-E < 1.0',
      'Ports': '2x HDMI 2.1, 1x DP 2.1, 96W USB-C PD Hub'
    },
    explodedComponents: [],
    features: [
      { title: 'Zero Burn-in Graphene Thermal System', desc: 'Passively cools panel components without noisy fans for lifetime picture durability.', icon: 'Snowflake' }
    ],
    reviews: [
      {
        id: 'vr1',
        author: 'Liam Chen',
        rating: 5,
        date: '2026-05-30',
        verified: true,
        title: 'Simply unrivaled image quality',
        comment: 'Color precision for my color grading workflows is 10/10. Plus 240Hz QD-OLED gaming is unreal.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        likes: 18
      }
    ],
    dimensions: '714 x 420 x 50 mm',
    weight: '6.8 kg',
    connectivity: 'HDMI 2.1 / DP 2.1 / USB-C 96W',
    stockStatus: 'In Stock'
  },
  {
    id: 'book-pro',
    slug: 'book-pro',
    name: 'NEXUS Book Pro 16',
    tagline: 'Unibody Titanium Mobile Workstation',
    category: 'Workspace',
    price: 2499,
    rating: 4.9,
    reviewsCount: 78,
    badge: 'Flagship Laptop',
    isNew: true,
    isFeatured: true,
    description: 'Forged from seamless Grade 5 Titanium. Powered by custom 16-core Neural APU architecture with 64GB Unified Memory and 120Hz Liquid Retina display.',
    heroHeadline: 'Power without Compromise.',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#64748b',
    materials: [
      { id: 'titanium-natural', name: 'Natural Titanium', colorHex: '#94a3b8', finish: 'anodized' },
      { id: 'space-black', name: 'Space Black', colorHex: '#0f172a', finish: 'matte' }
    ],
    specs: {
      'Processor': 'NEXUS X1 Neural APU (16 CPU / 40 GPU Cores)',
      'Memory': '64GB LPDDR5X Unified Architecture',
      'Display': '16.2-inch Tandem OLED ProMotion 120Hz (1600 nits)',
      'Storage': '2TB PCIe Gen5 NVMe (7,500 MB/s)',
      'Battery': '100Whr (Up to 24 hours battery life)',
      'Weight': '1.78 kg'
    },
    explodedComponents: [],
    features: [
      { title: 'Tandem OLED Display', desc: 'Dual OLED stacks deliver 1600 nits peak HDR brightness and infinite contrast ratio.', icon: 'Sun' }
    ],
    reviews: [
      {
        id: 'bpr1',
        author: 'Samantha Wu',
        rating: 5,
        date: '2026-06-15',
        verified: true,
        title: 'Replaced my desktop workstation completely',
        comment: 'Runs local LLMs and 8K video renders without turning fans on. Battery lasts two full days of coding.',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        likes: 39
      }
    ],
    dimensions: '356 x 248 x 14.8 mm',
    weight: '1.78 kg',
    batteryLife: '24 Hours',
    connectivity: 'Wi-Fi 7, 4x Thunderbolt 5, MagSafe Charging',
    stockStatus: 'In Stock'
  },
  {
    id: 'phone-one',
    slug: 'phone-one',
    name: 'NEXUS Phone (1)',
    tagline: 'Transparent Glass Luminary Smartphone',
    category: 'Mobile',
    price: 899,
    rating: 4.8,
    reviewsCount: 310,
    badge: 'Iconic Design',
    isNew: false,
    isFeatured: true,
    description: 'Featuring a transparent Gorilla Glass back revealing micro-etched copper trace circuitry and 900 controllable Glyph LEDs for intelligent visual notifications.',
    heroHeadline: 'See Through the Future.',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#ec4899',
    materials: [
      { id: 'pure-white', name: 'Pure White Glass', colorHex: '#f1f5f9', finish: 'frosted' },
      { id: 'smoke-black', name: 'Smoke Tint Glass', colorHex: '#1e293b', finish: 'anodized' }
    ],
    specs: {
      'Display': '6.7-inch Flexible LTPO OLED 1-120Hz',
      'Camera': 'Dual 50MP Sony IMX989 1-inch Sensors with OIS',
      'Processor': 'Snapdragon 8 Gen 4 NEXUS Edition',
      'Glyph Array': '900 Programmable Matrix LEDs',
      'Battery': '5000mAh with 65W Wired & 30W Magnetic Wireless'
    },
    explodedComponents: [],
    features: [
      { title: 'Interactive Glyph Interface', desc: 'Assign custom LED lighting patterns to specific contacts and notifications.', icon: 'Sparkles' }
    ],
    reviews: [
      {
        id: 'pr1',
        author: 'Derrick Hall',
        rating: 5,
        date: '2026-03-22',
        verified: true,
        title: 'Most head-turning phone I have ever owned',
        comment: 'People ask about this phone every time I take it out. The camera is superb and battery gets me through 2 full days.',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150',
        likes: 45
      }
    ],
    dimensions: '162 x 76 x 8.1 mm',
    weight: '198g',
    batteryLife: '30 Hours Use',
    connectivity: '5G Sub-6/mmWave, Wi-Fi 7, NFC',
    stockStatus: 'In Stock'
  },
  {
    id: 'drift-mouse',
    slug: 'drift-mouse',
    name: 'NEXUS Drift Mouse',
    tagline: 'Ultralight Magnesium Alloy Wireless Mouse',
    category: 'Computing',
    price: 149,
    rating: 4.7,
    reviewsCount: 167,
    description: 'Open-exoskeleton hollow magnesium frame weighing just 36 grams. Equipped with 32,000 DPI Optical Sensor and Optical Microswitches rated for 90M clicks.',
    heroHeadline: 'Frictionless Motion.',
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#2dd4bf',
    materials: [
      { id: 'mag-titanium', name: 'Raw Magnesium', colorHex: '#cbd5e1', finish: 'anodized' }
    ],
    specs: {
      'Weight': '36 grams (Ultra Light)',
      'Sensor': 'PAW3395 Custom Optical Sensor (32,000 DPI)',
      'Polling Rate': '4000Hz Wireless Dongle Included',
      'Switches': 'NEXUS Optical Switch 2.0 (90M clicks)'
    },
    explodedComponents: [],
    features: [],
    reviews: [],
    dimensions: '118 x 62 x 37 mm',
    weight: '36g',
    connectivity: '4K Wireless Dongle / USB-C',
    stockStatus: 'In Stock'
  },
  {
    id: 'orbit-speaker',
    slug: 'orbit-speaker',
    name: 'NEXUS Orbital Sound',
    tagline: '360° Omnidirectional Portable Acoustic Sphere',
    category: 'Audio',
    price: 249,
    rating: 4.8,
    reviewsCount: 112,
    description: 'Suspended dual-opposing passive radiators in a machined aluminum spherical shell. Provides rich 360-degree sound with deep bass down to 40Hz.',
    heroHeadline: 'Sound in All Directions.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#f59e0b',
    materials: [
      { id: 'silver-orb', name: 'Anodized Silver', colorHex: '#e2e8f0', finish: 'anodized' }
    ],
    specs: {
      'Frequency Response': '40Hz - 22,000Hz',
      'Power Output': '60W Peak Dynamic Class-D',
      'Battery': '20 Hours Playback'
    },
    explodedComponents: [],
    features: [],
    reviews: [],
    dimensions: '130 x 130 x 130 mm',
    weight: '890g',
    batteryLife: '20 Hours',
    stockStatus: 'In Stock'
  },
  {
    id: 'flux-dock',
    slug: 'flux-dock',
    name: 'NEXUS Flux Dock',
    tagline: 'Magnetic Floating 4-in-1 GaN Charging Station',
    category: 'Workspace',
    price: 189,
    rating: 4.9,
    reviewsCount: 88,
    description: '140W total output powered by Gallium Nitride (GaN) technology. Floating magnetic levitation stand for phone, watch, ring, and earbuds.',
    heroHeadline: 'Charge without Wires.',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#38bdf8',
    materials: [
      { id: 'flux-titanium', name: 'Natural Titanium', colorHex: '#94a3b8', finish: 'anodized' }
    ],
    specs: {
      'Total Power': '140W GaN Fast Charge',
      'Ports': '3x USB-C 100W PD, 1x USB-A 30W, Wireless Mag Pad 15W'
    },
    explodedComponents: [],
    features: [],
    reviews: [],
    dimensions: '110 x 85 x 140 mm',
    weight: '620g',
    stockStatus: 'In Stock'
  },
  {
    id: 'apex-speakers',
    slug: 'apex-speakers',
    name: 'NEXUS Apex Studio Soundbar',
    tagline: '11.1.4 Channel Spatial Audio Reference System',
    category: 'Audio',
    price: 1199,
    rating: 5.0,
    reviewsCount: 64,
    description: '15 precision-angled dynamic drivers with dedicated wireless sub-woofer delivering Dolby Atmos 3D immersive cinema audio.',
    heroHeadline: 'Cinematic Atmosphere.',
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1000&q=80',
    gallery: [],
    accentColor: '#8b5cf6',
    materials: [],
    specs: {
      'Channels': '11.1.4 Spatial Atmos System',
      'Total Output': '720W Peak Power'
    },
    explodedComponents: [],
    features: [],
    reviews: [],
    dimensions: '1120 x 80 x 120 mm',
    weight: '7.2 kg',
    stockStatus: 'Limited Edition'
  },
  {
    id: 'chrono-watch',
    slug: 'chrono-watch',
    name: 'NEXUS Chrono Watch',
    tagline: 'Titanium Sapphire Smart Timepiece',
    category: 'Wearables',
    price: 499,
    rating: 4.8,
    reviewsCount: 154,
    description: 'Crafted with a micro-milled Grade 5 Titanium bezel and Sapphire Crystal touchscreen. Features dual-frequency GPS, LTE, and emergency satellite uplink.',
    heroHeadline: 'Time Refined.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=80'
    ],
    accentColor: '#60a5fa',
    materials: [],
    specs: {
      'Display': '1.5-inch Always-On Sapphire AMOLED (3000 nits)',
      'Battery Life': '5 Days Normal / 14 Days Power Saver'
    },
    explodedComponents: [],
    features: [],
    reviews: [],
    dimensions: '45 x 45 x 11.2 mm',
    weight: '48g',
    stockStatus: 'In Stock'
  },
  {
    id: 'slate-tablet',
    slug: 'slate-tablet',
    name: 'NEXUS Slate',
    tagline: '13-inch Tandem OLED Ultra-Thin Creator Tablet',
    category: 'Mobile',
    price: 1099,
    rating: 4.9,
    reviewsCount: 98,
    description: 'At just 4.9mm thin, NEXUS Slate is our thinnest device ever. Powered by X1 Neural Chip with magnetic active stylus support.',
    heroHeadline: 'Canvas of Infinite Possibility.',
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=1000&q=80',
    gallery: [],
    accentColor: '#06b6d4',
    materials: [],
    specs: {
      'Thickness': '4.9mm (Ultra Thin)',
      'Display': '13-inch Tandem OLED 120Hz ProMotion'
    },
    explodedComponents: [],
    features: [],
    reviews: [],
    dimensions: '281 x 215 x 4.9 mm',
    weight: '440g',
    stockStatus: 'In Stock'
  },
  {
    id: 'magmat-desk',
    slug: 'magmat-desk',
    name: 'NEXUS MagMat Pro',
    tagline: 'Magnetic Modular Leather & Felt Desk Mat',
    category: 'Workspace',
    price: 89,
    rating: 4.9,
    reviewsCount: 204,
    description: 'Premium waterproof vegan leather top layer over high-density acoustic merino wool felt. Features magnetic cable anchors and wireless charging dock attachment.',
    heroHeadline: 'Organize Your Surface.',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    gallery: [],
    accentColor: '#a1a1aa',
    materials: [],
    specs: {
      'Dimensions': '900 x 400 x 4 mm',
      'Materials': 'Top Grain Waterproof Vegan Leather + 100% Merino Wool Felt'
    },
    explodedComponents: [],
    features: [],
    reviews: [],
    dimensions: '900 x 400 x 4 mm',
    weight: '650g',
    stockStatus: 'In Stock'
  }
];

export const CATEGORIES = ['All', 'Audio', 'Wearables', 'Computing', 'Mobile', 'Workspace'] as const;
