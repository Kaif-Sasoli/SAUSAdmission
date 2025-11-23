import React, { useState } from "react";
import { Eye, Download, Trash2 } from "lucide-react";

function DocumentInfo({ register, errors, setValue, getValues }) {
  const [documents, setDocuments] = useState([]);

  // ADD DOCUMENT
  const handleAddDocument = (e) => {
    e.preventDefault();

    const values = getValues();

    const fileInput = document.querySelector('input[name="documentFile"]');
    const file = fileInput?.files[0];

    if (!values.documentName || !values.documentType || !file) {
      alert("Please fill all fields and upload a file.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    setDocuments((prev) => [
      ...prev,
      {
        id: Date.now(),
        name: values.documentName,
        type: values.documentType,
        file,
        url: fileUrl,
      },
    ]);

    // Reset fields
    setValue("documentName", "");
    setValue("documentType", "");
    setValue("documentFile", null);
    fileInput.value = "";
  };

  // DELETE DOCUMENT
  const handleDelete = (id) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="p-3">
      {/* TOP CARD */}
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold mb-3">Document Information</h2>

        <div className="w-full bg-gray-400 text-white p-2 rounded">
          <p>It is mandatory to upload CNIC</p>
        </div>

        {/* FORM ROW */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* Document Name */}
          <div>
            <label className="text-sm mb-1 block">
              Document Name <span className="text-red-500">*</span>
            </label>

            <input
              {...register("documentName", { required: "Required" })}
              className="w-full border px-3 py-2 rounded"
            />

            {errors.documentName && (
              <p className="text-red-500 text-sm">
                {errors.documentName.message}
              </p>
            )}
          </div>

          {/* Document Type */}
          <div>
            <label className="text-sm mb-1 block">
              Document Type <span className="text-red-500">*</span>
            </label>

            <select
              {...register("documentType", { required: "Required" })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select</option>
              <option value="CNIC Front">CNIC Front</option>
              <option value="CNIC Back">CNIC Back</option>
              <option value="Domicile">Domicile</option>
              <option value="Photo">Photo</option>
            </select>

            {errors.documentType && (
              <p className="text-red-500 text-sm">
                {errors.documentType.message}
              </p>
            )}
          </div>

          {/* Upload File */}
          <div>
            <label className="text-sm mb-1 block">
              Upload Attachment <span className="text-red-500">*</span>
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.png"
              {...register("documentFile", { required: "Required" })}
              className="w-full border px-3 py-2 rounded bg-white"
            />

            {errors.documentFile && (
              <p className="text-red-500 text-sm">
                {errors.documentFile.message}
              </p>
            )}
          </div>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end mt-4 space-x-3">
          <button
            type="button"
            onClick={handleAddDocument}
            className="bg-primary2 text-white px-5 py-2 rounded"
          >
            Add
          </button>

          <button
            type="button"
            onClick={() => {
              setValue("documentName", "");
              setValue("documentType", "");
              setValue("documentFile", null);
              document.querySelector('input[name="documentFile"]').value = "";
            }}
            className="bg-gray-200 px-5 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* DOCUMENT LIST TABLE */}
      <div className="bg-white rounded-lg shadow-md p-4 mt-6">
        <h2 className="text-lg font-semibold mb-3">Document List</h2>

        <table className="w-full text-center border">
          <thead className="bg-purple-900 text-white">
            <tr>
              <th className="py-2">File Name</th>
              <th>Document Type</th>
              <th>Download</th>
              <th>View</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {documents.length > 0 ? (
              documents.map((doc) => (
                <tr key={doc.id} className="border">
                  <td className="py-2">{doc.name}</td>
                  <td>{doc.type}</td>

                  <td>
                    <a
                      href={doc.url}
                      download={doc.name}
                      className="text-blue-600"
                    >
                      <Download size={18} />
                    </a>
                  </td>

                  <td>
                    <a
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600"
                    >
                      <Eye size={18} />
                    </a>
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-red-600"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4">
                  No Documents Uploaded
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DocumentInfo;
