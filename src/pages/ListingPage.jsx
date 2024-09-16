import AgentComponent from "../components/agents/AgentComponent";
import EstatesContainer from "../components/EstatesContainer";
import FilterList from "../components/filtrationComponents/FilterList";
import ActionAreaCard from "../components/ListItemPattern";

export const ListingPage = () => (
  <div className="">
    <FilterList />
    <ActionAreaCard />
    <EstatesContainer />
    <AgentComponent />
  </div>
);
