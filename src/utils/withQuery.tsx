import { DocumentNode, OperationVariables, Query, QueryResult } from '@apollo/react-components';
import { PureComponent } from 'react';

import { service } from '../service/service';

export default function withQuery(Component: any, query: DocumentNode) {
  return class WithQuery extends PureComponent {
    render() {
      return (
        <Query query={query} client={service}>
          {({ data }: QueryResult<any, OperationVariables>) => (
            <Component {...this.props} data={data} />
          )}
        </Query>
      );
    }
  };
}
