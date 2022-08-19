import styled from "styled-components";
import Header from "./Header";

const Signin = () => {
  return (<Wrapper>
  <Header />
  <SignInBlock>
  Sign in
  </SignInBlock>

  </Wrapper>)
};


export default Signin


const Wrapper = styled.div`
background-color:yellow;

`
const SignInBlock = styled.div`
position:relative;
top: var(--header-height);
display:block;
`