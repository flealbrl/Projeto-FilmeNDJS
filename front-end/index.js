const urlApi = 'http://localhost:5500/vagas';
const lista = document.getElementById('lista');
let edicao = false;
let idEdicao = 0;


const getVagas = async () => {
  const response = await fetch(urlApi);
  const data = await response.json();
  console.log(data);

  
  data.map((vaga) => {
    lista.insertAdjacentHTML('beforeend', `
      <div class="card-body">
        <p class="card-titulo">${vaga.titulo}</p>
        <img class="card-img" src="${vaga.salario}">
        <p class="card-descricao">${vaga.descricao}</p>
        <p class="card-senioridade">Nota: ${vaga.senioridade}</p>
        <button type="button" class="btn-btn-primary" onclick="putVaga(${vaga.id})">Editar ✏️</button>
        <button type="button" class="btn-btn-danger" onclick="deleteVaga(${vaga.id})">Excluir ❌</button>
        <label class="container"> Filme Assistido
          <input type="checkbox">
          <span class="checkmark"></span>
        </label>
      </div>
    `)
  })
}
getVagas();


const submitForm = async (evento) => {
  evento.preventDefault();

  let titulo = document.getElementById('titulo');
  let descricao = document.getElementById('descricao');
  let salario = document.getElementById('salario');
  let senioridade = document.getElementById('senioridade');

  const vaga = {
    titulo: titulo.value,
    descricao: descricao.value,
    salario: salario.value,
    senioridade: senioridade.value
  }

  if(!edicao) { 
    const request = new Request(`${urlApi}/add`, {
      method: 'POST',
      body: JSON.stringify(vaga),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    
    const response = await fetch(request);
    const result = await response.json();

    if(result) {
      getVagas();
    }

  } else {
    const request = new Request(`${urlApi}/${idEdicao}`, {
      method: 'PUT',
      body: JSON.stringify(vaga),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })

    const response = await fetch(request);
    const result = await response.json();

    if(result) {
      getVagas();
    }
  }

  titulo.value = '';
  descricao.value = '';
  salario.value = '';
  senioridade.value = '';

  lista.innerHTML = '';
}

const getVagaById =  async (id) => {
  const response =  await fetch(`${urlApi}/${id}`);
  return vaga = response.json();
}

const putVaga = async (id) => {
  edicao = true;
  idEdicao = id;

  const vaga = await getVagaById(id);

  let tituloEl = document.getElementById('titulo');
  let descricaoEl = document.getElementById('descricao');
  let salarioEl = document.getElementById('salario');
  let senioridadeEl = document.getElementById('senioridade');
  
  tituloEl.value = vaga.titulo;
  descricaoEl.value = vaga.descricao;
  salarioEl.value = vaga.salario;
  senioridadeEl.value = vaga.senioridade

}


const deleteVaga = async (id) => {
  const request = new Request(`${urlApi}/${id}`, {
    method: 'DELETE',
  })
  const response = await fetch(request);
  const data = await response.json();
  console.log(data.message);

  lista.innerHTML = '';
  getVagas();
}

