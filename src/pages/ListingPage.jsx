import AgentFormModal from "../components/AddAgent";
import Agents from "../components/Agents";
import EstatesContainer from "../components/EstatesContainer";
import FilterList from "../components/filtrationComponents/FilterList";
import ActionAreaCard from "../components/ListItemPattern";

export const ListingPage = () => (
  <div className="">
    <FilterList />
    <ActionAreaCard />
    <EstatesContainer />
    <Agents />
    <AgentFormModal />
  </div>
);
