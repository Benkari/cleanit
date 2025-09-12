import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {
  ButtonWrapper,
  Container,
  ShopInfoText,
  ShopInfoWrapper,
  SubtitleText,
  TitleContainer,
  TitleText,
} from "./OrderSuccess.styles";
import QRCode from "react-qr-code";
import SubmitButton from "../../components/submitButton/SubmitButton";
import type { Order } from "../../types/order";

type LocationState = {
  order?: Partial<Order>;
};

const OrderSuccess = () => {
  const location = useLocation() as { state: LocationState };
  const { order } = location.state ?? {};

  const navigate = useNavigate();

  if (!order?.id) return <Navigate to="/" replace />;

  return (
    <Container>
      <TitleContainer>
        <TitleText>Thank you for choosing us</TitleText>

        <SubtitleText>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
          sed
        </SubtitleText>
      </TitleContainer>
      <QRCode value={order?.id} size={180} />

      <ShopInfoWrapper>
        <ShopInfoText>Our shop: {order?.shop?.name}</ShopInfoText>
        <ShopInfoText>
          at {order?.shop?.address} will take care of your request.
        </ShopInfoText>
      </ShopInfoWrapper>

      <ButtonWrapper>
        <SubmitButton onClick={() => navigate("/")}>Go back</SubmitButton>
      </ButtonWrapper>
    </Container>
  );
};

export default OrderSuccess;
