function getUsuarios() {
  const usersJSON = sessionStorage.getItem('usuarios');
  if (!usersJSON) return [];
  return JSON.parse(usersJSON);
}
function salvarUsuarios(usuarios) {
  sessionStorage.setItem('usuarios', JSON.stringify(usuarios));
}
const cadastroForm = document.getElementById('cadastroForm');
const alerta = document.getElementById('alerta');
if(cadastroForm) {
  cadastroForm.addEventListener('submit', e => {
    e.preventDefault();
    alerta.style.display = 'none';
    const nome = document.getElementById('cadNome').value.trim();
    const email = document.getElementById('cadEmail').value.trim().toLowerCase();
    const telefone = document.getElementById('cadTelefone').value.trim();
    const senha = document.getElementById('cadSenha').value;
    if (!nome || !email || !senha) {
      alerta.textContent = 'Por favor, preencha os campos obrigatórios.';
      alerta.style.display = 'block';
      return;
    }
    let usuarios = getUsuarios();
    if (usuarios.some(u => u.email === email)) {
      alerta.textContent = 'Este email já está cadastrado.';
      alerta.style.display = 'block';
      return;
    }
    usuarios.push({ nome, email, telefone, senha });
    salvarUsuarios(usuarios);
    alerta.style.background = '#4caf50';
    alerta.textContent = 'Cadastro realizado com sucesso!';
    alerta.style.display = 'block';
    sessionStorage.setItem('logado', 'sim');
    window.location.href = 'index.html';
  });
}
const loginForm = document.getElementById('loginForm');
if(loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    alerta.style.display = 'none';
    const email = document.getElementById('logEmail').value.trim().toLowerCase();
    const senha = document.getElementById('logSenha').value;
    let usuarios = getUsuarios();
    const usuario = usuarios.find(u => u.email === email && u.senha === senha);
    if (!usuario) {
      alerta.textContent = 'Email ou senha inválidos.';
      alerta.style.display = 'block';
      return;
    }
    alerta.style.background = '#4caf50';
    alerta.textContent = `Bem-vindo, ${usuario.nome}! Você está logado.`;
    alerta.style.display = 'block';
    sessionStorage.setItem('logado', 'sim');
    window.location.href = 'index.html';
  });
}
function carregarUsuariosAdmin() {
  const usuarios = getUsuarios();
  const tbody = document.querySelector('#usuariosTable tbody');
  const semUsuarios = document.getElementById('semUsuarios');
  if (!tbody) return;
  tbody.innerHTML = '';
  if (usuarios.length === 0) {
    semUsuarios.style.display = 'block';
    return;
  } else {
    semUsuarios.style.display = 'none';
  }
  usuarios.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${u.nome}</td>
      <td>${u.email}</td>
      <td>${u.telefone || '-'}</td>
      <td>${u.senha}</td>

    `;
    tbody.appendChild(tr);
  });
}
const adminLoginForm = document.getElementById('adminLoginForm');
const adminErro = document.getElementById('adminErro');
const painel = document.getElementById('adminPainel');
if (adminLoginForm) {
  adminLoginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value.trim();
    const senha = document.getElementById('adminSenha').value;
    if (email === 'admin@gmail.com' && senha === 'admin123') {
      document.getElementById('adminLogin').style.display = 'none';
      painel.style.display = 'block';
      carregarUsuariosAdmin();
    } else {
      adminErro.style.display = 'block';
      adminErro.textContent = 'Credenciais inválidas para o administrador.';
    }
  });
}
