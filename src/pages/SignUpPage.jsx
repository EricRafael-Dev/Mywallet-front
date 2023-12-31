import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react";
import axios from "axios";
import dotenv from "dotenv";

export default function SignUpPage() {

  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  function sendInfo(e) {
    e.preventDefault();
    const obj = {
      name: name,
      email: email,
      password: password
    }

    if(password === confirm){


      axios.post(`${import.meta.env.VITE_API_URL}/cadastros`, obj)
      .then(res => {

        alert('Você foi cadastrado com sucesso!')
        navigate("/");

      })
      .catch(err => {

        console.log(err.response.data);
        alert(err.response.data.message || err.response.data);

      });
    } else {
      alert("As senhas disponibilizadas não são iguais!")
    }
  }

  return (
    <SingUpContainer>
      <form onSubmit={sendInfo}>
        <MyWalletLogo />
        <input data-test="name" placeholder="Nome" type="text" id="nome" value={name} onChange={(e) => setName(e.target.value)} required />
        <input data-test="email" placeholder="E-mail" type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input data-test="password" placeholder="password" type="password" autoComplete="new-password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <input data-test="conf-password" placeholder="Confirme a password" type="password" autoComplete="new-password" id="confirm" value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>
      <Link to='/'>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}
const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`