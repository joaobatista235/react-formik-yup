import { useFormik } from 'formik';

import { registerSchema } from '../../schemas/registerSchema';
import type { RegisterFormData } from '../../types/RegisterForm';
import './RegisterForm.css';

export function RegisterForm() {
    const initialValues: RegisterFormData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    };

    const formik = useFormik<RegisterFormData>({
        initialValues,
        validationSchema: registerSchema,
        onSubmit: async (values, { setSubmitting }) => {
            console.log('Enviando:', values);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            console.log('Cadastro realizado!');

            setSubmitting(false);
        },
    });

    return (
        <form className="form" onSubmit={formik.handleSubmit}>
            <div className="field">
                <label className="label" htmlFor="name">Nome</label>

                <input
                    id="name"
                    name="name"
                    type="text"
                    className={`input${formik.touched.name && formik.errors.name ? ' inputError' : ''}`}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.name && formik.errors.name && (
                    <span className="error">{formik.errors.name}</span>
                )}
            </div>

            <div className="field">
                <label className="label" htmlFor="email">E-mail</label>

                <input
                    id="email"
                    name="email"
                    type="email"
                    className={`input${formik.touched.email && formik.errors.email ? ' inputError' : ''}`}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email && (
                    <span className="error">{formik.errors.email}</span>
                )}
            </div>

            <div className="field">
                <label className="label" htmlFor="password">Senha</label>

                <input
                    id="password"
                    name="password"
                    type="password"
                    className={`input${formik.touched.password && formik.errors.password ? ' inputError' : ''}`}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.password && formik.errors.password && (
                    <span className="error">{formik.errors.password}</span>
                )}
            </div>

            <div className="field">
                <label className="label" htmlFor="confirmPassword">Confirmar senha</label>

                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    className={`input${formik.touched.confirmPassword && formik.errors.confirmPassword ? ' inputError' : ''}`}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />

                {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                        <span className="error">{formik.errors.confirmPassword}</span>
                    )}
            </div>

            <button
                className="button"
                type="submit"
                disabled={formik.isSubmitting}
            >
                {formik.isSubmitting ? 'Criando conta...' : 'Criar conta'}
            </button>
        </form>
    );
}