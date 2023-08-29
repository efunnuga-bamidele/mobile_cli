import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';

import CustomView from './AccountView/CustomView';
import { StoreContext } from '../../config/mobX stores/RootStore';
import Buttons from '../buttons/Buttons';

const Personal = () => {
  const navigation = useNavigation();
  const { authStore } = useContext(StoreContext);
  const { profile } = authStore;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('UpdatePersonalDetails', { paramKey: 'myAccount' })}
        style={{ marginBottom: 20 }}
      >
        <Buttons label={'Update Personal Details'} />
      </TouchableOpacity>

      <ScrollView showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <CustomView
          label={`${profile?.title === undefined ? 'N/A' : profile?.title}`}
          subLabel="Title"
        />

        <CustomView
          label={`${profile?.firstName === undefined ? 'N/A' : profile?.firstName} ${
            profile?.lastName === undefined ? 'N/A' : profile?.lastName
          }`}
          subLabel="Full name"
        />

        <CustomView
          label={`${profile?.email === undefined ? 'N/A' : profile?.email}`}
          subLabel="Email address"
        />

        <CustomView
          label={`${profile?.phoneNumber === undefined ? 'N/A' : profile?.phoneNumber}`}
          subLabel="Phone number"
        />

        <CustomView label={`${profile?.bvn === undefined ? 'N/A' : profile?.bvn}`} subLabel="Bvn" />

        <CustomView
          label={`${profile?.dob === undefined ? 'N/A' : profile?.dob?.substr(0, 10)}`}
          subLabel="Date of birth"
        />

        <CustomView
          label={`${profile?.gender === undefined ? 'N/A' : profile?.gender}`}
          subLabel="Gender"
        />

        <CustomView
          label={`${profile?.eduLevel === undefined ? 'N/A' : profile?.eduLevel}`}
          subLabel="Educational Level"
        />

        <CustomView
          label={`${profile?.address === undefined ? 'N/A' : profile?.address}`}
          subLabel="Address"
        />

        <CustomView
          label={`${profile?.country === undefined ? 'N/A' : profile?.country}`}
          subLabel="Country"
        />

        <CustomView
          label={`${profile?.state === undefined ? 'N/A' : profile?.state}`}
          subLabel="State"
        />

        <CustomView
          label={`${profile?.city === undefined ? 'N/A' : profile?.city}`}
          subLabel="City"
        />

        <CustomView
          label={`${profile?.residentialStatus === undefined ? 'N/A' : profile?.residentialStatus}`}
          subLabel="Residential status"
        />

        <CustomView
          label={`${profile?.maritalStatus === undefined ? 'N/A' : profile?.maritalStatus}`}
          subLabel="Marital status"
        />

        <CustomView
          label={`${profile?.NoOfDependents === undefined ? 'N/A' : profile?.NoOfDependents}`}
          subLabel="No of dependents"
        />
      </ScrollView>
    </View>
  );
};

export default observer(Personal);
const styles = StyleSheet.create({
  container: {
    marginVertical: 28,
    marginHorizontal: 20,
    paddingBottom: 30,
  },
});
