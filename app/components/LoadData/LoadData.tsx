import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { useToast, UseToastOptions } from "@chakra-ui/react";

// Define the file type for better type checking
interface UploadedFile extends File {
  name: string;
}

const LoadData: React.FC = () => {
  // Add types to the state variables
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  // Handle file upload event and add type for event
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Use optional chaining to avoid null errors
    if (file) {
      setUploadedFile(file as UploadedFile);
    }
  };

  // Function to handle save operation
  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      // Simulate saving file and reset to initial state after 2 seconds
      setUploadedFile(null);
      setLoading(false);

      const toastOptions: UseToastOptions = {
        title: "File uploaded successfully",
        description: "We've created your account for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
      };

      toast(toastOptions);
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-sm overflow-hidden"
    >
      <div className="p-4">
        <h2 className="text-lg font-medium mb-4 flex items-center text-midnight-blue">
          <FileText className="mr-2" /> Load Raw Data for
        </h2>

        {!uploadedFile ? (
          // File upload section
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
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">CSV, XLS, XLSX up to 10MB</p>
            </div>
          </div>
        ) : (
          // Card showing the uploaded file
          <div className="bg-light-gray p-4 rounded-xl shadow-md m-16 p-4">
            <h3 className="text-md font-semibold mb-2 text-midnight-blue">
              Uploaded File:
            </h3>
            <p className="text-gray-700">{uploadedFile.name}</p>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className={`bg-dodger-blue text-white px-4 py-2 rounded-md focus:outline-none ${
                  loading ? "cursor-not-allowed" : ""
                }`}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LoadData;
