import { DeliveryMethod } from "@shopify/shopify-api";

/**
 * @type {{[key: string]: import("@shopify/shopify-api").WebhookHandler}}
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
    callbackUrl: "/wehooks/customers/data_request",
    callback: async (topic, shop, body, webhookId, req, res) => {



      const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
      const crypto = require('crypto')


      // Validate HMAC
    const hmacHeader = req.header('X-Shopify-Hmac-Sha256');

    // Compute HMAC using your Shopify secret key
    const computedHmac = crypto
      .createHmac('sha256', SHOPIFY_API_SECRET)  // Replace with your actual Shopify secret key
      .update(body, 'utf8')
      .digest('base64');

    // If HMAC doesn't match, return 401
    if (computedHmac !== hmacHeader) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const payload = JSON.parse(body);
      // Process the payload as needed

      res.status(200).send('Webhook processed successfully');
  } catch (err) {
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
    callbackUrl: "/webhooks/customers/redact",
    callback: async (topic, shop, body, webhookId, req, res) => {


      const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
      const crypto = require('crypto')


      // Validate HMAC
    const hmacHeader = req.header('X-Shopify-Hmac-Sha256');

    // Compute HMAC using your Shopify secret key
    const computedHmac = crypto
      .createHmac('sha256', SHOPIFY_API_SECRET)  // Replace with your actual Shopify secret key
      .update(body, 'utf8')
      .digest('base64');

    // If HMAC doesn't match, return 401
    if (computedHmac !== hmacHeader) {
      return res.status(401).send('Unauthorized');
    }

    try {
      const payload = JSON.parse(body);
      // Process the payload as needed

      res.status(200).send('Webhook processed successfully');
  } catch (err) {
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
    callbackUrl: "/webhooks/shop/redact",
    callback: async (topic, shop, body, webhookId, req, res) => {

      const SHOPIFY_API_SECRET = process.env.SHOPIFY_API_SECRET;
      const crypto = require('crypto')


      // Validate HMAC
    const hmacHeader = req.header('X-Shopify-Hmac-Sha256');

    // Compute HMAC using your Shopify secret key
    const computedHmac = crypto
      .createHmac('sha256', SHOPIFY_API_SECRET)  // Replace with your actual Shopify secret key
      .update(body, 'utf8')
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
      res.status(400).send('Bad Request');
  }
      
    },
  },
};
