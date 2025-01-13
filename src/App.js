// import './App.css';
import React from 'react';
import Header from './Components/Header';
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import News from './News';
import Topgames from './Topgames';
import Community from './Community';
import Aboutus from './Aboutus';
import Host from './Host';
import Error from './Error';
import { GlobalComponentProvider } from './GlobalComponentContext';
import GoToTop from './Components/GoToTop';
import CommunityDetails from './Components/CommunityDetails';
// import News from './Components/News/News';  //i change for news.
import Live from './Components/Live'
import Watch from './Components/Watch'
import CreateTournament from './Components/tournament/CreateTournament';
import BracketPage from './Components/tournament/BracketPage';
import LastTournament from './Components/tournament/LastTournament';
import Edit from "./Components/tournament/Edit";
import JoinTournament from "./Components/tournament/JoinTournament";
import ViewTournament from "./Components/tournament/ViewTournament";


function App() {
  const theme = {
    colors: {
      white: "#ddd",
      footer: "#490f10",
      button: "rgb(43, 139, 213)",
      gradient: "linear-gradient(to right, #000033 , #330000)",
      logoRed: "#FC0D50",
      logoBlue: "#1092EA"
    },
    fontFamily: {
      all: "Ubuntu,Kanit,sans-serif;",
      games: "Space Grotesk, sans-serif;",
      pratimaKoChoice: "Montserrat Bold",
      dot: "DotGothic16, sans-serif",
      rank: "Londrina Sketch, sans-serif",
      host: "Quicksand, sans-serif"
    },
    media: { mobile: "768px", tab: "998px" },
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalComponentProvider>
        <div>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/host" element={<Host />} />
              <Route path="/community" element={<Community />} />
              <Route path="/news" element={<News />} />
              <Route path="/topgames" element={<Topgames />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="*" element={<Error />} />
              <Route path="/community/:communityId" element={<CommunityDetails />} />
              <Route path="/live" element={<Live/>} />
              <Route path="/watch" element={<Watch/>} />
              <Route path="/create-tournament" element={<CreateTournament/>} />
              <Route path="/brackets" element={<BracketPage/>} />
              <Route path="/lastTour" element={<LastTournament/>} />
              <Route path="/view/:tournamentId" element={<Edit/>} />
              <Route path="/joinTour" element={<JoinTournament/>} />
              <Route path="/viewTour" element={<ViewTournament/>} />
            </Routes>

          </BrowserRouter>
          <GoToTop/>
        </div>
      </GlobalComponentProvider>
    </ThemeProvider>
  );
}

export default App;
