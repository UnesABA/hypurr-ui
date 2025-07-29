import "./index.css";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import Overview from "./components/Overview";
import TransactionTable from "./components/TransactionTable";

function App() {
  return (
    <div className="min-h-screen bg-body-bg text-white">
      <Header />
      <SearchBar />
      <div className="flex flex-col justify-between">
        <Overview />
        <main className="container mx-10 px-4 py-4">
          <TransactionTable />
        </main>
      </div>
    </div>
  );
}

export default App;
