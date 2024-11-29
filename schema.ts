export const schema = `#graphql

    type Flight {
        id : ID!
        origin: String!
        destiny: String!
        dateAndTime: String!
    }

    type Query {    
        getFlights: [Flight!]!
        getFlight(id : ID!): Flight
    }

    type Mutation {
        addFlight(_:unknown, args:{origin:String!,destiny:String!,dateAndTime:String!}): Flight!
    }
`;
