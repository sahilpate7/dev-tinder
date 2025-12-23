import Body from "./components/Body";
import Login from "./components/Login"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import appStore from "./redux/appStore";
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />} >
            <Route index element={<Feed />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App