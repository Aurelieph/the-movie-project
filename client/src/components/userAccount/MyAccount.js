import { useAuth0 } from '@auth0/auth0-react'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { GlobalContext } from '../GlobalContext'
import styled from 'styled-components'
import Header from '../Header'
const MyAccount = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()
  const { currentUser, setCurrentUser } = useContext(GlobalContext)
  let navigate = useNavigate()

  const handleSignUp = async e => {
    e.preventDefault()
    const { firstName, lastName, nickName, email, watching } = e.target.elements
    const data = {
      firstName: firstName?.value,
      lastName: lastName?.value,
      email: email?.value,
      nickName: nickName?.value,
      token: user.sub,
      watching: watching?.value
    }
    await fetch('/signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(json => {
        if (json.status === 201 || json.status === 200) {
          setCurrentUser(json.data)
          navigate(`/profile/${currentUser._id}`)
        }
      })
      .catch(err => console.log(err))
  }

  return (
    <div>
      <Header />
      {isAuthenticated && (
        <>
          <Wrapper>
            <Title>Please confirm your informations</Title>
          </Wrapper>
          <Wrapper>
            <Form onSubmit={handleSignUp}>
              <Label htmlFor='nickName'> Username</Label>
              <Input
                id='nickName'
                name='nickName'
                key={
                  currentUser?.nickName ? currentUser.nickName : user?.nickname
                }
                defaultValue={
                  currentUser?.nickName ? currentUser.nickName : user?.nickname
                }
              />
              <Label htmlFor='firstName' className='firstName'>
                First Name
              </Label>
              <Input
                id='firstName'
                name='firstName'
                key={
                  currentUser?.firstName
                    ? currentUser.firstName
                    : user?.given_name
                }
                defaultValue={
                  currentUser?.firstName
                    ? currentUser.firstName
                    : user?.given_name
                }
              />
              <Label htmlFor='lastName'> Name</Label>
              <Input
                id='lastName'
                name='lastName'
                key={
                  currentUser?.lastName
                    ? currentUser.lastName
                    : user?.family_name
                }
                defaultValue={
                  currentUser?.lastName
                    ? currentUser.lastName
                    : user?.family_name
                }
              />
              <Label htmlFor='email'> email</Label>
              <Input
                id='email'
                name='email'
                key={currentUser?.email ? currentUser.email : user?.email}
                defaultValue={
                  currentUser?.email ? currentUser.email : user?.email
                }
              />
              <Label htmlFor='watching' className='watching'>
                {' '}
                What are you currently watching?
              </Label>
              <Input
                id='watching'
                name='watching'
                key={currentUser?.watching}
                defaultValue={currentUser?.watching}
              />
              <Button type='submit'>Validate/Update</Button>
            </Form>
          </Wrapper>
        </>
      )}
    </div>
  )
}

export default MyAccount

const Label = styled.label`
margin:10px 0;
  &.firstName {
    margin-top: 20px;
  }
  &.watching {
    margin-top: 20px;
  }
`
const Input = styled.input`
  margin-bottom: 5px;
`
const Form = styled.form`
  /* background-color: rgb(var(--primary-color)); */
  border:2px solid rgb(var(--primary-color));
  border-radius:20px;
  width: 100%;
  margin: auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -40px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`
const Title = styled.h2`
  width: 400px;
  /* margin: auto; */
  margin-top: 50px;
  font-size: 20px;
  color:gray;
  /* -webkit-text-stroke: 1px yellow; */
`
const Wrapper = styled.div`
  margin: auto;
  width: 500px;
`
const Button = styled.button`
font-size:18px;
color:gray;
`
