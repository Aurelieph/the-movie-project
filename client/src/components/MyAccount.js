import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import CreationProfile from "./CreationProfile";
import { GlobalContext } from "./GlobalContext";
import Header from "./Header";
const MyAccount = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser,setCurrentUser } = useContext(GlobalContext);


  useEffect(()=>{
    
  },[])

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { firstName, lastName, nickName, email } = e.target.elements;
    const data = {
      firstName: firstName?.value,
      lastName: lastName?.value,
      email: email?.value,
      nickName: nickName?.value,
      token: user.sub,
    };
    await fetch("/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.status === 200) {
          setCurrentUser(json.data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      {isAuthenticated && (
        <Wrapper>
          <Title>Please confirm your informations</Title>
          <Form onSubmit={handleSignUp}>
            {console.log("currentUser.nickName",currentUser?.nickName)}
            <Label htmlFor="nickName"> Username</Label>
            
            <Input id="nickName" name="nickName" key={currentUser?.nickName} defaultValue={currentUser?currentUser.nickName:user?.nickname} />
            <Label htmlFor="firstName" className="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              defaultValue={currentUser?currentUser.firstName:user?.given_name}
            />
            <Label htmlFor="lastName"> Name</Label>
            <Input
              id="lastName"
              name="lastName"
              defaultValue={currentUser?currentUser.lastName:user?.family_name}
            />
            <Label htmlFor="email"> email</Label>
            <Input id="email" name="email" defaultValue={currentUser?currentUser.email:user?.email} />
            <button type="submit">Validate/Update</button>
          </Form>
        </Wrapper>
      )}
    </div>
  );
};

export default MyAccount;

const Label = styled.label`
  &.firstName {
    margin-top: 20px;
  }
`;
const Input = styled.input`
  margin-bottom: 5px;
`;
const Form = styled.form`
  background-color: rgb(var(--primary-color));
  width: 400px;
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;
const Title = styled.h2`
  width: 400px;
  margin: auto;
  margin-top: 50px;
  font-size: 20px;
`;
const Wrapper = styled.div`
  margin: auto;
  width: 500px;
`;
