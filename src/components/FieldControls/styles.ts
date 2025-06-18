import styled from "styled-components";

export const FieldControlsWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

  button {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background: white;
    color: black; /* Явно задаём чёрный цвет текста */
    cursor: pointer;

    &:hover {
      background: #f5f5f5;
    }
  }

  span {
    color: black; /* Явно задаём чёрный цвет для текста */
    font-size: 14px;
    text-align: center;
  }
`;
