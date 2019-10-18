import React, {useState} from "react";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState("")

  const handleChanges = e => {
    setLogin({ ...login, [e.target.name] : e.target.value})
  }
  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      <form>
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
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
