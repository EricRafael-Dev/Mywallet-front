import { useState } from "react";
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { LoginContext } from "../Contexts/LoginContext";
import { useContext, React } from "react";


export default function SignInPage() {
  
  const { login, setLogin } = useContext(LoginContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function sendInfo(e) {
    e.preventDefault();

    const obj = {
      email: email,
      password: password
    }
    
    axios.post(`${import.meta.env.VITE_API_URL}/`, obj)
    .then(res => {
      
      setLogin(res.data.token);

      localStorage.setItem("token", res.data.token);
      console.log(localStorage.getItem("token"))
      localStorage.setItem("user", res.data.nome);

      navigate("/home");

    })
    .catch(err => {
      console.log(obj)
      console.log(err, '...')
      alert('Usuário e/ou password inválidos!');
      console.log(err.response.data);
    });

  }

  return (
    <SingInContainer>
      <form onSubmit={sendInfo}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input data-test="password" placeholder="Senha" type="password" autoComplete="new-password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button data-test="sign-in-submit" type="submit">Entrar</button>

      </form>

      <Link to='/cadastro'>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}
const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`