<template>
  <div class="day-card" :style="{ animationDelay: `${index * 0.1}s` }">
    <!-- Day Header -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 pb-4 border-b border-sand-100">
      <div class="flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
          :style="{ background: dayBg }">
          {{ dayEmoji }}
        </div>
        <div>
          <div class="flex items-center gap-2 mb-0.5">
            <span class="font-mono text-xs font-medium text-sand-600 uppercase tracking-widest">
              Day {{ day.dayNumber }}
            </span>
            <span class="text-sand-300">·</span>
            <span class="font-mono text-xs text-ink-muted">{{ day.date }}</span>
          </div>
          <h3 class="font-display text-xl font-bold text-ink">{{ day.theme }}</h3>
          <p class="font-body text-sm text-ink-muted mt-0.5">{{ day.description }}</p>
        </div>
      </div>
      <div class="flex items-center gap-2 shrink-0">
        <span class="activity-pill bg-sand-50 border border-sand-200 text-ink-muted">
          💰 {{ day.estimatedBudget }}
        </span>
        <span class="activity-pill bg-sand-50 border border-sand-200 text-ink-muted">
          🏨 {{ day.accommodation }}
        </span>
      </div>
    </div>

    <!-- Activities Timeline -->
    <div class="p-6">
      <div class="relative">
        <!-- Timeline line -->
        <div class="absolute left-[22px] top-4 bottom-4 w-px bg-sand-200 md:block hidden"></div>

        <div class="space-y-4">
          <ActivityItem
            v-for="(activity, i) in day.activities"
            :key="i"
            :activity="activity"
            :index="i"
          />
        </div>
      </div>

      <!-- Meals -->
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div v-for="(meal, type) in day.meals" :key="type"
          class="bg-sand-50 rounded-xl border border-sand-200 px-4 py-3">
          <p class="text-xs font-mono text-sand-500 uppercase tracking-wider mb-1 capitalize">
            {{ mealEmoji[type] }} {{ type }}
          </p>
          <p class="text-sm font-body text-ink">{{ meal }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  day: Object,
  index: Number
})

const dayEmojis = ['🌅', '🗺️', '🎭', '🍜', '🏛️', '🌊', '🌿', '⛰️', '🎨', '🌙']
const dayBgs = [
  'rgba(184,154,101,0.15)',
  'rgba(101,150,184,0.15)',
  'rgba(150,184,101,0.15)',
  'rgba(184,101,130,0.15)',
  'rgba(101,184,170,0.15)',
  'rgba(184,130,101,0.15)',
]

const dayEmoji = computed(() => dayEmojis[props.index % dayEmojis.length])
const dayBg = computed(() => dayBgs[props.index % dayBgs.length])

const mealEmoji = {
  breakfast: '☕',
  lunch: '🥗',
  dinner: '🍽️'
}
</script>
