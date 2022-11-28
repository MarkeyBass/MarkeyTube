import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
// import Navbar from "./components/Navbar";
import { darkTheme, lightTheme } from "./utils/Theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
// import SignIn from "./pages/SignIn";
// import Search from "./pages/Search";
// import { useSelector } from "react-redux";

const Container = styled.div`
  display: flex;

  // Scroller
  //============
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    /* background: #202020; */
    background-color: ${({ theme }) => theme.soft};
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #c5c5c5;
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #888;
  }
`;

const Main = styled.div`
  flex: 7;
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  /* display: flex; */
  padding: 22px 96px ;
`;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <Container>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
          <Main>
            <Navbar />
            <Wrapper>
              <Routes>
                <Route path="/" >
                  <Route index element={<Home type="random"/>}/>
                  <Route path="trend" element={<Home type="trend"/>}/>
                  <Route path="sub" index element={<Home type="sub"/>}/>
                  <Route path="signin" element={<SignIn />}/>
                  <Route path="video">
                    <Route path=":id" element={<Video/>}/>
                  </Route>
                </Route>
              </Routes>
            </Wrapper>
          </Main>
        </Container>
      </BrowserRouter>
    </ThemeProvider>
  );
}

// const Main = styled.div`
//   flex: 7;
//   background-color: ${({ theme }) => theme.bg};
// `;
// const Wrapper = styled.div`
//   padding: 22px 96px;
// `;

// function App() {
//   const [darkMode, setDarkMode] = useState(true);
//   const { currentUser } = useSelector((state) => state.user);

//   return (
//     <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
//       <Container>
//         <BrowserRouter>
//           <Menu darkMode={darkMode} setDarkMode={setDarkMode} />
//           <Main>
//             <Navbar />
//             <Wrapper>
//               <Routes>
//                 <Route path="/">
//                   <Route index element={<Home type="random" />} />
//                   <Route path="trends" element={<Home type="trend" />} />
//                   <Route path="subscriptions" element={<Home type="sub" />} />
//                   <Route path="search" element={<Search />} />
//                   <Route
//                     path="signin"
//                     element={currentUser ? <Home /> : <SignIn />}
//                   />
//                   <Route path="video">
//                     <Route path=":id" element={<Video />} />
//                   </Route>
//                 </Route>
//               </Routes>
//             </Wrapper>
//           </Main>
//         </BrowserRouter>
//       </Container>
//     </ThemeProvider>
//   );
// }

export default App;
