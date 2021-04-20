import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Weather from './components/Weather';
import './App.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <Weather />
      </div>
    </ApolloProvider>
  );
}

export default App;
