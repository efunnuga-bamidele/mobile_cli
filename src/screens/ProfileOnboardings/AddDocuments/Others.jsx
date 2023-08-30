import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import CustomInput from '../../../component/custominput/CustomInput';
import Buttons from '../../../component/buttons/Buttons';
import { ScrollView } from 'react-native-gesture-handler';
import { StoreContext } from '../../../config/mobX stores/RootStore';
import { observer } from 'mobx-react-lite';

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

const Others = ({ route }) => {
  const docsDetails = route?.params?.paramKey;

  const [userDocs, setUserDocs] = useState({
    validIdentificationType: '',
    validIdentification: '',
    utilityBill: '',
    bankStatement: '',
    passport: '',
    signature: '',
    seal: '',
    cac: '',
    othersName: '',
    others: '',
  });

  useEffect(() => {
    setUserDocs({
      validIdentificationType:
        docsDetails?.validIdentificationType === undefined
          ? ''
          : docsDetails?.validIdentificationType,
      validIdentification:
        docsDetails?.validIdentification === undefined ? '' : docsDetails?.validIdentification,
      utilityBill: docsDetails?.utilityBill === undefined ? '' : docsDetails?.utilityBill,
      bankStatement: docsDetails?.bankStatement === undefined ? '' : docsDetails?.bankStatement,
      passport: docsDetails?.passport === undefined ? '' : docsDetails?.passport,
      signature: docsDetails?.signature === undefined ? '' : docsDetails?.signature,
      seal: docsDetails?.seal === undefined ? '' : docsDetails?.seal,
      cac: docsDetails?.cac === undefined ? '' : docsDetails?.cac,
      othersName: docsDetails?.othersName === undefined ? '' : docsDetails?.othersName,
      others: docsDetails?.others === undefined ? '' : docsDetails?.others,
    });
  }, [docsDetails]);

  const activeTab = 'Others';
  const navigation = useNavigation();
  const [selectedDocument, setSelectedDocument] = useState(null);

  const { loansStore } = useContext(StoreContext);
  const { success, othersSus, uploadProgress, fileString } = loansStore;

  const disableit = !userDocs.othersName || !selectedDocument;

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});

    setSelectedDocument(result);
    setFile({ name: result?.name, type: result?.mimeType, uri: result?.uri });
  };

  const [fileUri, setFile] = useState({
    name: '',
    type: '',
    uri: '',
  });

  const s3UploadFunction = () => {
    loansStore.createUploadDocument(fileUri, 'signature');
  };

  useEffect(() => {
    if (success === 'upload successful') {
      setUserDocs((deetss) => {
        return {
          ...deetss,
          others: `${fileString}`,
        };
      });
    }
  }, [fileString, success]);

  useEffect(() => {
    if (othersSus === 'othersscs') {
      setTimeout(() => {
        navigation.navigate('SubmitDocs', { paramKey: userDocs });
      }, 1000);
    }
  }, [navigation, othersSus, userDocs]);

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
        <Text style={styles.header}>Upload Other Details</Text>
      </View>
      <View style={styles.innercontainer}>
        <FlatList
          data={TobTabs}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          initialScrollIndex={7}
          getItemLayout={(data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
        />
      </View>

      <ScrollView style={styles.innercontainer} showsVerticalScrollIndicator={false}>
        <CustomInput
          label="Document Name"
          value={userDocs.othersName}
          onChangeText={(text) => setUserDocs({ ...userDocs, othersName: text })}
          autoCorrect={false}
        />

        <View style={styles.reqField}>
          {selectedDocument ? (
            <View>
              <Text style={{}}>{selectedDocument.name}</Text>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={{ backgroundColor: '#24348B', padding: 10, borderRadius: 5 }}
                onPress={pickDocument}
              >
                <Entypo name="upload-to-cloud" size={30} color="#FCFCFC" />
              </TouchableOpacity>
              <Text style={{}}>Browse Files</Text>
              <Text style={{}}>File format: JPG, JPEG, PNG | Max File Size 3mb</Text>
            </>
          )}
        </View>

        <TouchableOpacity onPress={s3UploadFunction} disabled={disableit} style={{ marginTop: 20 }}>
          <Buttons label={'Submit'} disabled={disableit} />
        </TouchableOpacity>
        {uploadProgress > 0 && (
          <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <Text>{uploadProgress}% complete</Text>
          </View>
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginVertical: 16,
          marginHorizontal: 16,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <View style={[styles.tobTab, { backgroundColor: '#054B99' }]}>
            <Text style={[styles.tabText, { color: 'white' }]}>Prev.</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SubmitDocs', { paramKey: userDocs })}>
          <View style={[styles.tobTab, { backgroundColor: '#054B99' }]}>
            <Text style={[styles.tabText, { color: 'white' }]}>Skip</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default observer(Others);
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
  activeTabText: {
    color: 'white',
  },
  activeTab: {
    backgroundColor: '#054B99',
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
  reqField: {
    paddingHorizontal: 10,
    // borderWidth: 0.3,
    borderColor: '#D9D8E9',
    borderRadius: 12,
    marginTop: 10,
    height: 235,
    backgroundColor: '#F7F7FC',
    justifyContent: 'center',
    alignItems: 'center',

    overflow: 'hidden',
  },
});
