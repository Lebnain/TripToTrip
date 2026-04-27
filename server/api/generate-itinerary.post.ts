import Anthropic from '@anthropic-ai/sdk'

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const { destination, startDate, endDate, travelers, interests } = body

  if (!destination || !startDate || !endDate) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  const start = new Date(startDate)
  const end = new Date(endDate)
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24))
  const days = nights + 1

  if (days < 1 || days > 30) {
    throw createError({ statusCode: 400, message: 'Trip duration must be between 1 and 30 days' })
  }

  const client = new Anthropic({ apiKey: config.anthropicApiKey })

  const prompt = `You are an expert travel planner. Create a detailed ${days}-day itinerary for a trip to ${destination}.

Trip Details:
- Destination: ${destination}
- Start Date: ${new Date(startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- End Date: ${new Date(endDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
- Duration: ${days} days
- Number of Travelers: ${travelers || 2}
- Interests/Preferences: ${interests || 'general sightseeing, local food, culture'}

Return ONLY a valid JSON object (no markdown, no explanation) with this exact structure:
{
  "destination": "Full destination name",
  "summary": "2-3 sentence overview of the trip",
  "highlights": ["highlight1", "highlight2", "highlight3"],
  "bestTimeInfo": "Brief note about the travel timing/season",
  "currency": "Local currency name and code",
  "timezone": "Local timezone",
  "days": [
    {
      "dayNumber": 1,
      "date": "formatted date string",
      "theme": "Theme of the day (e.g., Arrival & Old Town Exploration)",
      "description": "1-2 sentences about the day's focus",
      "activities": [
        {
          "time": "9:00 AM",
          "name": "Activity Name",
          "description": "2-3 sentences describing the activity and what to expect",
          "duration": "2 hours",
          "type": "sightseeing|food|culture|adventure|relaxation|transport|shopping",
          "tip": "One practical insider tip",
          "cost": "Free|$|$$|$$$"
        }
      ],
      "accommodation": "Suggested neighborhood or hotel type to stay",
      "meals": {
        "breakfast": "Specific restaurant or food suggestion",
        "lunch": "Specific restaurant or food suggestion",
        "dinner": "Specific restaurant or food suggestion"
      },
      "estimatedBudget": "$X-Y per person"
    }
  ]
}

Each day should have 4-6 activities. Be specific with real place names, restaurants, and landmarks in ${destination}. Make it genuinely useful and authentic.`

  try {
    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 8000,
      messages: [{ role: 'user', content: prompt }]
    })

    const responseText = message.content[0].type === 'text' ? message.content[0].text : ''
    
    // Clean and parse JSON
    const cleaned = responseText.replace(/```json|```/g, '').trim()
    const itinerary = JSON.parse(cleaned)

    return { success: true, itinerary }
  } catch (err) {
    console.error('API Error:', err)
    throw createError({ 
      statusCode: 500, 
      message: err.message || 'Failed to generate itinerary' 
    })
  }
})
