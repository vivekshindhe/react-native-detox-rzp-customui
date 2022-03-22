import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

import Razorpay from 'rzp-rn-customui-test';

const fetchLogos = async(arrayOfBanks)=>{
  console.log('getting here');
  for(let index = 0; index < arrayOfBanks.length; index++){
    let bank = arrayOfBanks[index];
    let logoUrl = await Razorpay.getBankLogoUrl(bank.key);
    arrayOfBanks[index].logo = logoUrl.data;
    console.log(arrayOfBanks[index].logo);
  }
  return arrayOfBanks;
};

const Netbanking: () => Node = () => {
  const [banks, setBanks] = useState([]);
  
  const ItemView = ({item}) => {

    return (
      // Flat List Item
      <View style={{flexDirection:'row'}} >
        <View style={{flex:0.25}}>
          
          <Image style={{width:50, height:50}} source={{uri:item.logo}}/>
        </View>
        <View style={{flex:0.75}}>
          <Text onPress={() => {
        //TODO: Bank payment
        // console.log(bankKeys);
        
        var options = {
          currency: 'INR',
          amount:'100',
          contact:'1234567890',
          key_id:'rzp_test_1DP5mmOlF5G5ag',
          email:'a@a.com',
          method:'netbanking',
          bank:item.key
        }
        
        Razorpay.validateOptions(options)
          .then(data =>{
            console.log('inside data');
              Razorpay.open(options).then(data=>{
                alert(data.razorpay_payment_id);
              }).catch(error=>{
                alert(error.description);
              })
          }).catch(error => {
            console.log(`inside error ${JSON.stringify(error)}`);
            console.log(error.field);
          });
      }}>
            {item.name}
          </Text>
        </View>
        
        
      </View>
      
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  
  useEffect(()=>{
    let array = [];
    let arrayOfBanks = [];
    async function getLogos(){
      for(let index = 0; index < arrayOfBanks.length; index++){
        let bank = arrayOfBanks[index];
        let logoUrl = await Razorpay.getBankLogoUrl(bank.key);
        arrayOfBanks[index].logo = logoUrl.data;
        console.log(arrayOfBanks[index].logo);
      }
      setBanks(arrayOfBanks);
    }
    async function getPaymentMethods(){
      let methods = await Razorpay.getPaymentMethods();
      let keys = Object.keys(methods.netbanking);
      keys.forEach(key=>{
        const bank = {
          key:key,
          name:methods.netbanking[key]          
        }
        arrayOfBanks.push(bank);

      });
      getLogos();
      
    }

    getPaymentMethods();
    
    
    
    

  },[])
  
  return (
    <SafeAreaView>
      <View>
        <Text>Pay With NetBanking</Text>
      </View>
      
      <FlatList
        data={banks}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        enableEmptySections={true}
        renderItem={ItemView}
      />
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default Netbanking;
