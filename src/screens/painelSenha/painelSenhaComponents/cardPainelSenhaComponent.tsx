import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useRef, memo } from 'react';
import { ThemeContextData } from '../../../contexts/themeContext';
/* import CardSimples from '../../../components/Cards/CardSimples'; */
import PressableRipple from '../../../components/ripple/PressableRipple';
import { useThemeAwareObject } from '../../../hooks/useThemedStyles';
/* import MenuPopUp, {
  ModalHandlesMenu,
} from '../../../components/menuPopUp/menuPopUp'; */
import { RFPercentage } from 'react-native-responsive-fontsize';
import {
  PropsPacientFilaEspera,
  useGetListPacientFilaEspera,
  useInutilizarSenha,
} from '../../../hooks/usePainelSenha';
import SenhaSvg from '../../../assets/svg/senha.svg';
import PrintBluetoothContext from '../../../contexts/printBluetoothContext';
import Loading, { LoadHandles } from '../../../components/Loading/Loading';
import moment from 'moment';
import AuthContext from '../../../contexts/auth';

type Props = {
  item: PropsPacientFilaEspera;
};

const CardPainelSenhaComponent = ({ item }: Props) => {
  const styles = useThemeAwareObject(createStyles);

  /* const refMenuBotom = useRef<ModalHandlesMenu>(null); */
  const loadingRef = useRef<LoadHandles>(null);

  const { stateAuth } = useContext(AuthContext);
  /* const { printSenha } = useContext(PrintBluetoothContext); */
  const { mutateAsync } = useInutilizarSenha();
  /* const { refetch } = useGetListPacientFilaEspera(); */

  const selectOptions = async (label: string) => {
    /* switch (label) {
      case 'Imprimir':
        loadingRef.current?.openModal();
        await printSenha(item, item.nM_PESSOA_FISICA);
        loadingRef.current?.closeModal();
        break;
      case 'Inutlizar':
        {
          loadingRef.current?.openModal();
          await mutateAsync({
            CD_ESTABELECIMENTO: item.cD_ESTABELECIMENTO,
            CD_FILA_P: item.nR_SEQ_FILA_SENHA,
            CD_SENHA_P: item.cD_SENHA_GERADA,
            NM_USUARIO_P:
              stateAuth.PerfilSelected?.nM_USUARIO ?? item.nM_USUARIO,
            NR_SEQ_MOTIVO_INUTILIZACAO_P: 1,
            NR_SEQ_SENHA_P: item.nR_SEQUENCIA,
          });
          loadingRef.current?.closeModal();
          await refetch();
        }
        break;
      default:
        break;
    } */
  };

 return null;
};

export default memo(CardPainelSenhaComponent);

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    box1: {
      flex: 0.5,
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: 3,
    },
    box2: {
      flex: 5,
      justifyContent: 'center',
      alignItems: 'flex-start',
      margin: 3,
    },
    box3: {
      backgroundColor: 'red',
      position: 'absolute',
      right: 0,
    },
    item: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    textLabel: {
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.text_primary,
      fontSize: theme.typography.SIZE.fontysize16,
    },
    text: {
      fontFamily: theme.typography.FONTES.Regular,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.text_primary,
      fontSize: theme.typography.SIZE.fontysize16,
    },
  });
  return styles;
};
