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
export const GET_PANELS = gql`
    query GetPanels {
        panel {
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
`
export const GET_PANELS_SUBSCRIPTION = gql`
    subscription GetPanels {
    panel {
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
`
// export const GET_PANELS_SUBS = gql`
//     query GetPanels {
//     panel {
//         name
//         id
//     }
//     }
// `