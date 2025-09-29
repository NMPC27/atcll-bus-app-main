export default function sub_traffic(token){

    const axios = require('axios')

    const services = [
        {
            service: 'aveiro_livetraffic',
            types: [
                {
                    type: 'Radar',
                    attrs: ['radardata', 'dateSent', 'id'],
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
                    url: 'https://orion.atcll-data.nap.av.it.pt/v2/entities?entityId=urn:ngsi-ld:Radar:aveiro_livetraffic:42&type=Radar&attrs=radardata,dateSent,id',
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

