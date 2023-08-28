import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useState } from "react"

export default function App() {

  const [screen1, setScreen1] = useState(false);
  const [screen2, setScreen2] = useState(false);

  return (
    <PagesContainer>
      <BrowserRouter>

        <Routes>

          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage screen1={screen1} setScreen1={setScreen1} screen2={screen2} setScreen2={setScreen2} />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage screen1={screen1} setScreen1={setScreen1} screen2={screen2} setScreen2={setScreen2} />} />
        
        </Routes>

      </BrowserRouter>
    </PagesContainer>
  )
}
const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  height: 100%;
  padding: 25px;
`