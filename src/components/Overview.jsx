import AddressHeader from "./AddressHeader";
import OverviewCard from "./OverviewCard";
import InfosCard from "./InfosCard";
import PositionsCard from "./PositionsCard";

const Overview = () => {
  return (
    <div className="mx-10 px-4 py-2">
      {/* Address Header */}
      <AddressHeader />

      {/* Three Cards Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-[-14px]">
        <OverviewCard />
        <InfosCard />
        <PositionsCard />
      </div>
    </div>
  );
};

export default Overview;