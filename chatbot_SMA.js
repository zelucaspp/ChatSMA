(function () {
    // ==========================
    // CONFIGURAÇÃO
    // ==========================
    //const chatUrl = "https://copilotstudio.microsoft.com/environments/adf5ac63-1957-eee0-afc2-9e64db5c7cea/bots/cr6ae_botTest/webchat?__version__=2"; // <-- substitua pela URL correta do seu bot
     const chatUrl = "https://zelucaspp.github.io/ChatSMA/SMA_AssistenteVirtual_Index.html";

    // ==========================
    // ESTILOS DO BOTÃO E CHAT
    // ==========================
    const style = document.createElement("style");
    style.textContent = `
        #botao-chat {
            position: fixed;
            bottom: 20px;
            right: 20px;
            display: flex;
            align-items: stretch;
            background: linear-gradient(to right, #005c78, #007892);
            color: white;
            border-radius: 30px;
            box-shadow: 0 0 10px rgba(0,0,0,0.3);
            border: 2px solid #ccc;
            overflow: hidden;
            z-index: 9999;
            cursor: pointer;
            padding: 0;
        }

        #botao-chat .texto {
            padding: 10px 15px;
            font-size: 14px;
            line-height: 1.2;
        }

        #botao-chat .acao {
            background-color: #00344a;
            padding: 10px 15px;
            font-weight: bold;
            font-size: 14px;
            text-align: center;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        #chat-container {
            display: none;
            position: fixed;
            bottom: 80px;
            right: 20px;
            width: min(400px, 90vw);
            height: min(500px, 80vh);
            border: 2px solid #ccc;
            border-radius: 10px;
            overflow: hidden;
            z-index: 9998;
            box-shadow: 0 0 15px rgba(0,0,0,0.3);
            background: white;
        }

        #chat-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }

        .controle-chat {
            position: absolute;
            top: 6px;
            background: transparent;
            border: none;
            font-size: 18px;
            font-weight: bold;
            color: #00344a;
            cursor: pointer;
            z-index: 10000;
        }

        #fechar-chat { right: 10px; }
        #reset-chat { right: 40px; font-size: 16px; }
    `;
    document.head.appendChild(style);

    // ==========================
    // ELEMENTOS HTML CRIADOS VIA JS
    // ==========================
    const botao = document.createElement("button");
    botao.id = "botao-chat";
    botao.innerHTML = `
        <div class="texto">
            Reclamar da distribuidora?<br>
            Consultar um protocolo ANEEL?
        </div>
        <div class="acao">CLIQUE<br>AQUI</div>
    `;
    botao.setAttribute("aria-controls", "chat-container");
    botao.setAttribute("aria-expanded", "false");

    const container = document.createElement("div");
    container.id = "chat-container";
    container.setAttribute("aria-hidden", "true");

    const resetBtn = document.createElement("button");
    resetBtn.id = "reset-chat";
    resetBtn.className = "controle-chat";
    resetBtn.title = "Reiniciar conversa";
    resetBtn.textContent = "↻";

    const fecharBtn = document.createElement("button");
    fecharBtn.id = "fechar-chat";
    fecharBtn.className = "controle-chat";
    fecharBtn.textContent = "×";
    fecharBtn.setAttribute("aria-label", "Fechar chat");

    container.appendChild(resetBtn);
    container.appendChild(fecharBtn);

    document.body.appendChild(botao);
    document.body.appendChild(container);

    // ==========================
    // FUNÇÕES DE CONTROLE
    // ==========================
    let iframe = null;

    function criarIframe() {
        if (iframe) iframe.remove();
        iframe = document.createElement("iframe");
        iframe.title = "Chatbot ANEEL";
        iframe.src = chatUrl + (chatUrl.includes("?") ? "&" : "?") + "userid=user_" + Date.now();
        container.appendChild(iframe);
    }

    function abrirChat() {
        criarIframe();
        container.style.display = "block";
        container.setAttribute("aria-hidden", "false");
        botao.style.display = "none";
        botao.setAttribute("aria-expanded", "true");
        fecharBtn.focus();
    }

    function fecharChat() {
        if (iframe) { iframe.remove(); iframe = null; }
        container.style.display = "none";
        container.setAttribute("aria-hidden", "true");
        botao.style.display = "flex";
        botao.setAttribute("aria-expanded", "false");
        botao.focus();
    }

    function resetarChat() {
        criarIframe();
    }

    // ==========================
    // EVENTOS
    // ==========================
    botao.addEventListener("click", abrirChat);
    fecharBtn.addEventListener("click", fecharChat);
    resetBtn.addEventListener("click", resetarChat);

    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && container.style.display === "block") {
            fecharChat();
        }
    });
})();
