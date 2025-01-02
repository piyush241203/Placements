import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TermsAndConditionsPopup = ({ onClose, onApply }) => {

    const [isAgreed, setIsAgreed] = useState(false);

  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Terms and Conditions
          </h2>
          <div className="space-y-4 text-gray-600">
            <p>
              By applying for this job, you agree to the following terms and
              conditions:
            </p>
            <ul className="list-disc pl-6">
              <li>
                You confirm that all the information provided by you is accurate
                and true.
              </li>
              <li>
                You understand that any false information may lead to
                disqualification.
              </li>
              <li>
                You agree to the company's privacy policy and terms of service.
              </li>
              <li>
                You acknowledge that the company may contact you for further
                information.
              </li>
            </ul>
            <p className="mt-3">
              Please ensure you have read and understood all the terms before
              proceeding.
            </p>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={isAgreed}
                onChange={handleCheckboxChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="agreeTerms" className="ml-2 text-gray-700">
                I agree to all the terms and conditions
              </label>
            </div>
          </div>

          
          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 font-semibold border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={onApply}
              disabled={!isAgreed}
              className={`px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg ${
                isAgreed ? "hover:bg-blue-600" : "opacity-50 cursor-not-allowed"
              }`}
            >
              Apply Now
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TermsAndConditionsPopup;