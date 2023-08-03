export default function authenticate(req, res, next) {
    const apiKey = req.header('X-Api-Key');
    if (apiKey !== process.env.SHOPIFY_API_KEY) {
      res.status(401).send('Unauthorized');
      
    } else {
      console.log('Authenticated');
      next();
    }
  }
  