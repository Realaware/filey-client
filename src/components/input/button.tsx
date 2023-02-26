import styled from "styled-components";

const SimpleButton = styled.button`
  background: #252525;
  color: rgba(255, 255, 255, 0.87);
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 10px 7px;
  cursor: pointer;
  transition: all 150ms;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  font-weight: 600;

  &:hover {
    background: #242424;
  }
`;

const IconButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  background: #242424;
`;

export { SimpleButton, IconButton };
