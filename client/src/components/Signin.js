import styled from "styled-components";
import Header from "./Header";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

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
