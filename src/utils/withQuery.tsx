import '../styles/loader.scss';

import { DocumentNode, OperationVariables, Query, QueryResult } from '@apollo/react-components';
import { PureComponent } from 'react';

import { service } from '../service/service';
import { loader } from './constants';

export default function withQuery(Component: Function, query: DocumentNode) {
  return class WithQuery extends PureComponent {
    render() {
      return (
        <Query query={query} client={service}>
          {({ data, loading }: QueryResult<any, OperationVariables>) =>
            loading ? (
              <div className="loader">
                <img src={loader} alt="" />
              </div>
            ) : (
              <Component {...this.props} data={data} loading={loading} />
            )
          }
        </Query>
      );
    }
  };
}
