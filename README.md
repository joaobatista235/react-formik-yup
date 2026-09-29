# React Testing na Prática

Aplicação de cadastro de usuários construída com React e TypeScript. O formulário usa Formik para gerenciar seu estado e Yup para validar nome, e-mail, senha e confirmação de senha. Os testes exercitam a interface e simulam a integração HTTP sem depender de um serviço externo.

## Tecnologias

- React e TypeScript, com Vite para desenvolvimento e build;
- Formik e Yup para estado e validação do formulário;
- Vitest e React Testing Library para execução e renderização dos testes;
- `user-event` para simular interações do usuário;
- `jest-dom` para assertions sobre elementos da interface;
- Axios e `axios-mock-adapter` para simular a chamada de cadastro;
- jsdom como ambiente de navegador dos testes.

## Instalação

Pré-requisitos: Node.js compatível com Vite 8 e npm.

```bash
npm install
```

## Executando o projeto

```bash
npm run dev
```

Abra no navegador o endereço local informado pelo Vite. Os comandos `npm run build`, `npm run lint` e `npm run preview` verificam/geram o build, analisam o código e servem o build localmente, respectivamente.

## Executando os testes

Execute os testes uma vez, como em CI:

```bash
npm run test:run
```

Para deixar o Vitest em modo interativo durante o desenvolvimento:

```bash
npm test
```

## Estrutura dos testes

```text
src/
├── components/
│   └── RegisterForm/
│       └── RegisterForm.test.tsx  # Testes de interface e comportamento
├── services/
│   └── api.ts                     # Cliente Axios usado no cadastro
└── test/
	├── mock/
	│   └── apiMock.ts             # Mock de requisições Axios
	└── setup.ts                   # Matchers do jest-dom para Vitest
```

O Vitest usa `jsdom` e carrega `src/test/setup.ts`, conforme a configuração em `vite.config.ts`. O adaptador Axios é reiniciado antes de cada teste para manter os cenários independentes.

## Cenários testados

- Renderização dos campos e do botão de cadastro;
- Preenchimento dos campos com interação do usuário;
- Mensagem de erro para e-mail inválido;
- Mensagem de erro para senha com menos de oito caracteres;
- Mensagem de erro quando as senhas não coincidem;
- Envio de dados válidos para `POST /register`, verificando URL e payload;
- Botão desabilitado e com estado “Criando conta...” enquanto o envio está pendente.

A chamada HTTP é simulada pelo `axios-mock-adapter`; nenhum servidor externo é necessário para os testes.