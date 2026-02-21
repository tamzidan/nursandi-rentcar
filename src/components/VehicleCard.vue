<template>
  <div class="vehicle-card">
    <div class="card-img-wrap">
      <div class="card-img" :style="{ background: bgGradient }">
        <img v-if="image" :src="image" :alt="name" class="car-photo" />
        <span v-else class="car-emoji">{{ emoji }}</span>
      </div>
      <div class="card-badge" v-if="badge">{{ badge }}</div>
    </div>
    <div class="card-body">
      <h3 class="card-name">{{ name }}</h3>
      <p class="card-desc">{{ desc }}</p>
      <div class="card-specs">
        <span v-for="spec in specs" :key="spec.label" class="spec">
          <span class="spec-icon">{{ spec.icon }}</span>
          <span>{{ spec.label }}</span>
        </span>
      </div>
      <div class="card-footer">
        <div class="price-info">
          <span class="price">{{ price }}</span>
          <span class="price-unit">/hari</span>
        </div>
        <a :href="waHref" target="_blank" class="btn-book">Pesan Sekarang</a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { waLink } from '../composables/useSettings.js'
const props = defineProps({ name: String, desc: String, price: String, badge: String, emoji: String, specs: Array, image: String })
const bgGradient = 'linear-gradient(135deg, #1a1a2e, #16213e)'
const waHref = computed(() => waLink(`Halo Nursandi RentCar, saya ingin menyewa ${props.name}`))
</script>

<style scoped>
.vehicle-card { background: var(--dark-3); border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.06); transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s; }
.vehicle-card:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(0,0,0,0.5); border-color: rgba(232,160,32,0.2); }
.card-img-wrap { position: relative; }
.card-img { height: 180px; display: flex; align-items: center; justify-content: center; transition: transform 0.4s; overflow: hidden; }
.vehicle-card:hover .card-img { transform: scale(1.03); }
.car-emoji { font-size: 6rem; }
.car-photo { width: 100%; height: 100%; object-fit: cover; }
.card-badge { position: absolute; top: 12px; right: 12px; background: var(--primary); color: #000; font-size: 0.7rem; font-weight: 700; letter-spacing: 0.05em; padding: 4px 10px; border-radius: 20px; text-transform: uppercase; }
.card-body { padding: 20px; }
.card-name { font-size: 1.15rem; font-weight: 700; margin-bottom: 6px; }
.card-desc { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px; line-height: 1.5; }
.card-specs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
.spec { display: flex; align-items: center; gap: 5px; font-size: 0.78rem; color: var(--text-muted); background: var(--dark-4); padding: 4px 10px; border-radius: 20px; }
.spec-icon { font-size: 0.9rem; }
.card-footer { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.price-info { display: flex; align-items: baseline; gap: 3px; }
.price { font-family: var(--font-display); font-size: 1.5rem; color: var(--primary); letter-spacing: 0.02em; }
.price-unit { font-size: 0.8rem; color: var(--text-muted); }
.btn-book { display: inline-flex; align-items: center; background: var(--primary); color: #000; font-weight: 700; font-size: 0.82rem; padding: 9px 16px; border-radius: 50px; transition: background 0.2s, transform 0.2s; }
.btn-book:hover { background: var(--primary-dark); transform: scale(1.03); }
</style>
