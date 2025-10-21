export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const userMessage = body.message || "";

    console.log("Pesan diterima:", userMessage);

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("❌ API Key tidak ditemukan di environment variables");
      return {
        statusCode: 500,
        body: JSON.stringify({
          reply: "⚠️ Bot belum dikonfigurasi. API Key tidak ditemukan."
        }),
      };
    }

    // Kirim request ke OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // bisa ganti gpt-4 kalau punya akses
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    console.log("Status response:", response.status);

    const data = await response.json();
    console.log("Response dari API:", data);

    // Jika request gagal, balas default
    if (!response.ok || data.error) {
      const errorMsg = data.error?.message || "Terjadi kesalahan server OpenAI.";
      console.error("Error API:", errorMsg);
      return {
        statusCode: 200,
        body: JSON.stringify({
          reply: `⚠️ Bot tidak bisa menjawab: ${errorMsg}`,
        }),
      };
    }

    const reply = data.choices?.[0]?.message?.content || "Maaf, saya tidak tahu cara menjawab itu.";
    return {
      statusCode: 200,
      body: JSON.stringify({ reply }),
    };
  } catch (error) {
    console.error("⚠️ Error catch:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "⚠️ Terjadi kesalahan server." }),
    };
  }
}
