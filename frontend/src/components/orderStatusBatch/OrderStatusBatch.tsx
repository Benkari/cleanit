import React from "react";
import type { OrderStatus } from "../../types/order";
import { Container, Dot } from "./OrderStatusBatch.styles";

interface Props {
  status: OrderStatus;
}

interface colors {
  primary: string;
  secondary: string;
}

const getStatusText = (status: OrderStatus): string => {
  switch (status) {
    case "delivered":
      return "Delivered";

    case "in_process":
      return "In process";

    case "dispatched":
      return "Dispatched";

    case "ready":
      return "Ready";
  }
};

const getStatusColor = (status: OrderStatus): colors => {
  switch (status) {
    case "delivered":
      return { primary: "#575353", secondary: "#f5f5f5" };

    case "in_process":
      return { primary: "#3c3f91", secondary: "#f0f0ff" };

    case "dispatched":
      return { primary: "#998108", secondary: "#fffbe8" };

    case "ready":
      return { primary: "#05856b", secondary: "#f0fff4" };
  }
};

const OrderStatusBatch: React.FC<Props> = ({ status }) => {
  const color = getStatusColor(status);

  if (!color) return "";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <Container primary={color.primary} secondary={color.secondary}>
        <Dot color={color.primary} />
        {getStatusText(status)}
      </Container>
    </div>
  );
};

export default OrderStatusBatch;
