import { getEstimatedPrice } from "../api/estimatePrice";
import React from "react";
import type { NewOrder, OrderVariants } from "../types/order";

interface Output {
  value: number;
  isLoading: boolean;
}

const useEstimatedPrice = (
  quantity: number,
  city: string,
  variant: OrderVariants,
  pickup: boolean,
  address: string
): Output => {
  const [data, setData] = React.useState<number>(0);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  const delayInMs = 500;

  React.useEffect(() => {
    if (pickup && address === "") return;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const newOrder = {
        quantity,
        city,
        variant,
        pickup,
        address,
      } as NewOrder;
      const fetchedData = await getEstimatedPrice(newOrder);
      setData(fetchedData);
      setIsLoading(false);
    }, delayInMs);

    return () => clearTimeout(timer);
  }, [quantity, city, variant, address, pickup]);

  return {
    value: data ?? 0,
    isLoading,
  };
};

export default useEstimatedPrice;
