<p align="center">
  <a href="http://nestjs.com/" target="blank">
    <img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" />
  </a>
</p>

# Microservice_agendamentos_fisio API

API de agendamentos construída com NestJS e Prisma, utilizando PostgreSQL como banco de dados. Permite criar, listar, atualizar e cancelar agendamentos.

## Instalação

1. Clone o repositorio

```bash
$ git clone https://github.com/MateuzCabral/Agendamento_Fisio.git
```

2. Instale as dependências

```bash
$ npm install
```
### Execução do Prisma

```
$ npx prisma migrate dev
```

> Execute esse comando para rodar as migrations

### Execução

Modo de Inicialização

```bash
$ npm run start
```

Modo de Observação

```bash
$ npm run dev
```

Modo de Produção

```bash
$ npm run prod
```

## Configuração do Banco de Dados

Certifique-se de configurar a variável de ambiente DATABASE_URL no arquivo .env com a URL e as informações do seu banco de dados PostgreSQL.

## Endpoints

> Para garantir que tenha retorno das requisições é necessário utilizar o Authorization Bearer Token em
https://github.com/GeanVitorM/Auth_server

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
{
  "idPaciente": 1,
  "pedido_medico": arquivo,
}
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

2. **Migrations**: A API utiliza as migrations geradas pelo Prisma execute o comando `npx prisma migration dev` para gerar as tabelas e colunas.

3. **Uploads de Arquivos**: A API utiliza o `multipart/form-data` para uploads de arquivos.

4. **Variáveis de Ambiente**: Renomear o arquivo `.env-example` para `.env`, Adicione quaisquer outras variáveis de ambiente necessárias ao arquivo `.env`.

<div align="center">
<img src="https://cdn.simpleicons.org/nestjs" height="30" alt="nestjs logo"  />
<img src="https://cdn.simpleicons.org/prisma" height="30" alt="nestjs logo"  />
<img src="https://cdn.simpleicons.org/postgresql/" height="30" alt="nestjs logo"  />
</div>
