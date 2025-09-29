subscribe_radar
===============
This script receives the data from the radars through ORION.

First the script receives as an argument the token necessary for making the request (created through the token_generate.js script).

Then we choose the services we want to subscribe to, in this case it's the 'aveiro_radar' service. In this service we are going to access the 'Traffic' section to get the speed, dateObserved and the numberVehicles (number of vehicles detected).

Lastly, we create the promise which will give us the data, where we need to put the service requested and the token in the 'headers', 'FIWARE-Service' and 'authorization' respectively.

.. warning:: The url part of the promise must have the type, service and attributes exactly as in the example (can be changed with other attributes). Otherwise the request will not work.

.. code-block:: javascript

    export default function sub_radar(token){

        const axios = require('axios')

        const services = [
            {
                service: 'aveiro_radar',
                types: [
                    {
                        type: 'Traffic',
                        attrs: ['speed', 'dateObserved','numberVehicles'],
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
                        url: 'https://orion.atcll-data.nap.av.it.pt/v2/entities?entityId=urn:ngsi-ld:Traffic:aveiro_radar:42&type=Traffic&attrs=dateObserved,faixa,speedHeavy,speedLight,vehicleLight,vehicleHeavy',
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

