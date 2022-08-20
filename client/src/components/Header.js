import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Header = () => {
  return (
    <div>
      <Wrapper className="WrapperHeader">
        <HeaderBlock className="HeaderBlock">
          <Title to="/">
            <h1>WHAT2WATCH</h1>
          </Title>
          <Menu>
            
            <LinkSpace>
            <StyledNavlink
              to="/profile/1"
              style={({ isActive }) =>
                isActive
                  ? {
                      backgroundColor: "beige",
                      color: "red",
                    }
                  : undefined
              }
            >
              PROFILE
            </StyledNavlink>
            </LinkSpace>
            <LinkSpace>
            <StyledNavlink
              to="/signin"
              // style={({ isActive }) =>
              //   isActive ? activeStyle : undefined
              // }
            >
              SIGN IN
            </StyledNavlink>
            </LinkSpace>
          </Menu>
        </HeaderBlock>
      </Wrapper>
    </div>
  );
};

export default Header;

const Wrapper = styled.div`
  position: relative;
  height: 80vh;
  z-index: 10;
  margin: 0;
  width: 100vw;
  max-width: 100%;
`;

const HeaderBlock = styled.div`
  @keyframes opacity-in {
    from {
      background-color: rgba(var(--primary-color), 0.4);
    }
    to {
      background-color: rgba(var(--primary-color), 0.8);
    }
  }
  @keyframes opacity-out {
    from {
      background-color: rgba(var(--primary-color), 0.8);
    }
    to {
      background-color: rgba(var(--primary-color), 0.4);
    }
  }
  height: var(--header-height);
  position: sticky;
  top: 0;
  z-index: 12;
  width: 100vw;
  max-width: 100%;
  margin: 0;
  animation: opacity-out 500ms;
  animation-fill-mode: forwards;
  &:hover {
    animation-name: opacity-in;
    animation-duration: 500ms;
    animation-fill-mode: forwards;
  }
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(NavLink)`
margin-left:50px;
  color: inherit;
  text-decoration: none;
  font-size:30px;
`;
const Menu = styled.div`
  /* margin-right: 50px; */
  display: flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;
`;

const StyledNavlink = styled(NavLink)`
width:200px;
  color: inherit;
  text-decoration: none;

  &:hover{
    font-size:24px;
  }
`;
const LinkSpace = styled.div`
width:150px;
text-align:center;
padding:0;
`;
