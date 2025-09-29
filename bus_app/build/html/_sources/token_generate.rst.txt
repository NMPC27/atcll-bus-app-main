token_generate
==============
This script is used to generate a new token for a user, making it able to send requests to the ORION database.

.. warning:: To be able to create a token, you need to have valid credentials. First ask for the credentials and permissions to the user before trying to acess the ORION database.

.. code-block:: javascript

    import axios from "axios";

    export async function generate_token (){

    const user_and_password={"username": "[insert your username here]","password": "[insert your password here]"}
  

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



