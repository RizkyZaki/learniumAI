import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/AuthContext";
import SummaryQuiz from "./pages/SummaryQuiz";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Halaman Home bisa diakses siapa saja */}
          <Route path="/" element={<Home />} />

          {/* Halaman yang memerlukan login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/summary-quiz" element={<SummaryQuiz />} />
          </Route>

          {/* Halaman Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
