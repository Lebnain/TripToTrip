<template>
  <div class="relative">
    <!-- Big destination title -->
    <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
      <div>
        <div class="flex items-center gap-3 mb-2">
          <span class="activity-pill bg-ink text-sand-100">
            {{ itinerary.days.length }}-Day Journey
          </span>
          <span class="activity-pill bg-sand-100 text-sand-700">
            {{ itinerary.timezone }}
          </span>
          <span class="activity-pill bg-sand-100 text-sand-700">
            {{ itinerary.currency }}
          </span>
        </div>
        <h2 class="font-display text-4xl md:text-5xl font-bold text-ink leading-tight">
          {{ itinerary.destination }}
        </h2>
        <p class="font-body text-ink-muted mt-3 text-base leading-relaxed max-w-2xl">
          {{ itinerary.summary }}
        </p>
      </div>
      <button
        @click="$emit('reset')"
        class="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-sand-300 text-sm font-body text-ink-muted hover:border-ink hover:text-ink transition-all"
      >
        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        </svg>
        Plan New Trip
      </button>
    </div>

    <!-- Info strip -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
      <div class="bg-white rounded-2xl border border-sand-200 p-4">
        <p class="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Departure</p>
        <p class="font-body font-medium text-ink text-sm">{{ formatDate(form.startDate) }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-sand-200 p-4">
        <p class="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Return</p>
        <p class="font-body font-medium text-ink text-sm">{{ formatDate(form.endDate) }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-sand-200 p-4">
        <p class="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Travelers</p>
        <p class="font-body font-medium text-ink text-sm">{{ form.travelers }} {{ +form.travelers === 1 ? 'person' : 'people' }}</p>
      </div>
      <div class="bg-white rounded-2xl border border-sand-200 p-4">
        <p class="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Season Note</p>
        <p class="font-body font-medium text-ink text-sm truncate">{{ itinerary.bestTimeInfo }}</p>
      </div>
    </div>

    <!-- Highlights -->
    <div class="bg-white rounded-2xl border border-sand-200 p-6">
      <p class="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">Trip Highlights</p>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(h, i) in itinerary.highlights"
          :key="i"
          class="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sand-50 border border-sand-200 text-sm font-body text-ink"
        >
          <span class="text-sand-500">✦</span>
          {{ h }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  itinerary: Object,
  form: Object
})
defineEmits(['reset'])

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>
