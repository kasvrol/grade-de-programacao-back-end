# API da Grade da Programação da Rede Globo.

## Sobre

A API permite aos usuários acessar informações da programação da Rede Globo para um dia específico, obtendo os dados diretamente da API oficial da emissora por meio de requisições.

Pela data de entrega do projeto, agenda pessoal e falta de conhecimento do framework e o ORM propostos para criação da aplicação, faltou terminar a rota PUT.

Para rodar o projeto em seu ambiente local, abra o Postman e acesse http://localhost:3002 utilizando o rota desejada para utilizar a aplicação.

Deve conectar API em seu banco de dados usando o gerenciador postgre, para isso, vá para o arquivo .env e substitua o valor da variável DATABASE_URL.

## Rotas

| **Método** | **Rota**                      | **Descrição\***                           |
| ---------- | ----------------------------- | ----------------------------------------- |
| GET        | /programas/{$AAAA-MM-DD}      | Mostra a programação do dia requisitado   |
| POST       | /programas?data={$AAAA-MM-DD} | Armazena a programação do dia requisitado |
| DELETE     | /programas/{$AAAA-MM-DD}      | Deleta a programação do dia requisitado   |

## Ferramentas utilizadas:

A aplicação foi construída utilizando as seguintes tecnologias e bibliotecas:

- Nest.js v^10.0.0
- Node.js v18.16.0
- Prisma v^5.2.0
- NPM v9.5.1
- Axios v^1.5.0
- Postman
- [NeonDB](https://neon.tech/)

## Como Executar a Aplicação em Sua Máquina:

Para executar a aplicação em sua máquina local, siga os passos abaixo:

1 - Clone este repositório para sua máquina local usando o seguinte comando:

```bash
git clone https://github.com/kasvrol/grade-de-programacao-back-end.git
```

2 - Navegue até o diretório do projeto:

```bash
cd grade-de-programacao-back-end.git
```

3 - Instale as dependências do projeto usando o npm:

```bash
npm install
```

4 - Agora você pode iniciar a aplicação em sua máquina usando o seguinte comando:

```bash
npm run start:dev
```
