import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";

const Header = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser,setCurrentUser } = useContext(GlobalContext);
  return (
    // <Wrapper className="WrapperHeader">
    <HeaderBlock className="HeaderBlock">
      <Title to="/">
        <h1>WHAT2WATCH</h1>
      </Title>
      <Menu>
        {isAuthenticated ? (
          <>
            <LinkSpace>
              <StyledNavlink
                to={`/profile/${currentUser?._id}`}
                style={({ isActive }) =>
                  isActive
                    ? {
                        backgroundColor: "beige",
                        color: "red",
                      }
                    : { backgroundColor: "blue" }
                }
              >
                PROFILE
              </StyledNavlink>
            </LinkSpace>
            <LinkSpace>
              <StyledNavlink to="/account">ACCOUNT</StyledNavlink>
            </LinkSpace>
            <LinkSpace>
              <StyledNavlink to="/signout">SIGN OUT</StyledNavlink>
            </LinkSpace>
          </>
        ) : (
          <LinkSpace>
            <StyledNavlink to="/signin">SIGN IN</StyledNavlink>
          </LinkSpace>
        )}
      </Menu>
    </HeaderBlock>
    // </Wrapper>
  );
};

export default Header;

// const Wrapper = styled.div`

//   position: absolute;
//   height: 90vh;
//   top: 0;
//   margin: 0;
//   width: 100vw;
//   max-width: 100%;
//   z-index:2;
//   /* background-color:yellow; */
// `;

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
  margin-left: 50px;
  color: inherit;
  text-decoration: none;
  font-size: 30px;
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
  width: 200px;
  color: inherit;
  text-decoration: none;
  &:hover {
    font-size: 24px;
  }
`;
const LinkSpace = styled.div`
  width: 150px;
  text-align: center;
  padding: 0;
`;
