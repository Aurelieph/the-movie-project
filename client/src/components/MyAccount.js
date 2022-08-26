import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import CreationProfile from "./CreationProfile";
import Header from "./Header";
const MyAccount = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const { firstName, lastName, nickName, email } = e.target.elements;
    const data = {
      firstName: firstName?.value,
      lastName: lastName?.value,
      email: email?.value,
      nickName: nickName?.value,
      id: user.sub,
    };

    console.log(data);
    await fetch("/signup/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // body: JSON.stringify(data),
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => console.log(err));


    // const fetchData = await response.json();
    // e.target.reset();
    // if (fetchData.status === 200) {
    //   setError(false);
    //   setSuccess(true);
    // } else {
    //   setSuccess(false);
    //   setError(true);
    // }
  };

  return (
    <div>
      <Header />
      {isAuthenticated && (
        <Wrapper>
          <Title>Please confirm your informations</Title>
          <Form onSubmit={handleSignUp}>
            {console.log(user)}
            <Label htmlFor="nickName"> Username</Label>
            <Input id="nickName" name="nickName" defaultValue={user.nickname}/>
            <Label htmlFor="firstName" className="firstName">First Name</Label>
            <Input id="firstName" name="firstName" defaultValue={user.given_name}/>
            <Label htmlFor="lastName"> Name</Label>
            <Input id="lastName" name="lastName" defaultValue={user.family_name}/>
            <Label htmlFor="email"> email</Label>
            <Input id="email" name="email" defaultValue={user.email} />
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
  };`;
const Input = styled.input`
margin-bottom:5px;

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
margin-top:50px;
font-size:20px;
`;
const Wrapper = styled.div`
  margin: auto;
  width: 500px;
`;
