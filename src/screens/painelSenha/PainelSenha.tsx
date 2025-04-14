import { StyleSheet, View } from 'react-native';
import React, { useContext, useRef, useState } from 'react';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import { ThemeContextData } from '../../contexts/themeContext';
import { RFPercentage } from 'react-native-responsive-fontsize';
import AuthContext from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
import SenhaSvg from '../../../assets/svg/senha.svg';
import PrintBluetoothContext from '../../contexts/printBluetoothContext';
import { useGerarSenhaPainel, useGetFilas } from '../../hooks/usePainelSenha';
import BtnDashboardComponent from '../../components/buttons/btnDashboard';
import CicleButton from '../../components/buttons/circleButton';
import PrintSVG from '../../../assets/svg/printer.svg';
import { StackNavigationDashboard } from '../../routes/stack.routes';

const PainelSenha = () => {

  /* const {
    stateAuth: { PerfilSelected },
  } = useContext(AuthContext); */

  const { validationBluetooth, pairedDevices } = useContext(
    PrintBluetoothContext,
  );

  validationBluetooth();

  console.log('pairedDevices', pairedDevices);

  const navigation = useNavigation<StackNavigationDashboard>();

  const styles = useThemeAwareObject(createStyles);
  /* const refModalOptionsSenhaPainel = useRef<ModalHandles>(null);
  const loadingRef = useRef<LoadHandles>(null); */

  const [message, setMessage] = useState<string>('');
  /* const [itemSelected, setItemSelected] =
    useState<PropsFilaEsperaAtendimentos | null>(null); */

  const { mutateAsync } = useGerarSenhaPainel();

  const { data } = useGetFilas(7, 'A');

  console.log('data', data);

  /* const gerarSenha = async () => {
    if (itemSelected) {
      loadingRef.current?.openModal();
      try {
        const result = await mutateAsync({
          cD_ESTABELECIMENTO_P  : itemSelected.cD_ESTABELECIMENTO,
          nM_USUARIO_P          : PerfilSelected?.nM_USUARIO ?? 'appMobile',
          nR_SEQ_FILA_P         : itemSelected.nR_SEQUENCIA,
          iE_SENHA_PRIORITARIA_P: 'N',
        });
        loadingRef.current?.closeModal();
        await printSenha(result);
      } catch (error) {
        loadingRef.current?.closeModal();
      }
    }
  }; */

  /* const onClickCard = async (item: PropsFilaEsperaAtendimentos) => {
    const validation = await validationBluetooth();
    if (validation) {
      setItemSelected(item);
      refModalOptionsSenhaPainel.current?.openModal();
      setMessage(`Deseja gerar senha para ${item.dS_CURTO.toLowerCase()} ?`);
    }
  }; */

  return (
    <View style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: RFPercentage(9),
          position: 'absolute',
          top: 0,
        }}>
        <CicleButton
          onPress={() => navigation.navigate('PrintBluetooth')}
          icon={<PrintSVG width={25} height={25}/>}
        />
        <CicleButton
          onPress={() => navigation.navigate('PainelSenhaOptions')}
          icon={<SenhaSvg width={25} height={25}/>}
        />
        {/* <BtnRadius
          onPress={() => navigation.navigate('PrintBluetooth')}
          containerStyles={{
            position: 'absolute',
            top: 0,
            right: 0,
            backgroundColor: bleOpend ? 'green' : 'red',
          }}
          ImageSvg={PrinterSvg}
        /> */}
        {/* <BtnRadius
          onPress={() => navigation.navigate('PainelSenhaOptions')}
          containerStyles={{
            position: 'absolute',
            top: 0,
            left: 0,
            margin: 1,
          }}
          ImageSvg={SenhaSvg}
        /> */}
      </View>
      {data ? (
        <View style={styles.box2}>
          {data.map((item, index) => (
            <BtnDashboardComponent
              key={index}
              disabled={false}
              //onpress={() => onClickCard(item)}
              onpress={() => console.log('teste')}
              ImgSVG={SenhaSvg}
              label={item.dS_CURTO}
            />
          ))}
        </View>
      ) : (
        <View style={styles.box2}>
          {/* {Array.from(Array(6).fill(0), (_, index) => {
            return (
              <ShimerPlaceHolderSelected
                key            = {index}
                containerStyle = {{
                  height: RFPercentage(20),
                  width : RFPercentage(20),
                }}
              />
            );
          })} */}
        </View>
      )}

      {/* <ModalCentralizedOptions
        ref={refModalOptionsSenhaPainel}
        message={message}
        onpress={gerarSenha}
      /> */}
      {/* <Loading ref={loadingRef} /> */}
    </View>
  );
};

export default PainelSenha;

const createStyles = (theme: ThemeContextData) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.buttonBackground,
    },
    contentContainer: {
      flexGrow: 1,
      justifyContent: 'center',
    },
    box2: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      flexWrap: 'wrap',
    },
    card: {
      flex: 1,
      width: RFPercentage(40),
      height: RFPercentage(20),
      marginVertical: RFPercentage(3),
      alignItems: 'stretch',
    },
    PressableRippleStyle: {
      flex: 1,
      justifyContent: 'center',
      borderRadius: 10,
    },
    text: {
      fontFamily: theme.typography.FONTES.Bold,
      letterSpacing: theme.typography.LETTERSPACING.S,
      color: theme.colors.text_primary,
      fontSize: theme.typography.SIZE.fontysize18,
      textAlign: 'center',
      fontWeight: 'bold',
    },
  });
  return styles;
};
