<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# Endpoints

## GET

### Listar todos os agendamentos
``http://localhost:8081/agendamentos ``

### Listar os agendamentos por ID
``http://localhost:8081/agendamentos/1 ``

### Listar os agendamentos por ID do paciente
``http://localhost:8081/agendamentos/paciente/1 ``

### Listar os agendamentos por ID do fisioterapeuta
``http://localhost:8081/agendamentos/fisio/1 ``

### Retorno
````bash
{
  "id": 1,
  "pedido_medico": "caminho_do_arquivo",
  "primeira_consulta": true,
  "data_agendamento": null,
  "status": "Pendente",
  "idPaciente": 1,
  "idFisioterapeuta": null,
  "idCoordenador": null
}
````

<br>

## POST em /agendamentos
 corpo da requisição
```bash
{
  "pedido_medico": "teste",
  "primeira_consulta": true,
  "idPaciente": 1
}
```
