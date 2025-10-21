// netlify/functions/chat.js
// Node 18+ environment
const fetch = globalThis.fetch || require('node-fetch')

exports.handler = async function(event) {
  if(event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' }
  let body
  try{ body = JSON.parse(event.body) }catch(e){ return { statusCode:400, body: 'Invalid JSON' } }
  const userMessage = body.message || ''
  if(!userMessage) return { statusCode:400, body: JSON.stringify({error:'message empty'}) }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if(!OPENAI_API_KEY) return { statusCode:500, body: JSON.stringify({error:'OpenAI API key not configured'}) }

  try{
    const payload = {
      model: 'gpt-4o-mini', // ganti sesuai ketersediaan akun Anda
      messages: [
        { role: 'system', content: 'Kamu adalah asisten yang sopan dan membantu. Jawab sejelas mungkin.' },
        { role: 'user', content: userMessage }
      ],
      max_tokens: 800
    }

    const resp = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(payload)
    })

    if(!resp.ok){
      const text = await resp.text()
      return { statusCode: resp.status, body: text }
    }

    const data = await resp.json()
    const reply = data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content || ''

    return { statusCode:200, body: JSON.stringify({reply}) }
  }catch(err){
    return { statusCode:500, body: JSON.stringify({error: err.message}) }
  }
}
