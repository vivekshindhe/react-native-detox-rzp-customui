import React, {useState} from 'react';
import {Button, SafeAreaView, Text, View, FlatList, TextInput, StyleSheet} from 'react-native';

import Razorpay from 'rzp-rn-customui-test';

const UpiCollect: () => Node = () => {
    const [vpaAddress, setVpaAddress] = useState('');
    const [isVpaValid, setVpaValidity] = useState('');
    return(
        <SafeAreaView>
            <View>
                <Text>
                Pay with UPI Collect
                </Text>
                <TextInput 
                    testID='vpaAddress'
                    style={styles.input}
                    placeholder='Enter Vpa Address here'
                    onChangeText={vpa => setVpaAddress(vpa)}
                    value={vpaAddress}
                />
                <Button
                    title={'Pay with UPI Collect'}
                    onPress={()=>{
                        const options ={
                            currency:'INR',
                            amount:'100',
                            email:'vivekshindhe96@gmail.com',
                            contact:'9731585653',
                            key_id:'rzp_test_1DP5mmOlF5G5ag',
                            method:'upi',
                            vpa:vpaAddress
                          };
                          Razorpay.isValidVpa(vpaAddress).then(data=>{
                            setVpaValidity('true');
                            Razorpay.validateOptions(options).then(data=>{
                                Razorpay.open(options).then(data=>{
                                  // alert(`Success ${data.razorpay_payment_id}`);
                                }).catch(error=>{
                                  alert(`Payment Failed: ${error.code} ${error.description}`);
                                });
                              }).catch(error=>{
                                alert(`Validation error: ${error.field}`)
                              });  
                          }).catch(error=>{
                            // alert(JSON.stringify(error));
                            setVpaValidity('false')
                          })
                                                  
                    }}
                />
                 <Text testID='vpaValidity'>VPA Validity : {isVpaValid}</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
      margin: 5,
      borderWidth: 1,
      padding: 10,
    },
  });

export default UpiCollect;