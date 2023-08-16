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
    callbackUrl: "/api/wehooks/customers/data_request",
    callback: async (topic, shop, body, webhookId) => {



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

      const payload = JSON.parse(body);
     
     
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
    callbackUrl: "/api/webhooks/customers/redact",
    callback: async (topic, shop, body, webhookId) => {


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

      const payload = JSON.parse(body);
      
     
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
    callbackUrl: "/api/webhooks/shop/redact",
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

      const payload = JSON.parse(body);
      
    },
  },
};
