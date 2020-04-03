import React from 'react';
import StripeCheckout from 'react-stripe-checkout'
import "./stripe-button.styles.scss"

const onToken = token => {
    console.log(token);
    alert('Payment Succesful');
}

const StripeButton = ({ price }) => {
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_96HfILExyRt3Ir5neTw63OJH004fSixOIK';

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

export default StripeButton;
