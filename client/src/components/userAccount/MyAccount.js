import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useContext } from "react";
import styled from "styled-components";
import { GlobalContext } from "../GlobalContext";
import Header from "../Header";
import { useNavigate } from 'react-router-dom';
const MyAccount = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const { currentUser, setCurrentUser } = useContext(GlobalContext);
  let navigate = useNavigate();

  useEffect(() => {}, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const { firstName, lastName, nickName, email ,watching} = e.target.elements;
    const data = {
      firstName: firstName?.value,
      lastName: lastName?.value,
      email: email?.value,
      nickName: nickName?.value,
      token: user.sub,
      watching:watching?.value
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
        if (json.status === 201||json.status === 200) {
          setCurrentUser(json.data);
          navigate(`/profile/${currentUser._id}`)
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <Header />
      {isAuthenticated && (
        <Wrapper>
{          console.log("user",currentUser)
}          <Title>Please confirm your informations</Title>
          <Form onSubmit={handleSignUp}>
            <Label htmlFor="nickName"> Username</Label>
            <Input
              id="nickName"
              name="nickName"
              key={currentUser?.nickName? currentUser.nickName : user?.nickname}
              defaultValue={ currentUser?.nickName? currentUser.nickName : user?.nickname}
              />
            <Label htmlFor="firstName" className="firstName">
              First Name
            </Label>
            <Input
              id="firstName"
              name="firstName"
              key={currentUser?.firstName? currentUser.firstName : user?.given_name}
              defaultValue={
                currentUser?.firstName? currentUser.firstName : user?.given_name
              }
              />
            <Label htmlFor="lastName"> Name</Label>
            <Input
              id="lastName"
              name="lastName"
              key={currentUser?.lastName? currentUser.lastName : user?.family_name}
              defaultValue={
                currentUser?.lastName? currentUser.lastName : user?.family_name
              }
              />
            <Label htmlFor="email"> email</Label>
            <Input
              id="email"
              name="email"
              key={currentUser?.email? currentUser.email : user?.email}
              defaultValue={currentUser?.email? currentUser.email : user?.email}
            />
            <Label htmlFor="watching"> What are you currently watching?</Label>
            <Input
              id="watching"
              name="watching"
              key={currentUser?.watching}
              defaultValue={currentUser?.watching}
            />
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
