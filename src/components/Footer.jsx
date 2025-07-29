import FileDownloadIcon from "@mui/icons-material/FileDownload";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";

const Footer = ({ activeTab }) => {
  const getPaginationText = () => {
    switch (activeTab) {
      case "HOLDINGS":
        return "0 to 0 of 0";
      case "ORDERS":
        return "1-13 of 13";
      default:
        return "1-25 of 4058";
    }
  };

  return (
    <div className="bg-[#1f1f1f] px-4 py-2 flex items-center justify-between rounded-b-lg text-sm text-white border-t border-gray-700">
      {/* Left side - Export button */}
      <div className="flex items-center gap-1 bg-[#48645e] hover:brightness-110 text-white font-semibold px-3 py-1 rounded cursor-pointer transition-all duration-200">
        <FileDownloadIcon style={{ fontSize: 14 }} />
        <span className="text-[10px] tracking-wider font-medium">EXPORT</span>
      </div>

      {/* Right side - Pagination */}
      <div className="flex items-center gap-3 text-[11px] text-gray-300">
        <div className="flex items-center gap-2">
          <span className="text-white font-medium">Items per page:</span>
          <select className="bg-[#2a2a2a] border border-gray-600 hover:border-white rounded px-2 py-1 text-white focus:outline-none focus:border-white text-[11px] min-w-[50px] transition-colors duration-200">
            <option value="10" className="bg-[#2a2a2a]">
              10
            </option>
            <option value="25" className="bg-[#2a2a2a]">
              25
            </option>
            <option value="50" className="bg-[#2a2a2a]">
              50
            </option>
            <option value="100" className="bg-[#2a2a2a]">
              100
            </option>
          </select>
        </div>

        <span className="text-gray-300 font-medium">{getPaginationText()}</span>

        {/* Pagination arrows */}
        <div className="flex items-center gap-1">
          <div
            className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors active:bg-white active:shadow-lg active:scale-95"
            disabled
            title="First page"
          >
            <FirstPageIcon style={{ fontSize: 16 }} />
          </div>
          <div
            className="w-7 h-7 text-gray-600 rounded-md flex items-center justify-center cursor-not-allowed opacity-50 transition-colors active:bg-white active:shadow-lg active:scale-95"
            disabled
            title="Previous page"
          >
            <NavigateBeforeIcon style={{ fontSize: 16 }} />
          </div>
          <div
            className="w-7 h-7 text-white-600 rounded-md flex items-center justify-center cursor-pointer transition-colors active:bg-white active:shadow-lg active:scale-95"
            title="Next page"
          >
            <NavigateNextIcon style={{ fontSize: 16 }} />
          </div>
          <div
            className="w-7 h-7 text-white-600 rounded-md flex items-center justify-center cursor-pointer transition-colors active:bg-white active:shadow-lg active:scale-95"
            title="Last page"
          >
            <LastPageIcon style={{ fontSize: 16 }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;