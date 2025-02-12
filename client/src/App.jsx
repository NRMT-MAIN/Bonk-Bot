import { BrowserRouter , Routes , Route } from "react-router-dom"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import Transaction from "./pages/Transaction"
import Dashboard from "./pages/Dashboard"

function App() {

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<Dashboard />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/transactions" element = {<Transaction />} />
        </Routes>
      </BrowserRouter>
    
  )
}

export default App
