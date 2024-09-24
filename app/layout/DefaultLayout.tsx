'use client'
import React, { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import {
    FileText,
    BarChart2,
    MessageSquare,
    Search,
    LogIn,
    Home,
    FolderUp,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Tab {
    name: string;
    component: ReactNode;
    onClick: () => void;
}

interface DefaultLayoutProps {
    children: ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
    const [activeSection, setActiveSection] = useState<string>("talkToReport");
    const router = useRouter()

    // Array of objects for the tabs
    const tabs: Tab[] = [
        {
            name: "Talk To Report",
            component: <MessageSquare className="h-6 w-6 text-white" />,
            onClick: () => {
                setActiveSection("talkToReport");
                router.push("/chat");
            },
        },
        {
            name: "Research Data",
            component: <Search className="h-6 w-6 text-white" />,
            onClick: () => setActiveSection("researchData"),
        },
        {
            name: "Review Report",
            component: <BarChart2 className="h-6 w-6 text-white" />,
            onClick: () => {
                setActiveSection("reviewReport");
                router.push("/review");
            },
        },
        {
            name: "Load Data",
            component: <FileText className="h-6 w-6 text-white" />,
            onClick: () => {
                setActiveSection("loadData");
                router.push("/load-data");
            },
        },
        {
            name: "PDF Editor",
            component: <FolderUp className="h-6 w-6 text-white" />,
            onClick: () => {
                setActiveSection("pdfEditor");
                router.push("/puck");
            },
        },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-midnight-blue shadow-sm fixed top-0 left-0 right-0 z-20"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        {/* Clickable logo area with home icon */}
                        <button
                            onClick={() => {
                                setActiveSection("home");
                                router.push("/home");
                            }}
                            className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-deep-sky-blue rounded-md"
                        >
                            <Home className="h-6 w-6 text-white" />
                            <span className="font-semibold text-lg text-white">
                                AnalyticsPro
                            </span>
                        </button>

                        {/* Login button */}
                        <button className="p-2 rounded-full hover:bg-royal-blue flex items-center">
                            <LogIn className="h-6 w-6 text-white" />
                        </button>
                    </div>
                </div>
            </motion.header>
            <div>{children}</div>
            <motion.nav
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="bg-steel-blue shadow-lg fixed bottom-0 left-0 right-0 z-30"
            >
                <div className="flex justify-around items-center py-2">
                    {tabs.map((tab, index) => (
                        <motion.button
                            key={tab.name}
                            className={`p-2 rounded-full hover:bg-royal-blue flex flex-col items-center ${activeSection === tab.name.replace(/\s+/g, "").toLowerCase()
                                ? "bg-dodger-blue"
                                : ""
                                }`}
                            onClick={tab.onClick}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                            {tab.component}
                            <span className="text-xs mt-1 text-white">{tab.name}</span>
                        </motion.button>
                    ))}
                </div>
            </motion.nav>
        </>
    );
};

export default DefaultLayout;
