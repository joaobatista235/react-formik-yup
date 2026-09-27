# Cadastro de usuários

Aplicação de demonstração de um formulário de cadastro desenvolvido com React, TypeScript, Formik e Yup. O projeto apresenta validação dos campos e feedback visual para erros, sem persistência de dados ou integração com um serviço externo.

## Problema

Formulários precisam manter os valores digitados, acompanhar interação do usuário e impedir o envio de dados inválidos. Implementar esses comportamentos manualmente em cada campo pode espalhar a lógica e tornar a validação difícil de manter.

Este projeto concentra o estado e o ciclo de vida do formulário no Formik e define as regras de validação em um schema Yup. O formulário coleta nome, e-mail, senha e confirmação de senha.

## Por que Formik

Formik gerencia o estado e o comportamento do formulário React. Neste projeto, `useFormik` fornece:

- `values`: valores atuais dos quatro campos;
- `handleChange` e `handleBlur`: atualização dos valores e registro da interação;
- `touched` e `errors`: controle de quando e quais mensagens de validação são exibidas;
- `handleSubmit` e `isSubmitting`: fluxo de envio e estado de carregamento do botão.

Isso mantém a lógica de interação dos campos consistente e evita criar manualmente estado separado para cada valor, erro e estado de envio.

## Por que Yup

Yup descreve as regras de validação em um schema declarativo, separado da marcação do componente. O Formik recebe esse schema por meio da opção `validationSchema` e usa seus resultados para preencher `errors`.

As regras atuais são:

| Campo | Regras |
| --- | --- |
| Nome | Obrigatório; mínimo de 3 caracteres |
| E-mail | Obrigatório; formato de e-mail válido |
| Senha | Obrigatória; mínimo de 8 caracteres, uma letra maiúscula e um número |
| Confirmação de senha | Obrigatória; deve ser igual à senha |

## Fluxo do formulário

1. O componente inicializa os campos vazios em `initialValues`.
2. Formik conecta os campos aos valores e acompanha alterações e perda de foco.
3. O schema Yup valida os valores; mensagens aparecem para campos tocados que tenham erros.
4. Ao enviar, Formik executa a validação antes de chamar `onSubmit`.
5. Durante o envio simulado, o botão fica desabilitado e exibe “Criando conta...”.
6. Após 1,5 segundo, o exemplo registra mensagens no console e encerra o estado de envio.

O envio é apenas demonstrativo: não há chamada HTTP, criação real de conta nem armazenamento de dados. Para produção, conecte `onSubmit` a uma API e não registre senhas ou outros dados sensíveis no console.

## Estrutura

```text
.
├── public/                         # Arquivos estáticos
├── src/
│   ├── components/
│   │   └── RegisterForm/
│   │       ├── RegisterForm.tsx    # Componente e integração com Formik
│   │       └── RegisterForm.css    # Estilos do formulário
│   ├── schemas/
│   │   └── registerSchema.ts       # Regras de validação Yup
│   ├── types/
│   │   └── RegisterForm.ts         # Tipo dos dados do formulário
│   ├── App.tsx                     # Composição da aplicação
│   ├── index.css                   # Estilos globais e layout
│   └── main.tsx                    # Ponto de entrada React
├── index.html
├── package.json                   # Dependências e scripts npm
├── tsconfig*.json                 # Configuração TypeScript
└── vite.config.ts                 # Configuração Vite
```

## Como executar

Pré-requisitos: Node.js compatível com Vite 8 e npm.

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir no navegador.

Scripts disponíveis:

```bash
npm run lint   # Verifica o código com ESLint
npm run build  # Verifica os tipos TypeScript e gera o build de produção
npm run preview # Serve localmente o build gerado
```