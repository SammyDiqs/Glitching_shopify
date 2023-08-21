// @ts-check
import { join } from "path";
import { readFileSync } from "fs";
import express from "express";
import serveStatic from "serve-static";

import shopify from "./shopify.js";
import productCreator from "./product-creator.js";
import GDPRWebhookHandlers from "./gdpr.js";
import importProduct from "./product-import.js";


const PORT = parseInt(
  process.env.BACKEND_PORT || process.env.PORT || "3000",
  10
);

const STATIC_PATH =
  process.env.NODE_ENV === "production"
    ? `${process.cwd()}/frontend/dist`
    : `${process.cwd()}/frontend/`;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log("Incoming request:",req.method, req.path, req.headers, req.body);
  next();
});

// Set up Shopify authentication and webhook handling

app.get(shopify.config.auth.path, shopify.auth.begin());


app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  shopify.redirectToShopifyOrAppRoot()
);   


app.post(
  shopify.config.webhooks.path,
  shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
); 




// If you are adding routes outside of the /api path, remember to
// also add a proxy rule for them in web/frontend/vite.config.js

app.use("/api/*", shopify.validateAuthenticatedSession());



// Shopify app server
app.get('/session', async (req, res) => {
  //const shop = req.shop
  try {
    // Load the session from the SQLite database
    console.log(res.locals);
   const session = res.locals.shopify.session;
    // console.log("session:", session);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }
    // res.json(session);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred', locals: res.locals.shopify  });
  }
});


app.get('/test', (_req, res) => {
  console.log('Test endpoint hit!');
  res.send('Test endpoint hit!');
});



app.get("/api/products/count", async (_req, res) => {
  const countData = await shopify.api.rest.Product.count({
    session: res.locals.shopify.session,
  });
  res.status(200).send(countData);
});

app.get("/api/products/create", async (_req, res) => {
  let status = 200;
  let error = null;

  try {
    await productCreator(res.locals.shopify.session);
  } catch (e) {
    console.log(`Failed to process products/create: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
});


app.post("/api/products/import", async (req, res) => {
  
  let status = 200;
  let error = null;

  const {title, price, description, image_url} = req.body;

  try {
    await importProduct(res.locals.shopify.session, title, price, description, image_url);
  } catch (e) {
    console.log(`Failed to process products/import: ${e.message}`);
    status = 500;
    error = e.message;
  }
  res.status(status).send({ success: status === 200, error });
}); 



app.use(shopify.cspHeaders());
app.use(serveStatic(STATIC_PATH, { index: false }));


app.use("/*", shopify.ensureInstalledOnShop(), async (req, res, _next) => {
  console.log("Processing request for:", req.path);
  return res
    .status(200)
    .set("Content-Type", "text/html")
    .send(readFileSync(join(STATIC_PATH, "index.html")));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});


app.listen(PORT);
