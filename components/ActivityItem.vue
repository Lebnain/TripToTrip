<template>
  <div class="group relative flex gap-4 md:gap-6">
    <!-- Timeline dot (desktop) -->
    <div class="hidden md:flex flex-col items-center shrink-0">
      <div class="w-11 h-11 rounded-full flex items-center justify-center text-lg shrink-0 border-2 border-white shadow-sm z-10"
        :style="{ background: typeColor.bg }">
        {{ typeIcon }}
      </div>
    </div>

    <!-- Activity Card -->
    <div class="flex-1 bg-sand-50 rounded-2xl border border-sand-200 p-4 group-hover:border-sand-400 transition-all duration-200">
      <div class="flex items-start justify-between gap-3 mb-2">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <!-- Mobile icon -->
            <span class="md:hidden text-base">{{ typeIcon }}</span>
            <span class="font-mono text-xs font-medium text-sand-600">{{ activity.time }}</span>
            <span class="activity-pill text-xs border"
              :style="{ background: typeColor.bg, color: typeColor.text, borderColor: typeColor.border }">
              {{ activity.type }}
            </span>
          </div>
          <h4 class="font-body font-semibold text-ink">{{ activity.name }}</h4>
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="activity-pill bg-white border border-sand-200 text-ink-muted text-xs">
            {{ costLabel }}
          </span>
          <span class="text-xs font-mono text-ink-muted whitespace-nowrap">{{ activity.duration }}</span>
        </div>
      </div>

      <p class="font-body text-sm text-ink-muted leading-relaxed mb-3">
        {{ activity.description }}
      </p>

      <!-- Tip -->
      <div v-if="activity.tip" class="flex items-start gap-2 bg-white rounded-xl border border-sand-200 px-3 py-2">
        <span class="text-sm mt-0.5">💡</span>
        <p class="text-xs font-body text-ink-muted leading-relaxed">{{ activity.tip }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  activity: Object,
  index: Number
})

const typeConfig = {
  sightseeing: { bg: 'rgba(37,99,168,0.1)', text: '#1d4ed8', border: 'rgba(37,99,168,0.2)', icon: '👁️' },
  food: { bg: 'rgba(220,70,50,0.1)', text: '#dc2626', border: 'rgba(220,70,50,0.2)', icon: '🍽️' },
  culture: { bg: 'rgba(124,58,237,0.1)', text: '#7c3aed', border: 'rgba(124,58,237,0.2)', icon: '🎭' },
  adventure: { bg: 'rgba(5,150,105,0.1)', text: '#059669', border: 'rgba(5,150,105,0.2)', icon: '⛰️' },
  relaxation: { bg: 'rgba(6,182,212,0.1)', text: '#0891b2', border: 'rgba(6,182,212,0.2)', icon: '🌿' },
  transport: { bg: 'rgba(107,114,128,0.1)', text: '#4b5563', border: 'rgba(107,114,128,0.2)', icon: '🚆' },
  shopping: { bg: 'rgba(236,72,153,0.1)', text: '#db2777', border: 'rgba(236,72,153,0.2)', icon: '🛍️' },
}

const defaultConfig = { bg: 'rgba(184,154,101,0.1)', text: '#a07f4f', border: 'rgba(184,154,101,0.2)', icon: '✦' }

const typeColor = computed(() => typeConfig[props.activity.type] || defaultConfig)
const typeIcon = computed(() => (typeConfig[props.activity.type] || defaultConfig).icon)

const costMap = { 'Free': '🆓 Free', '$': '💲 Budget', '$$': '💲💲 Mid', '$$$': '💲💲💲 Splurge' }
const costLabel = computed(() => costMap[props.activity.cost] || props.activity.cost || '')
</script>
