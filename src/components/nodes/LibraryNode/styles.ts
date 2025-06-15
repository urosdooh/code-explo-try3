import styled from "styled-components";

export const LibraryWrapper = styled.div<{ selected?: boolean }>`
  padding: 10px 20px;
  border-radius: 4px;
  background: #fefce8;
  border: 1px dashed ${(props) => (props.selected ? "#eab308" : "#fde047")};
  color: #854d0e;
  text-align: center;
`;

export const LibraryName = styled.div`
  font-weight: 500;
  font-size: 13px;
  font-style: italic;
`;
