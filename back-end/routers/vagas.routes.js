const express = require('express');
const router = express.Router();

const vagas = [

]


router.get('/', (req, res) => {
  res.send(vagas);
})


router.get('/:id', (req, res) => {
  const idParam = req.params.id;
  const index = vagas.findIndex(vaga => vaga.id == idParam);
  const vaga = vagas[index];
  res.send(vaga);
})


router.put('/:id', (req, res) => {
  const vagaEdit = req.body;
  const id = req.params.id;
  let vagaPreCadastrada = vagas.find((vaga) => vaga.id == id);
  
  vagaPreCadastrada.titulo = vagaEdit.titulo;
  vagaPreCadastrada.descricao = vagaEdit.descricao;
  vagaPreCadastrada.salario = vagaEdit.salario;
  vagaPreCadastrada.senioridade = vagaEdit.senioridade;

  res.send({
    message: `Filme ${vagaPreCadastrada.id} atualizada com sucesso !`,
    data: vagaPreCadastrada
  })
})

router.post('/add', (req, res) => {
  const vaga = req.body;
  vaga.id = Date.now();
  vagas.push(vaga);
  res.status(201).send({
    message: 'O filme foi cadastrado com sucesso !',
    data: vaga
  });
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const index = vagas.findIndex((vaga) => vaga.id == id);
  vagas.splice(index, 1);

  res.send({
    message: `O filme foi excluido com sucesso !`,
  })
})



module.exports = router;

