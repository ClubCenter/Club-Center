
/*
  This gist illustrates how to create and execute a payment with Paypal using their REST API.
  For additional informations, check the documentation: https://developer.paypal.com/docs/api/
  
  Note 1: I assume that you have already created a developer account for Paypal and an application.
          To test that your code is working, use the sandbox accounts.
          https://developer.paypal.com/webapps/developer/applications/accounts
  
  Note 2: we will not use the Paypal REST API SDK package for Node.js
          https://github.com/paypal/rest-api-sdk-nodejs
 */
this.paypalConf = {
  host: "api.sandbox.paypal.com",
  clientId: "Ac63SBCVPtRHcjnbVx23ASqRAlq12i9XNRudDLTZxyx5TkpYftR_0s0N6RzF",
  clientSecret: "EADBDBDxzL5pHV-YUi7zf8HTNQ0N3Ufr7mmfsI_AKVzz4A84_un3pqzvgJyq"
};

this.PaypalPayments = new Meteor.Collection('paypal_payments');

this.PaypalTokens = new Meteor.Collection('paypal_tokens');

Meteor.methods({

  'getPaypalToken': function() {
    var auth, isTokenValid, token;
    isTokenValid = 0;
    token = PaypalTokens.findOne({
      timestamp: {
        $exists: true
      }
    }, {
      sort: {
        timestamp: -1
      }
    });
   // print("stage 1");
    if (token != null) {
      isTokenValid = Math.ceil((new Date().getTime() - token.timestamp) / 1000);
    }
    if (isTokenValid === 0 || isTokenValid > token.expires_in) {
    //  print("started process")
      auth = paypalConf['clientId'] + ':' + paypalConf['clientSecret'];
      token = EJSON.parse(Meteor.http.post('https://api.sandbox.paypal.com/v1/oauth2/token', {
        headers: {
          'Accept': 'application/json',
          'Accept-Language': 'en_US'
        },
        auth: auth,
        params: {
          'grant_type': 'client_credentials'
        }
      }).content);
      token['timestamp'] = new Date().getTime();
      PaypalTokens.insert(token);
    }
    return token;
  },
  'createPaypalPayment': function(product) {
    //print("Start Process");
    var payment, res, token;
    token = Meteor.call('getPaypalToken');
    console.log("Got Token");
    payment = {
      intent: 'sale',
      payer: {
        payment_method: 'paypal'
      },
      redirect_urls: {
        return_url: 'http://congregation.meteor.com/dashboard/payment/paypal/execute',
        cancel_url: 'http://congregation.meteor.com/dashboard'
      },
      transactions: [
        {
          item_list: {
            'items': [
              {
                'name': product.title,
                'price': product.price,
                'currency': 'USD',
                'quantity': 1
              }
            ]
          },
          amount: {
            total: product.price,
            currency: 'USD'
          },
          description: product.description
        }
      ]
    };
    res = Meteor.http.post('https://api.sandbox.paypal.com/v1/payments/payment', {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      },
      data: payment
    });

    res.data['userId'] = this.userId;
    PaypalPayments.insert(res.data);
    return res.data;
  },
  'executePaypalPayment': function(payerId) {
    var payment, res, token, url, _ref;
    payment = PaypalPayments.findOne({
      userId: this.userId
    }, {
      sort: {
        'create_time': -1
      }
    });
    token = Meteor.call('getPaypalToken');
    url = 'https://api.sandbox.paypal.com/v1/payments/payment/' + payment.id + '/execute';
    res = Meteor.http.post(url, {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      },
      data: {
        payer_id: payerId
      }
    });
    payment = res.data;
    payment['userId'] = this.userId;
    if ((_ref = payment.state) === 'approved' || _ref === 'pending') {
      PaypalPayments.insert(payment);
    }

    return payment;
  },
  'executeRefund': function(url){
    var token = Meteor.call('getPaypalToken');
    console.log(token);
   var res = Meteor.http.post(url, {
      headers: {
        Authorization: 'Bearer ' + token.access_token,
        'Content-Type': 'application/json'
      },
      data: {}
    });
    
   return res;
 }

});