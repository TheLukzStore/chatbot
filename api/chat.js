import fetch from "node-fetch";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Hanya POST yang diizinkan." });
  }

  const body = req.body;
  const userMessage = body?.message || "";

  console.log("Pesan diterima:", userMessage);

  // Contoh tanpa OpenAI (bisa diganti nanti)
  let reply = "Maaf, saya tidak tahu cara menjawab itu.";
  if (userMessage.toLowerCase().includes("halo")) reply = "Hai juga! Ada yang bisa saya bantu?";
  if (userMessage.toLowerCase().includes("nama")) reply = "Saya TheLukz Bot 🤖";

  return res.status(200).json({ reply });
}
