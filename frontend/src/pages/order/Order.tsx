import {
  AnswerWrapper,
  Container,
  ContentWrapper,
  EntryContainer,
  FloatingContainer,
  Form,
  Header,
  Main,
  PriceText,
  PriceTitleText,
  PriceWrapper,
  QuestionsWrapper,
  StyledSpinner,
  SubmitButtonWrappper,
  TitleText,
} from "./Order.styles";
import SubmitButton from "../../components/submitButton/SubmitButton";
import TextField from "../../components/textField/TextField";
import { useAuth } from "../../auth/authContext";
import { MenuItem, ToggleButtonGroup } from "@mui/material";
import ToggleButton from "../../components/toggleButton/ToggleButton";
import Switch from "../../components/switch/Switch";
import {
  cities,
  ORDER_VARIANTS,
  type NewOrder,
  type OrderVariants,
} from "../../types/order";
import { Controller, useForm, useWatch } from "react-hook-form";
import useEstimatedPrice from "../../hooks/useEstimatedPrice";
import { addNewOrder } from "../../api/orderApi";
import useSnackbar from "../../hooks/useSnackbar";
import { useNavigate } from "react-router-dom";

const EstimatedPrice = ({ control }: any) => {
  const [quantity, city, pickup, address, variant] = useWatch({
    control,
    name: ["quantity", "city", "pickup", "address", "variant"],
  }) as [number, string, boolean, string, OrderVariants];

  const { value: estimatedPrice, isLoading: estimatedPriceLoading } =
    useEstimatedPrice(quantity, city, variant, pickup, address);

  return (
    <>
      <PriceTitleText>Estimated price:</PriceTitleText>
      {estimatedPriceLoading ? (
        <StyledSpinner size={20} />
      ) : (
        <PriceText>{estimatedPrice} €</PriceText>
      )}
    </>
  );
};

const Order = () => {
  const { user } = useAuth();

  const initialOrderValue: NewOrder = {
    pickup: false,
    quantity: 1,
    city: "vienna",
    address: "",
    variant: ORDER_VARIANTS.ECONOMY,
    comment: "",
  };

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initialOrderValue, mode: "onSubmit" });

  const navigate = useNavigate();

  const [pickup] = useWatch({
    control,
    name: ["pickup"],
  });

  const { showError, SnackbarElement } = useSnackbar();

  const onSubmit = async (values: NewOrder) => {
    await addNewOrder(values)
      .then((order) => {
        navigate("/order-success", { state: { order: order } });
      })
      .catch((e) => showError(e.message));
  };

  return (
    <Container>
      <ContentWrapper>
        <Header>
          <TitleText>Order a new cleaning</TitleText>
        </Header>

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Main>
            <EntryContainer>
              <QuestionsWrapper>Your name</QuestionsWrapper>
              <AnswerWrapper>
                <TextField
                  placeholder="name"
                  value={user?.name}
                  disabled
                  fullWidth
                />
              </AnswerWrapper>
            </EntryContainer>

            <EntryContainer>
              <QuestionsWrapper>Number of items</QuestionsWrapper>
              <AnswerWrapper>
                <TextField
                  placeholder="Quantity"
                  type="number"
                  {...register("quantity", {
                    valueAsNumber: true,
                    required: "number of quantity must be filled",
                    min: {
                      value: 1,
                      message: "Quantity must be greater than 1",
                    },
                  })}
                  error={!!errors.quantity}
                  helperText={errors.quantity?.message}
                  fullWidth
                />
              </AnswerWrapper>
            </EntryContainer>

            <EntryContainer>
              <QuestionsWrapper>Choose your package</QuestionsWrapper>
              <AnswerWrapper>
                <Controller
                  name="variant"
                  control={control}
                  render={({ field }) => (
                    <ToggleButtonGroup
                      value={field.value}
                      exclusive
                      onChange={(_, val) => val && field.onChange(val)}
                      aria-label="package"
                    >
                      {(
                        Object.keys(
                          ORDER_VARIANTS
                        ) as (keyof typeof ORDER_VARIANTS)[]
                      ).map((key) => (
                        <ToggleButton
                          key={key}
                          value={ORDER_VARIANTS[key]}
                          aria-label={key}
                        >
                          {key}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup>
                  )}
                />
              </AnswerWrapper>
            </EntryContainer>

            <EntryContainer>
              <QuestionsWrapper>City</QuestionsWrapper>
              <AnswerWrapper>
                <Controller
                  name="city"
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        setValue("address", "");
                      }}
                      fullWidth
                      select
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    >
                      {cities.map((city) => (
                        <MenuItem key={city.value} value={city.value}>
                          {city.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </AnswerWrapper>
            </EntryContainer>

            <EntryContainer>
              <QuestionsWrapper>
                Do you need pickup and delivery?
              </QuestionsWrapper>
              <AnswerWrapper>
                <Controller
                  name="pickup"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      checked={field.value}
                      onChange={(_, checked) => {
                        setValue("address", "");
                        field.onChange(checked);
                      }}
                    />
                  )}
                />
              </AnswerWrapper>
            </EntryContainer>

            <EntryContainer>
              <QuestionsWrapper>Address</QuestionsWrapper>
              <AnswerWrapper>
                <TextField
                  placeholder="Address"
                  disabled={!pickup}
                  fullWidth
                  {...register("address", {
                    validate: (value) =>
                      pickup && !value ? "Address is required" : true,
                  })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                />
              </AnswerWrapper>
            </EntryContainer>

            <EntryContainer>
              <QuestionsWrapper>comment</QuestionsWrapper>
              <AnswerWrapper>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  {...register("comment")}
                />
              </AnswerWrapper>
            </EntryContainer>
          </Main>

          <FloatingContainer>
            <PriceWrapper>
              <EstimatedPrice control={control} />
            </PriceWrapper>

            <SubmitButtonWrappper>
              <SubmitButton type="submit">Order</SubmitButton>
            </SubmitButtonWrappper>
          </FloatingContainer>
        </Form>
      </ContentWrapper>

      {SnackbarElement}
    </Container>
  );
};

export default Order;
