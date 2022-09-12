import styled from "styled-components";
import Header from "../Header";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const Signout = () => {
  const {isAuthenticated} = useAuth0();
  const { logout } = useAuth0();
  useEffect(()=>{
    logout({ returnTo: window.location.origin })
  },[])
  return (
    <div>
      <Header />
      <Wrapper>
        <LogoutButton/>
      </Wrapper>
    </div>
  );
};

export default Signout;

const Wrapper = styled.div`
  top: var(--header-height);
  width:100%;
`;

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button onClick={() => logout({ returnTo: window.location.origin })}>
      SIGN OUT
    </Button>
  );
};
const Button = styled.button`
margin:100px auto;
display: block;
`

