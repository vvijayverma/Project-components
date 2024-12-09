import React from 'react';


const Fullname = (WrappedComponent)=>{
   return function EnhancedComponent(props){
    return <WrappedComponent {...props}/>
   }
}
const Myname = (props)=>{
  return <h1>vijay {props?.name}</h1>
}
const Usernaem = Fullname(Myname) 

const Home = () => {
  return (
    <>
    <Usernaem name="verma"/>  
    <Myname/>
    <div>Home</div>
    <div>Home</div>
    <div>Home</div>
    </>
  )
}

export default Home