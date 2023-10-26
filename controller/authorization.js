import axios from 'axios';
import {getLoggerInstance} from '../logger.js'

const logger = getLoggerInstance(); 

const getAPIAuthorization = async () => {

    const auth_url = process.env.AUTH_URL;
    const client_id = process.env.API_KEY;     
    const client_secret = process.env.CLIENT_SECRET; 
    const grant_type = process.env.GRANT_TYPE; 
    
    const data = {
        grant_type,
        client_id,
        client_secret,
    };
    
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    
    try {
        const response = await axios.post(auth_url, data, { headers });    
            if (response.status === 200) {
                const { access_token } = response.data;        
                return access_token;
        } else {
            logger.error(`Request Failed with Status Code: ${response.status}`)            
            return null;
        }
    } catch (error) {
        logger.error(`Request Failed: ${error}`)        
        return null;
    }
}

    

export default getAPIAuthorization;