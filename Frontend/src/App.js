import './App.css';
import Header from './Components/Header';
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import News from './Components/News';
import Topgames from './Components/Topgames';
import Community from './Components/Community';
import Aboutus from './Components/Aboutus';
import Host from './Components/Host';
import Error from './Components/Error';
import { GlobalComponentProvider } from './GlobalComponentContext';


function App() {
  const theme = {
    colors: {
      white: "#ddd",
      footer: "#222",
      button: "rgb(43, 139, 213)",
      gradient: "linear-gradient(to right, #000033 , #330000)"
    },
    fontFamily: { all: "Ubuntu,Kanit,sans-serif;",
      games: "Space Grotesk, sans-serif;", 
      pratimaKoChoice: "Montserrat Bold"
     },

    media: { mobile: "768px", tab: "998px" },
  };
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
