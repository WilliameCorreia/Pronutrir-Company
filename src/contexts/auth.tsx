import React, { createContext, useState } from "react";

export interface AuthContextData {
    signed: boolean;
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setsigned: React.Dispatch<React.SetStateAction<boolean>>
    /* stateAuth: LoginState; */
    /* dispatchAuth: React.Dispatch<LoginAction>; */
    /* getPerfis(nomeUsuario: string): UseQueryResult<IPerfis[], Error>; */
    /* ValidationAutorizeEvolucao: () => boolean; */
    /* useGetFetchQuery<T extends Record<keyof T, unknown>>(
      key: string,
    ): T | undefined; */
    /* ConsultaCpfRg: (
      cpf?: string,
      rg?: string,
    ) => Promise<IPessoaFisica | undefined>; */
}

const AuthContext = createContext({} as AuthContextData);

type Props = {
    children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }: Props) => {

    const [loading, setLoading] = useState(true);
    const [signed, setsigned] = useState(false);

    const authData = {
        signed: signed,
        loading: loading,
        setLoading: setLoading,
        setsigned: setsigned
    };

    setTimeout(() => {
        setLoading(false);
    }, 3000);

    return (
        <AuthContext.Provider
            value={authData}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext