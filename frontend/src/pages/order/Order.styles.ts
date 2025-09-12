import { Box, CircularProgress, styled, Typography } from "@mui/material";

export const Container = styled(Box)`
  display: flex;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  flex: 1;
  min-height: calc(100svh - 70px);
  justify-content: center;
  align-items: flex-start;
`;

export const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 640px;
  height: 100%;
`;

export const Header = styled(Box)`
  display: flex;
  padding: 30px 0;
`;

export const TitleText = styled(Typography)`
  font-size: 24px;
  font-weight: 600;
  color: #636363;
`;

export const Form = styled("form")`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Main = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 72px;
  flex: 1;
`;

export const EntryContainer = styled(Box)`
  display: flex;
  gap: 10px;
`;

export const QuestionsWrapper = styled(Box)`
  display: flex;
  flex: 1;
`;

export const AnswerWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex: 2;
`;

export const FloatingContainer = styled(Box)`
  position: sticky;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  border-top: solid 1px ${({ theme }) => theme.palette.secondary.dark};
  background-color: ${({ theme }) => theme.palette.secondary.light};
`;

export const SubmitButtonWrappper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  max-width: 340px;
  flex: 1;
`;

export const PriceWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export const PriceTitleText = styled(Typography)`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const PriceText = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const StyledSpinner = styled(CircularProgress)`
  color: ${({ theme }) => theme.palette.text.secondary};
`;
