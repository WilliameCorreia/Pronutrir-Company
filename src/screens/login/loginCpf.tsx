import React, { useState, useRef, useContext } from 'react';
import {
  Text,
  View,
  ImageBackground,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import styles from './style';
import CicleButton from '../../components/buttons/circleButton';
/* import Api from '../../services/api'; */
/* import { valicacaoCPF } from '../../services/validacaoCpf';
import Loading from '../../components/Loading/Loading';
import AuthContext from '../../contexts/auth'; */
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Pressable } from 'react-native';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
/* import Notification from '../../componentes/Notification';
import NotificationGlobalContext from '../../contexts/notificationGlobalContext'; */
import _styles from './style';
import BtnNext from '../../components/buttons/btnNext';
import { StackNavigation } from '../../routes/stack.routes';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import Api from '../../services/api';
import { valicacaoCPF } from '../../services/validacaoCpf';
import AuthContext from '../../contexts/auth';
import Loading, { LoadHandles } from '../../components/Loading/Loading';
import { collection, getDoc, getFirestore, query, where, getDocs } from "firebase/firestore"; 
import { app } from '../../firebaseConfig';

export default function LoginCpf() {
  //const { addAlert, addNotification } = useContext(NotificationGlobalContext);
  const { stateAuth, dispatchAuth } = useContext(AuthContext);

  const styles = useThemeAwareObject(_styles);
  const navigation = useNavigation<StackNavigation>();

  const loadingRef = useRef<LoadHandles>(null);

  const [modalNotification, setModalNotification] = useState({
    active: false,
    message: '',
    type: '',
  });

  const CPF = useRef(null);

  // consulta o cpf do cliente na api tasy
  async function getCpf(cpf: string) {
    return Api.get(`v1/PessoaFisica/buscaCpfEmail?cpf=${cpf}`).then(response => {
      const { result } = response.data;
      return result;
    });
  }

  const consultaFirebase = async (cpf: string, email: string) => {
    try {
      const db = getFirestore(app);
      
      // Cria a consulta para verificar documentos onde o campo cpf é igual ao cpf fornecido
      const q = query(collection(db, 'users'), where('cpf', '==', cpf));
      
      // Executa a consulta e obtém os documentos
      const querySnapshot = await getDocs(q);
      
      // Verifica se a consulta retornou algum documento
      return !querySnapshot.empty;
    } catch (error) {
      console.error("Erro ao consultar o Firestore:", error);
      return false;
    }
  };

  const validacaoUsuario = async (CPF: string) => {
    let _Cpf = CPF.replace(/[.-]/g, '');
    loadingRef.current?.openModal();

    try {
      let firebaseExiste = null;

      // consulta o cpf do cliente na api tasy
      const dadosTasy = await getCpf(_Cpf);

      if (!dadosTasy) {
        loadingRef.current?.closeModal();
        /* addAlert({
          message: 'Usuário não encontrado!',
          status: 'error',
        }); */
        return;
      }

      if (dadosTasy && dadosTasy.iE_FUNCIONARIO === 'S') {
        //guarda os dados do cliente no reducer
        dispatchAuth({ type: 'setUserTasy', payload: dadosTasy });

        // consulta se o usuario tem cadastro no firebase
        firebaseExiste = await consultaFirebase(
          dadosTasy.nR_CPF,
          dadosTasy.dS_EMAIL,
        );

        if (firebaseExiste) {
          navigation.navigate('LoginPassword');
        } else {
          //navigation.navigate('ConsultaNome');
        }
      } else {
        loadingRef.current?.closeModal();
        /* addAlert({
          message: 'Acesso disponível somente para funcionários!',
          status: 'error',
        }); */
      }
    } catch (error) {
      loadingRef.current?.closeModal();
      
      if (error instanceof Error) {
        const { message } = error;
        if (message) {
          setModalNotification(prevState => {
            return {
              ...prevState,
              active: true,
              message: message,
              type: 'error',
            };
          });
        }
      } else {
        setModalNotification(prevState => {
          return {
            ...prevState,
            active: true,
            message: 'An unknown error occurred',
            type: 'error',
          };
        });
      }
    } finally {
      loadingRef.current?.closeModal();
    }
  };

  const FormSchema = Yup.object().shape({
    CPF: Yup.string()
      .required('CPF é obrigatório!')
      .test(
        'validationCpf',
        'CPF inválido',
        value => Boolean(value) && valicacaoCPF(value.replace(/[.-]/g, '')),
      ),
  });

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <ImageBackground
        style={styles.BackgroundImage}
        source={require('../../../assets/images/LogoPronutrirBackground.png')}>
        <View style={{ marginTop: 20 }}>
          <CicleButton onPress={() => navigation.goBack()} />
        </View>
        <Formik
          initialValues={{
            CPF: '',
          }}
          onSubmit={(values) => {
            validacaoUsuario(values.CPF);
          }}
          validationSchema={FormSchema}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
          }) => (
            <View style={{ flex: 1 }}>
              <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
                keyboardVerticalOffset={
                  Platform.OS === 'ios' ? 105 : 0
                }>
                <View style={styles.box1}>
                  <Text style={styles.textInfo}>Informe seu CPF</Text>
                  <Text style={styles.text}>Informe os dados para validar seu acesso!</Text>
                  <View style={styles.sectionInput}>
                    <TextInputMask
                      ref={CPF}
                      style={styles.input}
                      type={`cpf`}
                      value={values.CPF}
                      onChangeText={handleChange('CPF')}
                      onBlur={handleBlur('CPF')}
                    />
                    {touched.CPF && errors.CPF && (
                      <Text style={styles.Error}>{errors.CPF}</Text>
                    )}
                  </View>
                </View>
                <View style={styles.box2}>
                  <Button
                    title="Prosseguir"
                    variant="primary"
                    size="large"
                    shape="pill"
                    onPress={() => handleSubmit()}
                    style={{ width: '50%' }}
                    textStyle={{ fontSize: 25 }}
                    elevated
                  />
                </View>
              </KeyboardAvoidingView>
            </View>
          )}
        </Formik>
        <Loading ref={loadingRef} />
        {/* <Notification
                    active={modalNotification.active}
                    setActive={setModalNotification}
                    type={modalNotification.type}
                    message={modalNotification.message}
                /> */}
      </ImageBackground>
    </Pressable>
  );
}
