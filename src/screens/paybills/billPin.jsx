import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useState, useRef, useEffect, useContext} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import Buttons from '../../component/buttons/Buttons';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  purchaseAirtime,
  purchaseDataPlan,
  purchaseElectricity,
  renewSubscription,
  updateSubscription,
} from '../../stores/BillStore';
import appsFlyer from 'react-native-appsflyer';
import Loader from '../../component/loader/loader';
import { Header } from '../../component/header/Header';

const BillPin = ({route}) => {
  const {airtimeDetails, acctNumber, selectedPackageData} = route.params;
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const firstInput = useRef();
  const secondInput = useRef();
  const thirdInput = useRef();
  const fourthInput = useRef();
  const [otp, setOtp] = useState({f: '', s: '', t: '', fo: ''});
  const disableit = !otp.f || !otp.s || !otp.t || !otp.fo;

  const [pinString, setPinString] = useState('');
  useEffect(() => {
    setPinString(`${otp.f + otp.s + otp.t + otp.fo}`);
  }, [otp]);

  const details = {
    serviceType: airtimeDetails.network,
    amount: Number(airtimeDetails.amount),
    phone: airtimeDetails.number,
    transactionPin: pinString,
  };
  const dataDetails = {
    serviceType: airtimeDetails.network,
    amount: Number(airtimeDetails.amount),
    phone: airtimeDetails.number,
    transactionPin: pinString,
    DataCode: airtimeDetails.package,
  };

  const powerDetails = {
    serviceType: airtimeDetails.network,
    amount: Number(airtimeDetails.amount),
    phone: airtimeDetails.number,
    transactionPin: pinString,
    meterNumber: airtimeDetails.meter,
  };
  const cableDetails = {
    serviceType: airtimeDetails.network,
    amount: Number(airtimeDetails.amount),
    phone: airtimeDetails.number,
    transactionPin: pinString,
    variationCode: airtimeDetails.variationCode,
    cardNumber: airtimeDetails.cardNumber,
  };

  const logAppsFlyer = (event, serviceType, phone, value) => {
    const eventName = event;
    const eventValues = {
      service_type: serviceType,
      contact: phone,
      currency: 'NGN',
      revenue: value,
    };

    appsFlyer.logEvent(
      eventName,
      eventValues,
      res => {
        // console.log(res);
      },
      err => {
        // console.error(err);
      },
    );
  };

  const createPayment = async () => {
    if (airtimeDetails.service === 'airtime purchase') {
      try {
        setIsLoading(true);
        const res = await purchaseAirtime(details);
        if (res?.error || res?.data?.error) {
          Toast.show({
            type: 'error',
            position: 'top',
            topOffset: 50,
            text1: res?.title,
            text2: res?.data?.message ? res?.data?.message : res?.message,
            visibilityTime: 5000,
            autoHide: true,
            onPress: () => Toast.hide(),
          });
          setTimeout(() => {
            navigation.navigate('StatusFailed');
          }, 1000);
        } else {
          logAppsFlyer('bill_purchase', details?.serviceType, details?.phone, details?.amount);
          Toast.show({
            type: 'success',
            position: 'top',
            topOffset: 50,
            text1: res?.title,
            text2: res?.message,
            visibilityTime: 3000,
            autoHide: true,
            onPress: () => Toast.hide(),
          });
          setTimeout(() => {
            navigation.navigate('StatusSuc');
          }, 1000);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }

    if (airtimeDetails.service === 'data purchase') {
      try {
        setIsLoading(true);
        const res = await purchaseDataPlan(dataDetails);
        if (res?.error || res?.data?.error) {
          Toast.show({
            type: 'error',
            position: 'top',
            topOffset: 50,
            text1: res?.title,
            text2: res?.data?.message ? res?.data?.message : res?.message,
            visibilityTime: 5000,
            autoHide: true,
            onPress: () => Toast.hide(),
          });
          setTimeout(() => {
            navigation.navigate('StatusFailed');
          }, 1000);
        } else {
          logAppsFlyer('bill_purchase', dataDetails?.serviceType, dataDetails?.phone, dataDetails?.amount);
          Toast.show({
            type: 'success',
            position: 'top',
            topOffset: 50,
            text1: res?.title,
            text2: res?.message,
            visibilityTime: 3000,
            autoHide: true,
            onPress: () => Toast.hide(),
          });
          setTimeout(() => {
            navigation.navigate('StatusSuc');
          }, 1000);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }

    if (airtimeDetails.service === 'electricity purchase') {
      try {
        setIsLoading(true);
        const res = await purchaseElectricity(powerDetails);
        if (res?.error || res?.data?.error) {
          Toast.show({
            type: 'error',
            position: 'top',
            topOffset: 50,
            text1: res?.title,
            text2: res?.data?.message ? res?.data?.message : res?.message,
            visibilityTime: 5000,
            autoHide: true,
            onPress: () => Toast.hide(),
          });
          setTimeout(() => {
            navigation.navigate('StatusFailed');
          }, 1000);
        } else {
          logAppsFlyer('bill_purchase', powerDetails?.serviceType, powerDetails?.phone, powerDetails?.amount);
          Toast.show({
            type: 'success',
            position: 'top',
            topOffset: 50,
            text1: res?.title,
            text2: res?.message,
            visibilityTime: 3000,
            autoHide: true,
            onPress: () => Toast.hide(),
          });
          setTimeout(() => {
            navigation.navigate('StatusSuc');
          }, 1000);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }

    if (airtimeDetails.service === 'cable_tv purchase') {
      try {
        setIsLoading(true);
        let res;
        if (airtimeDetails.status == 'update') {
          res = await updateSubscription(cableDetails);
        } else {
          res = await renewSubscription(cableDetails);
        }
        if (res?.error || res?.data?.error) {
          Toast.show({
            type: 'error',
            position: 'top',
            topOffset: 50,
            text1: res?.title,
            text2: res?.data?.message ? res?.data?.message : res?.message,
            visibilityTime: 5000,
            autoHide: true,
            onPress: () => Toast.hide(),
          });
          setTimeout(() => {
            navigation.navigate('StatusFailed');
          }, 1000);
        } else {
          logAppsFlyer('bill_purchase', cableDetails?.serviceType, cableDetails?.phone, cableDetails?.amount);
          Toast.show({
            type: 'success',
            position: 'top',
            topOffset: 50,
            text1: res?.title,
            text2: res?.message,
            visibilityTime: 3000,
            autoHide: true,
            onPress: () => Toast.hide(),
          });
          setTimeout(() => {
            navigation.navigate('StatusSuc');
          }, 1000);
        }
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: insets.top !== 0 ? Math.min(insets.top, 10) : 'auto',
        paddingBottom:
          insets.bottom !== 0 ? Math.min(insets.bottom, 10) : 'auto',
        paddingLeft: insets.left !== 0 ? Math.min(insets.left, 10) : 'auto',
        paddingRight: insets.right !== 0 ? Math.min(insets.right, 10) : 'auto',
      }}>
       <Loader visible={isLoading} loadingText={'Please wait...'} />
       <Header
        routeAction={() => navigation.goBack()}
        heading="TRANSACTION PIN"
        disable={false}
      />
      <ScrollView
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{
          marginHorizontal: 15,
        }}>
        <View
          style={{
            marginHorizontal: 20,
            marginTop: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#14142B', fontSize: 16}}>
            Enter your transaction pin
          </Text>
        </View>
        <View style={styles.pinView}>
          <View style={styles.otpContainer}>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={firstInput}
                onChangeText={text => {
                  setOtp({...otp, f: text});
                  text && secondInput.current.focus();
                }}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={secondInput}
                onChangeText={text => {
                  setOtp({...otp, s: text});
                  text
                    ? thirdInput.current.focus()
                    : firstInput.current.focus();
                }}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={thirdInput}
                onChangeText={text => {
                  setOtp({...otp, t: text});
                  text
                    ? fourthInput.current.focus()
                    : secondInput.current.focus();
                }}
                secureTextEntry={true}
              />
            </View>
            <View style={styles.otpBox}>
              <TextInput
                style={styles.otpText}
                keyboardType="number-pad"
                maxLength={1}
                ref={fourthInput}
                onChangeText={text => {
                  setOtp({...otp, fo: text});
                  !text && thirdInput.current.focus();
                }}
                secureTextEntry={true}
              />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={{marginTop: 40}}
          disabled={disableit}
          onPress={createPayment}>
          <Buttons label={'Submit'} disabled={disableit} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BillPin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  HeadView: {
    alignItems: 'center',
  },
  TopView: {
    justifyContent: 'space-between',
  },
  TextHead: {
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 20,
    letterSpacing: 0.5,
  },
  pinView: {
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderColor: '#D9DBE9',
    borderWidth: 1,
    paddingVertical: 40,
    paddingHorizontal: 16,
    marginTop: 30,
  },
  demark: {
    width: '97%',
    height: 2,
    borderRadius: 1,
    backgroundColor: '#D9DBE9',
    marginBottom: 10,
  },
  otpContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    width: '100%',

    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginVertical: 5,
  },
  otpBox: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#054B99',
  },
  otpText: {
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
  signUp: {
    marginTop: 10,
    backgroundColor: '#054B99',
    width: '95%',
    opacity: 0.5,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  desc: {
    color: '#4E4B66',

    fontWeight: '500',
    fontSize: 14,
  },
  amount: {
    fontFamily: 'serif',
    fontSize: 16,
  },
});
