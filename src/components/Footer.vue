<template>
  <footer class="footer">
    <div class="container footer-inner">
      <div class="footer-brand">
        <div class="brand-row">
          <span class="brand-icon">🚗</span>
          <div>
            <span class="brand-name">{{ settings.businessName }}</span>
            <span class="brand-tagline">{{ settings.tagline }}</span>
          </div>
        </div>
        <p class="footer-desc">Kami hadir untuk memenuhi kebutuhan transportasi Anda. Armada terawat, harga bersahabat, dan pelayanan ramah.</p>
      </div>

      <div class="footer-links">
        <h4>Navigasi</h4>
        <router-link to="/">Beranda</router-link>
        <router-link to="/mobil">Sewa Mobil</router-link>
        <router-link to="/motor">Sewa Motor</router-link>
        <router-link to="/kontak">Kontak Kami</router-link>
      </div>

      <div class="footer-contact">
        <h4>Hubungi Kami</h4>
        <a :href="waLink('')" target="_blank" class="contact-row">
          <span class="ico">💬</span>
          <span>{{ formatWa(settings.whatsapp) }}</span>
        </a>
        <a :href="'mailto:' + settings.email" class="contact-row">
          <span class="ico">✉️</span>
          <span>{{ settings.email }}</span>
        </a>
        <a :href="settings.mapsLink" target="_blank" class="contact-row">
          <span class="ico">📍</span>
          <span>{{ settings.address }}</span>
        </a>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container">
        <p>© {{ new Date().getFullYear() }} {{ settings.businessName }}. All rights reserved.
          <router-link to="/admin" class="admin-link">⚙</router-link>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useSettings, waLink } from '../composables/useSettings.js'
const settings = useSettings()
function formatWa(num) {
  if (!num) return '-'
  const n = num.replace(/^62/, '0')
  return n.replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')
}
</script>

<style scoped>
.footer { background: var(--dark-2); border-top: 1px solid rgba(255,255,255,0.06); margin-top: auto; }
.footer-inner { display: grid; grid-template-columns: 2fr 1fr 1.5fr; gap: 48px; padding: 60px 24px 40px; }
.brand-row { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
.brand-icon { font-size: 2rem; }
.brand-name { display: block; font-family: var(--font-display); font-size: 1.4rem; color: var(--primary); letter-spacing: 0.03em; }
.brand-tagline { display: block; font-size: 0.72rem; color: var(--text-muted); font-weight: 500; letter-spacing: 0.04em; }
.footer-desc { color: var(--text-muted); font-size: 0.88rem; line-height: 1.7; }
.footer-links h4, .footer-contact h4 { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--primary); margin-bottom: 16px; }
.footer-links { display: flex; flex-direction: column; gap: 10px; }
.footer-links a { color: var(--text-muted); font-size: 0.9rem; transition: color 0.2s; }
.footer-links a:hover { color: var(--text); }
.footer-contact { display: flex; flex-direction: column; gap: 12px; }
.contact-row { display: flex; align-items: center; gap: 10px; color: var(--text-muted); font-size: 0.9rem; transition: color 0.2s; word-break: break-all; }
.contact-row:hover { color: var(--primary); }
.ico { font-size: 1rem; flex-shrink: 0; }
.footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding: 16px 0; text-align: center; }
.footer-bottom p { font-size: 0.8rem; color: var(--text-muted); }
.admin-link { color: rgba(255,255,255,0.15); margin-left: 8px; font-size: 0.75rem; transition: color 0.2s; }
.admin-link:hover { color: var(--primary); }
@media (max-width: 768px) { .footer-inner { grid-template-columns: 1fr; gap: 32px; padding: 40px 16px 32px; } }
</style>
