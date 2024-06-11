import styled from "styled-components";

export default styled.input`
  width: var(--app-width);
  height: 4.8rem;
  font-size: 2rem;
  font-family: inherit;
  padding: 0 4.8rem;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  box-shadow: inset 0 -0.4rem 0.8rem -0.5rem rgb(0 0 0 / 10%);
  line-height: 1;
  transition: 180ms border ease-in-out;

  &::placeholder {
    color: #bdbdbd;
    font-style: italic;
  }

  &:focus-visible {
    border-color: #9e9e9e;

    /* Windows High Contrast Mode */
    outline: 3px solid transparent;
  }
`;
