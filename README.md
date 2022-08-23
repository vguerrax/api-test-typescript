[![Badge ServeRest](https://img.shields.io/badge/API-ServeRest-green)](https://github.com/ServeRest/ServeRest/)

# Boilerplate - Testes de API em TypeScript
Este projeto foi criado com base no boilerplate criado pelo [Rafael Berçam](https://github.com/rafaelbercam): https://github.com/rafaelbercam/api-tests-typescript

## Requisitos
- [Nodejs 16.16.0+](https://nodejs.org/pt-br/)

## Intalando as Dependências
Para instalar as dependencias do projeto execute o comando:
```shell
npm install
```

## Ambiente
Os testes estão sendo executados no ServeRest, um servidor REST utilizado para estudo de testes de API.
<p align="center">
 <img alt="Logo do ServeRest" src="https://user-images.githubusercontent.com/29241659/115161869-6a017e80-a076-11eb-9bbe-c391eff410db.png" height="120">
</p>

Link do Repo: https://github.com/ServeRest/ServeRest

 O ServeRest está disponível de forma [online](https://serverest.dev), no [npm](https://www.npmjs.com/package/serverest) e no [docker](https://hub.docker.com/r/paulogoncalvesbh/serverest/).

 Para este projeto, a versão online foi considerada como ambiente de produção e a versão npm como ambiente de desenvolvimento.

 Para subir o ServeRest localmente basta executar o comando:
 ```shell
 npx servrest
 ```
## Executando os Testes
Antes de executar os testes, verifique os arquivos JSON no diretório _src/config_. Cada arquivo contém as configurações do ambiente que representam.
- dev.json representa o ambiente de desenvolvimento
- prod.json representa o ambiente de produção

Para executar os testes em ambiente de desenvolvimento, execute o comando:
```shell
npm run test-dev
```

Para executar os testes em ambiente de produção, execute o comando:
```shell
npm test
```

## Relatório de Execução
Este projeto utiliza o [Allure Report](https://qameta.io/allure-report/) para gerar os relatórios das execuções.

Para visualizar o relatório da última execução execute o comando:
```shell
npm run report
```

## __Configuração do Projeto__
### Estrutura de Pastas
O projeto esta dividido da seguinte maneira:

    [api-tests-typescript]
       [src] -> código fonte
            [config] -> arquivos JSON de configuração de ambiente
            [factory] -> métodos para criar objetos
            [services] -> classe com funções que retornam requisições das rotas
            [test] -> Arquivos de testes com Mocha e Chai.
       .env -> arquivo com variáveis de ambiente(normalmente não commitada)
       .mocharc.js -> arquivo de configuração do mocha
       environment.js -> script que gera o arquivo de configuração do ambiente com base nos arquivos JSON
       reporterConfig.json -> arquivo de configuração dos relatórios do mocha
  
### __Services__
Services são classe contendo funções que retornam requests pré-estabelecidas de cada um dos endpoints, sendo responsável apenas por devolver o conteúdo produzido pela request. Essas funções podem ter parâmetros ou não.

Exemplo:

``` ts
export class UsersService {

  async getUserById(_id: string) {
    const response = await chai
      .request(config.environment.url)
      .get(`/usuarios/${_id}`)
      .set('Content-Type', 'application/json');
    return response;
  }
}
```

Este trecho de código exibe a classe `UsersService` com a função `getUserById` que recebe um parâmetro `_id`.

Foi utilizado o `chai-http` para criar a estrutura do request, para saber mais sobre seu uso acesse: https://www.chaijs.com/plugins/chai-http/

### __Factory__

Factory é um padrão criacional onde se utiliza funções ou métodos para gerar objetos de forma independente, sem o uso de classes concretas

Exemplo:

```ts
const faker = require('faker');

const UserFactory = {

    createUser(){

        let firstName: string = faker.name.firstName();
        let lastName: string = faker.name.lastName();
        let nome = `${firstName} ${lastName}`
        let email = `${firstName.toLocaleLowerCase()}.${lastName.toLocaleLowerCase()}@email.com`
        let password = faker.internet.password();
        let administrador = 'true'

        return {
            "nome": nome,
            "email": email,
            "password": password,
            "administrador": administrador
        }
    }
}

export default UserFactory;
```

Neste expelo, a função `createUser()` retorna um objeto que não utiliza uma classe concreta, e para utiliza-la basta importar para as classes de teste.

```ts
    //...
    before(async () => {
        user = UserFactory.createUser();
        await postUser(user);
        token = await returnToken(user);
    })
    //...
```

### __Schema__

Para realizar os testes de contrato, usei a lib [Joi](https://joi.dev/api/). Seu uso é muito simples e basicamente criamos uma estrutura para validar se o retorno de uma requisição segue exatamente os modelo criado pelo Joi.

Exemplo da linguagem

```ts
import Joi = require('joi');

const loginSchema = Joi.object({
    message: Joi.string().required(),
    authorization: [Joi.string(),Joi.number()]
})

module.exports = { loginSchema };
```

Dentro dos testes basta importar o Joi e criar uma validação usando o `Joi.assert()` 

```ts
const schema = require('../schema/Login-schema');

//any code


it('Login Success', async ()=>{       
    response = await postLogin(user);
    expect(response.statusCode).to.eq(200);
    expect(response.body.message).to.eq('Login realizado com sucesso');  
    Joi.assert(response.body, schema.loginSchema);
})
```