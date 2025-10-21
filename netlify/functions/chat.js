export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message || "Halo!";

    console.log("Pesan diterima:", userMessage);

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      console.error("❌ API key tidak ditemukan");
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "API key belum diatur di Netlify Environment." }),
      };
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    console.log("Response dari API:", data);

    const reply = data.choices?.[0]?.message?.content || "Maaf, saya tidak tahu cara menjawab itu.";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("⚠️ Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Terjadi kesalahan pada server." }),
    };
  }
}
