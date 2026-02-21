<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container">
        <p class="section-label">Hubungi Kami</p>
        <h1 class="page-title">Kontak &<br><span class="highlight">Lokasi Kami</span></h1>
        <p class="page-subtitle">Ada pertanyaan atau ingin memesan? Jangan ragu untuk menghubungi kami kapan saja.</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-cards">
            <h2 class="contact-heading">Cara Menghubungi Kami</h2>
            <a :href="waLink('')" target="_blank" class="contact-card wa">
              <div class="contact-card-icon wa-ico">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </div>
              <div class="contact-card-text">
                <span class="contact-card-label">WhatsApp</span>
                <span class="contact-card-value">{{ formatWa(s.whatsapp) }}</span>
                <span class="contact-card-hint">Respon cepat, online setiap hari</span>
              </div>
              <span class="contact-card-arrow">→</span>
            </a>

            <a :href="'mailto:' + s.email" class="contact-card email">
              <div class="contact-card-icon">✉️</div>
              <div class="contact-card-text">
                <span class="contact-card-label">Email</span>
                <span class="contact-card-value">{{ s.email }}</span>
                <span class="contact-card-hint">Untuk pertanyaan detail & penawaran</span>
              </div>
              <span class="contact-card-arrow">→</span>
            </a>

            <a :href="s.mapsLink" target="_blank" class="contact-card maps">
              <div class="contact-card-icon">📍</div>
              <div class="contact-card-text">
                <span class="contact-card-label">Lokasi</span>
                <span class="contact-card-value">{{ s.address }}</span>
                <span class="contact-card-hint">Klik untuk buka di Google Maps</span>
              </div>
              <span class="contact-card-arrow">→</span>
            </a>

            <div class="quick-chat">
              <h3>Pesan Cepat via WhatsApp</h3>
              <div class="quick-btns">
                <a :href="waLink('Halo, saya ingin menyewa mobil')" target="_blank" class="quick-btn">🚗 Sewa Mobil</a>
                <a :href="waLink('Halo, saya ingin menyewa motor')" target="_blank" class="quick-btn">🏍️ Sewa Motor</a>
                <a :href="waLink('Halo, saya ingin mengetahui harga sewa kendaraan')" target="_blank" class="quick-btn">💰 Cek Harga</a>
                <a :href="waLink('Halo, saya ingin mengetahui ketersediaan kendaraan')" target="_blank" class="quick-btn">📅 Cek Ketersediaan</a>
              </div>
            </div>
          </div>

          <div class="map-side">
            <h2 class="contact-heading">Temukan Kami di Peta</h2>
            <div class="map-wrapper">
              <iframe :src="s.mapsEmbed" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
            <a :href="s.mapsLink" target="_blank" class="btn-primary map-btn">🗺️ Buka di Google Maps</a>
          </div>
        </div>
      </div>
    </section>

    <section class="hours-section">
      <div class="container">
        <h2 class="section-title text-center">Jam Operasional</h2>
        <div class="hours-grid">
          <div class="hours-card" v-for="h in s.hours" :key="h.day">
            <span class="hours-day">{{ h.day }}</span>
            <span class="hours-time" :class="{ open: h.open, closed: !h.open }">{{ h.open ? h.time : 'Tutup' }}</span>
          </div>
        </div>
        <p class="hours-note">* Untuk keperluan mendadak di luar jam operasional, hubungi kami via WhatsApp</p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useSettings, waLink } from '../composables/useSettings.js'
const s = useSettings()
function formatWa(num) {
  if (!num) return '-'
  const n = num.replace(/^62/, '0')
  return n.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')
}
</script>

<style scoped>
.page { padding-top: 72px; }
.page-hero { position: relative; padding: 80px 0; overflow: hidden; }
.page-hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(232,160,32,0.07) 0%, transparent 60%); }
.page-hero-bg::before { content: '📍'; position: absolute; right: 5%; top: 50%; transform: translateY(-50%); font-size: 18rem; opacity: 0.04; }
.page-title { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: 0.03em; margin-bottom: 16px; position: relative; }
.highlight { color: var(--primary); }
.page-subtitle { color: var(--text-muted); font-size: 1.05rem; max-width: 560px; line-height: 1.7; position: relative; }
.contact-section { padding: 60px 0; }
.contact-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.contact-heading { font-family: var(--font-display); font-size: 1.6rem; letter-spacing: 0.03em; margin-bottom: 24px; }
.contact-cards { display: flex; flex-direction: column; gap: 16px; }
.contact-card { display: flex; align-items: center; gap: 16px; background: var(--dark-3); border-radius: 14px; padding: 20px 22px; border: 1px solid rgba(255,255,255,0.06); text-decoration: none; color: inherit; transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s; }
.contact-card:hover { transform: translateX(6px); border-color: rgba(232,160,32,0.25); box-shadow: 0 8px 24px rgba(0,0,0,0.3); }
.contact-card.wa:hover { border-color: rgba(37,211,102,0.3); }
.contact-card-icon { font-size: 1.5rem; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.06); border-radius: 12px; flex-shrink: 0; }
.wa-ico { color: #25D366; }
.contact-card-text { flex: 1; }
.contact-card-label { display: block; font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 2px; }
.contact-card-value { display: block; font-weight: 700; font-size: 1.05rem; margin-bottom: 2px; word-break: break-all; }
.contact-card-hint { display: block; font-size: 0.78rem; color: var(--text-muted); }
.contact-card-arrow { color: var(--primary); font-size: 1.2rem; transition: transform 0.2s; }
.contact-card:hover .contact-card-arrow { transform: translateX(4px); }
.quick-chat { background: var(--dark-3); border-radius: 14px; padding: 22px; border: 1px solid rgba(255,255,255,0.06); }
.quick-chat h3 { font-size: 0.85rem; font-weight: 700; color: var(--text-muted); margin-bottom: 14px; letter-spacing: 0.05em; text-transform: uppercase; }
.quick-btns { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.quick-btn { display: flex; align-items: center; gap: 6px; background: var(--dark-4); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; padding: 10px 14px; font-size: 0.82rem; font-weight: 600; color: inherit; text-decoration: none; transition: border-color 0.2s, background 0.2s; }
.quick-btn:hover { border-color: rgba(37,211,102,0.3); background: rgba(37,211,102,0.05); color: #25D366; }
.map-side { display: flex; flex-direction: column; }
.map-wrapper { flex: 1; min-height: 380px; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); margin-bottom: 16px; }
.map-btn { width: 100%; justify-content: center; }
.hours-section { background: var(--dark-2); padding: 60px 0; }
.section-title { font-family: var(--font-display); font-size: clamp(1.6rem, 3vw, 2.2rem); letter-spacing: 0.03em; margin-bottom: 32px; }
.text-center { text-align: center; }
.hours-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px; margin-bottom: 20px; }
.hours-card { background: var(--dark-3); border-radius: 12px; padding: 16px 12px; text-align: center; border: 1px solid rgba(255,255,255,0.06); }
.hours-day { display: block; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; }
.hours-time { display: block; font-size: 0.75rem; color: var(--text-muted); line-height: 1.4; }
.hours-time.open { color: #4ade80; }
.hours-time.closed { color: #f87171; }
.hours-note { text-align: center; font-size: 0.82rem; color: var(--text-muted); font-style: italic; }
@media (max-width: 1024px) { .hours-grid { grid-template-columns: repeat(4, 1fr); } }
@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } .hours-grid { grid-template-columns: repeat(2, 1fr); } .quick-btns { grid-template-columns: 1fr; } }
</style>
