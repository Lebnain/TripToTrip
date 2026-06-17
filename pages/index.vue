<template>
  <div class="min-h-screen">
    <!-- Hero / Search Section -->
    <section class="relative min-h-screen flex flex-col">
      <!-- Background texture -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-0 right-0 w-[600px] h-[600px] opacity-10"
          style="background: radial-gradient(circle, #b89a65 0%, transparent 70%)"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] opacity-[0.08]"
          style="background: radial-gradient(circle, #c9b285 0%, transparent 70%)"></div>
        <!-- Grid lines -->
        <svg class="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1a1410" stroke-width="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <!-- Nav -->
      <nav class="relative z-10 flex items-center justify-between px-8 py-6">
        <div class="flex items-center gap-2">
          <span class="text-2xl">✦</span>
          <span class="font-display text-xl font-bold text-ink">TripToTrip</span>
        </div>
        <div class="hidden md:flex items-center gap-6 text-sm font-body text-ink-muted">
          <span>AI-Powered Planning</span>
          <span class="w-1 h-1 rounded-full bg-sand-400 inline-block"></span>
          <span>Day-by-Day Itineraries</span>
        </div>
      </nav>

      <!-- Hero Content -->
      <div class="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div class="text-center mb-12 max-w-2xl">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sand-100 border border-sand-200 text-xs font-mono text-sand-600 mb-6">
            <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block"></span>
            Powered by Claude AI
          </div>
          <h1 class="font-display text-5xl md:text-7xl font-bold text-ink leading-tight mb-4">
            Your perfect trip,<br>
            <em class="italic text-sand-600">planned in seconds.</em>
          </h1>
          <p class="font-body text-ink-muted text-lg leading-relaxed">
            Tell us where you're going and for how long — we'll craft a thoughtful, 
            day-by-day itinerary tailored just for you.
          </p>
        </div>

        <!-- Search Form Card -->
        <div class="w-full max-w-3xl">
          <div class="bg-white rounded-3xl border border-sand-200 shadow-2xl p-8"
            style="box-shadow: 0 25px 60px rgba(26,20,16,0.12), 0 0 0 1px rgba(184,154,101,0.1)">
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <!-- Destination -->
              <div class="md:col-span-2">
                <label class="block text-xs font-mono font-medium text-ink-muted uppercase tracking-widest mb-2">
                  Destination
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🌍</span>
                  <input
                    v-model="form.destination"
                    type="text"
                    placeholder="e.g. Kyoto, Japan or Barcelona, Spain"
                    class="input-field pl-11"
                    @keydown.enter="generateItinerary"
                  />
                </div>
              </div>

              <!-- Start Date -->
              <div>
                <label class="block text-xs font-mono font-medium text-ink-muted uppercase tracking-widest mb-2">
                  Departure Date
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📅</span>
                  <input
                    v-model="form.startDate"
                    type="date"
                    :min="today"
                    class="input-field pl-11"
                  />
                </div>
              </div>

              <!-- End Date -->
              <div>
                <label class="block text-xs font-mono font-medium text-ink-muted uppercase tracking-widest mb-2">
                  Return Date
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🗓️</span>
                  <input
                    v-model="form.endDate"
                    type="date"
                    :min="form.startDate || today"
                    class="input-field pl-11"
                  />
                </div>
              </div>

              <!-- Travelers -->
              <div>
                <label class="block text-xs font-mono font-medium text-ink-muted uppercase tracking-widest mb-2">
                  Travelers
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg">👤</span>
                  <select v-model="form.travelers" class="input-field pl-11 appearance-none cursor-pointer">
                    <option value="1">Solo traveler</option>
                    <option value="2">2 people</option>
                    <option value="3">3 people</option>
                    <option value="4">4 people</option>
                    <option value="5+">5+ people</option>
                  </select>
                </div>
              </div>

              <!-- Interests -->
              <div>
                <label class="block text-xs font-mono font-medium text-ink-muted uppercase tracking-widest mb-2">
                  Interests (optional)
                </label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 -translate-y-1/2 text-lg">✨</span>
                  <input
                    v-model="form.interests"
                    type="text"
                    placeholder="food, history, hiking, art..."
                    class="input-field pl-11"
                  />
                </div>
              </div>
            </div>

            <!-- Duration Badge -->
            <div v-if="tripDuration > 0" class="mb-4 flex items-center gap-2">
              <span class="activity-pill bg-sand-100 text-sand-700">
                {{ tripDuration }} {{ tripDuration === 1 ? 'day' : 'days' }} trip
              </span>
              <span class="text-xs text-ink-muted font-body">
                {{ tripDuration * 4 }}–{{ tripDuration * 6 }} activities planned
              </span>
            </div>

            <!-- Error -->
            <div v-if="error" class="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600 font-body">
              {{ error }}
            </div>

            <!-- Submit -->
            <button
              @click="generateItinerary"
              :disabled="loading || !isFormValid"
              class="btn-primary w-full text-base py-4"
            >
              <span v-if="loading" class="inline-flex items-center gap-2">
                <svg class="w-4 h-4 animate-spin-slow" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" stroke-dasharray="32" stroke-dashoffset="12"/>
                </svg>
                Crafting your itinerary...
              </span>
              <span v-else class="inline-flex items-center gap-2">
                Plan My Trip
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

        <!-- Feature Pills -->
        <div class="flex flex-wrap justify-center gap-3 mt-8">
          <span v-for="f in features" :key="f" class="activity-pill bg-white border border-sand-200 text-ink-muted">
            {{ f }}
          </span>
        </div>
      </div>
    </section>

    <!-- Loading State -->
    <section v-if="loading" class="px-6 py-16 max-w-5xl mx-auto">
      <div class="text-center mb-12">
        <div class="inline-block w-12 h-12 rounded-full border-2 border-sand-300 border-t-ink animate-spin mb-4"></div>
        <p class="font-display text-2xl text-ink">Building your perfect itinerary...</p>
        <p class="font-body text-ink-muted mt-2">Researching local gems, timing, and hidden spots</p>
      </div>
      <!-- Skeleton cards -->
      <div class="space-y-4">
        <div v-for="i in 3" :key="i" class="day-card p-6">
          <div class="shimmer-bg h-6 w-48 rounded-lg mb-3"></div>
          <div class="shimmer-bg h-4 w-full rounded mb-2"></div>
          <div class="shimmer-bg h-4 w-3/4 rounded mb-6"></div>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <div v-for="j in 4" :key="j" class="shimmer-bg h-20 rounded-xl"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Itinerary Results -->
    <section v-if="itinerary && !loading" class="px-4 md:px-8 py-12 max-w-6xl mx-auto">
      <!-- Trip Header -->
      <ItineraryHeader :itinerary="itinerary" :form="form" @reset="resetForm" />
      
      <!-- Day Cards -->
      <div class="space-y-8 mt-10">
        <DayCard
          v-for="(day, idx) in itinerary.days"
          :key="day.dayNumber"
          :day="day"
          :index="idx"
        />
      </div>

      <!-- Footer CTA -->
      <div class="mt-16 text-center">
        <button @click="resetForm" class="btn-primary mx-auto">
          Plan Another Trip ✦
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
const form = ref({
  destination: '',
  startDate: '',
  endDate: '',
  travelers: '2',
  interests: ''
})

const loading = ref(false)
const error = ref('')
const itinerary = ref(null)

const today = computed(() => new Date().toISOString().split('T')[0])

const tripDuration = computed(() => {
  if (!form.value.startDate || !form.value.endDate) return 0
  const start = new Date(form.value.startDate)
  const end = new Date(form.value.endDate)
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1
  return diff > 0 ? diff : 0
})

const isFormValid = computed(() => {
  return form.value.destination && form.value.startDate && form.value.endDate && tripDuration.value > 0
})

const features = [
  '🗺️ Real local spots',
  '⏰ Timed schedule',
  '🍽️ Meal suggestions',
  '💡 Insider tips',
  '💰 Budget estimates',
  '🏨 Stay recommendations'
]

async function generateItinerary() {
  if (!isFormValid.value || loading.value) return
  
  error.value = ''
  itinerary.value = null
  loading.value = true

  try {
    const data = await $fetch('/api/generate-itinerary', {
      method: 'POST',
      body: {
        destination: form.value.destination,
        startDate: form.value.startDate,
        endDate: form.value.endDate,
        travelers: form.value.travelers,
        interests: form.value.interests
      }
    })
    
    itinerary.value = data.itinerary
    
    // Scroll to results
    await nextTick()
    window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' })
  } catch (err) {
    error.value = err.data?.message || 'Failed to generate itinerary. Please try again.'
  } finally {
    loading.value = false
  }
}

function resetForm() {
  itinerary.value = null
  error.value = ''
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>
