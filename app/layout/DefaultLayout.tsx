"use client";
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
  StepBack,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

interface Tab {
  name: string;
  component: ReactNode;
  onClick: () => void;
}

interface DefaultLayoutProps {
  children: ReactNode;
  hideBottom?: boolean;
  showBack?: boolean;
  containerCss?: string;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  hideBottom,
  showBack,
  containerCss,
}) => {
  const [activeSection, setActiveSection] = useState<string>("talkToReport");
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isFixed, setIsFixed] = useState<boolean>(false); // New state to fix the bottom nav
  const router = useRouter();
  const toast = useToast();

  // Function to toggle the fixed mode
  const handleNavClick = () => {
    setIsFixed((prevIsFixed) => !prevIsFixed);
  };

  // Array of objects for the tabs
  const tabs: Tab[] = [
    {
      name: "Report Generate",
      component: <FileText className="h-6 w-6 text-white" />,
      onClick: () => {
        setActiveSection("loadData");
        router.push("/load-data");
      },
    },
    {
      name: "Report Review",
      component: <BarChart2 className="h-6 w-6 text-white" />,
      onClick: () => {
        setActiveSection("reviewReport");
        router.push("/review");
      },
    },
    {
      name: "Report Design",
      component: <FolderUp className="h-6 w-6 text-white" />,
      onClick: () => {
        setActiveSection("pdfEditor");
        router.push("/generate-report");
      },
    },
    {
      name: "Report Analytics",
      component: <Search className="h-6 w-6 text-white" />,
      onClick: () => {
        setActiveSection("researchData");
        router.push("/analytics");
      },
    },
    {
      name: "Talk To Report",
      component: <MessageSquare className="h-6 w-6 text-white" />,
      onClick: () => {
        setActiveSection("talkToReport");
        router.push("/chat");
      },
    },
  ];

  return (
    <>
      <motion.header
        className="bg-steel-blue shadow-sm fixed top-0 left-0 right-0 z-20"
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
            {showBack && (
              <button
                className="p-2 rounded-full flex items-center text-white"
                onClick={() => {
                  router.back();
                }}
              >
                <StepBack /> <span className="ml-2"> Back</span>
              </button>
            )}

            {/* Login button */}
            <button
              className="p-2 rounded-full flex items-center text-white"
              onClick={() => {
                localStorage.clear();
                toast({
                  status: "success",
                  duration: 3000,
                  title: "Logged Out",
                  description: "You have been successfully logged out.",
                });
                router.push("/");
              }}
            >
              <LogIn className="h-6 w-6 text-white" />{" "}
              <span className="ml-2"> Logout</span>
            </button>
          </div>
        </div>
      </motion.header>
      <div className={containerCss}>{children}</div>
      {!hideBottom && (
        <motion.nav
          className="bg-steel-blue shadow-lg fixed bottom-0 left-0 right-0 z-30"
          onMouseEnter={() => !isFixed && setIsHovered(true)}
          onMouseLeave={() => !isFixed && setIsHovered(false)}
          initial={{ opacity: 1 }}
          animate={{
            opacity: isFixed || isHovered ? 1 : 0,
            transition: { duration: 0.5 },
          }}
          style={{
            transition: "opacity 0.5s ease",
          }}
          onClick={handleNavClick} // Toggle fixed mode on click
        >
          <div className="flex justify-around items-center py-2">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.name}
                className={`p-2 rounded-full hover:bg--blue flex flex-col items-center ${activeSection === tab.name.replace(/\s+/g, "").toLowerCase()
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
      )}
      <style jsx>{`
        @media (max-width: 768px) {
          nav {
            opacity: 1 !important;
          }
        }
      `}</style>
    </>
  );
};

export default DefaultLayout;
