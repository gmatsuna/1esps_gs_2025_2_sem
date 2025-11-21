// Vetor global para habilidades selecionadas
let habilidadesSelecionadas = [];

// Função para adicionar habilidade à lista
function adicionarHabilidade() {
  const select = document.getElementById('listaHabilidades');
  const listaDOM = document.getElementById('listaHabilidadesAdicionadas');
  const habilidade = select.value;

  if (!habilidade) {
    alert('Escolha uma habilidade antes de adicionar.');
    return;
  }

  // Evita habilidades repetidas
  if (habilidadesSelecionadas.includes(habilidade)) {
    alert('Essa habilidade já foi adicionada.');
    return;
  }

  habilidadesSelecionadas.push(habilidade);

  // Atualiza a lista visual
  listaDOM.innerHTML = '';
  habilidadesSelecionadas.forEach(function (item) {
    const li = document.createElement('li');
    li.textContent = item;
    listaDOM.appendChild(li);
  });

  // Volta o select para a opção padrão
  select.value = '';
}

// Função para checar e-mail (simples)
function checarEmail(valor) {
  const email = valor.trim().toLowerCase();
  const temArroba = email.includes('@');
  const temPonto = email.lastIndexOf('.') > email.indexOf('@') + 1;

  const valido = temArroba && temPonto && email.length >= 8;

  return {
    valido: valido,
    normalizado: email
  };
}

// Função para checar CPF (apenas tamanho de 11 dígitos)
function checarCPF(valor) {
  const apenasDigitos = valor.replace(/\D/g, '');
  const valido = apenasDigitos.length === 11;

  return {
    valido: valido,
    normalizado: apenasDigitos
  };
}

// Função para exibir feedback de erro ou sucesso
function exibirFeedback(vetorErros, resumoSucesso) {
  const area = document.getElementById('feedback');

  if (vetorErros.length > 0) {
    let html = '<h3>Ops, verifique os campos abaixo:</h3><ul>';
    vetorErros.forEach(function (msg) {
      html += '<li>' + msg + '</li>';
    });
    html += '</ul>';

    area.innerHTML = html;
    area.className = 'feedback erro';
  } else if (resumoSucesso) {
    let html = '<h3>Cadastro realizado com sucesso!</h3>';
    html += '<p><strong>Nome:</strong> ' + resumoSucesso.nome + '</p>';
    html += '<p><strong>CPF:</strong> ' + resumoSucesso.cpf + '</p>';
    html += '<p><strong>E-mail:</strong> ' + resumoSucesso.email + '</p>';
    html += '<p><strong>Tipo de interesse:</strong> ' + resumoSucesso.tipoInteresse + '</p>';
    html += '<p><strong>Habilidades registradas:</strong></p>';
    html += '<ul>';
    resumoSucesso.habilidades.forEach(function (hab) {
      html += '<li>' + hab + '</li>';
    });
    html += '</ul>';

    area.innerHTML = html;
    area.className = 'feedback sucesso';
  } else {
    area.innerHTML = '';
    area.className = 'feedback';
  }
}

// Função principal de validação do formulário
function validarFormulario() {
  const erros = [];

  const nome = document.getElementById('nomeCompleto').value.trim();
  const cpfValor = document.getElementById('cpf').value;
  const emailValor = document.getElementById('email').value;

  const resultadoEmail = checarEmail(emailValor);
  const resultadoCPF = checarCPF(cpfValor);

  const tipoInteresseSelecionado = document.querySelector('input[name="tipoInteresse"]:checked');

  // Validação de nome
  if (nome.length < 5) {
    erros.push('Informe seu nome completo (mínimo 5 caracteres).');
  }

  // Validação de CPF
  if (!resultadoCPF.valido) {
    erros.push('Informe um CPF válido com 11 dígitos.');
  }

  // Validação de e-mail
  if (!resultadoEmail.valido) {
    erros.push('Informe um e-mail em formato válido (ex.: nome@dominio.com).');
  }

  // Validação de tipo de interesse
  if (!tipoInteresseSelecionado) {
    erros.push('Selecione um tipo de interesse.');
  }

  // Validação de habilidades
  if (habilidadesSelecionadas.length < 3) {
    erros.push('Adicione pelo menos 3 habilidades à sua lista.');
  }

  if (erros.length > 0) {
    exibirFeedback(erros, null);
    return;
  }

  const resumo = {
    nome: nome,
    cpf: resultadoCPF.normalizado,
    email: resultadoEmail.normalizado,
    tipoInteresse: tipoInteresseSelecionado.value,
    habilidades: habilidadesSelecionadas
  };

  exibirFeedback([], resumo);

  // Se quiser limpar depois do sucesso, descomenta:
  // document.getElementById('formRaizDigital').reset();
  // habilidadesSelecionadas = [];
  // document.getElementById('listaHabilidadesAdicionadas').innerHTML = '';
}

// Liga os botões às funções depois que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
  const btnAdd = document.getElementById('btnAdicionarHabilidade');
  const btnEnviar = document.getElementById('btnEnviarFormulario');

  if (btnAdd) {
    btnAdd.addEventListener('click', adicionarHabilidade);
  }

  if (btnEnviar) {
    btnEnviar.addEventListener('click', validarFormulario);
  }
});
