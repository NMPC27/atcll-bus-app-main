export default function sub_PECI(token){

    const axios = require('axios')

    const services = [
        {
            service: 'bus_line',
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
                    url: 'https://orion.atcll-data.nap.av.it.pt/v2/entities?entityId=urn:ngsi-ld:Bus:bus_line:42&type=Bus&attrs=busData,dateSent,dateObserved',
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

