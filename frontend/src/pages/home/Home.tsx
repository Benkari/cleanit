import { useNavigate } from "react-router-dom";
import SubmitButton from "../../components/submitButton/SubmitButton";
import {
  Container,
  HeroSubtitleText,
  HeroWrapper,
  LeftFooterWrapper,
  LeftWrapper,
  LightSubmitButton,
  NavigationWarpper,
  RightWrapper,
  TitleText,
} from "./Home.styles";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <HeroWrapper>
        <LeftWrapper>
          <TitleText>
            Fresh, Clean, and Comfortable Fabrics Every Single Time.
          </TitleText>

          <LeftFooterWrapper>
            <HeroSubtitleText>
              If you’re a customer, place your order in just a few clicks and
              track it easily. Managers can access the overview to handle
              orders, customers, and workflows efficiently.
            </HeroSubtitleText>
            <NavigationWarpper>
              <SubmitButton onClick={() => navigate("order")}>
                Request cleaning
              </SubmitButton>
              <LightSubmitButton onClick={() => navigate("shop-orders")}>
                Manager portal
              </LightSubmitButton>
            </NavigationWarpper>
          </LeftFooterWrapper>
        </LeftWrapper>
        <RightWrapper />
      </HeroWrapper>
    </Container>
  );
};

export default Home;
