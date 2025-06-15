import styled from "styled-components";

export const MemberWrapper = styled.div<{ selected?: boolean }>`
  padding: 5px 12px;
  border-radius: 16px;
  background: #e0f2fe;
  border: 1px solid ${(props) => (props.selected ? "#3b82f6" : "#7dd3fc")};
  color: #0c4a6e;
  font-size: 12px;
  font-weight: 500;
  text-align: center;
`;
