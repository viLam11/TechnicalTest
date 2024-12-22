import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Test from "./pages/Test";
function App() {
  return (
    <Router
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    }}
    > 
      <Routes>
        <Route path="/user" />
        <Route path="/test" element={<Test />} />  

      </Routes>
    </Router> 
  )
}

export default App;