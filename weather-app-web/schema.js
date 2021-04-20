const { 
  GraphQLObjectType, 
  GraphQLInt, 
  GraphQLList, 
  GraphQLSchema,
  GraphQLString,
  GraphQLFloat
} = require('graphql');
const axios = require('axios');

const WeatherType = new GraphQLObjectType ({
  name: 'WeatherInfo',
  fields: () => ({
    dt: { type: GraphQLInt },
    dt_txt: { type: GraphQLString },
    weather: { 
      type: GraphQLList(WeatherDetails)
    },
    main: { type: TempDetails }
  })
});

const WeatherDetails = new GraphQLObjectType ({
  name: 'WeatherDetails',
  fields: () => ({
    main: { type: GraphQLString },
    description: { type: GraphQLString }
  })
});

const TempDetails = new GraphQLObjectType ({
  name: 'TempDetails',
  fields: () => ({
    temp: { type: GraphQLFloat }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    weather: {
      type: new GraphQLList(WeatherType),
      resolve (parent, args) {
        return axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=Kajang, Malaysia&appid=5cc8d9be72e1fb006526bab4e19104d4`)
          .then (res => res.data.list);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});