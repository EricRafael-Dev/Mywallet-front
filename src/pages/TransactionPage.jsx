import styled from "styled-components"
import { LoginContext } from "../Contexts/LoginContext";
import { useContext, useState } from "react";
import axios from "axios";

export default function TransactionsPage(props) {

  const { login } = useContext(LoginContext);
  const token = login.token;

  const { screen1, setScreen1, screen2, setScreen2 } = props

  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');

  function sendInfo(e) {
    e.preventDefault();

    const obj = {value, description}

    const config = {
      headers: {
          Authorization: "Bearer " + token
      }
  }
  console.log(config)

    let url = "";

    if (screen1) {
      url = "http://localhost:5000/nova-transacao/entrada";
    }

    if (screen2) {
      url = "http://localhost:5000/nova-transacao/saida";
    }

    axios.post(url, obj)
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

        <input placeholder="value" type="text" id="value" value={value} onChange={(e) => setValue(e.target.value)} required />
        <input placeholder="Descrição" type="text" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />

        {screen1 && (

          <button type="submit">Salvar entrada</button>

        )}

        {screen2 && (

          <button type="submit">Salvar saída</button>

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