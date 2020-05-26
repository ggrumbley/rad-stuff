import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { gql, useLazyQuery } from '@apollo/client';
import Downshift, { resetIdCounter } from 'downshift';
import debounce from 'lodash.debounce';

import * as S from './styles';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      image
      title
    }
  }
`;

const routeToItem = (item) => {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
};

const Search = () => {
  const [items, setItems] = useState([]);
  const [searchItems, { loading, data }] = useLazyQuery(SEARCH_ITEMS_QUERY);

  useEffect(() => {
    if (data?.items) {
      setItems(data.items);
    }
  }, [data]);

  const onChange = debounce((e) => {
    !!e.target.value
      ? searchItems({
          variables: { searchTerm: e.target.value },
        })
      : setItems([]);
  }, 350);

  resetIdCounter();

  return (
    <S.Search>
      <Downshift
        onChange={routeToItem}
        itemToString={(item) => (item === null ? '' : item.title)}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
        }) => (
          <div>
            <input
              {...getInputProps({
                type: 'search',
                placeholder: 'Search For An Item',
                id: 'search',
                className: loading ? 'loading' : '',
                onChange: (e) => {
                  e.persist();
                  onChange(e);
                },
              })}
            />

            {isOpen && (
              <S.DropDown>
                {items.map((item, index) => (
                  <S.DropDownItem
                    {...getItemProps({ item })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </S.DropDownItem>
                ))}
                {!items.length && !loading && (
                  <S.DropDownItem>Nothing Found {inputValue}</S.DropDownItem>
                )}
              </S.DropDown>
            )}
          </div>
        )}
      </Downshift>
    </S.Search>
  );
};

export default Search;
export { SEARCH_ITEMS_QUERY };
