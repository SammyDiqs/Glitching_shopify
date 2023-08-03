import { GraphqlQueryError } from "@shopify/shopify-api";
import shopify from "./shopify.js";

const CREATE_PRODUCT_MUTATION = `
  mutation populateProduct($input: ProductInput!) {
    productCreate(input: $input) {
      product {
        id
      }
    }
  }
`;

export default async function importProduct(session, title, price) {
  
  const client = new shopify.api.clients.Graphql({ session });

  //console.log('session:',session);
  

  try {
    await client.query({
      data: {
        query: CREATE_PRODUCT_MUTATION,
        variables: {
          input: {
            title: title,
            variants: [{ price: price }],
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
