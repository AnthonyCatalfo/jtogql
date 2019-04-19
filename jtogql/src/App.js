import React, { Component } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Books from "./Books";

const client = new ApolloClient({
  uri: "https://jsontogql2.herokuapp.com/v1alpha1/graphql"
});

class App extends Component {
  render() {
    return (
      <div className="search">
        <ApolloProvider client={client}>
          <Books />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
