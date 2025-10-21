export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message;

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) return { statusCode: 500, body: JSON.stringify({ reply: 'API key belum diatur!' }) };

    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || 'Maaf, saya tidak bisa menjawab sekarang.';
    return { statusCode: 200, body: JSON.stringify({ reply }) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ reply: 'Terjadi kesalahan server.' }) };
  }
}
