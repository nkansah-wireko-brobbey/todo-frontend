import { gql } from '@apollo/client';

export const CREATE_CATEGORY = gql`
mutation createCategory($name: String!, $user_id: Int!) {
    insert_category_one(object :{name: $name, user_id: $user_id}) {
    id
    name
  }
}
`;
export const CREATE_PANEL = gql`
mutation createCategory($name: String!, $user_id: Int!) {
    insert_panel_one(object :{name: $name, user_id: $user_id}) {
        name
        id
        todos {
            title
            id
            created_at
            category{
                id
                name
            }
        }
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
export const ARCHIVE_TODO = gql`
mutation archiveTodos($id: Int!) {
    update_todos(where: {id: {_eq: $id}}, _set: {is_archived: true}) {
    returning {
      id
    }
  }
}
`;

export const DELETE_TODO = gql`
mutation deleteTodos($id: Int!) {
  delete_todos_by_pk(id: $id) {
    id
  }
}
`;
export const UPDATE_TODO_PANEL = gql`
mutation updateTodoPanel($id: Int!, $panel_id: Int!) {
    update_todos(where: {id: {_eq: $id}}, _set: {panel_id: $panel_id}) {
    returning {
      panel_id
      id
    }
  }
}
`;
export const UPDATE_TODO_CATEGORY = gql`
mutation updateTodoPanel($id: Int!, $category_id: Int!) {
    update_todos(where: {id: {_eq: $id}}, _set: {category_id: $category_id}) {
    returning {
      category_id
      id
    }
  }
}
`;
