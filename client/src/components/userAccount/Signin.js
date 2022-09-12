import styled from "styled-components";
import Header from "../Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Signin = () => {
  const { isAuthenticated } = useAuth0();
  const { loginWithRedirect } = useAuth0();
  useEffect(()=>{
    loginWithRedirect()
  },[])
  return (
    <div>
      <Header />
      <Wrapper>
        <LoginButton />
      </Wrapper>
    </div>
  );
};

export default Signin;

const Wrapper = styled.div`
  top: var(--header-height);
  width:100%;

`;

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <Button onClick={() => loginWithRedirect()}>Log In</Button>;
};
const Button = styled.button`
margin:100px auto;
display: block;
`