import { BrowserRouter as Router, Routes, Route } from "react-router"
import { QueryClientProvider, QueryClient } from "react-query"
import { ReactQueryDevtools } from 'react-query/devtools'
import { APP_BASE } from "./config"
import { ToastContainer } from "react-toastify"

// Components
import Login from "./pages/Login"
import Missions from "./pages/Missions"
import Redirect from "./pages/Redirect"
import Create from "./pages/Create"
import Rosters from "./pages/Rosters"

const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={APP_BASE}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/create/:formtype" element={<Create />} />
          <Route path="/rosters" element={<Rosters />} />
          <Route path="/*" element={<Redirect />} />
        </Routes>
      </Router>
      <ToastContainer />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
