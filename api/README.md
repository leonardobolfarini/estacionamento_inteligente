# Guia de execução

* 1 - Instalar os pacotes:
``` terminal
  npm i
```

* 2 - Gerar banco
``` terminal
  npx prisma generate
```

* 3 - Rodar as migrations
``` terminal
  npx prisma migrate dev
```

* 4 - Rodar a API
``` terminal
  npm run dev
``` 
## NÃO ESQUECER DE VERIFICAR O .env.example E MUDAR AS VARIÁVEIS AMBIENTE
------------------

## Sobre o banco

* Opcional (Se ainda não tiver subido o banco em algum lugar)
``` terminal
  npx create-db
```

Isto gera um banco e te passa uma connection string pra adicionar no .env

* Existe um arquivo chamado copulate_database com funções pra copular o banco, é só chamar as funções no pé do arquivo e rodar o arquivo com o seguinte comando: 
``` terminal
  npx tsx copulate_database.ts
```


## Informações Adicionais

Olhar a documentação do prisma se tiver duvida com o ORM ou o Banco

- Prisma ORM: https://www.prisma.io

Olhar a documentação do express se tiverem duvida com a API

- Express js: https://expressjs.com
