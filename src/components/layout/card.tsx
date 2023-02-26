import styled from "styled-components";

const SimpleCard = styled.div`
  padding: 10px;
  border-radius: 10px;
  border: 1px solid rgba(40, 40, 40, 0.87);
  transition: all 150ms;
  background: #202020;

  @media only screen and (max-width: 600px) {
    width: 100% !important;
  }
`;

export { SimpleCard };
