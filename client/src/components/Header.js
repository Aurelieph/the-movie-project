import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return(
    
    <Wrapper>
      <HeaderBlock>
      <NavLink to="/">
        <Title>
          WHAT 2WATCH
        </Title>
        
        </NavLink>
        <NavLink
            to="/profile/1"
            style={({ isActive }) =>
              isActive ? {
                backgroundColor: "beige",
                color:"red",
              } : undefined
            }
          >
                        Profile
          </NavLink>
        <NavLink
            to="/signin"
            // style={({ isActive }) =>
            //   isActive ? activeStyle : undefined
            // }
          >
                        Sign In
          </NavLink>
        </HeaderBlock>
        </Wrapper>
  )
};

export default Header

const Wrapper = styled.div`
position:absolute;
height:100vh;
z-index:100;
`
const HeaderBlock = styled.div`
background-color: rgba(220, 220, 220, 0.4);
height:var(--header-height);
position: sticky;
    top: 0;
z-index:100;
`
const Title = styled.h1`
padding: 20px  ;
`