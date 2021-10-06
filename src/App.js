import './App.css';

import { useAuth0 } from "./context/auth-context";
// import UnauthenticatedApp from "./UnauthenticatedApp";

function App() {
  const {isAuthenticated, loading} = useAuth0();
    console.log(loading);
    console.log(isAuthenticated);
  return (
      <div className="App">
        {loading ? (
            <div>Loading</div>
        ) : isAuthenticated ? (
            <div>Authenticated</div>
        ) : (
            <div>UnAuthenticated</div>
        )}
      </div>
  );
}

export default App;
