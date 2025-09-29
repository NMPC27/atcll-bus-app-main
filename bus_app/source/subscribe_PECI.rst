subscribe_PECI
===============
This script receives the data from the line detection and prediction made in our server hosted in IT, through ORION.

First the script receives as an argument the token necessary for making the request (created through the token_generate.js script).

Then we choose the services we want to subscribe to, in this case it's the 'peci_bus' service. In this service we are going to access the 'Bus' section to get the busData, dateSent, dateObserved.

Lastly, we create the promise which will give us the data, where we need to put the service requested and the token in the 'headers', 'FIWARE-Service' and 'authorization' respectively.

.. warning:: The url part of the promise must have the type, service and attributes exactly as in the example (can be changed with other attributes). Otherwise the request will not work.

.. code-block:: javascript

    export default function sub_PECI(token){

        const axios = require('axios')

        const services = [
            {
                service: 'peci_bus',
                types: [
                    {
                        type: 'Bus',
                        attrs: ['busData', 'dateSent', 'dateObserved'],
                        timeIndex: 'dateObservedFrom'
                    },
                ]
            },
        ]

        let myPromise = new Promise(function(myResolve) {
        
            services.forEach(({service, types}) => {
                types.forEach(async ({type, attrs, timeIndex}) => {
                    const res = await axios({
                        method: 'GET',
                        url: 'https://orion.atcll-data.nap.av.it.pt/v2/entities?entityId=urn:ngsi-ld:Bus:peci_bus:42&type=Bus&attrs=busData,dateSent,dateObserved',
                        headers: {
                            "FIWARE-Service": service,
                            "authorization": token
                        }
                        
                    })

                    myResolve(res);
        
                })
            })
        
        });

        return myPromise;
    }




