import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const FormSignUp = ({ submitFunction, error }) => {
    const schema = yup.object({
        name: yup.string().required("Nome é obrigatório"),
        email: yup.string().email("Digite um email válido").required("Email é obrigatório"),
        password: yup.string().required("Senha é obrigatória"),
        passwordConfirm: yup.string().required("Senha é obrigatória").oneOf([yup.ref('password')], "As senhas devem ser iguais")
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    console.log(errors);    

    return (
        <div className="flex flex-col items-center justify-center w-5/6">
            <form
                onSubmit={handleSubmit(submitFunction)}
                className="flex flex-col items-start justify-center py-8 px-10 gap-2 text-neutral-500 w-full"
            >
                <label className="flex items-center invalid:border-pink-500">Nome </label>
                <input
                    type="text"
                    className="border border-neutral-500 rounded-full w-full py-3 px-3"
                    placeholder="Digite o seu nome"
                    {...register("name", { required: true })}
                />
                <p className="text-red-700 mx-auto">{errors.name?.message}</p>

                <label className="flex items-center gap-1 invalid:border-pink-500">Email </label>
                <input
                    type="email"
                    className="border border-neutral-500 rounded-full w-full py-3 px-3"
                    placeholder="Digite o seu email"
                    {...register("email")}
                />
                <p className="text-red-700 mx-auto">{errors.email?.message}</p>

                <label className="flex items-center gap-1">Senha</label>
                <input
                    type="password"
                    className="border border-neutral-500 rounded-full w-full py-3 px-3 "
                    placeholder="Digite sua senha"
                    {...register("password")}
                />
                <p className="text-red-700 mx-auto">{errors.password?.message}</p>

                <label className="flex items-center gap-1">Confirme a senha</label>
                <input
                    type="password"
                    className="border border-neutral-500 rounded-full w-full py-3 px-3 "
                    placeholder="Confirme sua senha"
                    {...register("passwordConfirm")}
                />
                <p className="text-red-700 mx-auto">{errors.passwordConfirm?.message}</p>

                <button
                    type="submit"
                    className='bg-central rounded-full px-5 py-3 shadow-md w-2/4 mx-auto my-6 shadow-neutral-400 cursor-pointer hover:bg-central/70 hover:border-neutral-300 transition-all duration-200 ease-in-out'

                >Cadastrar
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <p className="tracking-widest text-neutral-700">Já possui conta? <Link to="/rota-segura/login"><span className="text-central underline decoration-central">Faça o login</span></Link></p>
        </div>
    )
};

export default FormSignUp;
