import { DocumentNode, OperationVariables, Query, QueryResult } from '@apollo/react-components';
import { PureComponent } from 'react';

import Loader from '../components/loader/Loader';
import { service } from '../service/service';

export default function withQuery(Component: Function, query: DocumentNode) {
  return class WithQuery extends PureComponent {
    render() {
      return (
        <Query query={query} client={service}>
          {({ data, loading }: QueryResult<any, OperationVariables>) =>
            loading ? (
              <Loader />
            ) : (
              <Component {...this.props} data={data} loading={loading} />
            )
          }
        </Query>
      );
    }
  };
}
