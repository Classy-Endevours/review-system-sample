"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart2 } from "lucide-react";
import PDFViewer from "../PDFViewer/PDFViewer";
import RichTextEditor from "../Editor/RichTextEditor";
import { generateRandomParagraph } from "@/lib/get-content";

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

const defaultLabel = 'Generate report based on reviews'
const nextLabel = 'Generated report based on reviews'

const Home: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("selectReport");
  const [selectedYear, setSelectedYear] = useState<string>("2024");
  const [showRegenerate, setShowRegenerate] = useState(false)
  const [loading, setLoading] = useState(false)
  const [headerLabel, setHeaderLabel] = useState(defaultLabel)
  const [generatedContent, setGeneratedContent] = useState('')

  const handleReportSelect = () => {
    setActiveSection("reportDetails");
  };

  const handleInReviewSelect = () => {
    setActiveSection("reportDetails");
    setShowRegenerate(true);
  };

  const closeReport = () => {
    setShowRegenerate(false);
    setActiveSection("selectReport");
    setGeneratedContent(defaultLabel)
    setHeaderLabel('')
  };

  const handleGenerateButton = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setHeaderLabel(nextLabel)
      setGeneratedContent(generateRandomParagraph(15))
    }, 2000)
  }

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
            <div className="w-1 h-1" />
            <h2 className="text-lg text-center font-medium mb-4 text-midnight-blue">
              {headerLabel}
            </h2>
            <button onClick={closeReport} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          {showRegenerate && <div>
            <button onClick={handleGenerateButton} disabled={loading} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
              {
                loading && <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                </svg>
              }
              {
                loading ? 'Loading...' : 'Re-generate report'
              }
            </button>
          </div>}
          {
            showRegenerate && <div className="h-[60vh]"><RichTextEditor value={generatedContent} goToNext={() => closeReport()} customNextButton="Save" /></div>
          }
          {!showRegenerate && <PDFViewer />}
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
