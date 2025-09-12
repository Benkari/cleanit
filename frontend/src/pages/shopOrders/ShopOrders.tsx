import React from "react";
import type { Shop } from "../../types/shop";
import { getShopByUserId } from "../../api/userApi";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "../../types/order";
import { getOrdersByShopId } from "../../api/orderApi";
import {
  Conatiner,
  LoadingContainer,
  StyledTable,
  StyledTableBody,
  StyledTableCell,
  StyledTableHead,
  StyledTableRow,
  SubtitleText,
  TitleText,
  StyledSpinner,
} from "./shopOrders.styles";
import OrderStatusBatch from "../../components/orderStatusBatch/OrderStatusBatch";
import useSnackbar from "../../hooks/useSnackbar";
import { useAuth } from "../../auth/authContext";
import { Navigate } from "react-router-dom";

const ShopOrders: React.FC = () => {
  const { showError, SnackbarElement } = useSnackbar();

  const { user } = useAuth();
  const userIsManager = user?.role === "manager";

  const {
    data: managersShop,
    error,
    isLoading,
  } = useQuery<Shop>({
    queryKey: ["shop"],
    queryFn: getShopByUserId,
    enabled: userIsManager,
  });

  const shopId = managersShop?.id ?? null;

  const {
    data: orders,
    error: ordersError,
    isLoading: orderIsLoading,
  } = useQuery<Order[]>({
    queryKey: ["orders", "shop"],
    queryFn: () => getOrdersByShopId(shopId!),
    enabled: !!shopId,
  });

  const rows = [
    "Date",
    "Customer",
    "Fullfilement",
    "quantity",
    "price",
    "variant",
    "status",
  ];

  React.useEffect(() => {
    if (!error && !ordersError) return;

    showError("Failed to load shop orders");
  }, [error, ordersError, showError]);

  if (user?.role !== "manager") return <Navigate to="/" replace />;

  if (isLoading || orderIsLoading)
    return (
      <LoadingContainer>
        <StyledSpinner />
      </LoadingContainer>
    );

  return (
    <Conatiner>
      <TitleText>Orders for store: {managersShop?.name}</TitleText>
      <SubtitleText>{managersShop?.address}</SubtitleText>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            <StyledTableCell>Order</StyledTableCell>
            {rows.map((row) => (
              <StyledTableCell key={row}>{row}</StyledTableCell>
            ))}
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {orders?.map((order) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell align="left">
                #{String(order.id).slice(0, 4)}
              </StyledTableCell>

              <StyledTableCell align="left">
                {new Intl.DateTimeFormat("de-AT", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                }).format(new Date(order.created_at))}
              </StyledTableCell>

              <StyledTableCell align="left">
                {order.customer.name}
              </StyledTableCell>

              <StyledTableCell align="left">
                {order.pickup ? <>Pickup</> : <>Delievery</>}
              </StyledTableCell>

              <StyledTableCell align="left">
                {`${order.quantity} ${order.quantity > 1 ? "items" : "item"}`}
              </StyledTableCell>

              <StyledTableCell align="left">{order.price} €</StyledTableCell>

              <StyledTableCell align="left">{order.variant}</StyledTableCell>

              <StyledTableCell align="left">
                <OrderStatusBatch status={order.status} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>

      {SnackbarElement}
    </Conatiner>
  );
};

export default ShopOrders;
