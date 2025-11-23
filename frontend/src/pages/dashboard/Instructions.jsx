import React from "react";
import {
  Info,
  Users,
  FileText,
  CalendarDays,
  ClipboardList,
  BookOpen,
  GraduationCap,
  FileSearch,
  NotebookPen,
  BookCopy,
} from "lucide-react";

function Instructions() {
  const items = [
    {
      title: "Candidate Status",
      icon: <Users size={22} className="text-blue-600" />,
      desc: "This section basically provides information about the overall status of the candidate starting from filling the Admission Form until the test is conducted and admission is confirmed or rejected.",
    },
    {
      title: "Edit Application (UG)",
      icon: <FileText size={22} className="text-blue-600" />,
      desc: "This is the actual form that you must complete and submit. There are about five sections in the application form, which must be completed (depending on the program requirements you are applying for) before the application can be submitted to the Admission Office.",
    },
    {
      title: "Checklist",
      icon: <ClipboardList size={22} className="text-blue-600" />,
      desc: "Lists all documents that you must submit to the Admission Office before the deadline date mentioned in admission schedule as well as details about application processing fee.",
    },
    {
      title: "Instructions",
      icon: <Info size={22} className="text-blue-600" />,
      desc: "The current page you are viewing. Provides a quick getting started guide.",
    },
    {
      title: "Admission Schedule",
      icon: <CalendarDays size={22} className="text-blue-600" />,
      desc: "This page provides the complete Admission Schedule mentioning all the important details related to the complete Admission process from start to end.",
    },
    {
      title: "Eligibility Criteria-General",
      icon: <BookOpen size={22} className="text-blue-600" />,
      desc: "Lists general eligibility criteria for all the programs. You should go through this section to determine if you meet the required criteria.",
    },
    {
      title: "Eligibility Criteria-Program Wise",
      icon: <GraduationCap size={22} className="text-blue-600" />,
      desc: "Provides information whether you are eligible or ineligible to take admission in certain department of a certain program considering your past education.",
    },
    {
      title: "Admission Procedure",
      icon: <FileSearch size={22} className="text-blue-600" />,
      desc: "This page provides you information on how to apply for admission in Shaikh Ayaz University Shikarpur.",
    },
    {
      title: "Prospectus",
      icon: <NotebookPen size={22} className="text-blue-600" />,
      desc: "This page provides you to view prospectus of the Programs offered in Shaikh Ayaz University Shikarpur for the current year.",
    },
    {
      title: "Sample Papers",
      icon: <BookCopy size={22} className="text-blue-600" />,
      desc: "This page provides you to view sample test papers of the departments offered in Shaikh Ayaz University Shikarpur.",
    },
    {
      title: "Fee Structure",
      icon: <FileText size={22} className="text-blue-600" />,
      desc: "This page provides you to view fee structure for the specific department offered in Shaikh Ayaz University Shikarpur for the current Year.",
    },
  ];

  return (
    <div className="space-y-10">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
          Instructions
        </h1>
        <p className="text-gray-600 mt-2 leading-relaxed max-w-3xl">
          The menu on the left-hand-side provides links to each part of the application. 
          Here is a brief description of each option.
        </p>
      </div>

      {/* Clean Layout */}
      <div className="space-y-10 border-l-4 border-blue-600 pl-6">

        {items.map((item, index) => (
          <div key={index} className="space-y-3">

            {/* Title + Icon */}
            <div className="flex items-center gap-3">
              <div>{item.icon}</div>
              <h2 className="text-2xl font-semibold text-gray-800">{item.title}</h2>
            </div>

            {/* Description */}
            <p className="text-gray-600 max-w-4xl pl-10 leading-relaxed">
              {item.desc}
            </p>

            {/* Minimal Divider */}
            {index !== items.length - 1 && (
              <div className="h-px bg-gray-200 w-full ml-10 mt-5"></div>
            )}

          </div>
        ))}

      </div>
    </div>
  );
}

export default Instructions;
