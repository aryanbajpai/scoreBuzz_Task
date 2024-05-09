import "./App.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { NavBar } from './PAGES/NavBar.jsx'
import { Login } from "./PAGES/Login.jsx";
import { Scorer } from "./COMPONENTS/LOGGED USER/Scorer/Scorer.jsx";
import { Viewer } from "./COMPONENTS/LOGGED USER/Viewer/Viewer.jsx";
import { LogScorer } from "./COMPONENTS/LoginPage/LogScorer.jsx";
import { LogViewer } from "./COMPONENTS/LoginPage/LogViewer.jsx";
import { ViewList } from "./COMPONENTS/LOGGED USER/Viewer/ViewList.jsx";
import { Squadtable } from "./COMPONENTS/Team PLAYERS/Squadtable.jsx";
import { Home } from "./PAGES/Home.jsx";
import { FirstInning } from "./COMPONENTS/START MATCH/FirstInning.jsx";
import { SecondInning } from "./COMPONENTS/START MATCH/SecondInning.jsx";
import { Result } from "./COMPONENTS/Result/Result.jsx";

function App() {

  let a=import.meta.env.VITE_URL
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
            <Route path="/" Component={Home} />
            <Route path="/login" Component={Login} />
            <Route path="/logscorer" Component={LogScorer} />
            <Route path="/logviewer" Component={LogViewer} />
            <Route path="/scorer" Component={Scorer} />
            <Route path="/viewer" Component={Viewer} />
            <Route path="/viewerList" Component={ViewList} />
            <Route path="/firstinning" Component={FirstInning} />
            <Route path="/secondinning" Component={SecondInning} />
            <Route path="/squad" Component={Squadtable} />
            <Route path="/result" Component={Result} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
