import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';

import CustomInput from '../../../component/custominput/CustomInput';
import Buttons from '../../../component/buttons/Buttons';

const ITEM_HEIGHT = 100;
const TobTabs = [
  { name: 'Valid Identity', key: 'ValidIndentity' },
  { name: 'Proof of Address', key: 'ProofOfAddress' },
  { name: 'Bank Statement', key: 'BankStatement' },
  { name: 'Passport', key: 'Passport' },
  { name: 'Signature', key: 'Signature' },
  { name: 'Company Seals', key: 'CompanySeals' },
  { name: 'CAC', key: 'CAC' },
  { name: 'Others', key: 'Others' },
  { name: 'Submit All', key: 'SubmitDocs' },
];

const ValidIdentity = () => {
  const [formDetails, setFormDetails] = useState({
    validIdentificationType: '',
    validIdentification: '',
  });

  const disableit = !formDetails.validIdentification || !formDetails.validIdentificationType;

  const activeTab = 'ValidIndentity';
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    const isActive = item.key === activeTab;

    return (
      <View>
        <View style={[styles.tobTab, isActive && styles.activeTab]}>
          <Text style={[styles.tabText, isActive && styles.activeTabText]}>{item.name}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 15,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View
            style={{
              borderWidth: 0.5,
              borderColor: '#D9DBE9',
              borderRadius: 5,
            }}
          >
            <AntDesign name="left" size={24} color="black" />
          </View>
        </TouchableOpacity>
        <View style={styles.HeadView}>
          <View style={styles.TopView}>
            <Text style={styles.TextHead}>UPLOAD DOCUMENT</Text>
          </View>
        </View>
        <View>
          <Text> </Text>
        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.header}>Upload Valid Identity</Text>
      </View>

      <View style={styles.innercontainer}>
        <FlatList
          data={TobTabs}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={0}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>

      <View style={{ padding: 20 }}>
        <View style={{ marginVertical: 10 }}>
          <Text
            style={{
              paddingBottom: 4,
              fontWeight: '400',
              fontSize: 16,
              lineHeight: 24,
              color: '#14142B',
              fontFamily: 'Montserat',
            }}
          >
            ID Type
          </Text>
          <View style={{ borderWidth: 0.5, borderRadius: 8, borderColor: '#CED4DA' }}>
            <Picker
              selectedValue={formDetails.validIdentificationType}
              onValueChange={(text) =>
                setFormDetails({ ...formDetails, validIdentificationType: text })
              }
            >
              <Picker.Item label="Select ID Type" value="" />
              <Picker.Item label="National ID" value="National ID" />
              <Picker.Item label="Drivers License" value="Drivers License" />
              <Picker.Item label="International Passport" value="International Passport" />
              <Picker.Item label="Voters Card" value="Voters Card" />
            </Picker>
          </View>
        </View>

        <View>
          <CustomInput
            label="ID Number"
            value={formDetails.validIdentification}
            onChangeText={(text) => setFormDetails({ ...formDetails, validIdentification: text })}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
      </View>

      <View
        style={{
          marginVertical: 16,
          marginHorizontal: 16,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ProofOfAddress', { paramKey: formDetails });
          }}
          disabled={disableit}
        >
          <Buttons label={'Save & Continue'} disabled={disableit} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ValidIdentity;

const styles = StyleSheet.create({
  innercontainer: {
    marginTop: 16,
    marginHorizontal: 19,
  },
  tobTab: {
    borderWidth: 1,
    borderColor: '#D9DBE9',
    borderRadius: 5,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 2,
  },
  activeTabText: {
    color: 'white',
  },
  activeTab: {
    backgroundColor: '#054B99',
  },
  tabText: {
    fontFamily: 'Montserat',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  tabText2: {
    fontFamily: 'MontSBold',
    fontSize: 12,
    textAlign: 'center',
  },
  TextHead: {
    fontFamily: 'Montserat',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.4,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    alignItems: 'center',
    marginVertical: 16,
  },
  header: {
    fontFamily: 'Montserat',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
    color: '#14142B',
  },
  tabBar: {
    backgroundColor: '#fff',
    marginTop: 20,
    borderWidth: 0,
  },
  indicator: {
    backgroundColor: '#054B99',
  },
  label: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Montserat',
  },
  camHead: {
    fontFamily: 'Montserat',
    fontSize: 14,
    fontWeight: '400',
  },
});
