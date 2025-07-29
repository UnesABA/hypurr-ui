import { IoMdHome } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import InfoIcon from "@mui/icons-material/Info";
import TelegramIcon from "@mui/icons-material/Telegram";
import XIcon from "@mui/icons-material/X";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SwordsIcon from "@mui/icons-material/Sports";
import PetsIcon from "@mui/icons-material/Pets";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SettingsIcon from "@mui/icons-material/Settings";
import { GiArchBridge } from "react-icons/gi";
import hoodedCat from "../assets/images/hooded-cat.jpg";
import monkey from "../assets/images/monkey.jpg";

const Header = () => {
  const navItems = [
    { name: "HOME", icon: <IoMdHome className="w-3.5 h-3.5 textte" /> },
    {
      name: "DASHBOARD",
      icon: <RxDashboard style={{ fontSize: 12, color: "white" }} />,
    },
    {
      name: "STAKING",
      icon: <AccountBalanceIcon style={{ fontSize: 12, color: "white" }} />,
    },
    {
      name: "STATS",
      icon: <ShowChartIcon style={{ fontSize: 12, color: "white" }} />,
    },
    {
      name: "ABOUT",
      icon: <InfoIcon style={{ fontSize: 12, color: "white" }} />,
    },
  ];

  const platformButtons = [
    {
      name: "HFUN",
      icon: <SportsEsportsIcon style={{ fontSize: 18, color: "white" }} />,
    },
    {
      name: "HYPERRUN",
      icon: <DirectionsRunIcon style={{ fontSize: 18, color: "white" }} />,
    },
    {
      name: "PVP",
      icon: <SwordsIcon style={{ fontSize: 18, color: "white" }} />,
    },
    {
      name: "FELIX",
      icon: <img src={monkey} className="w-4 h-4 object-cover rounded-full" />,
    },
    {
      name: "HYPURRCO",
      icon: <img src={hoodedCat} className="w-4 h-4 object-fit rounded-full" />,
    },
    {
      name: "HYPERIDGE",
      icon: <GiArchBridge style={{ fontSize: 18, color: "white" }} />,
    },
    {
      name: "TWITTER",

      icon: <XIcon style={{ fontSize: 18, color: "black" }} />,
    },
    {
      name: "TELEGRAM",
      icon: (
        <div className="bg-blue-500 rounded-full p-0.5">
          <TelegramIcon style={{ fontSize: 18, color: "white" }} />
        </div>
      ),
    },
    {
      name: "SUPPORT ME",
      icon: <FavoriteIcon style={{ fontSize: 18, color: "white" }} />,
    },
  ];

  return (
    <header className="bg-header-bg py-1.5 px-[5px] overflow-x-auto shadow-black-glow sticky top-0 z-50">
      <div className="flex items-center justify-between w-full ">
        {/* Left Navigation */}
        <div className="flex items-center justify-between gap-[16px]">
          {navItems.map((item) => (
            <button
              key={item.name}
              className="bg-header-bg px-1.5 py-0.5 rounded text-xs font-medium transition-all duration-200 hover:bg-opacity-80 hover:brightness-110 border-none outline-none"
            >
              <div className="flex items-center justify-center">
                <span className="flex items-center justify-center">
                  {item.icon}
                </span>

                <span className="text-[10px] tracking-wide text-white">
                  {item.name}
                </span>
              </div>
            </button>
          ))}
        </div>
        <div className="mx-[50px]"></div>
        {/* Right Platform Buttons */}
        <div className="flex items-center space-x-1 flex-shrink-0 gap-2.5">
          {platformButtons.map((button) => (
            <button
              key={button.name}
              className="bg-header-bg px-2.5 py-0.5 rounded text-[11px] transition-all duration-200 hover:bg-opacity-80 hover:brightness-110 border-none outline-none flex-shrink-0"
            >
              <div className="flex items-center justify-center">
                <span className="flex items-center justify-center">
                  {button.icon}
                </span>
                <span className="text-[10px] tracking-wide text-white whitespace-nowrap">
                  {button.name}
                </span>
              </div>
            </button>
          ))}

          {/* Settings button */}
          <button className="bg-header-bg p-2 rounded-full text-xs font-medium transition-all duration-200 hover:bg-opacity-80 hover:brightness-110 border-none outline-none flex-shrink-0">
            <SettingsIcon style={{ fontSize: 19, color: "white" }} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
