import styled from "styled-components";
import Header from "./Header";

const Signin = () => {
  return (
    <div>
      <Header />
      <Wrapper>Sign in</Wrapper>
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
