import {
  Box,
  CircularProgress,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export const Conatiner = styled(TableContainer)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  padding: 20px;
`;

export const LoadingContainer = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const TitleText = styled(Typography)`
  font-size: 18px;
  font-weight: 600;
  color: #5c5c5c;
`;

export const SubtitleText = styled(Typography)`
  font-size: 12px;
  font-weight: 600;
  color: #9d9d9dff;
`;

export const StyledTable = styled(Table)`
  border-radius: 16px;
`;

export const StyledTableHead = styled(TableHead)`
  background-color: #f9f9f9;
  border: none;
  border-radius: 16px;
`;
export const StyledTableRow = styled(TableRow)`
  border: solid 1px ${({ theme }) => theme.palette.secondary.light};
  border-radius: 16px;
`;

export const StyledTableCell = styled(TableCell)`
  border: "none";
  border-bottom: solid 1px ${({ theme }) => theme.palette.secondary.light};
`;

export const StyledTableBody = styled(TableBody)`
  border-radius: 16px;
`;

export const StyledSpinner = styled(CircularProgress)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
