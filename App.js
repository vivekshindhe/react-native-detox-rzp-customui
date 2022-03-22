/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {useState} from 'react';
 import type {Node} from 'react';
 import {
   SafeAreaView,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
 } from 'react-native';
 
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 
 import Razorpay from 'rzp-rn-customui-test';
 import Cards from './Cards';
 import Netbanking from './Netbanking';
 import UpiIntent from './UpiIntent';
 import UpiCollect from './UpiCollect';
import Wallet from './Wallet';
 
 const App: () => Node = () => {
   const [isCards, selectCards] = useState(false);
   const [isNetbanking, selectNetbanking] = useState(false);
   const [isUpiIntent, selectUpiIntent] = useState(false);
   const [isUpiCollect, selectUpiCollect] = useState(false);
   const [isWallet, selectWallet] = useState(false);
   const [isRzpInitialized, setRzpInit] = useState(false);
 
   const backgroundStyle = {
     backgroundColor: Colors.lighter,
   };
 
   return (
     <SafeAreaView style={{backgroundStyle: backgroundStyle}}>
       <StatusBar />
       <ScrollView contentInsetAdjustmentBehavior="automatic">
         <View>
           {isRzpInitialized && 
            <Text testID='isRzpInit'>
              Razorpay Initialized
            </Text>
           }
         </View>
         <View style={{flexDirection: 'row'}}>
           <View style={{flex: 1}}>
             <TouchableOpacity
               style={{
                 margin: 5,
                 height: 100,
                 backgroundColor: 'blue',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
               testID='initRazorpay'
               title={'Initialize Razorpay'}
               color={'#3e3e3e'}
               onPress={() => {
                 console.log('clicked');
                 Razorpay.initRazorpay('rzp_test_1DP5mmOlF5G5ag');
                 setRzpInit(true);
               }}>
               <Text style={{fontSize: 18, color: 'white'}}>
                 Initialize Razorpay
               </Text>
             </TouchableOpacity>
           </View>
           <View style={{flex: 1}}>
             <TouchableOpacity
               style={{
                 margin: 5,
                 height: 100,
                 backgroundColor: 'green',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
               title={'Initialize Razorpay'}
               color={'#3e3e3e'}
               testID='cards'
               onPress={() => {
                 selectCards(!isCards);
               }}>
               <Text style={{fontSize: 18, color: 'white'}}>Cards</Text>
             </TouchableOpacity>
           </View>
         </View>
               
         <View>{isCards ? <Cards /> : null}</View>
         <View style={{flexDirection: 'row'}}>
           <View style={{flex: 1}}>
             <TouchableOpacity
               style={{
                 margin: 5,
                 height: 100,
                 backgroundColor: 'green',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
               color={'#3e3e3e'}
               onPress={() => {
                 console.log('clicked');
                 selectNetbanking(!isNetbanking);
               }}>
               <Text style={{fontSize: 18, color: 'white'}}>Net Banking</Text>
             </TouchableOpacity>
           </View>
           <View style={{flex: 1}}>
             <TouchableOpacity
               style={{
                 margin: 5,
                 height: 100,
                 backgroundColor: 'green',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
               color={'#3e3e3e'}
               onPress={() => {
                 selectUpiIntent(!isUpiIntent);
               }}>
               <Text style={{fontSize: 18, color: 'white'}}>UPI Intent</Text>
             </TouchableOpacity>
           </View>
         </View>
         <View>{isNetbanking ? <Netbanking /> : null}</View>
         <View>{isUpiIntent ? <UpiIntent /> : null}</View>
         <View style={{flexDirection: 'row'}}>
           <View style={{flex: 1}}>
             <TouchableOpacity
               testID='upiCollect'
               style={{
                 margin: 5,
                 height: 100,
                 backgroundColor: 'green',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
               color={'#3e3e3e'}
               onPress={() => {
                 console.log(isUpiCollect);
                 selectUpiCollect(!isUpiCollect);
               }}>
               <Text style={{fontSize: 18, color: 'white'}}>UPI Collect</Text>
             </TouchableOpacity>
           </View>
           <View style={{flex: 1}}>
             <TouchableOpacity
               style={{
                 margin: 5,
                 height: 100,
                 backgroundColor: 'green',
                 justifyContent: 'center',
                 alignItems: 'center',
               }}
               color={'#3e3e3e'}
               onPress={() => {
                 selectWallet(!isWallet);
               }}>
               <Text style={{fontSize: 18, color: 'white'}}>Wallet</Text>
             </TouchableOpacity>
           </View>
         </View>
         <View>{isUpiCollect ? <UpiCollect /> : null}</View>
         <View>{isWallet ? <Wallet />: null}</View>
       </ScrollView>
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
   button: {
     backgroundColor: 'white',
   },
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });
 
 export default App;
 