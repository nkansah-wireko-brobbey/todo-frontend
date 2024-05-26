import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
mutation createCategory($name: String!, $user_id: Int!) {
    insert_category_one(object :{name: $name, user_id: $user_id}) {
    id
    name
  }
}
`;
