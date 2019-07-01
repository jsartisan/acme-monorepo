import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import React, { Component } from 'react';

export default class HomePage extends Component {
  render() {
    return (
      <div>
        <Query
          query={gql`
            {
              users(first: 10) {
                edges {
                  node {
                    id
                    name
                  }
                }
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return 'Loading...';
            if (error) return `Error! ${error.message}`;

            return (
              <div className="d-flex flex-nowrap flex-items-stretch gutter-condensed overflow-auto py-3">
                {data.users.edges.map(user => (
                  <div>{user.node.name}</div>
                ))}
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}
