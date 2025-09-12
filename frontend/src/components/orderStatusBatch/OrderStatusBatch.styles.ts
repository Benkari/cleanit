import { Box, styled } from "@mui/material";

export const Container = styled(Box)<{ primary: string; secondary: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 3px 10px;
  border-radius: 10px;
  border: none;
  max-width: 120px;
  background-color: ${({ secondary }) => secondary};
  color: ${({ primary }) => primary};
  font-size: 12px;
  font-weight: 500;
`;

export const Dot = styled(Box)<{ color: string }>`
  display: flex;
  border-radius: 50%;
  width: 6px;
  height: 6px;
  background-color: ${({ color }) => color};
`;
