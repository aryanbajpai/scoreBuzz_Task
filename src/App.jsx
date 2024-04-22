import "./App.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { NavBar } from './COMPONENTS/NavBar.jsx'
import { Login } from "./COMPONENTS/Login.jsx";
import { Scorer } from "./COMPONENTS/LOGGED USER/Scorer/Scorer.jsx";
import { Viewer } from "./COMPONENTS/LOGGED USER/Viewer/Viewer.jsx";
import { LogScorer } from "./COMPONENTS/LoginPage/LogScorer.jsx";
import { LogViewer } from "./COMPONENTS/LoginPage/LogViewer.jsx";
import { ViewList } from "./COMPONENTS/LOGGED USER/Viewer/ViewList.jsx";
import { StartMatch } from "./COMPONENTS/LOGGED USER/Scorer/StartMatch.jsx";

function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
            <Route path="/login" Component={Login} />
            <Route path="/logscorer" Component={LogScorer} />
            <Route path="/logviewer" Component={LogViewer} />
            <Route path="/scorer" Component={Scorer} />
            <Route path="/viewer" Component={Viewer} />
            <Route path="/viewerList" Component={ViewList} />
            <Route path="/match" Component={StartMatch} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
