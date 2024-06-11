import styled from "styled-components";

export default styled.button`
  max-width: max-content;
  display: grid;
  place-content: center;
  padding: 0.4rem 0.8rem;
  background: transparent;
  border: none;
  border-radius: 0.2rem;
  outline: none;
  color: inherit;
  font-size: inherit;
  transition: 150ms opacity ease-in-out;

  &:hover {
    opacity: 0.7;
  }

  &:focus-visible {
    outline: 1px solid #bdbdbd;
    outline-offset: 2px;
  }
`;
