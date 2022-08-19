import bridesmaid from "./bridemaids.jpg"
import deadpool from "./deadpool.jpg"
import styled from "styled-components";
import Header from "./Header";


const Homepage = () =>{
return(
  <Wrapper>
        <Header/>
    <FirstImage src={deadpool}/>
  </Wrapper>
)
}

export default Homepage

const Wrapper = styled.div`

z-index:1;
top:0px;
`
const FirstImage = styled.img`
position:absolute;
width:100%;
z-index:2;
top:0px;
`