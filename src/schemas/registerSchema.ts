import * as Yup from 'yup';

export const registerSchema = Yup.object({
  name: Yup.string()
    .required('Nome é obrigatório')
    .min(3, 'Nome deve ter pelo menos 3 caracteres'),

  email: Yup.string()
    .required('E-mail é obrigatório')
    .email('Digite um e-mail válido'),

  password: Yup.string()
    .required('Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .matches(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .matches(/[0-9]/, 'Senha deve conter pelo menos um número'),

  confirmPassword: Yup.string()
    .required('Confirmação de senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
});