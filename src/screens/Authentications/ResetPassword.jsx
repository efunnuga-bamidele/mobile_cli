import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

import CustomInput from '../../component/custominput/CustomInput';
import KeyboardAvoidingWrapper from '../../component/KeyBoardAvoiding/keyBoardAvoiding';

const ResetPassword = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        paddingTop: insets.top !== 0 ? insets.top : 'auto',
        paddingBottom: insets.bottom !== 0 ? insets.bottom : 'auto',
        paddingLeft: insets.left !== 0 ? insets.left : 'auto',
        paddingRight: insets.right !== 0 ? insets.right : 'auto',
      }}>
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingWrapper>
          <View style={{marginBottom: 40}}>
            <View style={{alignItems: 'center'}}>
              <View style={{paddingLeft: 3}}>
                <Image
                  source={require('../../../assets/images/HeadLogo.png')}
                  style={{width: 83, height: 32}}
                />
              </View>
            </View>
            <View style={styles.signupView}>
              <Image source={require('../../../assets/images/unlocked.png')} />
              <Text style={styles.signupText}>Reset Password</Text>
              <View>
                <Text style={styles.extraText}>Setup your new password</Text>
              </View>
            </View>
            <View style={styles.demark} />
            <View>
              <CustomInput
                label="Password"
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                secureTextEntry={hidePassword}
              />

              <CustomInput
                label="Confirm Password"
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
                secureTextEntry={hidePassword}
              />

              <TouchableOpacity
                style={styles.signUp}
                onPress={() => navigation.navigate('Login')}>
                <Text
                  style={{
                    fontWeight: '500',
                    color: '#fff',

                    fontSize: 18,
                    lineHeight: 24,
                  }}>
                  Save Changes
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingWrapper>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingHorizontal: 20,
    // backgroundColor: '#fff',
  },
  demark: {
    width: '97%',
    height: 2,
    borderRadius: 1,
    backgroundColor: '#D9DBE9',
    marginTop: 16,
  },
  signupView: {
    marginTop: 30,
    // backgroundColor:'red',
    alignItems: 'center',
  },
  signupText: {
    fontWeight: '700',
    fontSize: 32,
    // letterSpacing: 3.5,

    paddingTop: 16,
    lineHeight: 48,
    color: '#14142B',
    // marginLeft:-2.5
  },
  extraText: {
    textAlign: 'center',

    size: 14,
    lineHeight: 21,
    color: '#000000',
    paddingHorizontal: 15,
  },

  signUp: {
    backgroundColor: '#054B99',
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 28,
  },
});
