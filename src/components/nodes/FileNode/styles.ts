import styled from "styled-components";

export const FileWrapper = styled.div<{ selected?: boolean }>`
  padding: 15px 25px;
  border-radius: 8px;
  background: #ffffff;
  border: 1px solid ${(props) => (props.selected ? "#3b82f6" : "#e5e7eb")};
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  min-width: 170px;
  text-align: center;
  transition: all 0.2s ease-in-out;
`;

export const FileName = styled.div`
  font-weight: 600;
  color: #111827;
  font-size: 14px;
`;
