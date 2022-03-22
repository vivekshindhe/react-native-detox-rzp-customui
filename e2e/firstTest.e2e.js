


describe('Example', () => {


  beforeAll(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  // it('should have welcome screen', async () => {
  //   await expect(element(by.text('Step One'))).toBeVisible();
  // });

  it('should initialize razorpay', async()=>{
    await element(by.id('initRazorpay')).tap();

    // await waitFor(element(by.id('status'))).toBeVisible().withTimeout(1000);
    setTimeout(()=>{},1000);
    await expect(element(by.text('Razorpay Initialized'))).toBeVisible();

  });

  it('should try card utility functions: isCardValid-pass/getCardNetwork-pass', async()=>{
    await element(by.id('cards')).tap();
    setTimeout(()=>{},500);
    await element(by.id('cardNumber')).replaceText('4111111111111111');
    setTimeout(()=>{},500);

    await element(by.text('IS CARD VALID')).tap();
    setTimeout(()=>{},1000);
    await expect(element(by.text('Card Validity : true'))).toBeVisible();
    await element(by.text('GET CARD NETWORK')).tap();
    setTimeout(()=>{},1000);
    await expect(element(by.text('Card Network : visa'))).toBeVisible();

  });

 

  it('should try card utility functions: isCardValid-fail/getCardNetwork', async()=>{
    await element(by.id('cardNumber')).replaceText('9000000000000000');
    setTimeout(()=>{},500);

    await element(by.text('IS CARD VALID')).tap();
    setTimeout(()=>{},1000);
    await expect(element(by.text('Card Validity : false'))).toBeVisible();
    await element(by.text('GET CARD NETWORK')).tap();
    setTimeout(()=>{},1000);
    await expect(element(by.text('Card Network : unknown'))).toBeVisible();
  });

  it('should call card utility: getCardNetworkLength', async()=>{
    await element(by.text('GET CARD NETWORK LENGTH')).tap();
    setTimeout(()=>{},1000);
    await expect(element(by.text('Card Network length : 16'))).toBeVisible();
  });

  it('should call isVpaValid and make payment-pass', async()=>{
    await element(by.id('upiCollect')).tap();
    setTimeout(()=>{},500);

    await element(by.id('vpaAddress')).replaceText('success@razorpay');
    setTimeout(()=>{},500);
    await element(by.text('PAY WITH UPI COLLECT')).tap();
    await waitFor(element(by.text('VPA Validity : true'))).toBeVisible().withTimeout(8000);
    // await expect(element(by.text('VPA Validity : true'))).toBeVisible();
  });
  it('should call isVpaValid-fail', async()=>{
    
    await element(by.id('vpaAddress')).replaceText('failure@pay');
    setTimeout(()=>{},500);
    await element(by.text('PAY WITH UPI COLLECT')).tap();
    await expect(element(by.text('VPA Validity : false'))).toBeVisible();
  });
  

});
