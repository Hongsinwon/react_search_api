import { useState } from 'react';
import styled from 'styled-components';

import { useNavigate } from 'react-router-dom';

import { useSetRecoilState } from 'recoil';
import { contentValue } from '../value.js';

const SearchInput = () => {
  const history = useNavigate();

  const [content, setContent] = useState(''); // Input 입력된 값
  const [closeBtn, setCloseBtn] = useState(false); // Input값 리셋 BTN

  const setSearchItem = useSetRecoilState(contentValue); //검색 창 Recoil setState

  // 1. Input 입력값 받기
  const newContentValue = (e) => {
    if (e.target.value !== '') setCloseBtn(true);
    if (e.target.value === '') setCloseBtn(false);
    setContent(e.target.value);
    history(`/`);
  };

  // 2. 입력값 atom에 보내기
  const ValusState = () => {
    setSearchItem(content);
    history(`/search/${content}`);
  };

  const onEnterKey = (e) => {
    if (e.key === 'Enter') ValusState();
  };

  return (
    <Wrap>
      <Form onSubmit={(e) => e.preventDefault()}>
        <Input
          value={content}
          onChange={(e) => newContentValue(e)}
          placeholder='검색내용을 입력해주세요'
          onKeyDown={onEnterKey}
        />
        {closeBtn && (
          <ButtonClose onClick={() => setContent('')}>❌</ButtonClose>
        )}
        <Button onClick={ValusState}>검색</Button>
      </Form>
    </Wrap>
  );
};

const Wrap = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

  height: 100px;
  margin: 0 16px;
`;
const Form = styled.form`
  position: relative;
  display: flex;
  width: 100%;
  height: 35px;
`;
const Input = styled.input`
  padding-left: 16px;
  width: 90%;
  height: 100%;
  border: none;
  border-radius: 5px;
  background-color: #eeeeee;
`;

const ButtonClose = styled.button`
  position: absolute;
  right: 12.5%;
  height: 100%;
  line-height: 35px;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const Button = styled.button`
  margin-left: 10px;
  width: 10%;
  height: 100%;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-weight: bold;
  background-color: #0049b8;
  cursor: pointer;
`;

export default SearchInput;
