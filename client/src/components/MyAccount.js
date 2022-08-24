import { useAuth0 } from "@auth0/auth0-react";
import styled from "styled-components";
import CreationProfile from "./CreationProfile";
import Header from "./Header";
const MyAccount = () =>{
  const { user, isAuthenticated, isLoading } = useAuth0();
  const sendInfos =()=>{
    console.log("send")
  }
  return(<div>
    <Header />{          isAuthenticated && (
    <div>
      <Form>

      </Form>
      {console.log(user)}
      <Label> First Name
        <Input defaultValue={user.given_name}/>
        </Label>
      <Label> Name
        <Input defaultValue={user.family_name}/>
        </Label>
      <Label> Username
        <Input defaultValue={user.nickname}/>
        </Label>
      <Label> email
        <Input defaultValue={user.email}/>
        </Label>
      <CreationProfile/>
    </div>
  )}</div>)
}

export default MyAccount

const Label = styled.label`
`
const Form = styled.form`
`
const Input = styled.input`
`