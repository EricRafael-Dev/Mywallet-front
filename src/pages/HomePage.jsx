import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useNavigate } from "react-router-dom"
import { useContext, useEffect } from "react"
import { LoginContext } from "../Contexts/LoginContext"
import axios from "axios"

export default function HomePage(props) {

  const { login, transitionsList, setTransitionsList, user, loged, logout } = useContext(LoginContext);
  const { setScreen1, setScreen2 } = props;

  loged();

  const navigate = useNavigate();

  let enterAmount = 0;
  let outAmount = 0;

  const array = transitionsList.map((obj, index) => transitionsList[transitionsList.length - 1 - index]);
  
  transitionsList.forEach(obj => {

    if (obj.type === "entrada") {
      enterAmount += parseFloat(obj.value);

    } else if (obj.type === "saida") {
      outAmount += parseFloat(obj.value);
    }
  });

  const saldo = enterAmount - outAmount;
  const totalAmount = (enterAmount - outAmount).toFixed(2).replace(".", ",");
  const amount = totalAmount
  console.log(transitionsList)

  useEffect(() => {

    axios.get(`${import.meta.env.VITE_API_URL}/home`)
    .then((resposta) => {

      setTransitionsList(resposta.data);

    })
    .catch((erro) => {

      console.log(erro.response.data);

    })

  }, []);

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {localStorage.getItem("user")}</h1>
        <Hover>
          <BiExit onClick={() => logout()}/>
        </Hover>
      </Header>
      {!transitionsList.length && (
        <TransactionsContainer2>

          <SemRegistros>Não há registros de entrada ou saída</SemRegistros>

        </TransactionsContainer2>

      )}

      {transitionsList.length > 0 && (

        <TransactionsContainer>

          <Lista>
            {array.map((transition) => (

              <ListItemContainer key={transition._id}>
                <div>
                  <span>{transition.data}</span>
                  <strong data-test="registry-name">{transition.description}</strong>
                </div>
                <Value data-test="registry-amount" color={transition.type}>{transition.value.replace(".", ",")}</Value>
              </ListItemContainer>

            )
            )}
          </Lista>


          <article>
            <strong>Saldo</strong>
            <Value2 data-test="total-amount" total={saldo}>{amount}</Value2>
          </article>

        </TransactionsContainer>



      )}


      <ButtonsContainer>

        <button onClick={() => {
                setScreen1(true);
                setScreen2(false);
                navigate("/nova-transacao/entrada");
            }}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>

        <button onClick={() => {
                setScreen1(false);
                setScreen2(true);
                navigate("/nova-transacao/saida");
            }}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  )
}
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  height:100%;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const TransactionsContainer2 = styled.article`
  flex-grow: 1;
  background-color: #fff;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Lista = styled.div`
  overflow-y: auto;
  height:650px;
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`
const Value2 = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.total >= 0 ? "green" : "red")};
`

const ListItemContainer = styled.li`
  height:34.2px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const SemRegistros = styled.p`
  display: flex;
  flex-wrap:wrap;
  width: 180px;
  height: 46px;
  font-family: Raleway;
  font-size: 20px;
  line-height: 23px;
  letter-spacing: 0em;
  text-align: center;
  color:#868686;
`
const Hover = styled.div`
  :hover{
    cursor: pointer;
  }
`