'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    BarChart2,

} from "lucide-react";

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
    "Not Started": "bg-gray-500",
};

interface ReportTileProps {
    report: string;
    status: string;
    statistic: string;
    onSelect: (report: string) => void;
}

const ReportTile: React.FC<ReportTileProps> = ({ report, status, statistic, onSelect }) => (
    <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-full h-32 bg-white rounded-lg shadow-md overflow-hidden"
        onClick={() => onSelect(report)}
    >
        <div className={`absolute top-0 left-0 w-6 h-6 ${reportStatus[status]}`} />
        <div className="p-4 flex flex-col justify-between h-full">
            <div>
                <span className="text-xs font-medium text-gray-600">{status}</span>
                <span className="text-sm font-bold block mt-1">{report}</span>
            </div>
            <span className="text-xs font-medium">{statistic}</span>
        </div>
    </motion.button>
);

const Home: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>("selectReport");
    const [selectedYear, setSelectedYear] = useState<string>("2024");
    const [selectedReport, setSelectedReport] = useState<string>("");

    const handleReportSelect = (report: string) => {
        setSelectedReport(report);
        setActiveSection("reportDetails");
    };

    //   const handleHomeClick = () => {
    //     setActiveSection("selectReport");
    //     setSelectedReport("");
    //   };

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
                    <div className="p-4">
                        {/* Year Tabs */}
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
                                status="In-Progress"
                                statistic="Expenses: $800K"
                                onSelect={handleReportSelect}
                            />
                            <ReportTile
                                report="THIRD QUARTER"
                                status="Not Started"
                                statistic="Target: $1.5M"
                                onSelect={handleReportSelect}
                            />
                            {/* <ReportTile
                                report="FOURTH QUARTER"
                                status="Not Started"
                                statistic="Forecast: $2M"
                                onSelect={handleReportSelect}
                            /> */}
                        </div>
                        <div className="flex justify-center">
                            <ReportTile
                                report="ANNUAL REPORT"
                                status="Not Started"
                                statistic="Projected Growth: 15%"
                                onSelect={handleReportSelect}
                            />
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
                    <h2 className="text-lg font-medium mb-4 text-midnight-blue">
                        {selectedReport} Details
                    </h2>
                    <p className="text-steel-blue">
                        Here you can view details of the {selectedReport}.
                    </p>
                    <p className="text-steel-blue">
                        Use the options below to interact with this report.
                    </p>
                </motion.div>
            ),
            loadData: (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    <div className="p-4">
                        <h2 className="text-lg font-medium mb-4 flex items-center text-midnight-blue">
                            <FileText className="mr-2" /> Load Raw Data for {selectedReport}
                        </h2>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
                            <div className="space-y-1 text-center">
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                                <div className="flex text-sm text-gray-600">
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer bg-white rounded-md font-medium text-dodger-blue hover:text-royal-blue focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-deep-sky-blue"
                                    >
                                        <span>Upload a file</span>
                                        <input
                                            id="file-upload"
                                            name="file-upload"
                                            type="file"
                                            className="sr-only"
                                        />
                                    </label>
                                    <p className="pl-1">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">
                                    CSV, XLS, XLSX up to 10MB
                                </p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ),
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
