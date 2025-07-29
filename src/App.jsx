import "./index.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Overview from "./components/Overview";
import TransactionTable from "./components/TransactionTable";

function App() {
  return (
    <div className="bg-body-bg text-white">
      <Header />
      <SearchBar />
      <div className="flex flex-col justify-between gap-2">
        <Overview />
        <TransactionTable />
      </div>
    </div>
  );
}

export default App;
