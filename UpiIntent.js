import React, {useState} from 'react';
import {Button, SafeAreaView, Text, View, FlatList} from 'react-native';

import Razorpay from 'rzp-rn-customui-test';

const UpiIntent: () => Node = () => {
  const ItemView = ({item}) => {
    return (
      // Flat List Item
      <Text
        onPress={() => {
          //TODO:UPI App payment intent
          const options ={
            currency:'INR',
            amount:'100',
            email:'vivekshindhe96@gmail.com',
            contact:'9731585653',
            method:'upi',
            key_id:'rzp_test_1DP5mmOlF5G5ag',
            '_[flow]':'intent',
            upi_app_package_name:item.packageName
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
        {item.appName}
      </Text>
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

  const [upiApps, setUpiApps] = useState([]);
  return (
    <SafeAreaView>
      <View>
        <Button
          title={'Get UPI Apps'}
          onPress={() => {
            Razorpay.getAppsWhichSupportUPI().then(data => {
              console.log(data.data.length);
              const apps = data.data;
              setUpiApps(apps);
              // for (let index = 0; index < apps.length; index++) {
              //   const element = apps[index];
              //   console.log(element.appName);
              // }
            });
          }}
        />
        <Button title={'Pay with UPI Intent without packageName'}
        style={{ margin: 5 }}
        onPress={()=>{
          const options ={
            currency:'INR',
            amount:'100',
            email:'vivekshindhe96@gmail.com',
            contact:'9731585653',
            key_id:'rzp_test_1DP5mmOlF5G5ag',
            method:'upi',
            '_[flow]':'intent'
          };
          Razorpay.validateOptions(options).then(data=>{
            Razorpay.open(options).then(data=>{
              alert(`Success ${data.razorpay_payment_id}`);
            }).catch(error=>{
              alert(`Payment Failed: ${error.code} ${error.description}`);
            })
          }).catch(error=>{
            alert(`Validation error: ${error.field}`)
          })
        }}/>

      <FlatList
        data={upiApps}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        enableEmptySections={true}
        renderItem={ItemView}
      />
      </View>
    </SafeAreaView>
  );
};

export default UpiIntent;
