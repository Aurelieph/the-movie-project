import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { GlobalContext } from "./GlobalContext";

const Header = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const { currentUser } = useContext(GlobalContext);
  return (
    <HeaderBlock className="HeaderBlock">
      <Title to="/">
        <h1>WHAT2WATCH</h1>
      </Title>
      {!isLoading && (
        <Menu>
          {isAuthenticated ? (
            <>
              <LinkSpace>
                <StyledNavlink to={`/profile/${currentUser?._id}`}>
                  PROFILE
                </StyledNavlink>
              </LinkSpace>
              <LinkSpace>
                <StyledNavlink to="/account">ACCOUNT</StyledNavlink>
              </LinkSpace>
              <LinkSpace>
                <StyledNavlink to="/friends">FRIENDS</StyledNavlink>
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
      )}
    </HeaderBlock>
  );
};

export default Header;

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
  padding: 5px 0;
  &:hover {
    font-size: 24px;
  }
  &.active {
    border-bottom: 1px solid black;
  }
`;
const LinkSpace = styled.div`
  width: 150px;
  text-align: center;
  padding: 0;
`;
