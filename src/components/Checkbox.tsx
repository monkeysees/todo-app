import styled from "styled-components";

export default styled.input`
  appearance: none;

  /* For iOS < 15 to remove gradient background */
  background-color: #fff;

  /* Not removed via appearance */
  display: grid;
  place-content: center;
  place-self: center;
  margin: 0;
  margin-top: 2px;
  font: inherit;
  color: currentcolor;
  width: 2.4rem;
  height: 2.4rem;
  border: 1px solid #e0e0e0;
  border-radius: 50%;
  transform: translateY(-0.075em);

  &::before {
    content: "";
    margin-top: 2px;
    width: 1.2rem;
    height: 1.2rem;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1rem 1rem #4caf50;
    transform-origin: bottom left;
    clip-path: polygon(41% 87%, 94% 1%, 98% 5%, 42% 95%, 0 56%, 0 49%);
  }

  &:checked {
    border-color: #4caf50;
  }

  &:checked::before {
    transform: scale(1);

    /* Windows High Contrast Mode */
    background-color: CanvasText;
  }

  &:focus-visible {
    outline: 1px solid #e0e0e0;
    outline-offset: 2px;
  }

  &:checked:focus-visible {
    outline-color: #4caf50;
  }
`;
