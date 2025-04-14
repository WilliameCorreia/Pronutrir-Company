import React, { createContext, useCallback, useEffect, useReducer, useState } from "react";
import ApiAuth from "../services/apiAuth";
import Api from "../services/api";
import ApiNotify from "../services/apiNotify";
import { getPerfil, getUnidade, saveRefreshToken } from "../services/utils";
import { initialState, LoginAction, LoginState, UserReducer, UserTasy } from "../reducers/UserReducer";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, getFirestore, query, where, getDocs } from "firebase/firestore";
import { app, auth } from "../firebaseConfig";

interface TokenResponse {
  id: number;
  username: string;
  dataRegistro: string;
  dataAtualizacao: string;
  dataHoraValidado: string;
  dataExpira: string;
  ativo: true;
  jwtToken: string;
  integraApi: boolean;
  refreshToken: string;
}

export interface IPessoaFisica {
  cD_PESSOA_FISICA: string;
  iE_TIPO_PESSOA: number;
  iE_FUNCIONARIO: string;
  nM_PESSOA_FISICA: string;
  nR_CPF: string;
  dT_ATUALIZACAO: string;
  dT_CADASTRO_ORIGINAL: string;
  nR_DDD_CELULAR: string;
  nR_TELEFONE_CELULAR: string;
  dT_NASCIMENTO: string;
  nM_USUARIO: string;
  nM_USUARIO_ORIGINAL: string;
  nR_PRONTUARIO: number;
  nR_IDENTIDADE: string;
}

interface IResponsePessoaFisica {
  result: IPessoaFisica;
}
export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setsigned: React.Dispatch<React.SetStateAction<boolean>>
  stateAuth: LoginState;
  dispatchAuth: React.Dispatch<LoginAction>;
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

  const [stateAuth, dispatchAuth] = useReducer(UserReducer, initialState);
  const [usuario, setUsuario] = useState<{ email: string | null, uid: string } | null>(null);

  const [loading, setLoading] = useState(true);
  const [signed, setsigned] = useState(false);

  //consulta e retorna o token para acesso a api tasy
  const GetAuth = useCallback(async () => {
    return ApiAuth.get<TokenResponse>('auth/authToken')
      .then(response => {
        const { jwtToken, refreshToken } = response.data;
        Api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
        ApiNotify.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
        saveRefreshToken(refreshToken);
        return jwtToken;
      })
      .catch(error => {
        console.log('Error token', error);
      });
  }, []);

  //consulta e retorna o usuário da api tasy
  const ConsultaCpfTasy = async (cpf: string) => {
    return Api.get(`v1/PessoaFisica/buscaCpfEmail?cpf=${cpf}`).then(response => {
      const { result } = response.data;
      if (result) {
        dispatchAuth({
          type: 'setUserTasy',
          payload: result,
        });
        return result;
      } else {
        return null;
      }
    });
  };

  //consulta pessoa fisica pelo rg || cpf
  const ConsultaCpfRg = async (cpf?: string, rg?: string) => {
    try {
      if (cpf || rg) {
        const { result } = (
          await Api.get<IResponsePessoaFisica>(
            `PessoaFisica/FilterCPFRG?${cpf ? `cpf=${cpf.replace(/[.-]/g, '')}` : ''
            }${rg ? `rg=${rg}` : ''}`,
          )
        ).data;
        return result;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const consultaFirebase = async (token: string) => {
    const db = getFirestore(app);
  
  // Cria a consulta para verificar documentos onde o campo cpf é igual ao cpf fornecido
  const q = query(collection(db, 'users'), where('token', '==', token));
  
  // Executa a consulta e obtém os documentos
  const querySnapshot = await getDocs(q);

  // Check if we have any matching documents
  if (querySnapshot.empty) {
    return null;
  }
  
  // Return the first matching document's data
  const doc = querySnapshot.docs[0];
  debugger;
  return doc.data();
};

  const getPerfilUnidadeUser = async (cD_PESSOA_FISICA: string) => {
    const resultUnidade = await getUnidade();
    const resultPerfil = await getPerfil();
    if (resultPerfil?.cD_PESSOA_FISICA === cD_PESSOA_FISICA) {
      dispatchAuth({ type: 'setUnidade', payload: resultUnidade });
      dispatchAuth({ type: 'setPerfilApp', payload: resultPerfil });
    } else {
      dispatchAuth({ type: 'setUnidade', payload: null });
      dispatchAuth({ type: 'setPerfilApp', payload: null });
    }
  };

  // metodo principal de validacão de acesso!
  const singIn = useCallback(async (userAuth: User | null) => {
    debugger;
    setTimeout(async () => {
      try {
        if (userAuth) {
          const { email, uid }:User = userAuth;

          //armazena os dados da api Firebase
          dispatchAuth({
            type: 'setUser',
            payload: { email: email, token: uid },
          });

          //pega os dados atualizados do firestone
          const getFireStone = await consultaFirebase(uid);

          if (getFireStone != null) {
            // armazena || atualiza os dados do usuário do tasy
            const result: UserTasy = await ConsultaCpfTasy(getFireStone?.cpf);

            //verificar perfil usuário cache
            await getPerfilUnidadeUser(result.cD_PESSOA_FISICA);

            if (result) {
              //informa que há usuário logado
              setUsuario({ email: email, uid: uid });
              setLoading(false);
              setsigned(true);
            }
            //registra o dispositivo no onesignal inclui um id externo para notificações!
            //OneSignal.setExternalUserId(result.cD_PESSOA_FISICA);
            //Adiciona uma tag para diferenciar as aplicações mobile
            //OneSignal.sendTag('NameApp', 'pronutrirCompany');
          }
        } else {
          setLoading(false);
          setUsuario(null);
        }
      } catch (error) {
        setLoading(false);
      }
    }, 3000);
  }, []);

  const authData = {
    signed: signed,
    loading: loading,
    setLoading: setLoading,
    setsigned: setsigned,
    stateAuth: stateAuth,
    dispatchAuth: dispatchAuth,
  };

  /* setTimeout(() => {
    setLoading(false);
  }, 3000); */

  useEffect(() => {
    (async () => {
      const token = await GetAuth();
      if (token) {
        onAuthStateChanged(auth, (user) => {
          singIn(user);  
        });
      }
    })();
  }, [singIn]);

  return (
    <AuthContext.Provider
      value={authData}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext