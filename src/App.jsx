import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import { ListingPage } from "./pages/ListingPage";
import { FilterProvider } from "./context/ContextApi";

const App = () => (
  <FilterProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListingPage />} />
        </Route>
      </Routes>
    </Router>
  </FilterProvider>
);

export default App;
