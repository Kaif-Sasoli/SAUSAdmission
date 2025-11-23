import React, { useState } from "react";
import { View } from "lucide-react";

function AcademicStep({ register, errors, watch, setValue, getValues }) {
   const [documents, setDocuments] = useState([]);

  const handleAddDocument = (e) => {
    e.preventDefault();

    const values = getValues(); // important fix

    // Required fields
    const requiredFields = [
      "examination",
      "group",
      "year",
      "seatNo",
      "obtainedMarks",
      "totalMarks",
      "board",
      "school",
    ];

    const missingFields = requiredFields.filter((field) => !values[field]);

    // File
    const fileInput = document.querySelector('input[name="marksheetFile"]');
    const file = fileInput?.files[0];

    if (!file || missingFields.length > 0) {
      alert("Please fill all mandatory fields and upload the marksheet before adding.");
      return;
    }

    // Add document
    const objectUrl = URL.createObjectURL(file);
    setDocuments((prev) => [
      ...prev,
      {
        id: Date.now(),
        file,
        url: objectUrl,
        campusType: values.campusType,
        campusCity: values.campusCity,
        programType: values.programType,
        admissionType: values.admissionType,
        intermediateMajor: values.intermediateMajor,
        facultyDepartment: values.facultyDepartment,
        facultyProgram: values.facultyProgram,
        examination: values.examination,
        group: values.group,
        year: values.year,
        seatNo: values.seatNo,
        obtainedMarks: values.obtainedMarks,
        totalMarks: values.totalMarks,
        board: values.board,
        school: values.school,
      },
    ]);

    // Clear file input
    setValue("marksheetFile", null);
    fileInput.value = "";
  };

  return (
    <div className="p-4 rounded-lg">
      <form className="space-y-3">
        {/* Program Applying Section */}
        <div className="bg-gray-100  rounded">
          <div className="w-full border-b border-gray-400 py-1">
            <h1 className="px-2 py-2 font-semibold">Program Applying For</h1>
          </div>

          <div className="w-full bg-gray-400 text-white mt-2 p-2 rounded">
            <h1>Please select Faculty & Department as per Advertisement.</h1>
          </div>

          {/* Row 1 */}
          <div className="px-3 grid grid-cols-4 gap-3 mt-2">
            {[
              {
                label: "Campus Type",
                key: "campusType",
                options: ["Main", "City", "Sub"],
              },
              {
                label: "Campus City",
                key: "campusCity",
                options: ["Karachi", "Lahore", "Islamabad"],
              },
              {
                label: "Program Type",
                key: "programType",
                options: ["Undergraduate", "Graduate", "Diploma"],
              },
              {
                label: "Admission Type",
                key: "admissionType",
                options: ["Merit", "Self-Finance", "Quota"],
              },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm mb-1">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <select
                  {...register(field.key, { required: "Required" })}
                  className="w-full border px-2 py-1 rounded text-sm"
                >
                  <option value="">Select</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors[field.key] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.key].message}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Row 2 */}
          <div className="px-3 grid grid-cols-3 gap-3 mt-3">
            {[
              {
                label: "Intermediate Major",
                key: "intermediateMajor",
                options: ["Pre-Engineering", "Pre-Medical", "Commerce", "Arts"],
              },
              {
                label: "Faculty Department",
                key: "facultyDepartment",
                options: ["Science", "Arts", "Commerce"],
              },
              {
                label: "Faculty Department Program",
                key: "facultyProgram",
                options: ["BS Computer Science", "BS Physics", "BA English"],
              },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-sm mb-1">
                  {field.label} <span className="text-red-500">*</span>
                </label>
                <select
                  {...register(field.key, { required: "Required" })}
                  className="w-full border px-2 py-1 rounded text-sm"
                >
                  <option value="">Select</option>
                  {field.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors[field.key] && (
                  <p className="text-red-500 text-sm">
                    {errors[field.key].message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Academic Details */}
        <div className="w-full bg-gray-100 mt-4 py-2 rounded">
          <div
            className="w-full border-b mb-2 py-1 px-3 
          font-semibold border-gray-400"
          >
            <h1>Academic Details</h1>
          </div>

          <div className="w-full bg-gray-400 text-white mt-2 p-2 rounded">
            <h1>
              It is mandatory to provide Matriculation/O levels and
              Intermediate/DAE/A Levels Records. In case you have more than one
              document for O levels, A levels etc then you should upload a
              combined pdf file showing all relevant documents in one file.
              Candidates having less than 50% in Intermdiate/DAE are not
              eligible to apply.
            </h1>
          </div>

          <div className="px-3 grid grid-cols-4 gap-3 mt-2">
            <div>
              <label className="block text-sm mb-1">
                Examination <span className="text-red-500">*</span>
              </label>
              <input
                {...register("examination", { required: "Required" })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
              {errors.examination && (
                <p className="text-red-500 text-sm">
                  {errors.examination.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Group / Major Subjects
                <span className="text-red-500">*</span>
              </label>
              <select
                {...register("group", { required: "Please select a group" })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="">Select</option>
                <option value="pre-engineering">Pre-Engineering</option>
                <option value="pre-medical">Pre-Medical</option>
                <option value="pre-computer-science">
                  Pre-Computer Science
                </option>
                <option value="commerce">Commerce</option>
                <option value="science">Science</option>
              </select>
              {errors.group && (
                <p className="text-red-500 text-sm">{errors.group.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Year <span className="text-red-500">*</span>
              </label>
              <select
                {...register("year", { required: "Required" })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="">Select</option>
                {["2020", "2021", "2022", "2023", "2024"].map((yr) => (
                  <option key={yr} value={yr}>
                    {yr}
                  </option>
                ))}
              </select>
              {errors.year && (
                <p className="text-red-500 text-sm">{errors.year.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                Seat / Roll No <span className="text-red-500">*</span>
              </label>
              <input
                {...register("seatNo", { required: "Required" })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
              {errors.seatNo && (
                <p className="text-red-500 text-sm">{errors.seatNo.message}</p>
              )}
            </div>
          </div>

          <div className="px-3 grid grid-cols-4 gap-3 mt-3">
            <div>
              <label className="block text-sm mb-1">
                Obtained Marks
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("obtainedMarks", { required: "Required" })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Total Marks
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("totalMarks", { required: "Required" })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">
                Board
                <span className="text-red-500">*</span>
              </label>
              <select
                {...register("board", { required: "Required" })}
                className="w-full border px-2 py-1 rounded text-sm"
              >
                <option value="">Select</option>
                {["Larkana", "Karachi", "Lahore", "Islamabad"].map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              {errors.board && (
                <p className="text-red-500 text-sm">{errors.board.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">
                School / College / Institute{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                {...register("school", { required: "Required" })}
                className="w-full border px-2 py-1 rounded text-sm"
              />
              {errors.school && (
                <p className="text-red-500 text-sm">{errors.school.message}</p>
              )}
            </div>
          </div>

          <div className="px-3 flex justify-between items-center">
            {/* File Upload */}
            <div className="w-fit mt-3">
              <label className="block text-sm mb-1">
                Upload Marksheet
                <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.png"
                {...register("marksheetFile", { required: "File is required" })}
                className=" border px-2 py-1 rounded text-sm text-center"
              />
              {errors.marksheetFile && (
                <p className="text-red-500 text-sm">
                  {errors.marksheetFile.message}
                </p>
              )}
            </div>

            <div className="flex space-x-3 mt-3">
              <button
                type="button"
                onClick={handleAddDocument}
                className="bg-primary3 text-white px-4 py-1 rounded hover:bg-primary3 transition"
              >
                Add
              </button>

              <button
                type="button"
                onClick={() => {
                  setValue("marksheetFile", null); // Reset file input in react-hook-form
                  // Optionally reset other fields if needed:
                  // reset(); // If using useForm's reset function
                }}
                className="bg-gray-300 text-gray-800 px-4 py-1 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Document Table */}
      <div className="mt-4 bg-gray-100 rounded-md">
        <div className="w-full border-b border-gray-400 py-2 font-semibold px-3">
          <h1>Academic Records</h1>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border text-center">
            <thead className="bg-primary2 text-white ">
              <tr>
                <th>S.No</th>
                <th>Campus City</th>
                <th>Examination</th>
                <th>Group</th>
                <th>Year</th>
                <th>Seat No</th>
                <th>Obtained</th>
                <th>Total</th>
                <th>Board</th>
                <th>School</th>
                <th>View</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 ? (
                documents.map((doc, index) => (
                  <tr key={doc.id} className="border-b">
                    <td>{index + 1}</td>
                    <td>{doc.campusCity}</td>
                    <td>{doc.examination}</td>
                    <td>{doc.group}</td>
                    <td>{doc.year}</td>
                    <td>{doc.seatNo}</td>
                    <td>{doc.obtainedMarks}</td>
                    <td>{doc.totalMarks}</td>
                    <td>{doc.board}</td>
                    <td>{doc.school}</td>
                    <td>
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        <View size={18} />
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" className="text-center py-4">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AcademicStep;
