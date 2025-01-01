import { AnimatePresence, motion } from "framer-motion";
import React from "react";

function StatutsUser() {
  return (
    <AnimatePresence>
      {StatutsUser && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => window.history.back()}
          />
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 z-50 h-full w-full max-w-2xl bg-white p-6 shadow-lg rounded-lg"
          >
            <div>
                Sopan

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default StatutsUser;
