function solicitarTempoUsuario(tasks) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10000',
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out'
    });
    setTimeout(() => (overlay.style.opacity = 1), 10);

    const caixa = document.createElement('div');
    Object.assign(caixa.style, {
      background: 'rgba(20, 20, 20, 0.95)',
      display: 'flex',
      flexDirection: 'column',
      color: '#f0f0f0',
      padding: '35px 35px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      textAlign: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      width: '90%',
      maxWidth: '500px',
      overflow: 'hidden',
      maxHeight: '90vh',
      transform: 'scale(0.8)',
      transition: 'transform 0.4s ease',
      position: 'relative'
    });
    setTimeout(() => (caixa.style.transform = 'scale(1)'), 100);

    const botaoFechar = document.createElement('button');
    botaoFechar.textContent = '✖';
    Object.assign(botaoFechar.style, {
      position: 'absolute',
      right: '15px',
      top: '15px',
      background: 'transparent',
      border: 'none',
      color: '#ccc',
      fontSize: '22px',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      padding: '4px',
      userSelect: 'none',
      lineHeight: '1'
    });
    botaoFechar.onmouseover = () => (botaoFechar.style.color = 'white');
    botaoFechar.onmouseout = () => (botaoFechar.style.color = '#ccc');
    botaoFechar.onclick = () => {
      document.body.removeChild(overlay);
    };

    const titulo = document.createElement('h2');
    titulo.textContent = '📝 Atividades';
    Object.assign(titulo.style, {
      marginBottom: '18px',
      fontSize: '22px',
      color: '#ffffff'
    });
    caixa.appendChild(titulo);

    const atividadesContainer = document.createElement('div');
    Object.assign(atividadesContainer.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: '10px',
      gap: '10px',
      marginBottom: '24px',
      maxHeight: '220px',
      overflowY: 'auto'
    });

    const checkboxElements = [];

    tasks.forEach((task, idx) => {
      const label = document.createElement('label');
      Object.assign(label.style, {
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        fontSize: '15.5px',
        cursor: 'pointer',
        padding: '6px 10px',
        fontWeight: 'bold',
        borderRadius: '8px',
        backgroundColor: '#1a1a1a',
        transition: 'background 0.2s',
        width: '100%'
      });

      label.onmouseenter = () => label.style.background = 'rgba(255,255,255,0.05)';
      label.onmouseleave = () => label.style.background = '#1a1a1a';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.transform = 'scale(1.2)';
      checkbox.style.cursor = 'pointer';

      const span = document.createElement('span');
      const title = task.title || task.nome || `Tarefa ${idx + 1}`;
      const tipo = (task.tipo ? ` - ${task.tipo}` : '');

      let emoji = '🔹';
      const tipoLower = (task.tipo || '').toLowerCase();

      if (['pendente'].includes(tipoLower)) {
        emoji = '🔸';
      } else if (['expirada'].includes(tipoLower)) {
        emoji = '🔺';
      }
      span.textContent = `${emoji} ${title}${tipo}`;

      label.appendChild(checkbox);
      label.appendChild(span);
      atividadesContainer.appendChild(label);
      atividadesContainer.style.minHeight = '150px';
    atividadesContainer.style.maxHeight = '220px';
      checkboxElements.push({ checkbox, task });
    });

    caixa.appendChild(atividadesContainer);

    const tituloTempo = document.createElement('p');
    tituloTempo.textContent = '⏱️ Tempo por atividade (minutos)';
    Object.assign(tituloTempo.style, {
      fontWeight: 'bold',
      fontSize: '16px',
      marginBottom: '12px',
      color: '#dddddd'
    });
    caixa.appendChild(tituloTempo);

    const inputContainer = document.createElement('div');
    Object.assign(inputContainer.style, {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    });
    caixa.appendChild(inputContainer);

    const decrementButton = document.createElement('button');
    decrementButton.textContent = '-';
    Object.assign(decrementButton.style, {
      padding: '8px 12px',
      fontSize: '18px',
      background: 'linear-gradient(90deg, #c43aff, #932fff)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    });

    const inputTempo = document.createElement('input');
    inputTempo.value = 1;
    inputTempo.min = 1;
    inputTempo.max = 10;
    Object.assign(inputTempo.style, {
      width: '80px',
      padding: '8px',
      fontSize: '16px',
      textAlign: 'center',
      border: '1px solid #555',
      borderRadius: '10px',
      background: '#333',
      color: '#fff'
    });

    const incrementButton = document.createElement('button');
    incrementButton.textContent = '+';
    Object.assign(incrementButton.style, {
      padding: '8px 12px',
      fontSize: '18px',
      background: 'linear-gradient(90deg, #c43aff, #932fff)',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background 0.2s ease'
    });

    incrementButton.onclick = () => {
      if (parseInt(inputTempo.value) < 10) {
        inputTempo.value = parseInt(inputTempo.value) + 1;
      }
    };
    decrementButton.onclick = () => {
      if (parseInt(inputTempo.value) > 1) {
        inputTempo.value = parseInt(inputTempo.value) - 1;
      }
    };

    inputContainer.appendChild(decrementButton);
    inputContainer.appendChild(inputTempo);
    inputContainer.appendChild(incrementButton);

    const erro = document.createElement('p');
    Object.assign(erro.style, {
      color: 'tomato',
      fontSize: '14px',
      margin: '6px 0',
      display: 'none'
    });
    caixa.appendChild(erro);

    const botoesContainer = document.createElement('div');
    Object.assign(botoesContainer.style, {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      marginTop: '20px'
    });

    function criarBotao(texto, onClick) {
      const btn = document.createElement('button');
      btn.textContent = texto;
      Object.assign(btn.style, {
        padding: '12px 28px',
        background: 'linear-gradient(90deg, #c43aff, #932fff)',
        border: 'none',
        borderRadius: '12px',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease-in-out',
        width: '100%'
      });
      btn.onmouseover = () => btn.style.opacity = '0.9';
      btn.onmouseout = () => btn.style.opacity = '1';
      btn.onmousedown = () => btn.style.transform = 'scale(0.96)';
      btn.onmouseup = () => btn.style.transform = 'scale(1)';
      btn.onclick = onClick;
      return btn;
    }

    const botaoSelecionadas = criarBotao('✅ Fazer Selecionadas', () => {
      const valor = parseInt(inputTempo.value);
      if (isNaN(valor) || valor < 1 || valor > 10) {
        erro.textContent = 'Digite um número válido de 1 a 10.';
        erro.style.display = 'block';
        return;
      }
      const tarefasSelecionadas = checkboxElements
        .filter(({ checkbox }) => checkbox.checked)
        .map(({ task }) => task);

      if (tarefasSelecionadas.length === 0) {
        erro.textContent = 'Selecione pelo menos uma tarefa.';
        erro.style.display = 'block';
        return;
      }

      document.body.removeChild(overlay);
      resolve({ tipo: 'selecionadas', tempo: valor, tarefasSelecionadas });
    });

    const botaoRascunho = criarBotao('✏️ Fazer como Rascunho', () => {
        const valor = parseInt(inputTempo.value);
        if (isNaN(valor) || valor < 1 || valor > 10) {
            erro.textContent = 'Digite um número válido de 1 a 10.';
            erro.style.display = 'block';
            return;
        }
        const tarefasSelecionadas = checkboxElements
            .filter(({ checkbox }) => checkbox.checked)
            .map(({ task }) => task);

        if (tarefasSelecionadas.length === 0) {
            erro.textContent = 'Selecione pelo menos uma tarefa.';
            erro.style.display = 'block';
            return;
        }
      
        document.body.removeChild(overlay);
        resolve({ tipo: 'rascunho', tempo: valor, tarefasSelecionadas });
    });

    const botaoTodas = criarBotao('📋 Fazer todas', () => {
      const valor = parseInt(inputTempo.value);
      if (isNaN(valor) || valor < 1 || valor > 10) {
        erro.textContent = 'Digite um número válido de 1 a 10.';
        erro.style.display = 'block';
        return;
      }
      document.body.removeChild(overlay);
      resolve({ tipo: 'todas', tempo: valor, tarefasSelecionadas: tasks });
    });

    botoesContainer.appendChild(botaoSelecionadas);
    botoesContainer.appendChild(botaoRascunho);
    botoesContainer.appendChild(botaoTodas);

    caixa.appendChild(botoesContainer);
    caixa.appendChild(botaoFechar);
    overlay.appendChild(caixa);
    document.body.appendChild(overlay);
  });
}


function solicitarProva(tasks) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10000',
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out'
    });
    setTimeout(() => (overlay.style.opacity = 1), 10);

    const caixa = document.createElement('div');
    Object.assign(caixa.style, {
      background: 'rgba(20, 20, 20, 0.95)',
      color: '#f0f0f0',
      padding: '35px 35px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      textAlign: 'center',
      overflow: 'hidden',
      flexDirection: 'column',
      display: 'flex',
      fontFamily: "'Segoe UI', sans-serif",
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      transform: 'scale(0.8)',
      transition: 'transform 0.4s ease'
    });
    setTimeout(() => (caixa.style.transform = 'scale(1)'), 100);

    const botaoFechar = document.createElement('button');
    botaoFechar.textContent = '✖';
    Object.assign(botaoFechar.style, {
      position: 'absolute',
      right: '15px',
      top: '15px',
      background: 'transparent',
      border: 'none',
      color: '#ccc',
      fontSize: '22px',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      padding: '4px',
      userSelect: 'none',
      lineHeight: '1'
    });
    botaoFechar.onmouseover = () => (botaoFechar.style.color = 'white');
    botaoFechar.onmouseout = () => (botaoFechar.style.color = '#ccc');
    botaoFechar.onclick = () => {
      document.body.removeChild(overlay);
    };
    
    const titulo = document.createElement('h2');
    titulo.textContent = '📝 Provas';
    Object.assign(titulo.style, {
      marginBottom: '18px',
      fontSize: '22px',
      color: '#ffffff'
    });
    caixa.appendChild(titulo);

    const atividadesContainer = document.createElement('div');
    Object.assign(atividadesContainer.style, {
            flex: '1',
            overflowY: 'auto',
            paddingLeft: '10px',
            marginBottom: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
    });

    const checkboxElements = [];
    tasks.forEach((task) => {
      const label = document.createElement('label');
      Object.assign(label.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '6px',
        fontSize: '15.5px',
        cursor: 'pointer',
        padding: '10px 12px',
        fontWeight: 'bold',
        borderRadius: '8px',
        backgroundColor: '#1a1a1a',
        transition: 'background 0.2s',
        width: '100%'
      });
    
      label.onmouseenter = () => label.style.background = 'rgba(255,255,255,0.05)';
      label.onmouseleave = () => label.style.background = '#1a1a1a';
    
      const topRow = document.createElement('div');
      topRow.style.display = 'flex';
      topRow.style.alignItems = 'center';
      topRow.style.gap = '10px';
    
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.style.transform = 'scale(1.2)';
      checkbox.style.cursor = 'pointer';
    
      const totalQuestoes = Object.keys(task.answer_answers).length;
      const nota = task.result_score;
      const restante = totalQuestoes - nota;
    
      const span = document.createElement('span');
      const title = task.title || `Tarefa`;
      const notaS = nota === totalQuestoes ? `NOTA [${nota}] MAXIMA` : `NOTA [${nota}]`;
      let emoji = '🔹';
      span.textContent = `${emoji} ${title}`;
    
      topRow.appendChild(checkbox);
      topRow.appendChild(span);
      label.appendChild(topRow);
    
      const inputContainer = document.createElement('div');
      inputContainer.style.display = 'none';
      inputContainer.style.flexDirection = 'column';
      inputContainer.style.gap = '6px';
      inputContainer.style.marginTop = '6px';
      const asx = restante === 0 ? 'Nenhum' : restante;
      const labelInput = document.createElement('label');
      labelInput.textContent = `Selecione Quantidade: MAXIMO [${totalQuestoes}]`;
      labelInput.style.fontSize = '13px';
      labelInput.style.color = '#ccc';
    
      const input = document.createElement('input');
      input.type = 'number';
      input.min = 1;
      input.max = restante;
      input.value = 1;
      input.style.width = '100%';
      input.style.padding = '6px 10px';
      input.style.border = '1px solid #444';
      input.style.borderRadius = '6px';
      input.style.backgroundColor = '#2a2a2a';
      input.style.color = '#fff';
    
      inputContainer.appendChild(labelInput);
      inputContainer.appendChild(input);
      label.appendChild(inputContainer);
    
      atividadesContainer.appendChild(label);
    
      checkbox.addEventListener('change', () => {
        checkboxElements.forEach(({ checkbox: cb, inputContainer: ic, input: inp }) => {
          if (cb !== checkbox) {
            cb.checked = false;
            ic.style.display = 'none';
          }
        });
    
        if (checkbox.checked) {
          if (restante === 0) {
            input.disabled = true;
            input.value = 'Máximo';
            input.style.textAlign = 'center';
            input.style.color = '#aaa';
            input.style.cursor = 'not-allowed';
            botao.disabled = true;
            botao.style.opacity = '0.6';
            botao.style.cursor = 'not-allowed';
          } else {
            input.disabled = false;
            input.value = 1;
            input.style.textAlign = 'left';
            input.style.color = '#fff';
            input.style.cursor = 'text';
            botao.disabled = false;
            botao.style.opacity = '1';
            botao.style.cursor = 'pointer';
          }
          inputContainer.style.display = 'flex';
        } else {
          inputContainer.style.display = 'none';
          botao.disabled = false;
          botao.style.opacity = '1';
          botao.style.cursor = 'pointer';
        }
      });
      checkboxElements.push({ checkbox, task, input, inputContainer });
    });

    caixa.appendChild(atividadesContainer);
    
      const msg = document.createElement('p');
      Object.assign(msg.style, {
        marginBottom: '18px',
        fontSize: '12px',
        color: '#f2f2f2'
      });
      msg.textContent = 'Selecione a prova para enviar, tenha certeza que a prova está em rascunho pelo menos todas as questões respondidas, e que a prova não esteja enviada!, e que o tempo minimo ja esteja atingido!';
      caixa.appendChild(msg);
      const msg2 = document.createElement('p');
      Object.assign(msg2.style, {
        marginBottom: '18px',
        fontSize: '13px',
        color: '#f1c40f',
        fontWeight: 'bold',
        backgroundColor: '#2c2c2c',
        padding: '10px',
        borderRadius: '5px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      });
      msg2.textContent = '⚠️ OBS: ELE SO CORRIGE A PROVA QUE VOCÊ FEZ NO DIA!!! SE PASSAR DO DIA ELE NAO ARRUMA MAIS!';
      caixa.appendChild(msg2);

    
    const erro = document.createElement('p');
    Object.assign(erro.style, {
      color: 'tomato',
      fontSize: '14px',
      margin: '6px 0',
      display: 'none'
    });
    caixa.appendChild(erro);

    const botao = document.createElement('button');
    botao.textContent = '✅ Confirmar';
    Object.assign(botao.style, {
      marginTop: '15px',
      padding: '12px 28px',
      background: 'linear-gradient(90deg, #c43aff, #932fff)',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease-in-out'
    });
    botao.onclick = () => {
      const tarefasSelecionadas = checkboxElements
        .filter(({ checkbox }) => checkbox.checked)
        .map(({ task }) => task);

      if (tarefasSelecionadas.length === 0) {
        erro.textContent = 'Selecione pelo menos uma prova.';
        erro.style.display = 'block';
        return;
      }
      const selecionado = checkboxElements.find(({ checkbox }) => checkbox.checked);
      const quantidadeSelecionada = selecionado
        ? (selecionado.input.disabled ? 'Máximo' : parseInt(selecionado.input.value, 10))
        : 0;
      
      document.body.removeChild(overlay);
      resolve({
        quantidade: quantidadeSelecionada,
        tarefasSelecionadas
      });
    };

    caixa.appendChild(botao);
    caixa.appendChild(botaoFechar);
    overlay.appendChild(caixa);
    document.body.appendChild(overlay);
  });
}

function previewProva(tasks) {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    Object.assign(overlay.style, {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '10000',
      opacity: 0,
      transition: 'opacity 0.3s ease-in-out'
    });
    setTimeout(() => (overlay.style.opacity = 1), 10);

    const caixa = document.createElement('div');
    Object.assign(caixa.style, {
      background: 'rgba(20, 20, 20, 0.95)',
      color: '#f0f0f0',
      padding: '30px 30px',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
      textAlign: 'center',
      fontFamily: "'Segoe UI', sans-serif",
      width: '90%',
      maxWidth: '500px',
      maxHeight: '90vh',
      transform: 'scale(0.8)',
      transition: 'transform 0.4s ease'
    });
    setTimeout(() => (caixa.style.transform = 'scale(1)'), 100);

    const botaoFechar = document.createElement('button');
    botaoFechar.textContent = '✖';
    Object.assign(botaoFechar.style, {
      position: 'absolute',
      right: '15px',
      top: '15px',
      background: 'transparent',
      border: 'none',
      color: '#ccc',
      fontSize: '22px',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
      padding: '4px',
      userSelect: 'none',
      lineHeight: '1'
    });
    botaoFechar.onmouseover = () => (botaoFechar.style.color = 'white');
    botaoFechar.onmouseout = () => (botaoFechar.style.color = '#ccc');
    botaoFechar.onclick = () => {
      document.body.removeChild(overlay);
    };
    
    const titulo = document.createElement('h2');
    titulo.textContent = '📝 PROVAS CONCLUIDAS';
    Object.assign(titulo.style, {
      marginBottom: '18px',
      fontSize: '22px',
      color: '#ffffff'
    });
    caixa.appendChild(titulo);

    const atividadesContainer = document.createElement('div');
    Object.assign(atividadesContainer.style, {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: '10px',
      gap: '10px',
      marginBottom: '24px',
      maxHeight: '220px',
      overflowY: 'auto'
    });

    tasks.forEach((task) => {
      const label = document.createElement('label');
      Object.assign(label.style, {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: '6px',
        fontSize: '15.5px',
        cursor: 'pointer',
        padding: '10px 12px',
        fontWeight: 'bold',
        borderRadius: '8px',
        backgroundColor: '#1a1a1a',
        transition: 'background 0.2s',
        width: '100%'
      });
    
      label.onmouseenter = () => label.style.background = 'rgba(255,255,255,0.05)';
      label.onmouseleave = () => label.style.background = '#1a1a1a';
    
      const topRow = document.createElement('div');
      topRow.style.display = 'flex';
      topRow.style.alignItems = 'center';
      topRow.style.gap = '10px';


      const nota = task.result_score;
    
      const span = document.createElement('span');
      const title = task.task_title;
      let emoji = '🔹';
      span.textContent = `${emoji} ${title} - NOTA [${nota}]`;
    
      topRow.appendChild(span);
      label.appendChild(topRow);
    
      atividadesContainer.appendChild(label);
    });    

    caixa.appendChild(atividadesContainer);

    const erro = document.createElement('p');
    Object.assign(erro.style, {
      color: 'tomato',
      fontSize: '14px',
      margin: '6px 0',
      display: 'none'
    });
    caixa.appendChild(erro);

    // Botão confirmar
    const botao = document.createElement('button');
    botao.textContent = ' Fechar';
    Object.assign(botao.style, {
      marginTop: '15px',
      padding: '12px 28px',
      background: 'linear-gradient(90deg, #c43aff, #932fff)',
      border: 'none',
      borderRadius: '12px',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
      boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      transition: 'all 0.2s ease-in-out'
    });

    botao.onclick = () => {
      document.body.removeChild(overlay);
    };

    caixa.appendChild(botao);
    caixa.appendChild(botaoFechar);
    overlay.appendChild(caixa);
    document.body.appendChild(overlay);
  });
}
