<template>
  <header :class="['navbar', { scrolled: isScrolled, open: menuOpen }]">
    <div class="container nav-inner">
      <router-link to="/" class="brand" @click="menuOpen = false">
        <span class="brand-icon">🚗</span>
        <div>
          <span class="brand-name">{{ settings.businessName.split(' ')[0] }}</span>
          <span class="brand-sub">{{ settings.businessName.split(' ').slice(1).join(' ') || 'RentCar' }}</span>
        </div>
      </router-link>

      <nav class="nav-links" :class="{ active: menuOpen }">
        <router-link to="/" @click="menuOpen = false">Beranda</router-link>
        <router-link to="/mobil" @click="menuOpen = false">Mobil</router-link>
        <router-link to="/motor" @click="menuOpen = false">Motor</router-link>
        <router-link to="/kontak" @click="menuOpen = false">Kontak</router-link>
        <a :href="waLink('Halo Nursandi RentCar, saya ingin menyewa kendaraan')" target="_blank" class="btn-wa" @click="menuOpen = false">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          WhatsApp
        </a>
      </nav>

      <button class="hamburger" @click="menuOpen = !menuOpen" :aria-expanded="menuOpen">
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSettings, waLink } from '../composables/useSettings.js'

const settings = useSettings()
const isScrolled = ref(false)
const menuOpen = ref(false)

function onScroll() { isScrolled.value = window.scrollY > 40 }
onMounted(() => window.addEventListener('scroll', onScroll))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style scoped>
.navbar {
  position: fixed; top: 0; left: 0; right: 0;
  z-index: 1000;
  transition: background 0.3s, box-shadow 0.3s;
}
.navbar.scrolled {
  background: rgba(13,13,13,0.96);
  backdrop-filter: blur(12px);
  box-shadow: 0 2px 20px rgba(0,0,0,0.5);
}
.nav-inner {
  display: flex; align-items: center;
  justify-content: space-between; height: 72px;
}
.brand { display: flex; align-items: center; gap: 10px; text-decoration: none; }
.brand-icon { font-size: 1.8rem; }
.brand-name {
  display: block; font-family: var(--font-display);
  font-size: 1.4rem; letter-spacing: 0.05em; color: var(--primary); line-height: 1;
}
.brand-sub {
  display: block; font-size: 0.65rem; font-weight: 600;
  letter-spacing: 0.15em; text-transform: uppercase; color: var(--text-muted); line-height: 1;
}
.nav-links { display: flex; align-items: center; gap: 8px; }
.nav-links a {
  font-size: 0.9rem; font-weight: 500; padding: 8px 14px;
  border-radius: 8px; transition: color 0.2s, background 0.2s; color: rgba(255,255,255,0.75);
}
.nav-links a:hover, .nav-links a.router-link-active { color: var(--primary); background: rgba(232,160,32,0.08); }
.btn-wa {
  display: flex !important; align-items: center; gap: 6px;
  background: #25D366 !important; color: #fff !important;
  padding: 8px 16px !important; border-radius: 50px !important;
  font-weight: 600; font-size: 0.85rem !important;
}
.btn-wa:hover { opacity: 0.9; transform: translateY(-1px); background: #1fba58 !important; }
.hamburger { display: none; flex-direction: column; gap: 5px; background: none; border: none; padding: 8px; cursor: pointer; }
.hamburger span { display: block; width: 24px; height: 2px; background: var(--text); border-radius: 2px; transition: transform 0.3s, opacity 0.3s; }
@media (max-width: 768px) {
  .hamburger { display: flex; }
  .nav-links {
    display: none; position: fixed; top: 72px; left: 0; right: 0;
    background: var(--dark-2); flex-direction: column; padding: 20px;
    gap: 4px; border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .nav-links.active { display: flex; }
  .nav-links a { width: 100%; }
  .btn-wa { justify-content: center; }
  .navbar.open .hamburger span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  .navbar.open .hamburger span:nth-child(2) { opacity: 0; }
  .navbar.open .hamburger span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
}
</style>
