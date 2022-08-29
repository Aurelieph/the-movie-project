import styled from "styled-components";
import Header from "./Header";
import { useAuth0 } from "@auth0/auth0-react";

const Signin = () => {
  return (
    <div>
      <Header />
      <Wrapper>
        <LoginButton />
        <LogoutButton/>
      </Wrapper>
    </div>
  );
};

export default Signin;

const Wrapper = styled.div`
  position: absolute;
  top: var(--header-height);
  display: block;
  background-color: blue;
`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Log In</button>;
};

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </button>
  );
};

