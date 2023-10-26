# FedEx Tracking API README

## Introduction
The FedEx Tracking API allows you to track shipments using FedEx services. This documentation provides clear instructions on how to use the API, including setting up environment variables, making requests, and understanding the response format and status codes.

## Table of Contents
- [API Documentation] (#api-documentation)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Authorization](#authorization)
- [Tracking a Shipment](#tracking-a-shipment)
- [Request Format](#request-format)
- [API Endpoint](#api-endpoint)
- [Response Format](#response-format)
- [Status Codes](#status-codes)
- [API Key and Client Secret](#api-key-and-client-secret)

## API Documentation (Swagger Documentation)

**Access Swagger Documentation:** I have included Swagger documentation for this API, which can be accessed via the `/api-docs` endpoint. Swagger provides interactive documentation that allows users to explore and understand your API more easily.

**Endpoint for Swagger Documentation:** `/api-docs`

**Description:** The Swagger documentation provides a user-friendly interface for interacting with the API, including the ability to make test requests and explore the API's endpoints, request parameters, and responses.

**Access Swagger Documentation:** Users can access the Swagger documentation by navigating to `https://your-api-url/api-docs` in a web browser.


## Setting Up Environment Variables
Before you can use the FedEx Tracking API, you need to set up environment variables to securely store your API credentials and authentication details. Create a `.env` file in the root directory of your project and define the following environment variables:

**.env file:**
```plaintext
API_KEY=your_api_key
CLIENT_SECRET=your_client_secret
GRANT_TYPE=client_credentials
AUTH_URL = 'https://apis-sandbox.fedex.com/oauth/token'
TRACKING_URL = 'https://apis-sandbox.fedex.com/track/v1/trackingnumbers'


## Authorization
The authorization process is handled by the `authorization.js` file, which retrieves an access token for your API requests. It makes a POST request to the FedEx authorization endpoint and uses the credentials stored in your environment variables.

To obtain an access token for your API requests, you can use the `getAPIAuthorization` function from the `authorization.js` file. This function does not require any parameters and can be called as follows:

```javascript
import getAPIAuthorization from './authorization.js';

const access_token = await getAPIAuthorization();

## Tracking a Shipment
To track a shipment, you can use the `trackByOrderNumber` function from the `trackAPI.js` file. This function requires the shipment's tracking number and retrieves tracking information. If an access token is not available, it will first obtain one using the authorization process.

Here's how you can use the `trackByOrderNumber` function:

```javascript
import trackByOrderNumber from './trackAPI.js';

const trackingNumber = 'your_tracking_number';
const trackingInfo = await trackByOrderNumber(trackingNumber);

if (trackingInfo) {
  console.log('Shipment Status:', trackingInfo);
} else {
  console.error('Failed to retrieve tracking information.');
}

## Request Format

### getAPIAuthorization Function
This function does not require any parameters and uses the environment variables set in your .env file for authorization.

### trackByOrderNumber Function
- `trackingNumber` (string): The tracking number of the shipment you want to track.

## API Endpoint

- **Authorization Endpoint:** `https://apis-sandbox.fedex.com/oauth/token`
- **Tracking Endpoint:** `https://apis-sandbox.fedex.com/track/v1/trackingnumbers`

## Response Format

The response from the `trackByOrderNumber` function is the latest status description of the shipment. It is a string describing the current status of the tracked shipment.

## Status Codes
- **200:** The request was successful, and the response contains tracking information.
- **401:** Unauthorized. Check your API credentials and ensure you have a valid access token.
- **404:** Resource not found. The tracking number may be incorrect.
- **500:** Internal server error. The FedEx API service may be temporarily unavailable. Check for issues on the FedEx API status page.







