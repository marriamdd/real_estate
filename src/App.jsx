import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import ListingPage from "./pages/ListingPage";
import { FilterProvider } from "./context/ContextApi";
import AddListing from "./pages/AddListing";
import SingleListing from "./pages/SingleListing";

const App = () => (
  <FilterProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListingPage />} />
          <Route path="/addListing" element={<AddListing />} />
          <Route path="/listing/:id" element={<SingleListing />} />
        </Route>
      </Routes>
    </Router>
  </FilterProvider>
);

export default App;
