import { Route, Routes } from "react-router-dom";
import TopBar from "./screen/global/TopBar";
import { ColorModeContext,useMode } from "./theme";
import { CssBaseline,ThemeProvider } from "@mui/material";
import Dashboard from "./screen/dashboard";
import Sidebar from "./screen/global/Sidebar";
import Team from "./screen/team";
import Contacts from "./screen/contacts";
import Bar from "./screen/bar";
import Line from "./screen/line";
import Pie from "./screen/pie";
import Intensity from "./screen/Intensity";
import Likelihood from "./screen/likelihood";
import Relevance from "./screen/relevance";



function App() {
  const [theme, colorMode] = useMode();
  
  return (<ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <div className="app">
            <Sidebar  />
            <main className="content">
              <TopBar />
              <Routes>
                <Route path="/relevance" element={<Dashboard/>} />
                <Route path="/likelihood" element={<Dashboard/>}  />
                <Route path="/intensity" element={<Dashboard/>}  />
                <Route path="/" element={<Dashboard/>} />
                <Route path="/team" element={<Dashboard/>} />
                <Route path="/contacts"element={<Dashboard/>}  />
                <Route path="/bar" element={<Dashboard/>}/>
                <Route path="/line" element={<Dashboard/>} />
                <Route path="/pie" element={<Dashboard/>}/>
              </Routes>
            </main>
          </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
