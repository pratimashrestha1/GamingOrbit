// import './App.css';
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


function App() {
  const theme = {
    colors: {
      white: "#ddd",
      footer: "#222",
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
      rank: "Londrina Sketch, sans-serif"
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
            </Routes>

          </BrowserRouter>
        </div>
      </GlobalComponentProvider>
    </ThemeProvider>
  );
}

export default App;
