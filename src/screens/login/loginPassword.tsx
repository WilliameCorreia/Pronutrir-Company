import React, { useRef, useState, useContext } from 'react';
import {
    Text,
    View,
    Pressable,
    TextInput,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    TouchableOpacity,
    Platform,
} from 'react-native';

import _styles from './style';
import { useThemeAwareObject } from '../../hooks/useThemedStyles';
import BackButton from '../../components/buttons/backButton';
import { Formik } from 'formik';
import * as Yup from 'yup';
import BtnNext from '../../components/buttons/btnNext';
import { StackNavigation } from '../../routes/stack.routes';
import AuthContext from '../../contexts/auth';
import { useNavigation } from '@react-navigation/native';
/* import Loading from '../../components/Loading/Loading';
import Btnprosseguir from '../../components/buttons/Btnprosseguir';
import BackButton from '../../components/buttons/BackButton';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AuthContext from '../../contexts/auth';
import VisaoPassword from '../../componentes/visaoPassword';
import Notification from '../../componentes/Notification';
import NotificationGlobalContext from '../../contexts/notificationGlobalContext'; */
export default function LoginPassword() {

    const { setsigned } = useContext(AuthContext);

    const styles = useThemeAwareObject(_styles);
    const navigation = useNavigation<StackNavigation>();

    /* const { addAlert } = useContext(NotificationGlobalContext);
    const { stateAuth, dispatchAuth } = useContext(AuthContext); */
    /* const { usertasy } = stateAuth; */
    const [loadingActive, setLoadingActive] = useState(false);
    const [showPassword, setShowPassword] = useState(true);
    const [modalNotification, setModalNotification] = useState({
        active: false,
        message: '',
        type: '',
    });

    const Senha = useRef(null);

    // consulta o cpf do cliente na api tasy
    /* async function getCpf(cpf) {
        return Api.get(`PessoaFisica/buscaCpfEmail?cpf=${cpf}`).then(
            (response) => {
                const { result } = response.data;
                return result;
            },
        );
    } */

    /* const consultaFirebase = async (cpf) => {
        const usersRef = firestore().collection('users');
        let dados = null;

        const cpfExiste = await usersRef.where('cpf', '==', cpf).get();

        if (cpfExiste.size !== 0) {
            cpfExiste.docs.forEach((item) => {
                dados = item.data();
            });
            return dados;
        } else {
            return null;
        }
    }; */

    /* const updateEmailFirebase = async (email, cd_firebase) => {
        var user = auth().currentUser;
        const usersRef = firestore().collection('users');

        const upEmail = await user.updateEmail(email);

        const result = await usersRef.doc(cd_firebase.token).set({
            nome: cd_firebase.nome,
            cpf: cd_firebase.cpf.replace(/[.-]/g, ''),
            email: email,
            token: cd_firebase.token,
            nM_USUARIO: 'WebApp',
        });
    }; */

    /* const autenticar = async (email, password) => {
        return auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                return true;
            });
    }; */

    /*  const autenticacao = async (password) => {
         setLoadingActive(true);
         try {
             const cd_firestone = await consultaFirebase(
                 usertasy.nR_CPF.replace(/[.-]/g, ''),
             );
 
             if (usertasy.dS_EMAIL === cd_firestone.email) {
                 const authFirebase = await autenticar(
                     cd_firestone.email,
                     password,
                 );
             } else {
                 await autenticar(cd_firestone.email, password);
                 if (usertasy?.dS_EMAIL) {
                     await updateEmailFirebase(usertasy.dS_EMAIL, cd_firestone);
                 }
             }
         } catch (error) {
             const { code, message } = error;
             if (code) {
                 switch (code) {
                     case 'auth/invalid-email':
                         addAlert({
                             message: 'Formato Inválido de E-mail!',
                             status: 'error',
                         });
                         break;
                     case 'auth/user-not-found':
                         addAlert({
                             message: 'Usuário não encontrado!',
                             status: 'error',
                         });
                         break;
                     case 'auth/wrong-password':
                         addAlert({
                             message: 'A senha é inválida!',
                             status: 'error',
                         });
                         break;
                     case 'auth/network-request-failed':
                         addAlert({
                             message: 'Verifique sua conexão com a Internet!',
                             status: 'error',
                         });
                         break;
                     case 'auth/too-many-requests':
                         addAlert({
                             message: 'Aguarde!, muitas tentativas de acesso!',
                             status: 'error',
                         });
                         break;
                     case 'auth/email-already-in-use':
                         addAlert({
                             message: 'Email já está sendo utilizado!',
                             status: 'error',
                         });
                         break;
                     default:
                         addAlert({ message: error.code, status: 'error' });
                         break;
                 }
             } else {
                 switch (message) {
                     default:
                         addAlert({ message: error.message, status: 'error' });
                         break;
                 }
             }
             setLoadingActive(false);
         }
     }; */

    const FormSchema = Yup.object().shape({
        Senha: Yup.string()
            .required('Senha é obrigatório!')
            .min(
                6,
                ({ min }) => `A senha deve ter pelo menos ${min} caracteres`,
            ),
    });

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
            <ImageBackground
                style={styles.BackgroundImage}
                source={require('../../../assets/images/LogoPronutrirBackground.png')}>
                <View style={{ marginTop: 20 }}>
                    <BackButton onPress={() => navigation.goBack()} />
                </View>
                <Formik
                    initialValues={{
                        Senha: '',
                    }}
                    onSubmit={(values) => {
                        /* autenticacao(values.Senha); */
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
                                    <Text style={styles.textInfo}>
                                        Digite sua senha
                                    </Text>
                                    <Text style={styles.text}>
                                        Informe os dados para validar seu acesso
                                        !
                                    </Text>
                                    <View style={styles.sectionInput}>
                                        <TextInput
                                            ref={Senha}
                                            style={styles.input}
                                            onChangeText={handleChange('Senha')}
                                            onBlur={handleBlur('Senha')}
                                            value={values.Senha}
                                            secureTextEntry={showPassword}
                                            autoCapitalize={'none'}
                                        />
                                        {/* <VisaoPassword
                                            active={showPassword}
                                            setActive={setShowPassword}
                                        /> */}
                                    </View>
                                    {touched.Senha && errors.Senha && (
                                        <Text style={styles.Error}>
                                            {errors.Senha}
                                        </Text>
                                    )}
                                    <TouchableOpacity
                                        style={styles.btnRecovery}
                                        /* onPress={() =>
                                            navigation.navigate(
                                                'RecuperarSenha',
                                            )
                                        } */>
                                        <Text style={styles.text}>
                                            Recuperar senha
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.box2}>
                                    <BtnNext
                                        valueText="Prosseguir"
                                        onPress={() => /* handleSubmit() */ setsigned(true)}
                                    />
                                </View>
                            </KeyboardAvoidingView>
                        </View>
                    )}
                </Formik>
                {/* <Loading activeModal={loadingActive} />
                <Notification
                    active={modalNotification.active}
                    setActive={setModalNotification}
                    type={modalNotification.type}
                    message={modalNotification.message}
                /> */}
            </ImageBackground>
        </Pressable>
    );
}
