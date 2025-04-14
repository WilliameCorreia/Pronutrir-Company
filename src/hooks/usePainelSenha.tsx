import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../services/api';
import { useContext } from 'react';
/* import NotificationGlobalContext from '../contexts/notificationGlobalContext'; */
export interface PropsGerarSenha {
  nR_SEQ_FILA_P: number;
  cD_ESTABELECIMENTO_P: number;
  nM_USUARIO_P: string;
  iE_SENHA_PRIORITARIA_P?: string;
  cD_PESSOA_FISICA_P?: string;
}

export interface PropsGerarSenhaResponse extends PropsGerarSenha {
  cD_SENHA_GERADA: number;
  nR_SEQ_SENHA_P: string;
  dS_LETRA_VERIFICACAO: string;
  dT_GERACAO_SENHA: string;
  dS_FILA: string;
  dS_CURTO: string;
}

export interface PropsFilaEsperaAtendimentos {
  nR_SEQUENCIA: number;
  cD_ESTABELECIMENTO: number;
  nM_USUARIO: string;
  dS_FILA: string;
  dS_CURTO: string;
  dS_LETRA_VERIFICACAO: string;
  iE_SITUACAO: string;
  nR_DIGITO_FILA: number;
  iE_PERMITE_CHAMADA: string;
  iE_MOSTRA_MONITOR: string;
}

export interface PropsPacientFilaEspera {
  cD_SENHA_GERADA: number;
  dT_GERACAO_SENHA: string;
  nR_SEQUENCIA: number;
  nR_CPF: string;
  cD_PESSOA_FISICA: string;
  nM_PESSOA_FISICA: string;
  nM_USUARIO: string;
  cD_ESTABELECIMENTO: number;
  nR_SEQ_FILA_SENHA: number;
  nR_SEQ_FILA_SENHA_ORIGEM: number;
  dS_LETRA_VERIFICACAO: string;
  dS_FILA: string;
  dS_CURTO: string;
}

export interface PropsInutilizarSenha {
  CD_SENHA_P: number;

  CD_FILA_P: number;

  NR_SEQ_SENHA_P: number;

  NM_USUARIO_P: string;

  NR_SEQ_MOTIVO_INUTILIZACAO_P: number;

  CD_ESTABELECIMENTO: number;
}

const useGerarSenhaPainel = () => {
  return useMutation({
    mutationFn: async (props: PropsGerarSenha) => {
      const result = (
        await api.post<PropsGerarSenhaResponse>(
          'PainelChamada/GerarSenhaPainel',
          props,
        )
      ).data;
      return result;
    },
    onSuccess: (data) => {
      // Código a ser executado em caso de sucesso
      console.log('Senha gerada com sucesso:', data);
    },
    onError: (error) => {
      // Código a ser executado em caso de erro
      console.error('Erro ao gerar senha:', error);
    }
  });
};

const useGetFilas = (CD_ESTABELECIMENTO: number, IE_SITUACAO: string) => {
  return useQuery({
    queryKey: ['useGetFilas', CD_ESTABELECIMENTO, IE_SITUACAO],
    queryFn: async () => {
      const result = (
        await api.get<PropsFilaEsperaAtendimentos[]>(
          `v1/PainelChamada/GetListFilaEsperaAtendimento?CD_ESTABELECIMENTO=${CD_ESTABELECIMENTO}&IE_SITUACAO=${IE_SITUACAO}`,
        )
      ).data;
      return result
        .filter(item => item.iE_MOSTRA_MONITOR === 'S')
        .sort((a, b) => a.nR_DIGITO_FILA - b.nR_DIGITO_FILA);
    },
    staleTime: 60000, // 1 minuto
    enabled: Boolean(CD_ESTABELECIMENTO), // Só executa se CD_ESTABELECIMENTO for válido
    retry: 2,
  });
};

const useGetListPacientFilaEspera = (CD_ESTABELECIMENTO: number) => {
  return useQuery({
    queryKey: ['useGetListPacientFilaEspera', CD_ESTABELECIMENTO],
    queryFn: async () => {
      const result = (
        await api.get<PropsPacientFilaEspera[]>(
          `PainelChamada/GetListPacientQueueWaiting?PAGENUMBER=1&ROWSOFPAGE=100`,
        )
      ).data;
      return result;
    },
    staleTime: 1 * 60000, // 30 minuto
    enabled: Boolean(CD_ESTABELECIMENTO), // Só executa se CD_ESTABELECIMENTO for válido
    retry: 2,
  });
}

const useInutilizarSenha = () => {
  /* const { addAlert } = useContext(NotificationGlobalContext); */
  return useMutation({
    mutationFn: async (item: PropsInutilizarSenha) => {
      const result = (
        await api.post('PainelChamada/DisableSenha', item)
      ).data;
      return result;
    },
    onSuccess: () => {
      // Código a ser executado em caso de sucesso
      /* addAlert({
        message: 'Senha inutilizada com sucesso!',
        status : 'sucess',
      }); */
    },
    onError: () => {
      // Código a ser executado em caso de erro
      /* addAlert({
        message: 'Error ao inutilizar a senha tente mais tarde!',
        status: 'error',
      }); */
    }
  });
}

export {
  useGerarSenhaPainel,
  useGetFilas,
  useGetListPacientFilaEspera,
  useInutilizarSenha,
};
