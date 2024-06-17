<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

# Microservice_agendamentos_fisio API

API de agendamentos construída com NestJS e Prisma, utilizando PostgreSQL como banco de dados. Permite criar, listar, atualizar e cancelar agendamentos.

## Instalação

```bash
$ npm install
```

### Execução

Modo de inicialização

```bash
$ npm run start
```

Modo de Observação

```bash
$ npm run dev
```

Modo de produção

```bash
$ npm run prod
```

## Configuração do Banco de Dados

Certifique-se de configurar a variável de ambiente DATABASE_URL no arquivo .env com a URL e as informações do seu banco de dados PostgreSQL.

## Endpoints

### Rota GET para listar todos os agendamentos

```
http://localhost:8081/agendamentos
```

### Rota GET para listar o agendamento pelo o ID

```
http://localhost:8081/agendamentos/:id
```

### Rota GET para listar os agendamentos pelo o ID do Paciente

```
http://localhost:8081/agendamentos/paciente/:id
```

### Rota GET para listar os agendamentos pelo o ID do Fisioterapeuta

```
http://localhost:8081/agendamentos/fisio/:id
```

### Retorno da requisição

```json
[
  {
    "id": 1,
    "pedido_medico": "pedido_medico-1718635718700-293122691.pdf",
    "primeira_consulta": true,
    "data_agendamento": null,
    "status": "Pendente",
    "idPaciente": 1,
    "idFisioterapeuta": null,
    "idCoordenador": null,
    "motivo_cancelamento": null
  }
]
```

### Rota POST para agendamentos

> Utilize o multipart/form-data para enviar o pedido_medico como `file`, o id será enviado como Number e a primeira consulta como Boolean

<strong>Corpo da requisição:</strong>

```json
[
  {
    "idPaciente": 1,
    "pedido_medico": arquivo,
    "primeira_consulta": true,
  }
]
```

### Retorno com o codigo 201 (Created)

```json
{
  "id": 1,
  "pedido_medico": "pedido_medico-1718635718700-293122691.pdf",
  "primeira_consulta": true,
  "data_agendamento": null,
  "status": "Pendente",
  "idPaciente": 1,
  "idFisioterapeuta": null,
  "idCoordenador": null,
  "motivo_cancelamento": null
}
```

### Rota PUT para os agendamentos

<strong>Corpo da requisição</strong>

```json
{
  "data_agendamento": "2024-06-10T10:00:00Z",
  "idFisioterapeuta": 1,
  "idCoordenador": 1
}
```

### Retorno com o codigo 200

```json
{
  "id": 1,
  "pedido_medico": "pedido_medico-1718635718700-293122691.pdf",
  "primeira_consulta": true,
  "data_agendamento": "2024-06-10T10:00:00.000Z",
  "status": "Aceito",
  "idPaciente": 1,
  "idFisioterapeuta": 1,
  "idCoordenador": 1,
  "motivo_cancelamento": null
}
```

### Rota PATCH para cancelar os agendamentos

<strong>Corpo da requisição:</strong>

```json
{
  "motivo_cancelamento": "escrever o motivo"
}
```

### Retorno com o codigo 200

```json
{
  "id": 1,
  "pedido_medico": "pedido_medico-1718635718700-293122691.pdf",
  "primeira_consulta": true,
  "data_agendamento": "2024-06-10T10:00:00.000Z",
  "status": "Cancelado",
  "idPaciente": 1,
  "idFisioterapeuta": 1,
  "idCoordenador": 1,
  "motivo_cancelamento": "motivo do cancelamento"
}
```


### Notas Adicionais:

1. **Banco de Dados**: Certifique-se de que seu banco de dados PostgreSQL esteja configurado corretamente e acessível via a variável de ambiente `DATABASE_URL`.

2. **Uploads de Arquivos**: A API utiliza o `multipart/form-data` para uploads de arquivos.

3. **Variáveis de Ambiente**: Porfavor renomear o arquivo `.env-example` para `.env`, Adicione quaisquer outras variáveis de ambiente necessárias ao arquivo `.env`.

Com estas adições, a documentação fornece uma visão abrangente da API, incluindo instruções de instalação, execução, endpoints, e configuração do banco de dados.
