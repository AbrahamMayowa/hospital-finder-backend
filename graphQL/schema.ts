import {buildSchema} from 'graphql'

const schema = buildSchema(`

    input SearchInput{
        querySearch: String!
        geoFence: Int
        latitude: Float
        longitude: Float
        searchType: String
    }

    type ResultObject{
        formatted_address: String!
        name: String!
        user_rating_total: String!
    }


    type HistoryObject{
        latitude: String!
        longitude: String!
        querySearch: String!
    }

    type SignupSuccess{
        email: String!
        password: String!
    }

    type RootQuery{
        getHistory:[HistoryObject!]
    }

    type RootMutation{
        createUser(password: String!, email: String!): SignupSuccess
        getSearch(searchInput: SearchInput): [ResultObject]
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }


`)

export default schema
