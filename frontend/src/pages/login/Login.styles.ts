import { Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

export const Container = styled(Box)`
  display: flex;
  flex: 1;
  height: 100vh;
  height: 100svh;
`;

export const ContentWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  flex: 2;
`;

export const ContentHeader = styled(Box)`
  display: flex;
  width: 100%;
`;

export const LogoText = styled("span")`
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  font-size: 2rem;
  letter-spacing: 0.05em;
  background: linear-gradient(90deg, #ff8a00, #ff006b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
  text-shadow: 1px 1px 35px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

export const ContenBody = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 50px;
  max-width: 460px;
`;

export const TextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const FormWrapper = styled("form")`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 20px;
`;

export const TitleText = styled(Typography)`
  font-size: 32px;
  font-weight: 500;
`;

export const SubtitleText = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const ContentFooter = styled(Box)`
  display: flex;
`;

export const FooterText = styled(Typography)`
  font-size: 12px;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const InfoWrapper = styled(Box)`
  position: relative;
  display: flex;
  flex: 1;
  background-image: url("https://thumbs.dreamstime.com/b/grainy-gradient-vertical-background-turquoise-magenta-orange-vibrant-glowing-mobile-wallpaper-backdrop-design-290293177.jpg");
  background-size: cover;

  ::after {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgb(0, 0, 0, 0.4);
    backdrop-filter: blur(0px);
  }
`;
