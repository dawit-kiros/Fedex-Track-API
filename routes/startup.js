import express from 'express'
import trackByOrderNumber from '../controller/trackAPI.js'
const startUp = express.Router()
import {getLoggerInstance} from '../logger.js'

const logger = getLoggerInstance(); 

/**
 * @swagger
 * /:
 *   get:
 *     summary: Live
 *     responses:
 *       200:
 *         description: Successful response 
 */
startUp.get('/', (req, res) => {
    res.send('Its live!');
  }); 

/**
 * @swagger
 * /tracking/v1:
 *   post:
 *     summary: Track a FedEx shipment by order number
 *     description: |
 *       This endpoint allows you to track a FedEx shipment using its order number.
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: trackingRequest
 *         description: Tracking request with order number
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             orderNumber:
 *               type: string
 *               example: '123456789'
 *         example:
 *           orderNumber: '123456789'
 *     responses:
 *       200:
 *         description: Successful tracking request
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: string
 *               example: 'In transit'
 *             estimatedDeliveryDate:
 *               type: string
 *               format: date
 *               example: '2023-10-31'
 *       400:
 *         description: Bad request
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: 'orderNumber is required'
 *       401:
 *         description: Unauthorized
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: 'Unauthorized'
 *       404:
 *         description: Resource not found
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: 'Order not found'
 *       500:
 *         description: Internal server error
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: 'Internal server error'
 */

startUp.post('/tracking/v1', async (req,res) => {
    const orderNum = req.body.orderNumber 
    
    if (!orderNum){
        return res.status(400).json({error: 'orderNumber is required'})
    }
    else
    {
        try{                  
            const trackingInfo = await trackByOrderNumber(orderNum);          
            if (trackingInfo) {
              res.send(trackingInfo)
            }
        }
        catch(err){
            logger.error(err)            
            res.send(err)   
        }
        
    }

    
})
export default startUp
