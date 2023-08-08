import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const CREATE_PRODUCT_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
        images(first: 1) {
          edges {
            node {
              originalSrc
            }
          }
        }
      }
    }
  }
`;

export default async function importProduct(session, title, price, description, image_url) {
  
  const client = new shopify.api.clients.Graphql({ session });

  
  

  try {
    //console.log('Price:', price);
    await client.query({
      data: {
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            title: title,
            bodyHtml: description,
            variants: [{ price: price }],
            images: [{src:image_url}]
          },
        },
      },
    });
  } catch (error) {
    if (error instanceof GraphqlQueryError) {
      throw new Error(
        `${error.message}\n${JSON.stringify(error.response, null, 2)}`
      );
    } else {
      throw error;
      
    }
  }
}
