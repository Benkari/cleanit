import { Box, styled, Typography } from "@mui/material";
import SubmitButton from "../../components/submitButton/SubmitButton";

export const Container = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: calc(100svh - 65px);
`;

export const HeroWrapper = styled(Box)`
  display: flex;
  flex-direction: row;
  flex: 1;
  max-width: 940px;
  height: 100%;
`;

export const LeftWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  flex: 1;
  height: 100%;
  padding: 50px 0;
`;

export const TitleText = styled(Typography)`
  font-size: 42px;
  font-weight: 600;
`;

export const LeftFooterWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const NavigationWarpper = styled(Box)`
  display: flex;
  flex-direction: row;
  gap: 10px;
  flex: 1;
`;

export const HeroSubtitleText = styled(Typography)`
  font-size: 12px;
  font-weight: 400;
  color: #a6a6a6;
`;

export const LightSubmitButton = styled(SubmitButton)`
  background-color: #f0f0f0;
  color: #000;
`;

export const RightWrapper = styled(Box)`
  display: flex;
  flex: 1;
  height: 100%;
  padding: 20px 30px;

  &::after {
    content: "";
    display: flex;
    height: 100%;
    flex: 1;
    background-image: url("https://thumbs.dreamstime.com/b/grainy-gradient-vertical-background-turquoise-magenta-orange-vibrant-glowing-mobile-wallpaper-backdrop-design-290293177.jpg");
    background-size: cover;
    border-radius: 32px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;
