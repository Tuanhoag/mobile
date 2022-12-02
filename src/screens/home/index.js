import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StatusBar, Text, View, Image} from 'react-native';
import MilkTeaItem from '../../components/MilkTeaItem';
import data from '../../data/milkteas.json';
import data1 from '../../data/news.json';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  const [user, setuser] = useState(null);
  const renderItem = ({ item, index }) => {
    return <MilkTeaItem item={item} index={index} navigation={navigation} />;
  };
  const getUserData = async () => {
    let curUser = await AsyncStorage.getItem('curUser');
    curUser = JSON.parse(curUser);
    setuser(curUser);
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <ScrollView
      style={{
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        marginTop: StatusBar.currentHeight + 10,
      }}
    >
      <Text style={{ marginTop: 20, fontSize: 22 }}>{`Chào, ${
        user && user.name
      }!`}</Text>
      <View
        style={{
          backgroundColor: '#67E5CE',
          padding: 20,
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            GIẢM
          </Text>
          <Text
            style={{
              color: '#000',
              fontWeight: 'bold',
              fontSize: 24,
            }}
          >
            {' 50% '}
          </Text>
          <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>
            CHO NGƯỜI MỚI
          </Text>
        </View>
        <Text
          style={{
            color: '#fff',
            fontWeight: 'bold',
            fontSize: 10,
            marginTop: 30,
          }}
        >
          SỰ DỤNG CODE NÀY
        </Text>
        <Text
          style={{
            color: '#000',
            fontWeight: 'bold',
            fontSize: 24,
          }}
        >
          SIUU
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Đồ uống HOT</Text>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={true}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.title}>Mới</Text>
        <FlatList
          data={data1}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => item + index}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
}
