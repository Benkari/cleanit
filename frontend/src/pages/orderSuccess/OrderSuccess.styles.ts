import { Box, styled, Typography } from "@mui/material";

export const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  height: calc(100svh - 70px);
  justify-content: center;
  align-items: center;
  gap: 40px;
  transform: translateY(-5%);
`;

export const TitleContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 540px;
  text-align: center;
`;

export const TitleText = styled(Typography)`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
`;

export const SubtitleText = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
  color: #a8a8a8;
`;

export const ShopInfoWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 5px;
`;

export const ShopInfoText = styled(Typography)`
  font-size: 14px;
  font-weight: 600;
  color: #373737ff;
`;

export const ButtonWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 420px;
`;
