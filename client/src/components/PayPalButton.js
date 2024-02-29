// PayPalButton.js
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

const PayPalButton = ({ amount, onSuccess, onError }) => {
    return (
        <PayPalScriptProvider options={{ 'client-id': 'AU-K8aOnlrTxiUhGlE32Qb0jttB1lo0TTCfjTA5oiRLlI_oguk12VBWstYdp8TExMKFuDV8geRAFWOdC' }}>
            <PayPalButtons
                style={{ layout: 'horizontal'}}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amount,
                                },
                            },
                        ],
                    });
                }}
                onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                        onSuccess(details);
                    });
                }}
                onError={(err) => {
                    onError(err);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalButton;
