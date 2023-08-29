import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
import {Formik} from 'formik';
import React, {useState, useContext, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
// import { observer } from 'mobx-react-lite';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import CustomInput from '../../component/custominput/CustomInput';
import KeyboardAvoidingWrapper from '../../component/KeyBoardAvoiding/keyBoardAvoiding';
import Buttons from '../../component/buttons/Buttons';
import Input from '../../component/inputField/input.component';
import Loader from '../../component/loader/loader';
import Button from '../../component/buttons/Button';
import COLORS from '../../constants/colors';
import {auth} from '../../util/firebase/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from 'firebase/auth';
// import {StoreContext} from '../../config/mobX stores/RootStore';
// import {auth} from '../../config/firebase/firebase';
// import useAuth from '../../config/hooks/useAuth';

// const { StatusBarManager } = NativeModules;
const image = {
  // uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20220217151648/download3.png',
};

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;
const Login = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  // const {authStore} = useContext(StoreContext);
  // const {success, error, sending} = authStore;
  const [userMail, setUserMail] = useState(null);
  const [error, setError] = useState('');
  const [errors, setErrors] = React.useState({});
  // const {user} = useAuth();

  const [userDetails, setUserDetails] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    setUserDetails({
      email: userMail && userMail === null ? '' : userMail,
      password: '',
    });
  }, [userMail]);

  const disableit = !userDetails.email || !userDetails.password;

  const handleLogin = async () => {
    // authStore.handleLogin(userDetails);

    const {email, password} = userDetails;
    // await signOut();
    // await signInWithEmailAndPassword(auth, email, password)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
    // await firebase
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  };

  const validate = async () => {
    // Keyboard.dismiss();
    let isValid = true;
    if (!userDetails.email) {
      handleError('Please input email', 'email');
      isValid = false;
    } else if (!userDetails.email.match(/\S+@\S+\.\S+/)) {
      handleError('Please input a valid email', 'email');
      isValid = false;
    }

    if (!userDetails.password) {
      handleError('Please input password', 'password');
      isValid = false;
    } else if (userDetails.password.length < 5) {
      handleError('Min password length of 5', 'password');
      isValid = false;
    }
    if (isValid) {
      // console.log(userDetails);
      // login();
      handleLogin();
    }
  };

  const handleOnchange = (text, input) => {
    setUserDetails(prevState => ({...prevState, [input]: text}));
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#f4f4f4',
        paddingTop: insets.top !== 0 ? insets.top : 'auto',
        paddingBottom: insets.bottom !== 0 ? insets.bottom : 'auto',
        paddingLeft: insets.left !== 0 ? insets.left : 'auto',
        paddingRight: insets.right !== 0 ? insets.right : 'auto',
      }}>
      <Loader visible={false} />
      {false && (
        <Spinner
          textContent={'Logging in...'}
          textStyle={{color: 'white'}}
          visible={true}
          overlayColor="rgba(16, 17, 17, 0.7)"
          animation="slide"
        />
      )}
      <ImageBackground
        source={require('../../../assets/login.png')}
        resizeMode="stretch"
        style={styles.image}>
        <ScrollView
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={{paddingHorizontal: 20}}>
          <KeyboardAvoidingWrapper>
            <View style={{marginBottom: 40}}>
              <View style={{alignItems: 'center'}}>
                <View>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../../../assets/images/HeadLogo.png')}
                    />
                  </View>
                  <Text style={[styles.signupText, {marginBottom: 40}]}>
                    Log In
                  </Text>
                </View>
              </View>
              <View
                style={{
                  paddingTop: 25,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 15,
                  paddingHorizontal: 15,
                  paddingVertical: 15,
                  opacity: 0.86,
                  borderColor: '#D9DBE9',
                  borderWidth: 2,
                }}>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  onSubmit={values => {
                    values = {...values};
                    if (values.email === '' || values.password === '') {
                      // setError('Fill all fields');
                    } else {
                    }
                  }}>
                  {({handleChange, handleBlur}) => (
                    <View>
                      <Input
                        onChangeText={text =>
                          handleOnchange(text.trim(), 'email')
                        }
                        onFocus={() => handleError(null, 'email')}
                        iconName="email-outline"
                        label="Email"
                        placeholder="Enter your email address"
                        error={errors.email}
                        autoCorrect={false}
                        autoCapitalize="none"
                        defaultValue={userMail}
                        isNeeded={true}
                      />
                      <Input
                        onChangeText={text => handleOnchange(text, 'password')}
                        onFocus={() => handleError(null, 'password')}
                        iconName="lock-outline"
                        label="Password"
                        placeholder="Enter your password"
                        error={errors.password}
                        password
                        autoCorrect={false}
                        autoCapitalize="none"
                        isNeeded={true}
                      />
                    </View>
                  )}
                </Formik>
                {error === '' ? <></> : <Text>{error}</Text>}

                <View style={styles.termsRow}>
                  <View style={{marginLeft: 15}}>
                    <View style={{flexDirection: 'row'}}>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('ForgotPassword')}>
                        <Text
                          style={{
                            // color: '#0566C3',
                            color: COLORS.lendaBlue,
                            fontFamily: 'Montserat',
                            fontSize: 16,
                          }}>
                          Forgot password?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <Button
                  title="Log In"
                  onPress={validate}
                  // disabled={disableit}
                />

                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 19,
                    }}>
                    <Text style={styles.checkText}>
                      Don't have an account?{' '}
                    </Text>
                    <Text
                      style={{
                        color: COLORS.lendaBlue,
                        fontFamily: 'Montserat',
                        fontSize: 16,
                      }}>
                      Sign up
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingWrapper>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: 20,
    // backgroundColor: '#f4f4f4',
    // paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
  },

  signupText: {
    fontWeight: '700',
    fontSize: 36,
    letterSpacing: 3.5,
    fontFamily: 'Montserat',
    paddingTop: 22,
    lineHeight: 54,
  },
  DetailsText: {
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Montserat',
  },
  phonetextContainer: {
    borderRadius: 8,
    marginVertical: 10,
    paddingVertical: 0,
    height: 30,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 1,
  },
  phoneContainer: {
    backgroundColor: '#fffff',
    width: '100%',
    borderWidth: 0.5,
    borderRadius: 8,
    borderColor: '#CED4DA',
    marginTop: 16,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phonetext: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#14142B',
  },
  label: {
    paddingBottom: 4,
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#14142B',
    fontFamily: 'Montserat',
  },
  signUp: {
    backgroundColor: '#054B99',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBox: {
    height: 20,
    width: 20,
    borderWidth: 1,

    borderRadius: 5,
  },
  termsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 22,
    marginTop: 10,
  },
  checkText: {
    fontSize: 16,
    fontWeight: '400',
    color: '#14142B',
    lineHeight: 21,
    fontFamily: 'Montserat',
    marginLeft: 10,
  },
  signUpactivity: {
    backgroundColor: '#054B99',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: 'center',
  },
});
