## CLIENT
https://github.com/RafalPietrzak/bajdurek-client

## API
https://github.com/RafalPietrzak/bajdurek-api

setup nodemon.json:
{
  "env": {
    "googleUserID": <...>,
    "googleKey": <...>,
    "googleCallBackURL": "http://localhost:8000/api/auth/google/callback",
    "secret": <...>,
    "clientURL": "http://localhost:3000",
    "adyenApiKey": <...>,
    "adyenClientKey": <...>,
    "adyenAccount": <...>
  }
}

## DEMO
http://ec2-35-181-44-247.eu-west-3.compute.amazonaws.com/

There is same bug. Go path:
login with google > go to story > add stroy to cart > cart (total price can't be 0) > summary > payment.

Payment is in test mode. After pay nothing was coded. 

