import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from '@emotion/styled';
import StartPage from './pages/StartPage';
import ResultPage from './pages/ResultPage';
import Header from './components/Header';
import Footer from './components/Footer';

const MainContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  flex: 1;
  max-width: 800px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
`;

function App() {
  return (
    <BrowserRouter>
      <MainContainer>
        <Header />
        <Content>
          <Routes>
            <Route path="/" element={<StartPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </Content>
        <Footer />
      </MainContainer>
    </BrowserRouter>
  );
}

export default App;