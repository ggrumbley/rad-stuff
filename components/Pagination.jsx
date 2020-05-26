import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';

import { perPage } from '../config';
import Error from './ErrorMessage';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;
import * as S from './styles';

const Pagination = ({ page }) => {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <Error error={error} />;

  const count = data.itemsConnection.aggregate.count;
  const pages = Math.ceil(count / perPage);

  return (
    <S.Pagination>
      <Head>
        <title>
          Sick Fits! - Page {page} of {pages}
        </title>
      </Head>
      <Link
        href={{
          pathname: '/items',
          query: { page: page - 1 },
        }}
      >
        <a className="prev" aria-disabled={page <= 1}>
          ← Prev
        </a>
      </Link>
      <p>
        Page {page} of <span className="totalPages">{pages}</span>
      </p>
      <p>{count} Items Total</p>
      <Link
        href={{
          pathname: '/items',
          query: { page: page + 1 },
        }}
      >
        <a className="next" aria-disabled={page >= pages}>
          Next →
        </a>
      </Link>
    </S.Pagination>
  );
};

export default Pagination;
export { PAGINATION_QUERY };
