import React, {useState} from "react";

const initialState = {
  username: "",
  password: ""
}
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState(initialState)

  const handleChanges = e => {
    setLogin({ ...login, [e.target.name] : e.target.value})
  }
  const handleSubmit = e => {
    e.preventDefault()
    console.log(login)
    setLogin(initialState)
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          name="username"
          placeholder="username"
          onChange={handleChanges}
        />
        <input 
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChanges}
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default Login;
