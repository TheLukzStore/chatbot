<!-- index.html -->
<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>AI Chatbot - Netlify</title>
  <style>
    :root{--bg:#0f1724;--card:#111827;--accent:#06b6d4;--muted:#94a3b8}
    html,body{height:100%;margin:0;font-family:Inter,system-ui,Arial;background:linear-gradient(180deg,#071023 0%,#0b1220 100%);color:#e6eef8}
    .app{max-width:800px;margin:32px auto;padding:20px}
    .card{background:rgba(255,255,255,0.03);border-radius:12px;padding:16px;box-shadow:0 6px 20px rgba(2,6,23,0.6)}
    header{display:flex;align-items:center;gap:12px}
    h1{margin:0;font-size:1.25rem}
    #chat{height:60vh;overflow:auto;padding:12px;border-radius:8px;background:rgba(0,0,0,0.18);margin-top:12px}
    .msg{margin:10px 0;display:flex}
    .msg.user{justify-content:flex-end}
    .bubble{max-width:72%;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,0.03);line-height:1.4}
    .bubble.user{background:linear-gradient(90deg,rgba(6,182,212,0.12),rgba(6,182,212,0.08));}
    .controls{display:flex;gap:8px;margin-top:12px}
    input[type=text]{flex:1;padding:10px;border-radius:8px;border:1px solid rgba(255,255,255,0.06);background:transparent;color:inherit}
    button{padding:10px 14px;border-radius:8px;border:none;background:var(--accent);color:#042028;cursor:pointer}
    .small{font-size:0.85rem;color:var(--muted)}
  </style>
</head>
<body>
  <div class="app">
    <div class="card">
      <header>
        <div>
          <h1>AI Chatbot</h1>
          <div class="small">Deployed on Netlify — menggunakan serverless function untuk menyimpan API key</div>
        </div>
      </header>

      <div id="chat" aria-live="polite"></div>

      <div class="controls">
        <input id="input" type="text" placeholder="Tanya apa saja..." autocomplete="off" />
        <button id="send">Kirim</button>
      </div>

      <div class="small" style="margin-top:10px">Tip: jangan masukkan data sensitif ke chat. Untuk performa lebih baik, gunakan model berbayar di OpenAI.</div>
    </div>
  </div>

  <script>
    const chatEl = document.getElementById('chat')
    const inputEl = document.getElementById('input')
    const btn = document.getElementById('send')

    function appendMessage(text, who='bot'){
      const wrapper = document.createElement('div')
      wrapper.className = 'msg ' + (who === 'user' ? 'user' : 'bot')
      const bubble = document.createElement('div')
      bubble.className = 'bubble ' + (who === 'user' ? 'user' : 'bot')
      bubble.textContent = text
      wrapper.appendChild(bubble)
      chatEl.appendChild(wrapper)
      chatEl.scrollTop = chatEl.scrollHeight
    }

    async function sendMessage(){
      const text = inputEl.value.trim()
      if(!text) return
      appendMessage(text, 'user')
      inputEl.value = ''
      appendMessage('Menjawab...', 'bot')

      try{
        const res = await fetch('/.netlify/functions/chat', {
          method: 'POST',
          headers: {'Content-Type':'application/json'},
          body: JSON.stringify({message: text})
        })
        if(!res.ok){
          const txt = await res.text()
          throw new Error(txt || 'Response not ok')
        }
        const data = await res.json()
        // hapus pesan sementara "Menjawab..."
        const placeholders = Array.from(document.querySelectorAll('.bubble')).filter(b => b.textContent === 'Menjawab...')
        if(placeholders.length) placeholders[placeholders.length-1].textContent = data.reply || 'Tidak ada jawaban.'
        else appendMessage(data.reply || 'Tidak ada jawaban.')
      }catch(err){
        const placeholders = Array.from(document.querySelectorAll('.bubble')).filter(b => b.textContent === 'Menjawab...')
        if(placeholders.length) placeholders[placeholders.length-1].textContent = 'Error: '+err.message
        else appendMessage('Error: '+err.message)
      }
    }

    btn.addEventListener('click', sendMessage)
    inputEl.addEventListener('keydown', e => { if(e.key === 'Enter') sendMessage() })
  </script>
</body>
</html>
