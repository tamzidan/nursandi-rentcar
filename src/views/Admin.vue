<template>
  <div class="admin-page">
    <!-- LOGIN SCREEN -->
    <div v-if="!isLoggedIn" class="login-screen">
      <div class="login-box">
        <div class="login-icon">🔐</div>
        <h1>Admin Panel</h1>
        <p class="login-sub">Masukkan password untuk mengakses panel pengelola</p>
        <div class="login-form">
          <input
            v-model="passInput"
            type="password"
            placeholder="Masukkan password..."
            class="login-input"
            @keyup.enter="doLogin"
          />
          <button class="btn-primary login-btn" @click="doLogin">Masuk</button>
          <p v-if="loginError" class="login-error">{{ loginError }}</p>
          <p class="login-hint">Password default: <code>admin123</code></p>
        </div>
        <router-link to="/" class="back-link">← Kembali ke Website</router-link>
      </div>
    </div>

    <!-- ADMIN DASHBOARD -->
    <div v-else class="admin-dashboard">
      <!-- Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-brand">
          <span class="brand-ico">⚙️</span>
          <div>
            <span class="brand-name">Admin Panel</span>
            <span class="brand-sub">{{ s.businessName }}</span>
          </div>
        </div>
        <nav class="sidebar-nav">
          <button
            v-for="tab in adminTabs"
            :key="tab.id"
            :class="['sidebar-link', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            <span class="link-icon">{{ tab.icon }}</span>
            <span>{{ tab.label }}</span>
          </button>
        </nav>
        <div class="sidebar-footer">
          <router-link to="/" class="sidebar-link preview">
            <span class="link-icon">👁️</span>
            <span>Lihat Website</span>
          </router-link>
          <button class="sidebar-link danger" @click="doLogout">
            <span class="link-icon">🚪</span>
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="admin-main">
        <!-- Header -->
        <div class="admin-header">
          <div>
            <h1 class="admin-title">{{ currentTabLabel }}</h1>
            <p class="admin-subtitle">Perubahan akan langsung tersimpan di browser</p>
          </div>
          <div class="header-actions">
            <button class="btn-save" @click="showSaved = true; setTimeout(() => showSaved = false, 2500)">
              <span>💾</span> Tersimpan
            </button>
            <transition name="fade">
              <span v-if="showSaved" class="save-toast">✅ Otomatis tersimpan!</span>
            </transition>
          </div>
        </div>

        <!-- ═══════════════════════ TAB: INFORMASI UMUM ═══════════════════════ -->
        <section v-show="activeTab === 'general'" class="tab-section">
          <div class="form-card">
            <h3 class="card-title">Identitas Bisnis</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Nama Bisnis</label>
                <input v-model="s.businessName" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Tagline</label>
                <input v-model="s.tagline" type="text" class="form-input" />
              </div>
              <div class="form-group full">
                <label>Teks Hero (deskripsi singkat di halaman utama)</label>
                <textarea v-model="s.heroSubtitle" class="form-textarea" rows="3"></textarea>
              </div>
            </div>
          </div>

          <div class="form-card">
            <h3 class="card-title">Statistik Hero</h3>
            <div class="stats-list">
              <div class="stat-row" v-for="(stat, i) in s.stats" :key="i">
                <input v-model="stat.num" type="text" class="form-input stat-num" placeholder="100+" />
                <input v-model="stat.label" type="text" class="form-input" placeholder="Pelanggan Puas" />
                <button class="btn-remove" @click="s.stats.splice(i, 1)" title="Hapus">✕</button>
              </div>
              <button class="btn-add" @click="s.stats.push({ num: '', label: '' })">+ Tambah Statistik</button>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════ TAB: KONTAK ═══════════════════════ -->
        <section v-show="activeTab === 'contact'" class="tab-section">
          <div class="form-card">
            <h3 class="card-title">Informasi Kontak</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Nomor WhatsApp <small>(format: 628xxx)</small></label>
                <input v-model="s.whatsapp" type="text" class="form-input" placeholder="6287835673030" />
                <span class="input-preview">Preview: <a :href="waLink('')" target="_blank">wa.me/{{ s.whatsapp }}</a></span>
              </div>
              <div class="form-group">
                <label>Email</label>
                <input v-model="s.email" type="email" class="form-input" />
              </div>
              <div class="form-group">
                <label>Alamat</label>
                <input v-model="s.address" type="text" class="form-input" />
              </div>
              <div class="form-group full">
                <label>Link Google Maps</label>
                <input v-model="s.mapsLink" type="url" class="form-input" placeholder="https://maps.app.goo.gl/..." />
              </div>
              <div class="form-group full">
                <label>Embed URL Google Maps <small>(ambil dari kode embed Google Maps bagian src="...")</small></label>
                <input v-model="s.mapsEmbed" type="url" class="form-input" />
                <div class="map-preview" v-if="s.mapsEmbed">
                  <iframe :src="s.mapsEmbed" width="100%" height="200" style="border:0;" loading="lazy"></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════ TAB: MOBIL ═══════════════════════ -->
        <section v-show="activeTab === 'cars'" class="tab-section">
          <div class="vehicles-admin">
            <div class="vehicle-admin-card" v-for="(car, i) in s.cars" :key="car.id">
              <div class="vcard-header">
                <span class="vcard-emoji">{{ car.emoji }}</span>
                <input v-model="car.emoji" class="form-input emoji-input" placeholder="🚗" />
                <button class="btn-remove" @click="removeCar(i)" title="Hapus kendaraan">✕ Hapus</button>
              </div>

              <!-- Image Upload -->
              <div class="image-upload-area" @click="triggerFileInput('car', i)" @dragover.prevent @drop.prevent="onDrop($event, 'car', i)">
                <img v-if="car.image" :src="car.image" class="preview-img" :alt="car.name" />
                <div v-else class="upload-placeholder">
                  <span class="upload-icon">📸</span>
                  <p>Klik atau drag & drop foto</p>
                  <small>JPG, PNG, WebP (max 2MB)</small>
                </div>
                <button v-if="car.image" class="remove-img-btn" @click.stop="car.image = ''" title="Hapus foto">✕</button>
              </div>
              <input type="file" :ref="el => fileInputs[`car_${i}`] = el" accept="image/*" @change="onFileChange($event, 'car', i)" style="display:none" />

              <div class="form-grid tight">
                <div class="form-group">
                  <label>Nama</label>
                  <input v-model="car.name" type="text" class="form-input" />
                </div>
                <div class="form-group">
                  <label>Harga/hari</label>
                  <input v-model="car.price" type="text" class="form-input" placeholder="Rp 300.000" />
                </div>
                <div class="form-group">
                  <label>Badge <small>(kosongkan jika tidak ada)</small></label>
                  <input v-model="car.badge" type="text" class="form-input" placeholder="Terlaris" />
                </div>
                <div class="form-group">
                  <label>Kategori</label>
                  <select v-model="car.category" class="form-input">
                    <option>MPV</option><option>SUV</option><option>Sedan</option><option>Minibus</option>
                  </select>
                </div>
                <div class="form-group full">
                  <label>Deskripsi</label>
                  <textarea v-model="car.desc" class="form-textarea" rows="2"></textarea>
                </div>
              </div>
              <!-- Spesifikasi -->
              <div class="specs-editor">
                <label>Spesifikasi</label>
                <div class="spec-row" v-for="(sp, si) in car.specs" :key="si">
                  <input v-model="sp.icon" class="form-input spec-icon" placeholder="👥" />
                  <input v-model="sp.label" class="form-input" placeholder="7 Kursi" />
                  <button class="btn-remove-sm" @click="car.specs.splice(si, 1)">✕</button>
                </div>
                <button class="btn-add-sm" @click="car.specs.push({ icon: '', label: '' })">+ Spek</button>
              </div>
            </div>
          </div>
          <button class="btn-add-vehicle" @click="addCar">+ Tambah Mobil Baru</button>
        </section>

        <!-- ═══════════════════════ TAB: MOTOR ═══════════════════════ -->
        <section v-show="activeTab === 'motors'" class="tab-section">
          <div class="vehicles-admin">
            <div class="vehicle-admin-card" v-for="(motor, i) in s.motors" :key="motor.id">
              <div class="vcard-header">
                <span class="vcard-emoji">{{ motor.emoji }}</span>
                <input v-model="motor.emoji" class="form-input emoji-input" placeholder="🏍️" />
                <button class="btn-remove" @click="removeMotor(i)">✕ Hapus</button>
              </div>

              <!-- Image Upload -->
              <div class="image-upload-area" @click="triggerFileInput('motor', i)" @dragover.prevent @drop.prevent="onDrop($event, 'motor', i)">
                <img v-if="motor.image" :src="motor.image" class="preview-img" :alt="motor.name" />
                <div v-else class="upload-placeholder">
                  <span class="upload-icon">📸</span>
                  <p>Klik atau drag & drop foto</p>
                  <small>JPG, PNG, WebP (max 2MB)</small>
                </div>
                <button v-if="motor.image" class="remove-img-btn" @click.stop="motor.image = ''" title="Hapus foto">✕</button>
              </div>
              <input type="file" :ref="el => fileInputs[`motor_${i}`] = el" accept="image/*" @change="onFileChange($event, 'motor', i)" style="display:none" />

              <div class="form-grid tight">
                <div class="form-group">
                  <label>Nama</label>
                  <input v-model="motor.name" type="text" class="form-input" />
                </div>
                <div class="form-group">
                  <label>Harga/hari</label>
                  <input v-model="motor.price" type="text" class="form-input" placeholder="Rp 75.000" />
                </div>
                <div class="form-group">
                  <label>Badge</label>
                  <input v-model="motor.badge" type="text" class="form-input" />
                </div>
                <div class="form-group">
                  <label>Kategori</label>
                  <select v-model="motor.category" class="form-input">
                    <option>Matic</option><option>Manual</option><option>Sport</option>
                  </select>
                </div>
                <div class="form-group full">
                  <label>Deskripsi</label>
                  <textarea v-model="motor.desc" class="form-textarea" rows="2"></textarea>
                </div>
              </div>
              <div class="specs-editor">
                <label>Spesifikasi</label>
                <div class="spec-row" v-for="(sp, si) in motor.specs" :key="si">
                  <input v-model="sp.icon" class="form-input spec-icon" placeholder="⚡" />
                  <input v-model="sp.label" class="form-input" placeholder="150cc" />
                  <button class="btn-remove-sm" @click="motor.specs.splice(si, 1)">✕</button>
                </div>
                <button class="btn-add-sm" @click="motor.specs.push({ icon: '', label: '' })">+ Spek</button>
              </div>
            </div>
          </div>
          <button class="btn-add-vehicle" @click="addMotor">+ Tambah Motor Baru</button>
        </section>

        <!-- ═══════════════════════ TAB: KEUNGGULAN ═══════════════════════ -->
        <section v-show="activeTab === 'features'" class="tab-section">
          <div class="form-card">
            <h3 class="card-title">Keunggulan / Fitur Layanan</h3>
            <div class="feature-list">
              <div class="feature-item" v-for="(f, i) in s.features" :key="i">
                <div class="feature-item-row">
                  <input v-model="f.icon" class="form-input emoji-input" placeholder="🛡️" />
                  <input v-model="f.title" class="form-input" placeholder="Judul keunggulan" />
                  <button class="btn-remove" @click="s.features.splice(i, 1)">✕</button>
                </div>
                <textarea v-model="f.desc" class="form-textarea" rows="2" placeholder="Deskripsi keunggulan..."></textarea>
              </div>
              <button class="btn-add" @click="s.features.push({ icon: '⭐', title: '', desc: '' })">+ Tambah Keunggulan</button>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════ TAB: TESTIMONI ═══════════════════════ -->
        <section v-show="activeTab === 'testimonials'" class="tab-section">
          <div class="form-card">
            <h3 class="card-title">Kata Pelanggan</h3>
            <div class="testi-list">
              <div class="testi-item" v-for="(t, i) in s.testimonials" :key="i">
                <div class="form-grid tight">
                  <div class="form-group">
                    <label>Nama Pelanggan</label>
                    <input v-model="t.name" type="text" class="form-input" />
                  </div>
                  <div class="form-group">
                    <label>Asal Kota</label>
                    <input v-model="t.from" type="text" class="form-input" />
                  </div>
                  <div class="form-group full">
                    <label>Ulasan</label>
                    <textarea v-model="t.text" class="form-textarea" rows="3"></textarea>
                  </div>
                </div>
                <button class="btn-remove" @click="s.testimonials.splice(i, 1)">✕ Hapus</button>
              </div>
              <button class="btn-add" @click="s.testimonials.push({ name: '', from: '', text: '' })">+ Tambah Testimoni</button>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════ TAB: JAM OPERASIONAL ═══════════════════════ -->
        <section v-show="activeTab === 'hours'" class="tab-section">
          <div class="form-card">
            <h3 class="card-title">Jam Operasional</h3>
            <div class="hours-list">
              <div class="hours-item" v-for="(h, i) in s.hours" :key="i">
                <div class="hours-toggle">
                  <label class="toggle-switch">
                    <input type="checkbox" v-model="h.open" />
                    <span class="toggle-slider"></span>
                  </label>
                  <span class="hours-day-label" :class="{ closed: !h.open }">{{ h.day }}</span>
                </div>
                <input v-model="h.day" type="text" class="form-input day-input" placeholder="Senin" />
                <input v-model="h.time" type="text" class="form-input" placeholder="07.00 – 21.00" :disabled="!h.open" />
              </div>
              <button class="btn-add" @click="s.hours.push({ day: '', time: '', open: true })">+ Tambah Hari</button>
            </div>
          </div>
        </section>

        <!-- ═══════════════════════ TAB: KEAMANAN ═══════════════════════ -->
        <section v-show="activeTab === 'security'" class="tab-section">
          <div class="form-card">
            <h3 class="card-title">Ubah Password Admin</h3>
            <div class="form-grid">
              <div class="form-group">
                <label>Password Baru</label>
                <input v-model="newPass" type="password" class="form-input" placeholder="Minimal 6 karakter" />
              </div>
              <div class="form-group">
                <label>Konfirmasi Password</label>
                <input v-model="confirmPass" type="password" class="form-input" />
              </div>
            </div>
            <button class="btn-primary" @click="doChangePass">Simpan Password Baru</button>
            <p v-if="passMsg" class="pass-msg" :class="{ error: passError }">{{ passMsg }}</p>
          </div>

          <div class="form-card danger-zone">
            <h3 class="card-title danger">⚠️ Reset Data</h3>
            <p>Reset semua pengaturan ke nilai default. Tindakan ini tidak dapat dibatalkan.</p>
            <button class="btn-danger" @click="doReset">Reset Semua Data</button>
          </div>

          <div class="form-card info-card">
            <h3 class="card-title">📦 Cara Deploy ke cPanel</h3>
            <ol class="deploy-steps">
              <li>Jalankan <code>npm run build</code> di terminal</li>
              <li>Masuk ke cPanel → File Manager → <code>public_html</code></li>
              <li>Upload semua isi folder <code>dist/</code> ke <code>public_html</code></li>
              <li>Buat file <code>.htaccess</code> dengan isi di bawah ini:</li>
            </ol>
            <pre class="code-block">Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QSA,L]</pre>
            <p class="info-note">✅ Website sudah menggunakan Hash Router sehingga bisa langsung jalan di cPanel tanpa konfigurasi tambahan!</p>
          </div>
        </section>

      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useSettings, waLink, checkAdminPass, changeAdminPass, resetSettings } from '../composables/useSettings.js'

const s = useSettings()
const isLoggedIn = ref(sessionStorage.getItem('admin_logged_in') === '1')
const passInput = ref('')
const loginError = ref('')
const activeTab = ref('general')
const showSaved = ref(false)
const newPass = ref('')
const confirmPass = ref('')
const passMsg = ref('')
const passError = ref(false)
const fileInputs = ref({})

const adminTabs = [
  { id: 'general', icon: '🏠', label: 'Informasi Umum' },
  { id: 'contact', icon: '📞', label: 'Kontak & Lokasi' },
  { id: 'cars', icon: '🚗', label: 'Data Mobil' },
  { id: 'motors', icon: '🏍️', label: 'Data Motor' },
  { id: 'features', icon: '⭐', label: 'Keunggulan' },
  { id: 'testimonials', icon: '💬', label: 'Testimoni' },
  { id: 'hours', icon: '🕐', label: 'Jam Operasional' },
  { id: 'security', icon: '🔒', label: 'Keamanan & Deploy' },
]

const currentTabLabel = computed(() => adminTabs.find(t => t.id === activeTab.value)?.label || '')

function doLogin() {
  if (checkAdminPass(passInput.value)) {
    isLoggedIn.value = true
    sessionStorage.setItem('admin_logged_in', '1')
    loginError.value = ''
  } else {
    loginError.value = 'Password salah. Coba lagi.'
    passInput.value = ''
  }
}

function doLogout() {
  sessionStorage.removeItem('admin_logged_in')
  isLoggedIn.value = false
}

function doChangePass() {
  if (newPass.value.length < 6) { passMsg.value = 'Password minimal 6 karakter.'; passError.value = true; return }
  if (newPass.value !== confirmPass.value) { passMsg.value = 'Password tidak cocok.'; passError.value = true; return }
  changeAdminPass(newPass.value)
  passMsg.value = '✅ Password berhasil diubah!'
  passError.value = false
  newPass.value = ''
  confirmPass.value = ''
}

function doReset() {
  if (confirm('Reset semua data ke default? Tindakan ini tidak bisa dibatalkan!')) {
    resetSettings()
  }
}

// Vehicle CRUD
let nextId = 100
function addCar() {
  s.cars.push({ id: nextId++, name: 'Kendaraan Baru', desc: '', price: 'Rp 0', badge: '', emoji: '🚗', category: 'MPV', specs: [], image: '' })
}
function removeCar(i) {
  if (confirm('Hapus kendaraan ini?')) s.cars.splice(i, 1)
}
function addMotor() {
  s.motors.push({ id: nextId++, name: 'Motor Baru', desc: '', price: 'Rp 0', badge: '', emoji: '🏍️', category: 'Matic', specs: [], image: '' })
}
function removeMotor(i) {
  if (confirm('Hapus kendaraan ini?')) s.motors.splice(i, 1)
}

// Image handling
function triggerFileInput(type, idx) {
  const key = `${type}_${idx}`
  fileInputs.value[key]?.click()
}

function onFileChange(e, type, idx) {
  const file = e.target.files[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) { alert('Ukuran file maksimal 2MB!'); return }
  const reader = new FileReader()
  reader.onload = (ev) => {
    if (type === 'car') s.cars[idx].image = ev.target.result
    else s.motors[idx].image = ev.target.result
  }
  reader.readAsDataURL(file)
}

function onDrop(e, type, idx) {
  const file = e.dataTransfer.files[0]
  if (!file || !file.type.startsWith('image/')) return
  if (file.size > 2 * 1024 * 1024) { alert('Ukuran file maksimal 2MB!'); return }
  const reader = new FileReader()
  reader.onload = (ev) => {
    if (type === 'car') s.cars[idx].image = ev.target.result
    else s.motors[idx].image = ev.target.result
  }
  reader.readAsDataURL(file)
}
</script>

<style scoped>
/* ── LOGIN ── */
.admin-page { min-height: 100vh; background: var(--dark); }
.login-screen { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; background: radial-gradient(ellipse at 50% 30%, rgba(232,160,32,0.08) 0%, transparent 60%); }
.login-box { background: var(--dark-2); border: 1px solid rgba(255,255,255,0.08); border-radius: 24px; padding: 48px; max-width: 420px; width: 100%; text-align: center; }
.login-icon { font-size: 3rem; margin-bottom: 12px; }
.login-box h1 { font-family: var(--font-display); font-size: 2rem; color: var(--primary); letter-spacing: 0.05em; margin-bottom: 8px; }
.login-sub { color: var(--text-muted); font-size: 0.9rem; margin-bottom: 28px; }
.login-form { display: flex; flex-direction: column; gap: 12px; }
.login-input { width: 100%; padding: 14px 18px; background: var(--dark-3); border: 1.5px solid rgba(255,255,255,0.1); border-radius: 12px; color: var(--text); font-family: var(--font-body); font-size: 1rem; transition: border-color 0.2s; outline: none; }
.login-input:focus { border-color: var(--primary); }
.login-btn { width: 100%; padding: 14px; justify-content: center; border-radius: 12px; }
.login-error { color: #f87171; font-size: 0.85rem; }
.login-hint { color: var(--text-muted); font-size: 0.8rem; margin-top: 4px; }
.login-hint code { background: var(--dark-4); padding: 2px 8px; border-radius: 4px; color: var(--primary); }
.back-link { display: inline-block; margin-top: 20px; color: var(--text-muted); font-size: 0.88rem; transition: color 0.2s; }
.back-link:hover { color: var(--primary); }

/* ── DASHBOARD LAYOUT ── */
.admin-dashboard { display: flex; min-height: 100vh; }

/* ── SIDEBAR ── */
.sidebar { width: 240px; background: var(--dark-2); border-right: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; position: fixed; top: 0; left: 0; height: 100vh; z-index: 100; overflow-y: auto; }
.sidebar-brand { padding: 20px 16px; display: flex; align-items: center; gap: 10px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.brand-ico { font-size: 1.6rem; }
.brand-name { display: block; font-weight: 700; font-size: 0.9rem; }
.brand-sub { display: block; font-size: 0.7rem; color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 140px; }
.sidebar-nav { flex: 1; padding: 12px 8px; display: flex; flex-direction: column; gap: 2px; }
.sidebar-link { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 10px; font-size: 0.88rem; font-weight: 500; color: var(--text-muted); background: none; border: none; cursor: pointer; font-family: var(--font-body); transition: background 0.2s, color 0.2s; text-decoration: none; width: 100%; text-align: left; }
.sidebar-link:hover, .sidebar-link.active { background: rgba(232,160,32,0.1); color: var(--primary); }
.sidebar-link.danger:hover { background: rgba(248,113,113,0.1); color: #f87171; }
.sidebar-link.preview:hover { background: rgba(74,222,128,0.1); color: #4ade80; }
.link-icon { font-size: 1rem; width: 20px; text-align: center; }
.sidebar-footer { padding: 12px 8px; border-top: 1px solid rgba(255,255,255,0.06); display: flex; flex-direction: column; gap: 2px; }

/* ── MAIN ── */
.admin-main { margin-left: 240px; flex: 1; padding: 28px 32px; min-height: 100vh; }
.admin-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.admin-title { font-family: var(--font-display); font-size: 1.8rem; letter-spacing: 0.03em; margin-bottom: 2px; }
.admin-subtitle { font-size: 0.82rem; color: var(--text-muted); }
.header-actions { display: flex; align-items: center; gap: 12px; }
.btn-save { display: flex; align-items: center; gap: 6px; background: rgba(74,222,128,0.1); border: 1px solid rgba(74,222,128,0.2); color: #4ade80; padding: 8px 16px; border-radius: 8px; font-family: var(--font-body); font-size: 0.85rem; font-weight: 600; cursor: default; }
.save-toast { font-size: 0.82rem; color: #4ade80; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

/* ── FORM ELEMENTS ── */
.tab-section { display: flex; flex-direction: column; gap: 24px; }
.form-card { background: var(--dark-2); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 24px; }
.card-title { font-size: 1rem; font-weight: 700; color: var(--primary); margin-bottom: 20px; }
.card-title.danger { color: #f87171; }
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-grid.tight { gap: 12px; }
.form-group { display: flex; flex-direction: column; gap: 6px; }
.form-group.full { grid-column: 1 / -1; }
label { font-size: 0.8rem; font-weight: 600; color: var(--text-muted); letter-spacing: 0.04em; text-transform: uppercase; }
label small { text-transform: none; font-weight: 400; }
.form-input { padding: 10px 14px; background: var(--dark-3); border: 1.5px solid rgba(255,255,255,0.08); border-radius: 10px; color: var(--text); font-family: var(--font-body); font-size: 0.9rem; outline: none; transition: border-color 0.2s; width: 100%; }
.form-input:focus { border-color: var(--primary); }
.form-input:disabled { opacity: 0.4; cursor: not-allowed; }
.form-textarea { padding: 10px 14px; background: var(--dark-3); border: 1.5px solid rgba(255,255,255,0.08); border-radius: 10px; color: var(--text); font-family: var(--font-body); font-size: 0.9rem; outline: none; transition: border-color 0.2s; width: 100%; resize: vertical; }
.form-textarea:focus { border-color: var(--primary); }
.input-preview { font-size: 0.78rem; color: var(--text-muted); }
.input-preview a { color: var(--primary); }

/* Map Preview */
.map-preview { margin-top: 12px; border-radius: 12px; overflow: hidden; }

/* ── BUTTONS ── */
.btn-add { display: inline-flex; align-items: center; gap: 6px; background: rgba(232,160,32,0.1); border: 1.5px dashed rgba(232,160,32,0.3); color: var(--primary); padding: 10px 18px; border-radius: 10px; font-family: var(--font-body); font-size: 0.88rem; font-weight: 600; cursor: pointer; transition: all 0.2s; width: 100%; justify-content: center; margin-top: 8px; }
.btn-add:hover { background: rgba(232,160,32,0.18); }
.btn-remove { background: rgba(248,113,113,0.1); border: 1px solid rgba(248,113,113,0.2); color: #f87171; padding: 6px 12px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; font-family: var(--font-body); transition: background 0.2s; white-space: nowrap; }
.btn-remove:hover { background: rgba(248,113,113,0.2); }
.btn-danger { background: rgba(248,113,113,0.15); border: 1px solid rgba(248,113,113,0.3); color: #f87171; padding: 10px 20px; border-radius: 10px; font-family: var(--font-body); font-size: 0.9rem; font-weight: 600; cursor: pointer; transition: background 0.2s; }
.btn-danger:hover { background: rgba(248,113,113,0.25); }

/* ── STATS ── */
.stats-list { display: flex; flex-direction: column; gap: 10px; }
.stat-row { display: flex; gap: 10px; align-items: center; }
.stat-num { max-width: 100px; }

/* ── VEHICLE ADMIN CARDS ── */
.vehicles-admin { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px; }
.vehicle-admin-card { background: var(--dark-2); border: 1px solid rgba(255,255,255,0.06); border-radius: 16px; padding: 20px; display: flex; flex-direction: column; gap: 14px; }
.vcard-header { display: flex; align-items: center; gap: 10px; }
.vcard-emoji { font-size: 1.8rem; }
.emoji-input { max-width: 72px; text-align: center; font-size: 1.2rem; }

/* Image Upload */
.image-upload-area { position: relative; border: 2px dashed rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden; cursor: pointer; min-height: 130px; display: flex; align-items: center; justify-content: center; transition: border-color 0.2s; background: var(--dark-3); }
.image-upload-area:hover { border-color: var(--primary); }
.upload-placeholder { text-align: center; padding: 20px; }
.upload-icon { font-size: 2rem; display: block; margin-bottom: 8px; }
.upload-placeholder p { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 4px; }
.upload-placeholder small { font-size: 0.75rem; color: rgba(255,255,255,0.3); }
.preview-img { width: 100%; height: 130px; object-fit: cover; display: block; }
.remove-img-btn { position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: #fff; border: none; border-radius: 50%; width: 28px; height: 28px; font-size: 0.75rem; cursor: pointer; display: flex; align-items: center; justify-content: center; }

/* Specs */
.specs-editor { display: flex; flex-direction: column; gap: 8px; }
.specs-editor label { font-size: 0.78rem; font-weight: 600; color: var(--text-muted); letter-spacing: 0.04em; text-transform: uppercase; }
.spec-row { display: flex; gap: 8px; align-items: center; }
.spec-icon { max-width: 60px; text-align: center; }
.btn-remove-sm { background: rgba(248,113,113,0.1); border: none; color: #f87171; width: 28px; height: 28px; border-radius: 6px; font-size: 0.8rem; cursor: pointer; flex-shrink: 0; }
.btn-add-sm { background: rgba(255,255,255,0.05); border: 1px dashed rgba(255,255,255,0.15); color: var(--text-muted); padding: 6px 12px; border-radius: 8px; font-family: var(--font-body); font-size: 0.8rem; cursor: pointer; transition: all 0.2s; width: 100%; }
.btn-add-sm:hover { border-color: var(--primary); color: var(--primary); }
.btn-add-vehicle { display: flex; align-items: center; justify-content: center; gap: 8px; background: rgba(232,160,32,0.1); border: 2px dashed rgba(232,160,32,0.3); color: var(--primary); padding: 16px; border-radius: 16px; font-family: var(--font-body); font-size: 1rem; font-weight: 700; cursor: pointer; transition: all 0.2s; margin-top: 4px; }
.btn-add-vehicle:hover { background: rgba(232,160,32,0.18); }

/* Features */
.feature-list { display: flex; flex-direction: column; gap: 16px; }
.feature-item { background: var(--dark-3); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 10px; border: 1px solid rgba(255,255,255,0.05); }
.feature-item-row { display: flex; gap: 10px; align-items: center; }

/* Testimonials */
.testi-list { display: flex; flex-direction: column; gap: 16px; }
.testi-item { background: var(--dark-3); border-radius: 12px; padding: 16px; border: 1px solid rgba(255,255,255,0.05); position: relative; }
.testi-item .btn-remove { position: absolute; top: 12px; right: 12px; }

/* Hours */
.hours-list { display: flex; flex-direction: column; gap: 12px; }
.hours-item { display: flex; align-items: center; gap: 12px; }
.hours-toggle { display: flex; align-items: center; gap: 8px; min-width: 120px; }
.hours-day-label { font-weight: 600; font-size: 0.88rem; }
.hours-day-label.closed { color: var(--text-muted); text-decoration: line-through; }
.day-input { max-width: 100px; }

/* Toggle Switch */
.toggle-switch { position: relative; display: inline-block; width: 40px; height: 22px; flex-shrink: 0; }
.toggle-switch input { opacity: 0; width: 0; height: 0; }
.toggle-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background: var(--dark-4); border-radius: 22px; transition: 0.3s; border: 1px solid rgba(255,255,255,0.1); }
.toggle-slider::before { position: absolute; content: ""; height: 16px; width: 16px; left: 2px; bottom: 2px; background: var(--text-muted); border-radius: 50%; transition: 0.3s; }
input:checked + .toggle-slider { background: rgba(74,222,128,0.25); border-color: rgba(74,222,128,0.4); }
input:checked + .toggle-slider::before { transform: translateX(18px); background: #4ade80; }

/* Security */
.pass-msg { margin-top: 12px; font-size: 0.85rem; color: #4ade80; }
.pass-msg.error { color: #f87171; }
.danger-zone { border-color: rgba(248,113,113,0.2); }
.danger-zone p { color: var(--text-muted); font-size: 0.88rem; margin-bottom: 16px; }

/* Deploy */
.info-card { background: rgba(232,160,32,0.05); border-color: rgba(232,160,32,0.15); }
.deploy-steps { padding-left: 20px; color: var(--text-muted); font-size: 0.88rem; line-height: 2; margin-bottom: 16px; }
.deploy-steps code { background: var(--dark-4); padding: 1px 6px; border-radius: 4px; color: var(--primary); font-size: 0.85rem; }
.code-block { background: var(--dark); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 16px; font-size: 0.82rem; color: #4ade80; line-height: 1.8; overflow-x: auto; margin-bottom: 16px; white-space: pre; font-family: monospace; }
.info-note { color: #4ade80; font-size: 0.85rem; font-weight: 600; }

@media (max-width: 768px) {
  .sidebar { width: 100%; height: auto; position: relative; }
  .admin-main { margin-left: 0; padding: 20px 16px; }
  .admin-dashboard { flex-direction: column; }
  .form-grid { grid-template-columns: 1fr; }
  .vehicles-admin { grid-template-columns: 1fr; }
}
</style>
