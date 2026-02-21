<template>
  <div class="home">
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-gradient"></div>
        <div class="hero-grid"></div>
      </div>
      <div class="container hero-content">
        <div class="hero-text">
          <span class="section-label">Majalengka #1 Rental</span>
          <h1 class="hero-title">
            Sewa Kendaraan<br>
            <span class="highlight">Mudah & Terpercaya</span>
          </h1>
          <p class="hero-desc">{{ s.heroSubtitle }}</p>
          <div class="hero-actions">
            <router-link to="/mobil" class="btn-primary">🚗 Sewa Mobil</router-link>
            <router-link to="/motor" class="btn-outline">🏍️ Sewa Motor</router-link>
          </div>
          <div class="hero-stats">
            <template v-for="(stat, i) in s.stats" :key="i">
              <div class="stat">
                <span class="stat-num">{{ stat.num }}</span>
                <span class="stat-label">{{ stat.label }}</span>
              </div>
              <div class="stat-divider" v-if="i < s.stats.length - 1"></div>
            </template>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-car-display">
            <span class="big-car">🚙</span>
            <div class="car-glow"></div>
          </div>
          <div class="floating-badge badge-1"><span>✅</span> Unit Terawat</div>
          <div class="floating-badge badge-2"><span>💰</span> Harga Terjangkau</div>
        </div>
      </div>
    </section>

    <!-- WHY US -->
    <section class="why-us">
      <div class="container">
        <p class="section-label text-center">Mengapa Pilih Kami</p>
        <h2 class="section-title text-center">Keunggulan {{ s.businessName }}</h2>
        <div class="features-grid">
          <div class="feature-card" v-for="f in s.features" :key="f.title">
            <div class="feature-icon">{{ f.icon }}</div>
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- FLEET PREVIEW -->
    <section class="fleet-preview">
      <div class="container">
        <p class="section-label text-center">Armada Kami</p>
        <h2 class="section-title text-center">Pilih Kendaraan Anda</h2>
        <div class="fleet-cards">
          <router-link to="/mobil" class="fleet-big-card fleet-car">
            <div class="fleet-bg-icon">🚗</div>
            <div class="fleet-card-content">
              <span class="fleet-badge">Populer</span>
              <h3>Sewa Mobil</h3>
              <p>Cocok untuk keluarga, wisata, dan perjalanan bisnis. Tersedia berbagai tipe.</p>
              <span class="fleet-link">Lihat Armada Mobil →</span>
            </div>
          </router-link>
          <router-link to="/motor" class="fleet-big-card fleet-motor">
            <div class="fleet-bg-icon">🏍️</div>
            <div class="fleet-card-content">
              <span class="fleet-badge">Hemat</span>
              <h3>Sewa Motor</h3>
              <p>Pilihan ekonomis untuk perjalanan dalam kota maupun luar kota.</p>
              <span class="fleet-link">Lihat Armada Motor →</span>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- HOW TO RENT -->
    <section class="how-rent">
      <div class="container">
        <p class="section-label text-center">Cara Menyewa</p>
        <h2 class="section-title text-center">Proses Pemesanan Mudah</h2>
        <div class="steps-row">
          <div class="step" v-for="(step, i) in steps" :key="i">
            <div class="step-num">{{ i + 1 }}</div>
            <div class="step-icon">{{ step.icon }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="testimonials">
      <div class="container">
        <p class="section-label text-center">Testimoni</p>
        <h2 class="section-title text-center">Kata Pelanggan Kami</h2>
        <div class="testi-grid">
          <div class="testi-card" v-for="t in s.testimonials" :key="t.name">
            <div class="testi-stars">⭐⭐⭐⭐⭐</div>
            <p class="testi-text">"{{ t.text }}"</p>
            <div class="testi-author">
              <div class="testi-avatar">{{ t.name[0] }}</div>
              <div>
                <span class="testi-name">{{ t.name }}</span>
                <span class="testi-from">{{ t.from }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta">
      <div class="container">
        <div class="cta-box">
          <div class="cta-content">
            <h2>Siap untuk Perjalanan Anda?</h2>
            <p>Hubungi kami sekarang untuk penawaran terbaik.</p>
          </div>
          <div class="cta-actions">
            <a :href="waLink('Halo, saya ingin menyewa kendaraan di Nursandi RentCar')" target="_blank" class="btn-primary">💬 Chat WhatsApp</a>
            <a :href="'mailto:' + s.email" class="btn-outline">✉️ Email Kami</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSettings, waLink } from '../composables/useSettings.js'
const s = useSettings()

const steps = [
  { icon: '📱', title: 'Hubungi Kami', desc: 'Hubungi via WhatsApp untuk menanyakan ketersediaan kendaraan.' },
  { icon: '📅', title: 'Tentukan Jadwal', desc: 'Pilih tanggal mulai, tanggal selesai, dan kendaraan yang Anda butuhkan.' },
  { icon: '📋', title: 'Konfirmasi', desc: 'Lakukan konfirmasi pemesanan dan siapkan identitas diri (KTP/SIM).' },
  { icon: '🚀', title: 'Nikmati Perjalanan', desc: 'Ambil kendaraan sesuai jadwal dan nikmati perjalanan Anda!' },
]
</script>

<style scoped>
.home { padding-top: 72px; }
/* HERO */
.hero { min-height: 90vh; display: flex; align-items: center; position: relative; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; z-index: 0; }
.hero-gradient { position: absolute; inset: 0; background: radial-gradient(ellipse at 20% 50%, rgba(232,160,32,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(232,160,32,0.05) 0%, transparent 50%); }
.hero-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px); background-size: 60px 60px; }
.hero-content { position: relative; z-index: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; padding-top: 60px; padding-bottom: 60px; }
.hero-title { font-family: var(--font-display); font-size: clamp(2.8rem, 6vw, 5rem); line-height: 1.05; margin-bottom: 20px; letter-spacing: 0.02em; }
.highlight { color: var(--primary); }
.hero-desc { color: rgba(255,255,255,0.65); font-size: 1.05rem; line-height: 1.7; margin-bottom: 32px; max-width: 480px; }
.hero-actions { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 40px; }
.hero-stats { display: flex; align-items: center; gap: 24px; }
.stat-num { display: block; font-family: var(--font-display); font-size: 1.8rem; color: var(--primary); line-height: 1; }
.stat-label { display: block; font-size: 0.78rem; color: var(--text-muted); }
.stat-divider { width: 1px; height: 36px; background: rgba(255,255,255,0.1); }
.hero-visual { position: relative; display: flex; align-items: center; justify-content: center; }
.hero-car-display { width: 320px; height: 320px; background: radial-gradient(circle, rgba(232,160,32,0.1) 0%, transparent 70%); border-radius: 50%; display: flex; align-items: center; justify-content: center; position: relative; }
.big-car { font-size: 10rem; filter: drop-shadow(0 20px 40px rgba(0,0,0,0.5)); animation: float 4s ease-in-out infinite; }
@keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
.car-glow { position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%); width: 200px; height: 30px; background: radial-gradient(ellipse, rgba(232,160,32,0.3) 0%, transparent 70%); border-radius: 50%; }
.floating-badge { position: absolute; background: var(--dark-3); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; padding: 10px 16px; font-size: 0.82rem; font-weight: 600; display: flex; align-items: center; gap: 8px; white-space: nowrap; box-shadow: var(--shadow); }
.badge-1 { top: 20%; left: -10%; animation: floatB 3.5s ease-in-out infinite; }
.badge-2 { bottom: 20%; right: -5%; animation: floatB 3.5s ease-in-out 0.8s infinite; }
@keyframes floatB { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
/* SECTIONS */
section { padding: 80px 0; }
.section-title { font-family: var(--font-display); font-size: clamp(1.8rem, 4vw, 2.8rem); margin-bottom: 48px; letter-spacing: 0.03em; }
.text-center { text-align: center; }
.why-us { background: var(--dark-2); }
.features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.feature-card { background: var(--dark-3); border-radius: 16px; padding: 28px; border: 1px solid rgba(255,255,255,0.06); transition: transform 0.3s, border-color 0.3s; }
.feature-card:hover { transform: translateY(-4px); border-color: rgba(232,160,32,0.2); }
.feature-icon { font-size: 2.2rem; margin-bottom: 14px; }
.feature-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; }
.feature-card p { font-size: 0.87rem; color: var(--text-muted); line-height: 1.6; }
.fleet-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.fleet-big-card { position: relative; border-radius: 20px; padding: 40px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); transition: transform 0.3s, box-shadow 0.3s; display: block; text-decoration: none; color: inherit; }
.fleet-big-card:hover { transform: translateY(-6px); box-shadow: 0 24px 60px rgba(0,0,0,0.4); }
.fleet-car { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); }
.fleet-motor { background: linear-gradient(135deg, #1a2a1a 0%, #162116 100%); }
.fleet-bg-icon { position: absolute; right: -10px; bottom: -10px; font-size: 8rem; opacity: 0.15; pointer-events: none; transition: transform 0.4s, opacity 0.4s; }
.fleet-big-card:hover .fleet-bg-icon { transform: scale(1.15) rotate(-5deg); opacity: 0.22; }
.fleet-card-content { position: relative; z-index: 1; }
.fleet-badge { display: inline-block; background: var(--primary); color: #000; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 4px 10px; border-radius: 20px; margin-bottom: 14px; }
.fleet-card-content h3 { font-family: var(--font-display); font-size: 2rem; letter-spacing: 0.03em; margin-bottom: 10px; }
.fleet-card-content p { font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 20px; line-height: 1.6; }
.fleet-link { font-weight: 700; color: var(--primary); font-size: 0.9rem; }
.how-rent { background: var(--dark-2); }
.steps-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; }
.steps-row::before { content: ''; position: absolute; top: 30px; left: 12%; right: 12%; height: 1px; background: linear-gradient(90deg, transparent, var(--primary), transparent); opacity: 0.3; }
.step { text-align: center; position: relative; }
.step-num { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 32px; height: 32px; background: var(--primary); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.85rem; z-index: 1; }
.step-icon { font-size: 2.5rem; margin: 40px 0 12px; }
.step h3 { font-size: 0.95rem; font-weight: 700; margin-bottom: 8px; }
.step p { font-size: 0.82rem; color: var(--text-muted); line-height: 1.6; }
.testi-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.testi-card { background: var(--dark-3); border-radius: 16px; padding: 28px; border: 1px solid rgba(255,255,255,0.06); }
.testi-stars { font-size: 0.9rem; margin-bottom: 12px; }
.testi-text { font-size: 0.9rem; color: rgba(255,255,255,0.75); line-height: 1.7; margin-bottom: 20px; font-style: italic; }
.testi-author { display: flex; align-items: center; gap: 12px; }
.testi-avatar { width: 40px; height: 40px; background: var(--primary); color: #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; }
.testi-name { display: block; font-weight: 700; font-size: 0.9rem; }
.testi-from { display: block; font-size: 0.78rem; color: var(--text-muted); }
.cta-box { background: linear-gradient(135deg, rgba(232,160,32,0.15) 0%, rgba(232,160,32,0.05) 100%); border: 1px solid rgba(232,160,32,0.25); border-radius: 24px; padding: 56px; display: flex; align-items: center; justify-content: space-between; gap: 32px; }
.cta-content h2 { font-family: var(--font-display); font-size: 2.2rem; letter-spacing: 0.03em; margin-bottom: 8px; }
.cta-content p { color: var(--text-muted); font-size: 1rem; }
.cta-actions { display: flex; gap: 12px; flex-shrink: 0; }
@media (max-width: 1024px) { .features-grid { grid-template-columns: repeat(2, 1fr); } .testi-grid { grid-template-columns: repeat(2, 1fr); } .steps-row { grid-template-columns: repeat(2, 1fr); } .steps-row::before { display: none; } }
@media (max-width: 768px) { .hero-content { grid-template-columns: 1fr; text-align: center; } .hero-desc { margin: 0 auto 32px; } .hero-actions { justify-content: center; } .hero-stats { justify-content: center; } .hero-visual { display: none; } .fleet-cards { grid-template-columns: 1fr; } .features-grid { grid-template-columns: 1fr; } .steps-row { grid-template-columns: 1fr 1fr; } .testi-grid { grid-template-columns: 1fr; } .cta-box { flex-direction: column; text-align: center; } .cta-actions { flex-direction: column; align-items: center; } }
</style>
