import {
  Button,
  SafeAreaView,
  Text,
  TextInput,
  StyleSheet,
  render,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Razorpay from 'rzp-rn-customui-test';
const Cards: () => Node = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [isCardValid, setCardValidity] = useState('');
  const [cardNetwork, setCardNetwork] = useState('');
  const [cardHolderName, setName] = useState('');
  const [cardNetworkLength, setCardNetworkLength] = useState('');
  return (
    <SafeAreaView>
      <View>
        <Text>Make Payment with Cards</Text>
        <TextInput
          testID='cardNumber'
          style={styles.input}
          onChangeText={num => setCardNumber(num)}
          placeholder={'Card Number'}
          value={cardNumber}
        />
        <TextInput
          style={styles.input}
          onChangeText={name => setName(name)}
          placeholder={'Card Holder name'}
          value={cardHolderName}
        />
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.33}}>
            <TextInput
              style={styles.input}
              onChangeText={num => setCvv(num)}
              placeholder={'CVV'}
              value={cvv}
            />
          </View>
          <View style={{flex: 0.33}}>
            <TextInput
              style={styles.input}
              placeholder={'Expiry Month'}
              value={expiryMonth}
              onChangeText={num => setExpiryMonth(num)}
            />
          </View>
          <View style={{flex: 0.33}}>
            <TextInput
              style={styles.input}
              onChangeText={num => setExpiryYear(num)}
              value={expiryYear}
              placeholder={'Expiry Year'}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1, padding: 2}}>
            <Button
              testID='isCardValid'
              title={'Is Card Valid'}
              onPress={() => {
                Razorpay.isValidCardNumber(cardNumber).then(r => {
                  console.log(r.data);
                  if (r.data) {
                    setCardValidity('true');
                  } else {
                    setCardValidity('false');
                  }
                });
              }}
            />
            <Text>Card Validity : {isCardValid}</Text>
          </View>
          <View style={{flex: 1, padding: 2}}>
            <Button
              title={'Get Card network'}
              onPress={() => {
                Razorpay.getCardsNetwork(cardNumber).then(data => {
                  setCardNetwork(data.data);
                }).catch(error=>{
                  alert(JSON.stringify(error));
                });
              }}
            />
            <Text>Card Network : {cardNetwork}</Text>
          </View>
        </View>
        <Button title={'Get Card Network Length'} onPress={()=>{
          Razorpay.getCardNetworkLength('visa').then(data=>{
            setCardNetworkLength(data.data);
          }).catch(error=>{
            alert(JSON.stringify(error));
          })
        }}/>
        <Text testID='cardNetworkLength'>Card Network length : {cardNetworkLength}</Text>
        <Button
          title={'Pay With Cards'}
          onPress={() => {
            const cardNumberObj = {cardNumber};
            const options = {
              currency: 'INR',
              amount: '100',
              contact: '9731585653',
              email: 'vivek.shindhe@razorpay.com',
              key_id: 'rzp_test_1DP5mmOlF5G5ag',
              method: 'card',
            
              
              'card[name]':cardHolderName,
              'card[cvv]': cvv,
              'card[number]': cardNumber,
              'card[expiry_month]': expiryMonth,
              'card[expiry_year]': expiryYear,
            };
            console.log(options);
            Razorpay.validateOptions(options)
              .then(data => {
                Razorpay.open(options).then(data=>{
                  alert(`Success: ${data.razorpay_payment_id}`);
                }).catch(error =>{
                  alert(`Failed: ${error.code} & ${error.description}`);
                });
              })
              .catch(error => {
                alert(error);
                console.log(error.field);
              });
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 5,
    borderWidth: 1,
    padding: 10,
  },
});

export default Cards;
