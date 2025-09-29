import axios from "axios";

export async function generate_token (){

    const user_and_password={"username": "busapp","password": "bUs0pp"}
    //const user_and_password = {"username": "peci_2122_atcll","password": "pecII_2122_atcll+"}
  

      const res = await axios({
        method:'post',
        url: 'https://api.atcll-data.nap.av.it.pt/auth',
        headers:{
            'Content-type': 'application/json', 'Accept-Charset': 'UTF-8'
        },
        data:user_and_password
      })
  
    return res.headers.authorization;
}

