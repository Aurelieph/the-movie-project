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
      
        {/* <h1 className={"yellow"}> WHAT2WATCH</h1> */}
        <h1 > <Title to="/" className={"yellow"}>WHAT2WATCH</Title></h1>
      
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
    & .yellow{
      color:yellow;
    }
    
  }
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled(NavLink)`
  margin-left: 50px;
  color: yellow;
  text-decoration: none;
  font-size: 30px;
  -webkit-text-stroke: 1px black;
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
  text-decoration: none;
  padding: 5px 0;
  color:gray;
  font-weight:bold;
  &:hover {
    color: yellow;
    /* font-size: 24px; */
    border-bottom: 4px solid yellow;
    &.active {
    border-bottom: 4px solid yellow;
  }
  }
  &.active {
    color:inherit;
    border-bottom: 5px solid yellow;
  }
`;
const LinkSpace = styled.div`
  width: 150px;
  text-align: center;
  padding: 0;
`;
