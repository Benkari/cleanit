import {
  Container,
  ContentWrapper,
  FormWrapper,
  ContentHeader,
  InfoWrapper,
  SubtitleText,
  TextWrapper,
  TitleText,
  ContenBody,
  ContentFooter,
  LogoText,
  FooterText,
} from "./Login.styles";
import TextField from "../../components/textField/TextField";
import SubmitButton from "../../components/submitButton/SubmitButton";
import { useForm } from "react-hook-form";
import { useAuth } from "../../auth/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { getUserInfoByUsername } from "../../api/userApi";
import useSnackbar from "../../hooks/useSnackbar";

type FormValues = {
  username: string;
  password: string;
};

const Login: React.FC = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();

  const { showError, SnackbarElement } = useSnackbar();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: { username: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const user = await getUserInfoByUsername(values.username);
      await login(user);
      navigate("/");
    } catch (e: any) {
      showError(e?.response.data.error);
      console.log(e);
    }
  };

  if (user) return <Navigate to="/" />;

  return (
    <Container>
      <ContentWrapper>
        <ContentHeader>
          <LogoText onClick={() => navigate("/")}>Clean It! AG</LogoText>
        </ContentHeader>

        <ContenBody>
          <TextWrapper>
            <TitleText>Welcome back!</TitleText>
            <SubtitleText>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
            </SubtitleText>
          </TextWrapper>

          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <TextField
              placeholder="Username"
              type="text"
              {...register("username", {
                required: "Username is required",
              })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              placeholder="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <SubmitButton type="submit" disabled={isSubmitting}>
              Sign in
            </SubmitButton>
          </FormWrapper>
        </ContenBody>

        <ContentFooter>
          <FooterText>No copyright reserved</FooterText>
        </ContentFooter>
      </ContentWrapper>

      <InfoWrapper />

      {SnackbarElement}
    </Container>
  );
};

export default Login;
