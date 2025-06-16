let showPass = document.getElementById("showPass");
let Senha = document.getElementById("senha");
let trava = false;


function delay(ms) {  
  return new Promise(resolve => setTimeout(resolve, ms));
}

function travar(asd) {
  if (asd === true) {
    if (!trava) {
      trava = true;
      console.log('[CEBOLITOS_CLOUD] - [ANTI-DUB]: TRAVA ATIVADA!');
      setTimeout(() => {
        trava = false;
        console.log('[CEBOLITOS_CLOUD] - [ANTI-DUB]: TRAVA DESATIVADA!')
      }, 8000);
    }
  } else if (typeof asd === 'boolean') {
    trava = asd;
    console.log(`[CEBOLITOS_CLOUD] - [ANTI-DUB]: TRAVA SETADA PARA ${asd.toString().toUpperCase()}`);
  }
}

function adicionarSemDuplicar(array, items) {
  const idsExistentes = new Set(array.map(t => t.id));
  for (const item of items) {
    if (!idsExistentes.has(item.id)) {
      array.push(item);
      idsExistentes.add(item.id);
    }
  }
}

showPass.addEventListener("click", () => {
    if (Senha.type === "password") {
        Senha.type = "text";
    } else {
        Senha.type = "password";
    }
});

function Atividade(Titulo, Atividade, tempo = 2500) {
    const div = document.createElement("div");
    div.className = "Notificacao";

    const h1 = document.createElement("h3");
    h1.textContent = Titulo;

    const p = document.createElement("p");
    p.textContent = Atividade;

    const barraTempo = document.createElement("div");
    barraTempo.className = "barra-tempo";
  
    div.appendChild(h1);
    div.appendChild(p);
    div.appendChild(barraTempo);

    const article = document.getElementById("TamanhoN");
    article.appendChild(div);

    div.style.animation = "AparecerBonito 1s ease";

    setTimeout(() => {
        div.style.animation = "sumir 1s ease";
        div.addEventListener("animationstart", () => {
          setTimeout(() => {
              const interval = setInterval(() => {
                  const currentScroll = article.scrollTop;
                  const targetScroll = article.scrollHeight;
                  const distance = targetScroll - currentScroll;
                  
                  article.scrollTop += distance * 0.4;
      
                  if (distance < 1) {
                      clearInterval(interval);
                  }
              }, 16);
          }, 200);
      });

        div.addEventListener("animationend", () => {
          div.remove();
        })
    }, tempo);
}

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

(function detectDevTools() {
  const element = new Image();
  Object.defineProperty(element, 'id', {
    get() {
      location.reload(); 
    }
  });

  console.log('%c', element); 

  setInterval(() => {
    console.log('%c', element);
  }, 1000);
})();

document.addEventListener('keydown', function (e) {
  if (
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && ['U', 'S'].includes(e.key.toUpperCase()))
  ) {
    e.preventDefault();
    location.reload();
  }
});
