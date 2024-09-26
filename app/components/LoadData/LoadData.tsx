import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import { FileText, Trash2 } from "lucide-react";
import { useToast, UseToastOptions } from "@chakra-ui/react";

// Define the file type for better type checking
interface UploadedFile {
  name: string;
  id: number; // Unique identifier for each file
}

const LoadData: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFile: UploadedFile = { name: file.name, id: Date.now() };
      setUploadedFiles((prevFiles) => [newFile, ...prevFiles]);
    }
  };

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const toastOptions: UseToastOptions = {
        title: "Files uploaded successfully",
        description: "Your files are ready.",
        status: "success",
        duration: 3000,
        isClosable: true,
      };
      toast(toastOptions);
    }, 2000);
  };

  const handleRemoveFile = (id: number) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((file) => file.id !== id);

      return updatedFiles;
    });
    const toastOptions: UseToastOptions = {
      title: "File removed",
      description: "The file has been successfully removed.",
      status: "info",
      duration: 3000,
      isClosable: true,
    };
    toast(toastOptions);
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

        <div className="mt-16 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl">
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

        {/* Display uploaded files in grid layout */}
        {uploadedFiles.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-semibold mb-2 text-midnight-blue">
              Uploaded Files:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {uploadedFiles.map((file, index) => (
                <div
                  key={file.id}
                  className="bg-light-gray p-4 rounded-xl shadow-md flex justify-between items-center"
                >
                  <span className="text-gray-700">
                    {index + 1}. {file.name}
                  </span>
                  <Trash2
                    className="cursor-pointer text-red-500 hover:text-red-700"
                    onClick={() => handleRemoveFile(file.id)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center mt-4">
          <button
            onClick={handleSave}
            className={`bg-dodger-blue text-white px-4 py-2 rounded-md focus:outline-none ${
              loading ? "cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading
              ? "Saving..."
              : uploadedFiles.length > 1
              ? "Save all"
              : "Save"}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default LoadData;
