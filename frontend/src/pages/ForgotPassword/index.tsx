import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content, AnimationContainer, Background } from './styles';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface ForgotPasswordFormData {
    email: string;
    password: string;
}

const ForgotPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const handleSubmit = useCallback(
        async (data: ForgotPasswordFormData) => {
            try {
                formRef.current?.setErrors({});

                const schema = Yup.object().shape({
                    email: Yup.string()
                        .required('E-mail obrigatório')
                        .email('Digite um e-mail válido'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                // await ForgotPassword({
                //     email: data.email,
                // });

                // history.push('/dashboard');
            } catch (err) {
                if (err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);
                    formRef.current?.setErrors(errors);
                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro na recuperação de senha',
                    description:
                        'Erro durante a tentativa de recuperar a senha.',
                });
            }
        },
        [addToast],
    );

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logoImg} alt="GoBarber" />

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recuperar Senha</h1>

                        <Input
                            name="email"
                            icon={FiMail}
                            placeholder="E-mail"
                        />

                        <Button type="submit">Entrar </Button>
                    </Form>
                    <Link to="/">
                        <FiLogIn />
                        Voltar ao login
                    </Link>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    );
};

export default ForgotPassword;
