import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
mutation createCategory($name: String!, $user_id: Int!) {
    insert_category_one(object :{name: $name, user_id: $user_id}) {
    id
    name
  }
}
`;
export const CREATE_TODO = gql`
mutation createTodos($title: String!, $user_id: Int!, $category_id: Int!, $panel_id: Int!) {
    insert_todos_one(object :{title: $title, user_id: $user_id, category_id: $category_id, panel_id: $panel_id}) {
        title
            id
            created_at
            category{
                id
                name
            }
  }
}
`;
