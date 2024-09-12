import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./layouts/Layout";
import { ListingPage } from "./pages/ListingPage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<ListingPage />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
