import React from 'react';
import withApollo from 'utilities/withApollo';
import { ApolloProvider } from 'react-apollo';

import Routes from './Routes';

import 'antd/dist/antd.css';

const Root = ({ apolloClient }) => (
  <ApolloProvider client={apolloClient}>
    <Routes />
  </ApolloProvider>
);

export default withApollo(Root);
