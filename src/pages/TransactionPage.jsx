import styled from "styled-components"
import { LoginContext } from "../Contexts/LoginContext";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage(props) {

  const {isLoged } = useContext(LoginContext);

  isLoged();

  const navigate = useNavigate();

  const { screen1, screen2 } = props

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  function sendInfo(e) {
    e.preventDefault();

    const obj = {value, description}

  console.log(config)

    let route = "";

    if (screen1) {
      route = "entrada";
    }

    if (screen2) {
      route = "saida";
    }

    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao/${route}`, obj)
    .then(res => {

      if (screen1) {
        alert('Entrada registrada com sucesso!');
      }

      if (screen2) {
        alert('Saída registrada com sucesso!');
      }
      navigate("/home");

    })
    .catch(err => {

      alert('Ocorreu um problema ao salvar os seus dados, tente novamente!');
      console.log(obj)
      console.log(err.response.data);
    });

  }

  return (
    <TransactionsContainer>

      {screen1 && (

        <h1>Nova entrada</h1>

      )}

      {screen2 && (

        <h1>Nova saída</h1>

      )}

      <form onSubmit={sendInfo}>

        <input data-test="registry-amount-input" placeholder="Valor" type="text" id="value" value={value} onChange={(e) => setValue(e.target.value)} required />
        <input data-test="registry-name-input" placeholder="Descrição" type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        {screen1 && (

          <button data-test="registry-save" type="submit">Salvar entrada</button>

        )}

        {screen2 && (

          <button data-test="registry-save" type="submit">Salvar saída</button>

        )}

      </form>
    </TransactionsContainer>
  )
}
const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`