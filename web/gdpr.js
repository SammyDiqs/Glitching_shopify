import { DeliveryMethod } from "@shopify/shopify-api";
import crypto from 'crypto'


/**
 * @type {{[key: string]: import("@shopify/shopify-api").WebhookHandler}}
 * 
 */


export default {


  
  /**
   * Customers can request their data from a store owner. When this happens,
   * Shopify invokes this webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-data_request
   */
  CUSTOMERS_DATA_REQUEST: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId, req, res) => {



      const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
      //const crypto = require('crypto');

      const contentType = req.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
          return res.status(400).send('Bad Request: Expected application/json content type');
      }
      


      // Validate HMAC
    const hmacHeader = req.get('X-Shopify-Hmac-Sha256');
    const rawBody = JSON.stringify(req.body);

    // Compute HMAC using your Shopify secret key
    const computedHmac = crypto
      .createHmac('sha256', SHOPIFY_API_SECRET)  // Replace with your actual Shopify secret key
      .update(rawBody, 'utf8')
      .digest('base64');

    // If HMAC doesn't match, return 401
    if (computedHmac !== hmacHeader) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const payload = JSON.parse(body);
      console.log('Payload: ', payload)
      // Process the payload as needed

      res.status(200).send('Webhook processed successfully');
  } catch (err) {
      console.error('Error processing webhook:', err);
      res.status(400).send('Bad Request');
  }
     
     
    },
  },

  /**
   * Store owners can request that data is deleted on behalf of a customer. When
   * this happens, Shopify invokes this webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#customers-redact
   */
  CUSTOMERS_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId, req, res) => {


      const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
      //const crypto = require('crypto');

      const contentType = req.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
          return res.status(400).send('Bad Request: Expected application/json content type');
      }
      


      // Validate HMAC
    const hmacHeader = req.get('X-Shopify-Hmac-Sha256');
    const rawBody = JSON.stringify(req.body)

    // Compute HMAC using your Shopify secret key
    const computedHmac = crypto
      .createHmac('sha256', SHOPIFY_API_SECRET)  // Replace with your actual Shopify secret key
      .update(rawBody, 'utf8')
      .digest('base64');

    // If HMAC doesn't match, return 401
    if (computedHmac !== hmacHeader) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const payload = req.body;
      console.log('Payload: ', payload)
      // Process the payload as needed

      res.status(200).send('Webhook processed successfully');
  } catch (err) {
      console.error('Error processing webhook:', err);
      res.status(400).send('Bad Request');
  }
      
      
     
    },
  },

  /**
   * 48 hours after a store owner uninstalls your app, Shopify invokes this
   * webhook.
   *
   * https://shopify.dev/docs/apps/webhooks/configuration/mandatory-webhooks#shop-redact
   */
  SHOP_REDACT: {
    deliveryMethod: DeliveryMethod.Http,
    callbackUrl: "/api/webhooks",
    callback: async (topic, shop, body, webhookId, req, res) => {

      const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
      //const crypto = require('crypto');
      
      const contentType = req.get('Content-Type');
      if (!contentType || !contentType.includes('application/json')) {
          return res.status(400).send('Bad Request: Expected application/json content type');
      }


      // Validate HMAC
    const hmacHeader = req.get('X-Shopify-Hmac-Sha256');

    const rawBody = JSON.stringify(req.body)

    // Compute HMAC using your Shopify secret key
    const computedHmac = crypto
      .createHmac('sha256', SHOPIFY_API_SECRET)  // Replace with your actual Shopify secret key
      .update(rawBody, 'utf8')
      .digest('base64');

    // If HMAC doesn't match, return 401
    if (computedHmac !== hmacHeader) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const payload = req.body;
      console.log('Payload: ', payload)
      // Process the payload as needed

      res.status(200).send('Webhook processed successfully');
  } catch (err) {
      console.error('Error processing webhook:', err);
      res.status(400).send('Bad Request');
  }
      
    },
  },
};
