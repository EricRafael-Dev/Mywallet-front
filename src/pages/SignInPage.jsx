import { useState } from "react";
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios";
import { LoginContext } from "../Contexts/LoginContext";
import { useContext, React } from "react";


export default function SignInPage() {
  
  const { login, setLogin, setScreen3, setUser } = useContext(LoginContext);

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
      setUser(res.data.nome);
      setScreen3(true);
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
        <input placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input placeholder="password" type="password" autoComplete="new-password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>

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