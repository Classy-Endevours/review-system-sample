"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2 } from "lucide-react";
import PDFViewer from "../PDFViewer/PDFViewer";
import RichTextEditor from "../Editor/RichTextEditor";

const customStyles = `
  .bg-deep-sky-blue { background-color: rgb(0, 191, 255); }
  .bg-dodger-blue { background-color: rgb(30, 144, 255); }
  .bg-steel-blue { background-color: rgb(70, 130, 180); }
  .bg-royal-blue { background-color: rgb(65, 105, 225); }
  .bg-midnight-blue { background-color: rgb(25, 25, 112); }
  .text-deep-sky-blue { color: rgb(0, 191, 255); }
  .text-dodger-blue { color: rgb(30, 144, 255); }
  .text-steel-blue { color: rgb(70, 130, 180); }
  .text-royal-blue { color: rgb(65, 105, 225); }
  .text-midnight-blue { color: rgb(25, 25, 112); }
  .hover-bg-royal-blue:hover { background-color: rgb(65, 105, 225); }
`;

const years: string[] = ["2024", "2023", "2022", "2021"]; // Add more years as needed

const reportStatus: Record<string, string> = {
  Completed: "bg-green-500",
  "In-Progress": "bg-yellow-500",
  "Review Completed": "bg-yellow-500",
  "Not Started": "bg-gray-500",
  annual: "bg-orange-500",
};

interface ReportTileProps {
  report: string;
  status: string;
  statistic: string;
  onSelect?: (report: string) => void;
}

const ReportTile: React.FC<ReportTileProps> = ({
  report,
  status,
  statistic,
  onSelect,
}) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="relative w-full h-32 bg-white rounded-lg shadow-md overflow-hidden"
    onClick={() => onSelect && onSelect(report)}
  >
    <div className={`absolute top-0 left-0 w-6 h-6 ${reportStatus[status]}`} />
    <div className="p-4 flex flex-col justify-between h-full">
      <div>
        <span className="text-xs font-medium text-gray-600">{status}</span>
        <span className="text-sm font-semibold md:font-bold block mt-1">{report}</span>
      </div>
      <span className="text-xs font-medium">{statistic}</span>
    </div>
  </motion.button>
);

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("selectReport");
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [showRegenerate, setShowRegenerate] = useState(false)
  const [showEditor, setShowEditor] = useState(false)

  const handleReportSelect = () => {
    setActiveSection("reportDetails");
  };

  const handleInReviewSelect = () => {
    setActiveSection("reportDetails");
    setShowRegenerate(true);
  };

  const closeReport = () => {
    setShowEditor(false);
    setShowRegenerate(false);
    setActiveSection("selectReport");
  };

  const renderContent = () => {
    const content: Record<string, JSX.Element> = {
      selectReport: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <div className="h-[80vh] flex justify-center items-center   p-4">
            {/* Year Tabs */}
            <div className="w-full">
              <div className="flex overflow-x-auto mb-4 bg-white rounded-lg">
                {years.map((year) => (
                  <button
                    key={year}
                    className={`px-4 py-2 text-sm font-medium ${selectedYear === year
                      ? "text-midnight-blue border-b-2 border-midnight-blue"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                    onClick={() => setSelectedYear(year)}
                  >
                    {year}
                  </button>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-6 flex items-center text-midnight-blue">
                <BarChart2 className="mr-2" /> Select Report
              </h2>

              {/* Report Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <ReportTile
                  report="FIRST QUARTER"
                  status="Completed"
                  statistic="Revenue: $1.2M"
                  onSelect={handleReportSelect}
                />
                <ReportTile
                  report="SECOND QUARTER"
                  status="Review Completed"
                  statistic="Expenses: $800K"
                  onSelect={handleInReviewSelect}
                />
                <ReportTile
                  report="THIRD QUARTER"
                  status="Not Started"
                  statistic="Target: $1.5M"
                />

                <ReportTile
                  report="ANNUAL REPORT"
                  status="Not Started"
                  statistic="Projected Growth: 15%"
                />
              </div>
            </div>
          </div>
        </motion.div>
      ),
      reportDetails: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-sm overflow-hidden p-4"
        >
          <div className="flex justify-between">
            <button onClick={closeReport} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {showRegenerate && <div>
            <button onClick={() => setShowEditor(!showEditor)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              {
                showEditor
                 ? "Close Editor"
                  : "Regenerate Report"
              }
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
              </svg>
            </button>
          </div>}
          {
            showEditor && showRegenerate && <div className="h-[60vh]"><RichTextEditor goToNext={() => closeReport()} /></div>
          }
          {!showEditor && <PDFViewer />}
        </motion.div>
      )
    };

    return content[activeSection] || null;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <style>{customStyles}</style>

      {/* Main Content */}
      <main className="pt-20 pb-24 px-4 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
