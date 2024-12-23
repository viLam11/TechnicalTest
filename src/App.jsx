import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Test from "./pages/Test";
import User from "./pages/Users";
import Album from "./pages/Album";
import AlbumDetail from "./pages/AlbumDetail";
import UserDetail from "./pages/UserDetail";
function App() {
  return (
    <Router
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    > 
      <Routes>
        <Route path="/user" element={<User />} />
        <Route path="/user/:userID" element={<UserDetail />} />
        <Route path="/album" element={<Album />} /> 
        <Route path="/album/:albumID" element={<AlbumDetail />} /> 
        <Route path="/test" element={<Test />} />  

      </Routes>
    </Router> 
  )
}

export default App;