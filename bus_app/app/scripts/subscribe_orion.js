export default function sub(token){

    const axios = require('axios')

    const services = [
        {
            service: 'aveiro_cam',
            types: [
                {
                    type: 'Values',
                    attrs: ['speed', 'location', 'dateObserved','stationID'],
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
                    url: 'https://orion.atcll-data.nap.av.it.pt/v2/entities?entityId=urn:ngsi-ld:Values:aveiro_cam:42&type=Values&attrs=stationID,location,speed,dateObserved',
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

