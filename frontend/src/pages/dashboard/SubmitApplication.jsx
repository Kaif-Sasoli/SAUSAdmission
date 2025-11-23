import { useForm } from "react-hook-form";
import { useState } from "react";

import PersonalInfoStep from "../../components/ApplicationSteps/PersonalInfoStep";
import AcademicStep from "../../components/ApplicationSteps/AcademicStep";
import DocumentInfo from "../../components/ApplicationSteps/DocumentInfo";
import UndertakingDetails from "../../components/ApplicationSteps/UndertakingDetails";
import StatusInformation from "../../components/ApplicationSteps/StatusInformation";

function SubmitApplication() {
  const steps = [
    "Personal Info",
    "Academics",
    "Document Info",
    "Undertaking Details",
    "Status Information",
  ];

  const stepScreens = [
    PersonalInfoStep,
    AcademicStep,
    DocumentInfo,
    UndertakingDetails,
    StatusInformation,
  ];

  const {
    register,
    watch,
    setValue,
    trigger,
    getValues,
    formState: { errors }
  } = useForm();

  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState({});

  // TRACK COMPLETED STEPS
  const [completed, setCompleted] = useState({
    personalInfo: false,
    academics: false,
    documents: false,
    undertaking: false,
  });

  const CurrentStep = stepScreens[step];

  // Determine which key to update
  const stepKeys = ["personalInfo", "academics", "documents", "undertaking"];

  // NEXT BUTTON
  const handleNext = async () => {
    const isValid = await trigger();
    if (!isValid) return;

    const values = getValues();

    // Save step form data
    setFormData(prev => {
    const updated = { ...prev, ...values };
    console.log("📌 UPDATED FORM DATA:", updated);
    return updated;
  });

    // Mark this step as completed
    if (step < stepKeys.length) {
      const key = stepKeys[step];
      setCompleted((prev) => ({ ...prev, [key]: true }));

    }

    // DEBUG: See values
    console.log("CURRENT STEP:", step);
    console.log("STEP DATA:", values);
    console.log("FORM DATA NOW:", formData);
    console.log("COMPLETED STATUS:", completed);

    setStep(step + 1);

  };

  // FILE UPLOADER
const handleFileUpload = (file, fieldName) => {
  setUploadedFiles(prev => ({
    ...prev,
    [fieldName]: file,   // Save actual File object
  }));

  console.log("📸 FILE RECEIVED FROM CHILD:", file);
  console.log("📁 uploadedFiles NOW:", uploadedFiles);
};

  // FINAL SUBMIT
  const handleFinalSubmit = async () => {
    const payload = {
      ...formData,
      ...uploadedFiles,
    };

    console.log("FINAL PAYLOAD:", payload);

    const res = await fetch("/api/submitApplication", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const json = await res.json();
    console.log("SERVER RESPONSE:", json);

    alert("Application submitted! ID: " + json.applicationId);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold">Set up your application</h2>

      {/* PROGRESS BAR */}
      <div className="flex mt-6">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1 w-full mx-1 rounded-full ${
              i <= step ? "bg-blue-600" : "bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* BACK BUTTON */}
      {step > 0 && step < steps.length - 1 && (
        <button
          onClick={() => setStep(step - 1)}
          className="bg-green-100 text-green-700 px-3 py-1 rounded-full mt-4"
        >
          ← {steps[step - 1]}
        </button>
      )}

      {/* STEP SCREENS */}
      <form className="mt-4">
        {step < steps.length - 1 ? (
          <CurrentStep
            register={register}
            watch={watch}
            errors={errors}
            setValue={setValue}
            handleFileUpload={handleFileUpload}
          />
        ) : (
          <StatusInformation
            status={completed}
            onFinalSubmit={handleFinalSubmit}
          />
        )}
      </form>

      {/* NEXT / SUBMIT BUTTON */}
      {step < steps.length - 1 && (
        <button
          type="button"
          onClick={handleNext}
          className="w-full mt-10 py-4 bg-primary2 text-white text-lg rounded-lg"
        >
          NEXT
        </button>
      )}
    </div>
  );
}

export default SubmitApplication;
