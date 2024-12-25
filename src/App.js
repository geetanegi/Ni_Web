import "./App.css";
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle'
import Routes from './Routes'
import logoutApi from "./Api/logoutApi";
import {IdleTimerProvider} from 'react-idle-timer';
import Cookies from "js-cookie";

function App() {

  // const handleOnIdle = () => {
    // let isAuthenticated = Cookies.get("accessToken") === null ? false : true;
    // const isAuthenticated = Cookies.get("accessToken") || null;
    // if(isAuthenticated){
      // logoutApi();
    // }
  //  };


  return (<>
  <IdleTimerProvider
          timeout={1200000} // 20 minutes in milliseconds
          onIdle={logoutApi}
        >
         <div className="App niApp">
      <Routes />
    </div >
    </IdleTimerProvider>
  </>   
  );
}

export default App;

