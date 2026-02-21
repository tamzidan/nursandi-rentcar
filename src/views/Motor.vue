<template>
  <div class="page">
    <section class="page-hero">
      <div class="page-hero-bg"></div>
      <div class="container">
        <p class="section-label">Armada Motor</p>
        <h1 class="page-title">Sewa Motor<br><span class="highlight">{{ s.businessName }}</span></h1>
        <p class="page-subtitle">Solusi transportasi ekonomis dan fleksibel. Cocok untuk mobilitas harian maupun wisata.</p>
      </div>
    </section>

    <section class="vehicles-section">
      <div class="container">
        <div class="filter-tabs">
          <button v-for="tab in tabs" :key="tab" :class="['tab-btn', { active: activeTab === tab }]" @click="activeTab = tab">{{ tab }}</button>
        </div>
        <div class="vehicles-grid">
          <VehicleCard v-for="motor in filteredMotors" :key="motor.id" v-bind="motor" />
        </div>
        <div v-if="filteredMotors.length === 0" class="empty">Tidak ada kendaraan di kategori ini.</div>
      </div>
    </section>

    <section class="rent-info">
      <div class="container">
        <div class="info-grid">
          <div class="info-box"><h3>📋 Syarat Penyewaan</h3><ul><li>KTP yang masih berlaku</li><li>SIM C yang masih berlaku</li><li>Deposit sesuai kesepakatan</li><li>Usia minimal 18 tahun</li><li>Meninggalkan identitas asli</li></ul></div>
          <div class="info-box"><h3>⏰ Ketentuan Sewa</h3><ul><li>Minimal sewa 1 hari (24 jam)</li><li>Sewa harian, mingguan, bulanan</li><li>BBM isi sendiri oleh penyewa</li><li>Pengembalian tepat waktu</li><li>Tidak untuk pemula tanpa pengalaman</li></ul></div>
          <div class="info-box"><h3>✅ Termasuk dalam Harga</h3><ul><li>Helm standar SNI</li><li>Jas hujan</li><li>Kunci cadangan</li><li>Peta wisata lokal</li><li>Bantuan jika ada kendala</li></ul></div>
        </div>
      </div>
    </section>

    <section class="cta-strip">
      <div class="container">
        <div class="cta-inner">
          <div><h2>Butuh Motor Sekarang?</h2><p>Hubungi kami via WhatsApp untuk pemesanan cepat</p></div>
          <a :href="waLink('Halo Nursandi RentCar, saya ingin menyewa motor')" target="_blank" class="btn-primary">💬 Pesan via WhatsApp</a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VehicleCard from '../components/VehicleCard.vue'
import { useSettings, waLink } from '../composables/useSettings.js'
const s = useSettings()
const tabs = ['Semua', 'Matic', 'Manual', 'Sport']
const activeTab = ref('Semua')
const filteredMotors = computed(() => activeTab.value === 'Semua' ? s.motors : s.motors.filter(m => m.category === activeTab.value))
</script>

<style scoped>
.page { padding-top: 72px; }
.page-hero { position: relative; padding: 80px 0; overflow: hidden; }
.page-hero-bg { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(232,160,32,0.07) 0%, transparent 60%); }
.page-hero-bg::before { content: '🏍️'; position: absolute; right: 5%; top: 50%; transform: translateY(-50%); font-size: 18rem; opacity: 0.05; }
.page-title { font-family: var(--font-display); font-size: clamp(2.5rem, 5vw, 4rem); letter-spacing: 0.03em; margin-bottom: 16px; position: relative; }
.highlight { color: var(--primary); }
.page-subtitle { color: var(--text-muted); font-size: 1.05rem; max-width: 560px; line-height: 1.7; position: relative; }
.vehicles-section { padding: 60px 0; }
.filter-tabs { display: flex; gap: 10px; margin-bottom: 40px; flex-wrap: wrap; }
.tab-btn { padding: 8px 20px; border-radius: 50px; border: 1.5px solid rgba(255,255,255,0.1); background: transparent; color: var(--text-muted); font-family: var(--font-body); font-size: 0.88rem; font-weight: 600; transition: all 0.2s; cursor: pointer; }
.tab-btn.active, .tab-btn:hover { border-color: var(--primary); color: var(--primary); background: rgba(232,160,32,0.08); }
.vehicles-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 24px; }
.empty { text-align: center; color: var(--text-muted); padding: 60px 0; font-size: 1rem; }
.rent-info { background: var(--dark-2); padding: 60px 0; }
.info-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.info-box { background: var(--dark-3); border-radius: 16px; padding: 28px; border: 1px solid rgba(255,255,255,0.06); }
.info-box h3 { font-size: 1rem; font-weight: 700; margin-bottom: 16px; color: var(--primary); }
.info-box ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.info-box li { font-size: 0.87rem; color: var(--text-muted); padding-left: 16px; position: relative; line-height: 1.5; }
.info-box li::before { content: '›'; position: absolute; left: 0; color: var(--primary); font-weight: bold; }
.cta-strip { padding: 48px 0; }
.cta-inner { display: flex; align-items: center; justify-content: space-between; gap: 24px; background: linear-gradient(135deg, rgba(232,160,32,0.12), rgba(232,160,32,0.04)); border: 1px solid rgba(232,160,32,0.2); border-radius: 20px; padding: 36px 40px; }
.cta-inner h2 { font-family: var(--font-display); font-size: 1.8rem; letter-spacing: 0.03em; margin-bottom: 4px; }
.cta-inner p { color: var(--text-muted); }
@media (max-width: 768px) { .info-grid { grid-template-columns: 1fr; } .cta-inner { flex-direction: column; text-align: center; } }
</style>
