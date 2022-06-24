import React from 'react';
import styled from 'styled-components';

import { useRecoilValue } from 'recoil';
import { contentValue } from '../value.js';

import { useQuery } from 'react-query';
import { searchData } from '../api';

const List = () => {
  const searchValue = useRecoilValue(contentValue);

  const { isLoading, data } = useQuery('value', () => searchData(searchValue));

  const listConents = () => {
    const result = [];
    if (isLoading === false) {
      for (let i = 0; i < Object.keys(data.query.pages).length; i++) {
        result.push(
          <Item key={data.query.pages[Object.keys(data.query.pages)[i]].pageid}>
            <a
              href={`https://en.wikipedia.org/?curid=${
                data.query.pages[Object.keys(data.query.pages)[i]].pageid
              }`}
            >
              <Title>
                {data.query.pages[Object.keys(data.query.pages)[i]].title}
              </Title>
              <ContextBox>
                {data.query.pages[Object.keys(data.query.pages)[i]]
                  .thumbnail && (
                  <Img
                    src={`${
                      data.query.pages[Object.keys(data.query.pages)[i]]
                        .thumbnail.source
                    }`}
                  />
                )}
                <Text>
                  {data.query.pages[Object.keys(data.query.pages)[i]].extract}
                </Text>
              </ContextBox>
            </a>
          </Item>
        );
      }
    }

    return result;
  };

  return (
    <WrapList>{isLoading ? <div>로딩중</div> : <>{listConents()}</>}</WrapList>
  );
};

const WrapList = styled.ul`
  margin: 0 16px;
  margin-top: 100px;
`;
const Item = styled.li`
  padding: 16px 0 24px 0;
  border-bottom: 1px solid #eee;
`;
const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: bold;
`;
const ContextBox = styled.div`
  display: flex;
`;
const Img = styled.img`
  margin-right: 20px;
`;
const Text = styled.p`
  color: #555;
  .searchmatch {
    font-weight: bold;
  }
`;

export default List;
