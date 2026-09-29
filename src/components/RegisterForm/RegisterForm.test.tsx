import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { RegisterForm } from './RegisterForm';
import { api } from '../../services/api';
import { apiMock } from '../../test/mock/apiMock';
import { beforeEach, describe, expect, it } from 'vitest';

describe('RegisterForm', () => {
    beforeEach(() => {
        apiMock.reset();
    });

    it('should render the form fields', () => {
        render(<RegisterForm />);

        expect(screen.getByLabelText('Nome', { exact: true })).toBeInTheDocument();
        expect(screen.getByLabelText('E-mail', { exact: true })).toBeInTheDocument();
        expect(screen.getByLabelText('Senha', { exact: true })).toBeInTheDocument();
        expect(
            screen.getByLabelText('Confirmar senha', { exact: true }),
        ).toBeInTheDocument();
        expect(
            screen.getByRole('button', { name: /criar conta/i }),
        ).toBeInTheDocument();
    });

    it('should allow the user to fill the form', async () => {
        const user = userEvent.setup();

        render(<RegisterForm />);

        await user.type(
            screen.getByLabelText('Nome', { exact: true }),
            'João Batista',
        );

        await user.type(
            screen.getByLabelText('E-mail', { exact: true }),
            'joao@email.com',
        );

        await user.type(
            screen.getByLabelText('Senha', { exact: true }),
            'Senha123',
        );

        await user.type(
            screen.getByLabelText('Confirmar senha', { exact: true }),
            'Senha123',
        );

        expect(screen.getByLabelText('Nome', { exact: true })).toHaveValue(
            'João Batista',
        );

        expect(screen.getByLabelText('E-mail', { exact: true })).toHaveValue(
            'joao@email.com',
        );

        expect(screen.getByLabelText('Senha', { exact: true })).toHaveValue(
            'Senha123',
        );

        expect(
            screen.getByLabelText('Confirmar senha', { exact: true }),
        ).toHaveValue('Senha123');
    });

    it('should display an error when the email is invalid', async () => {
        const user = userEvent.setup();

        render(<RegisterForm />);

        await user.type(
            screen.getByLabelText('E-mail', { exact: true }),
            'email-invalido',
        );

        await user.tab();

        expect(
            await screen.findByText('Digite um e-mail válido'),
        ).toBeInTheDocument();
    });

    it('should display an error when the password is too short', async () => {
        const user = userEvent.setup();

        render(<RegisterForm />);

        await user.type(
            screen.getByLabelText('Senha', { exact: true }),
            'Senha1',
        );

        await user.tab();

        expect(
            await screen.findByText('Senha deve ter pelo menos 8 caracteres'),
        ).toBeInTheDocument();
    });

    it('should display an error when passwords do not match', async () => {
        const user = userEvent.setup();

        render(<RegisterForm />);

        await user.type(
            screen.getByLabelText('Senha', { exact: true }),
            'Senha123',
        );

        await user.type(
            screen.getByLabelText('Confirmar senha', { exact: true }),
            'Senha456',
        );

        await user.tab();

        expect(
            await screen.findByText('As senhas devem ser iguais'),
        ).toBeInTheDocument();
    });

    it('should submit the form with valid data', async () => {
        const user = userEvent.setup();

        apiMock.onPost('/register').reply(200, {
            message: 'Cadastro realizado com sucesso',
        });

        render(
            <RegisterForm
                onSubmit={async (values) => {
                    await api.post('/register', values);
                }}
            />,
        );

        await user.type(
            screen.getByLabelText('Nome', { exact: true }),
            'João Batista',
        );

        await user.type(
            screen.getByLabelText('E-mail', { exact: true }),
            'joao@email.com',
        );

        await user.type(
            screen.getByLabelText('Senha', { exact: true }),
            'Senha123',
        );

        await user.type(
            screen.getByLabelText('Confirmar senha', { exact: true }),
            'Senha123',
        );

        await user.click(
            screen.getByRole('button', { name: /criar conta/i }),
        );

        await waitFor(() => {
            expect(apiMock.history.post).toHaveLength(1);
        });

        expect(apiMock.history.post[0].url).toBe('/register');

        expect(JSON.parse(apiMock.history.post[0].data)).toEqual({
            name: 'João Batista',
            email: 'joao@email.com',
            password: 'Senha123',
            confirmPassword: 'Senha123',
        });
    });

    it('should disable the submit button while submitting', async () => {
        const user = userEvent.setup();

        let resolveSubmit!: () => void;

        const submitPromise = new Promise<void>((resolve) => {
            resolveSubmit = resolve;
        });

        render(
            <RegisterForm
                onSubmit={() => submitPromise}
            />,
        );

        await user.type(
            screen.getByLabelText('Nome', { exact: true }),
            'João Batista',
        );

        await user.type(
            screen.getByLabelText('E-mail', { exact: true }),
            'joao@email.com',
        );

        await user.type(
            screen.getByLabelText('Senha', { exact: true }),
            'Senha123',
        );

        await user.type(
            screen.getByLabelText('Confirmar senha', { exact: true }),
            'Senha123',
        );

        const submitButton = screen.getByRole('button', {
            name: /criar conta/i,
        });

        await user.click(submitButton);

        expect(
            screen.getByRole('button', {
                name: /criando conta/i,
            }),
        ).toBeDisabled();

        resolveSubmit();

        await waitFor(() => {
            expect(
                screen.getByRole('button', {
                    name: /criar conta/i,
                }),
            ).not.toBeDisabled();
        });
    });
});