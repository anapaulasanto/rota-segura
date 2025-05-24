import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const FormLogin = ({ submitFunction, error }) => {
    const schema = yup.object({
        email: yup.string().email("Digite um email válido").required("Email é obrigatório"),
        password: yup.string().required("Senha é obrigatória"),
    }).required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    console.log(errors);

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <form
                onSubmit={handleSubmit(submitFunction)}
                className="flex flex-col items-start justify-center h-3/4 py-8 px-10 gap-4 text-neutral-500 w-full "
            >
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

                <button
                    type="submit"
                    className='bg-central text-white rounded-full px-5 py-3 mb-10 shadow-md w-full mx-auto mt-6 shadow-neutral-400 cursor-pointer hover:bg-central/70 hover:border-neutral-300 transition-all duration-200 ease-in-out max-sm:py-4 text-xl'
                >Entrar
                </button>
            </form>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    )
};

export default FormLogin;
