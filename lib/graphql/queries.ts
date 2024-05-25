import { gql } from '@apollo/client';

export const GET_TODOS = gql`
    query GetTodos {
    todos {
        title
        is_started
        is_completed
        id
            category{
                name
            }
    }
    }
`

export const GET_CATEGORIES = gql`
    query GetCategories {
    category {
        name
        id
    }
    }
`