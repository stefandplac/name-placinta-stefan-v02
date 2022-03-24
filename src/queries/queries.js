import {gql} from '@apollo/client';
export const GET_CATEGORIES=gql`
{
  categories {
    name
    
  }
}
`;
export const GET_PRODUCT=gql`
query ($productId: String!) {
  product(id: $productId) {
    id
    name
    inStock
    gallery
    description
    category
    attributes {
      id
      name
      type
      items {
        displayValue
        value
        id
      }
    }
    prices {
      currency {
        symbol
        label
      }
      amount
    }
    brand
  }
}`;

export const GET_CURRENCY=gql`
{
  currencies {
    label
    symbol
  }
}
`;
export const GET_CATEGORY=gql`
query ($input: CategoryInput) {
  category(input: $input) {
    name
    products {
      id
      name
      inStock
      gallery
      description
      category
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
      prices {
        currency {
          symbol
          label
        } 
        amount
      }
      brand
    }
  }
}
`;
export const CURRENCY=gql`
query {
  currencies {
    label
    symbol
  }
}
`;