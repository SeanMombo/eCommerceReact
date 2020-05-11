import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_96HfILExyRt3Ir5neTw63OJH004fSixOIK';

  const onToken = token => {
    axios({
      url: 'payment', 
      method: 'post',
      data: {
        amount: priceForStripe,
        token
      }
    }) //comment
      .then(response => {
        alert('Payment Succesful')
      })
      .catch(error => { 
        console.log('Payment error: ', error);
        alert('There was an issue with your payment. Please make sure you use the provided credit card');
    })
  };


  return (

    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
