// import React from "react";
// import { Check, X } from "lucide-react";

// // Last Step
// function StatusInformation({ status }) {
//   // status example:
//   // {
//   //   personalInfo: true,
//   //   academics: false,
//   //   preferences: true,
//   //   documents: false,
//   //   undertaking: false
//   // }
  

//   const fields = [
//     { key: "personalInfo", label: "Personal Info" },
//     { key: "academics", label: "Academics" },
//     { key: "documents", label: "Documents" },
//     { key: "undertaking", label: "Undertaking" },
//   ];

//   return (
//     <div className="p-5 mt-4">
//       <h2 className="text-xl font-semibold mb-3">Status Information</h2>

//       {/* Top info bar */}
//       <div className="bg-slate-400 text-white p-4 rounded-md mb-4">
//         Before the application can be submitted, all steps listed below must appear as Tick.
//       </div>

//       {/* Header Row */}
//       <div className="grid grid-cols-5 text-center bg-purple-800
//        text-white py-3 rounded-t-lg font-semibold">
//         {fields.map((f) => (
//           <div key={f.key}>{f.label}</div>
//         ))}
//       </div>

//       {/* Status Row */}
//       <div className="grid grid-cols-5 text-center 
//       bg-gray-100 py-4 rounded-b-lg border border-gray-300">
//         {fields.map((f) => (
//           <div key={f.key}>
//             {status[f.key] ? (
//               <Check className="text-green-600 w-6 h-6 inline-block" />
//             ) : (
//               <X className="text-red-600 w-6 h-6 inline-block" />
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Submit Button */}
//       <div className="flex justify-center mt-6">
//         <button
//           type="button"
//           disabled={!Object.values(status).every(Boolean)}
//           className="px-7 py-3 bg-gray-400 text-white rounded-lg disabled:opacity-60"
//         >
//           Finalize And Submit
//         </button>
//       </div>
//     </div>
//   );
// }

// export default StatusInformation;


import React from "react";
import { Check, X } from "lucide-react";

function StatusInformation({ status, onFinalSubmit }) {
  const fields = [
    { key: "personalInfo", label: "Personal Info" },
    { key: "academics", label: "Academics" },
    { key: "documents", label: "Documents" },
    { key: "undertaking", label: "Undertaking" },
  ];

  return (
    <div className="p-5 mt-4">
      <h2 className="text-xl font-semibold mb-3">Status Information</h2>

      {/* INFO BAR */}
      <div className="bg-slate-400 text-white p-4 rounded-md mb-4">
        Before the application can be submitted, all steps listed below must appear as Tick.
      </div>

      {/* HEADER */}
      <div className="grid grid-cols-4 text-center bg-purple-800 text-white py-3 rounded-t-lg font-semibold">
        {fields.map((f) => (
          <div key={f.key}>{f.label}</div>
        ))}
      </div>

      {/* VALUES */}
      <div className="grid grid-cols-4 text-center bg-gray-100 py-4 rounded-b-lg border border-gray-300">
        {fields.map((f) => (
          <div key={f.key}>
            {status[f.key] ? (
              <Check className="text-green-600 w-6 h-6 inline-block" />
            ) : (
              <X className="text-red-600 w-6 h-6 inline-block" />
            )}
          </div>
        ))}
      </div>

      {/* FINAL SUBMIT BUTTON */}
      <div className="flex justify-center mt-6">
        <button
          type="button"
          disabled={!Object.values(status).every(Boolean)}
          onClick={onFinalSubmit}
          className="px-7 py-3 bg-gray-500 text-white rounded-lg disabled:opacity-60"
        >
          Finalize And Submit
        </button>
      </div>
    </div>
  );
}

export default StatusInformation;
