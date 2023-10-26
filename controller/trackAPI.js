import axios from 'axios';
import getAPIAuthorization from './authorization.js';
import {getLoggerInstance} from '../logger.js'

const logger = getLoggerInstance(); 


let access_token = null;
async function trackByOrderNumber(trackingNumber) {
    if (!access_token) {
        access_token = await getAPIAuthorization();
        if (!access_token) {
          logger.error('Couldnt retrieve access token.')
          console.error('Access token retrieval failed.');
          return null;
        }
      }
  const track_url = process.env.TRACKING_URL;

  const headers = {
    'Content-Type': 'application/json',    
     'authorization': `Bearer ${access_token}`,
  };

  // Define the tracking information for the package.
  const trackingInfo = [
    {
      shipDateBegin: '15-08-2020', 
      shipDateEnd: '1-09-2021',  
      trackingNumberInfo: {
        trackingNumber: trackingNumber,        
      },
    },
  ];

  const reqBody = {
    includeDetailedScans: false, 
    trackingInfo,
  };

  try {
    const response = await axios.post(track_url, reqBody, { headers });

    if (response.status === 200) {      
      const trackingData = response?.data;      
      // Extract the the latest Status Detail
      const description = trackingData.output.completeTrackResults[0].trackResults[0].latestStatusDetail.description;
      return description;
    } else {
      logger.error(`API request failed with Status Code: ${response.status}`)      
      return null;
    }
  } catch (error) {    
    logger.error(`API Request Failed: ${error}`)
    return null;
  }
}

export default trackByOrderNumber;
