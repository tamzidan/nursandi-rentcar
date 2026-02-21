import { reactive, watch } from 'vue'

const STORAGE_KEY = 'nursandi_settings_v1'
const ADMIN_PASS_KEY = 'nursandi_admin_pass'
const DEFAULT_ADMIN_PASS = 'admin123'

// ─────────────── DEFAULT DATA ────────────────────────────────────────────────
const defaultSettings = {
  // Identitas
  businessName: 'Nursandi RentCar',
  tagline: 'Solusi Rental Terpercaya di Majalengka',
  heroSubtitle: 'Nursandi RentCar hadir sebagai solusi kebutuhan transportasi Anda di Majalengka dan sekitarnya. Armada lengkap, kondisi terawat, harga terjangkau.',

  // Kontak
  whatsapp: '6287835673030',
  email: 'adiecahh27@gmail.com',
  address: 'Majalengka, Jawa Barat',
  mapsLink: 'https://maps.app.goo.gl/grEhXXHX6C2pTW9K9',
  mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d253590.97607628707!2d108.31012718320314!3d-6.725976535871003!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f2f43b5734aa9%3A0x1a54e3e19261114b!2sNursandi%20rentcar%20Rental%20mobil%20dan%20motor%20majalengka!5e0!3m2!1sid!2sid!4v1771593721659!5m2!1sid!2sid',

  // Hero Stats
  stats: [
    { num: '100+', label: 'Pelanggan Puas' },
    { num: '5★', label: 'Rating Google' },
    { num: '24/7', label: 'Siap Melayani' },
  ],

  // Keunggulan
  features: [
    { icon: '🛡️', title: 'Kendaraan Terawat', desc: 'Semua unit kami dirawat secara rutin dan dalam kondisi prima siap jalan.' },
    { icon: '💰', title: 'Harga Bersahabat', desc: 'Tarif kompetitif tanpa biaya tersembunyi. Transparan dan sesuai kesepakatan.' },
    { icon: '⚡', title: 'Proses Cepat', desc: 'Pemesanan mudah via WhatsApp, konfirmasi cepat, kendaraan langsung tersedia.' },
    { icon: '🗺️', title: 'Berpengalaman', desc: 'Melayani pelanggan di Majalengka dan sekitarnya dengan penuh dedikasi.' },
    { icon: '🕐', title: 'Layanan 24/7', desc: 'Kami siap melayani kebutuhan Anda kapan saja, termasuk malam hari.' },
    { icon: '🤝', title: 'Terpercaya', desc: 'Ratusan pelanggan puas menjadi bukti komitmen kami dalam pelayanan.' },
  ],

  // Testimoni
  testimonials: [
    { name: 'Rudi Hartono', from: 'Majalengka', text: 'Mobilnya bersih dan terawat banget, harga juga sangat terjangkau. Pelayanannya ramah dan responsif.' },
    { name: 'Siti Aminah', from: 'Bandung', text: 'Sewa motor buat wisata ke Majalengka, prosesnya gampang banget cukup WA langsung dapat unitnya.' },
    { name: 'Ahmad Fauzi', from: 'Cirebon', text: 'Sudah beberapa kali sewa di sini, selalu puas. Recommended buat yang butuh rental terpercaya di Majalengka!' },
  ],

  // Jam Operasional
  hours: [
    { day: 'Senin', time: '07.00 – 21.00', open: true },
    { day: 'Selasa', time: '07.00 – 21.00', open: true },
    { day: 'Rabu', time: '07.00 – 21.00', open: true },
    { day: 'Kamis', time: '07.00 – 21.00', open: true },
    { day: 'Jumat', time: '07.00 – 21.00', open: true },
    { day: 'Sabtu', time: '07.00 – 22.00', open: true },
    { day: 'Minggu', time: '08.00 – 20.00', open: true },
  ],

  // Mobil
  cars: [
    {
      id: 1, name: 'Toyota Avanza', desc: 'MPV keluarga paling populer, nyaman untuk 7 penumpang.',
      price: 'Rp 350.000', badge: 'Terlaris', emoji: '🚙', category: 'MPV',
      specs: [{ icon: '👥', label: '7 Kursi' }, { icon: '⛽', label: 'Bensin' }, { icon: '🔧', label: 'Manual/Matic' }, { icon: '❄️', label: 'AC' }],
      image: '',
    },
    {
      id: 2, name: 'Toyota Innova', desc: 'Mobil serbaguna premium untuk perjalanan jauh yang nyaman.',
      price: 'Rp 500.000', badge: 'Premium', emoji: '🚐', category: 'MPV',
      specs: [{ icon: '👥', label: '8 Kursi' }, { icon: '⛽', label: 'Solar/Bensin' }, { icon: '🔧', label: 'Manual/Matic' }, { icon: '❄️', label: 'AC' }],
      image: '',
    },
    {
      id: 3, name: 'Daihatsu Xenia', desc: 'Alternatif ekonomis untuk keluarga, irit BBM dan tangguh.',
      price: 'Rp 300.000', badge: '', emoji: '🚗', category: 'MPV',
      specs: [{ icon: '👥', label: '7 Kursi' }, { icon: '⛽', label: 'Bensin' }, { icon: '🔧', label: 'Manual' }, { icon: '❄️', label: 'AC' }],
      image: '',
    },
    {
      id: 4, name: 'Toyota Fortuner', desc: 'SUV tangguh untuk medan berat dan perjalanan off-road.',
      price: 'Rp 700.000', badge: 'SUV', emoji: '🛻', category: 'SUV',
      specs: [{ icon: '👥', label: '7 Kursi' }, { icon: '⛽', label: 'Solar' }, { icon: '🔧', label: 'Matic' }, { icon: '🏔️', label: '4WD' }],
      image: '',
    },
    {
      id: 5, name: 'Honda Jazz', desc: 'City car lincah dan irit untuk aktivitas harian dalam kota.',
      price: 'Rp 280.000', badge: '', emoji: '🚘', category: 'Sedan',
      specs: [{ icon: '👥', label: '5 Kursi' }, { icon: '⛽', label: 'Bensin' }, { icon: '🔧', label: 'Matic' }, { icon: '❄️', label: 'AC' }],
      image: '',
    },
    {
      id: 6, name: 'Suzuki Ertiga', desc: 'MPV modern dengan kabin lapang dan fitur lengkap.',
      price: 'Rp 350.000', badge: '', emoji: '🚗', category: 'Minibus',
      specs: [{ icon: '👥', label: '7 Kursi' }, { icon: '⛽', label: 'Bensin' }, { icon: '🔧', label: 'Manual/Matic' }, { icon: '❄️', label: 'AC' }],
      image: '',
    },
    {
      id: 7, name: 'Hiace Commuter', desc: 'Minibus kapasitas besar ideal untuk rombongan wisata.',
      price: 'Rp 800.000', badge: 'Rombongan', emoji: '🚌', category: 'Minibus',
      specs: [{ icon: '👥', label: '15 Kursi' }, { icon: '⛽', label: 'Solar' }, { icon: '🔧', label: 'Manual' }, { icon: '❄️', label: 'AC' }],
      image: '',
    },
    {
      id: 8, name: 'Honda CRV', desc: 'SUV premium dengan desain elegan dan teknologi terkini.',
      price: 'Rp 650.000', badge: 'SUV', emoji: '🚙', category: 'SUV',
      specs: [{ icon: '👥', label: '5 Kursi' }, { icon: '⛽', label: 'Bensin' }, { icon: '🔧', label: 'Matic' }, { icon: '❄️', label: 'AC' }],
      image: '',
    },
  ],

  // Motor
  motors: [
    {
      id: 1, name: 'Honda Beat', desc: 'Skuter matic paling populer, irit dan lincah untuk dalam kota.',
      price: 'Rp 75.000', badge: 'Terlaris', emoji: '🛵', category: 'Matic',
      specs: [{ icon: '⚡', label: '110cc' }, { icon: '⛽', label: 'Irit BBM' }, { icon: '🔧', label: 'Matic' }, { icon: '👍', label: 'Mudah Dikendarai' }],
      image: '',
    },
    {
      id: 2, name: 'Honda Vario 125', desc: 'Matic premium dengan tampilan sporty dan fitur modern.',
      price: 'Rp 85.000', badge: 'Populer', emoji: '🛵', category: 'Matic',
      specs: [{ icon: '⚡', label: '125cc' }, { icon: '⛽', label: 'Irit BBM' }, { icon: '🔧', label: 'Matic' }, { icon: '🎨', label: 'Sporty Look' }],
      image: '',
    },
    {
      id: 3, name: 'Yamaha NMAX', desc: 'Maxi scooter premium untuk perjalanan jauh yang nyaman.',
      price: 'Rp 120.000', badge: 'Premium', emoji: '🏍️', category: 'Matic',
      specs: [{ icon: '⚡', label: '155cc' }, { icon: '💺', label: 'Jok Lebar' }, { icon: '🔧', label: 'Matic' }, { icon: '🛡️', label: 'ABS' }],
      image: '',
    },
    {
      id: 4, name: 'Yamaha Mio', desc: 'Skuter ringan dan gesit, ideal untuk pelajar dan wanita.',
      price: 'Rp 70.000', badge: '', emoji: '🛵', category: 'Matic',
      specs: [{ icon: '⚡', label: '113cc' }, { icon: '⛽', label: 'Sangat Irit' }, { icon: '🔧', label: 'Matic' }, { icon: '⚖️', label: 'Ringan' }],
      image: '',
    },
    {
      id: 5, name: 'Honda Supra X 125', desc: 'Motor bebek andalan, tangguh dan irit untuk segala medan.',
      price: 'Rp 75.000', badge: '', emoji: '🏍️', category: 'Manual',
      specs: [{ icon: '⚡', label: '125cc' }, { icon: '⛽', label: 'Irit BBM' }, { icon: '🔧', label: 'Manual' }, { icon: '💪', label: 'Tangguh' }],
      image: '',
    },
    {
      id: 6, name: 'Honda CB150R', desc: 'Motor sport bergaya naked bike untuk pengendara berjiwa muda.',
      price: 'Rp 130.000', badge: 'Sport', emoji: '🏍️', category: 'Sport',
      specs: [{ icon: '⚡', label: '150cc' }, { icon: '🏁', label: 'Sporty' }, { icon: '🔧', label: 'Manual' }, { icon: '🔥', label: 'Kencang' }],
      image: '',
    },
    {
      id: 7, name: 'Yamaha R15', desc: 'Motor sport fairing dengan performa tinggi dan handling presisi.',
      price: 'Rp 150.000', badge: 'Sport', emoji: '🏍️', category: 'Sport',
      specs: [{ icon: '⚡', label: '155cc' }, { icon: '🏁', label: 'Full Fairing' }, { icon: '🔧', label: 'Manual' }, { icon: '🛡️', label: 'ABS' }],
      image: '',
    },
    {
      id: 8, name: 'Honda Revo', desc: 'Motor bebek paling ekonomis untuk kebutuhan harian.',
      price: 'Rp 65.000', badge: 'Hemat', emoji: '🛵', category: 'Manual',
      specs: [{ icon: '⚡', label: '110cc' }, { icon: '⛽', label: 'Sangat Irit' }, { icon: '🔧', label: 'Manual' }, { icon: '💰', label: 'Ekonomis' }],
      image: '',
    },
  ],
}

// ─────────────── LOAD / SAVE ────────────────────────────────────────────────
function loadSettings() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      return deepMerge(defaultSettings, parsed)
    }
  } catch (e) {
    console.warn('Could not load settings:', e)
  }
  return JSON.parse(JSON.stringify(defaultSettings))
}

function deepMerge(target, source) {
  const result = JSON.parse(JSON.stringify(target))
  for (const key in source) {
    if (source[key] !== null && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key])
    } else {
      result[key] = source[key]
    }
  }
  return result
}

// ─────────────── REACTIVE STORE ─────────────────────────────────────────────
const settings = reactive(loadSettings())

watch(
  settings,
  (val) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(val))
    } catch (e) {
      console.warn('Could not save settings:', e)
    }
  },
  { deep: true }
)

// ─────────────── HELPERS ────────────────────────────────────────────────────
export function waLink(text = '') {
  const num = settings.whatsapp || '6287835673030'
  return `https://wa.me/${num}${text ? '?text=' + encodeURIComponent(text) : ''}`
}

export function resetSettings() {
  const fresh = JSON.parse(JSON.stringify(defaultSettings))
  Object.assign(settings, fresh)
}

// Admin auth
export function checkAdminPass(pass) {
  const stored = localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_ADMIN_PASS
  return pass === stored
}
export function changeAdminPass(newPass) {
  localStorage.setItem(ADMIN_PASS_KEY, newPass)
}

export function useSettings() {
  return settings
}

export { defaultSettings }
