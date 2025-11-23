import React from "react";

function UndertakingDetails({ register, errors }) {
  return (
    <div className="p-3">
      <div className="bg-white rounded-xl shadow-md border p-4">

        {/* Heading */}
        <h2 className="text-xl font-semibold mb-3">Undertaking Details</h2>

        <div className="border rounded-lg p-4 bg-white">

          <div className="flex items-start space-x-3">
            {/* Checkbox */}
            <input
              type="checkbox"
              {...register("undertaking", { required: true })}
              className="w-5 h-5 mt-1"
            />

            {/* Undertaking text */}
            <p className="text-gray-700 leading-7 text-justify">
              I, hereby undertake that the entries made in admission form are correct
              and complete to the best of my knowledge and that my admission to the
              University is provisional and is subject to cancellation if any
              irregularity is found in my admission form/documents. Further, my name
              has not been registered/enrolled as regular student for any other
              degree in any field of study at other Institute/University. I
              acknowledge that I have uploaded my CNIC Front, CNIC Back, Domicile,
              PRC & other relevant documents. I also undertake to abide by the rules
              and regulations of the Shaikh Ayaz University Shikarpur.
            </p>
          </div>

          {/* Validation */}
          {errors.undertaking && (
            <p className="text-red-500 text-sm mt-2">
              You must accept the undertaking to continue.
            </p>
          )}

          {/* Button */}
          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
            >
              Update
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default UndertakingDetails;
