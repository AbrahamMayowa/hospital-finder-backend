import {buildSchema} from 'graphql'

const schema = buildSchema(`

    input SearchInput{
        querySearch: String!
        geoFence: Int!
        latitude: Float!
        longitude: Float!
        searchType: String
    }

    type ResultObject{
        formatted_address: String
        name: String
        user_rating_total: String
    }


    type HistoryObject{
        latitude: Float!
        longitude: Float!
        querySearch: String!
        geoFence: Int!
    }

 

    type RootQuery{
        getHistory:[HistoryObject!]
    }

    type RootMutation{
        getSearch(searchInput: SearchInput): [ResultObject]
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }


`)

export default schema
