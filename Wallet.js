import React, {useEffect, useState} from 'react';
import {Button, SafeAreaView, Text, View, FlatList, Image} from 'react-native';

import Razorpay from 'rzp-rn-customui-test';

const Wallet: () => Node = () => {

  const [wallets, setWallets] = useState([]);


    const ItemView = ({item}) => {
        return (

          <View style={{flexDirection:'row'}}>
            <View style={{flex:0.5}}>
              <Image style={{width:100, height:100}} source={{uri:item.logo}}/>
            </View>
            <View style={{flex:0.5}}>
              <Text
                onPress={() => {
                  //TODO:UPI App payment intent
                  const options ={
                    currency:'INR',
                    amount:'100',
                    key_id:'rzp_test_1DP5mmOlF5G5ag',
                    email:'vivekshindhe96@gmail.com',
                    contact:'9731585653',
                    method:'wallet',
                    wallet:item.name
                  };
                  Razorpay.validateOptions(options).then(data=>{
                    Razorpay.open(options).then(data=>{
                      alert(`Success ${data.razorpay_payment_id}`);
                    }).catch(error=>{
                      alert(`Payment Failed: ${error.code} ${error.description}`);
                    });
                  }).catch(error=>{
                    alert(`Validation error: ${error.field}`)
                  });
        
                }}>
                {item.name}
                
              </Text>
            </View>
           
          </View>
          // Flat List Item
          
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
      let walletsLocal = [];
      async function getWalletLogos(){
        for(let index = 0; index < walletsLocal.length; index++){
          let logoUrl = await Razorpay.getSqWalletLogoUrl(walletsLocal[index].name);
          walletsLocal[index].logo = logoUrl.data;
        }
        setWallets(walletsLocal);
      }

      async function getWalletsFromPaymentMethods(){
          let methods =await Razorpay.getPaymentMethods();
          console.log(methods.wallet);
          let keys = Object.keys(methods.wallet);
          for (const key of keys) {
            const wallet = {
              name: key,
              // key:key
            }
            walletsLocal.push(wallet);
          }
          
          getWalletLogos();
      }

      getWalletsFromPaymentMethods();
    },[]);

    return(
        <SafeAreaView>
            <View>
                <Text>
                    Pay with Wallet
                </Text>
                
                    <FlatList
                        data={wallets}
                        keyExtractor={(item, index) => index.toString()}
                        ItemSeparatorComponent={ItemSeparatorView}
                        enableEmptySections={true}
                        renderItem={ItemView}
                    />
            </View>
        </SafeAreaView>
    )
}

export default Wallet;