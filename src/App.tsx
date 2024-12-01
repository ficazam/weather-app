import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { AppLayout } from "./components";
import { DetailsPage } from "./pages/DetailsPage";

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:cityname" element={<DetailsPage />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
