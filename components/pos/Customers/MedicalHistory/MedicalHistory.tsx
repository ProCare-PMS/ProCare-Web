import React, { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import clsx from 'clsx'

interface MedicalHistoryItem {
  drug: string;
  dose: string;
  frequency: string;
  instructions: string;
  status: string;
  startDate: string;
  endDate: string;
  reason: string;
  year: string;
}

interface YearHistory {
  year: string;
  medicalHistory: MedicalHistoryItem[];
}

const patientHistory: YearHistory[] = [
  {
    year: "2024",
    medicalHistory: [
      {
        drug: "Paracetamol - 500g",
        dose: "Daily",
        frequency: "3x",
        instructions:
          "Take one tablet daily in the morning with food for the next 20 days",
        status: "In Progress",
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        reason: "For headache",
        year: "2024",
      },
      {
        drug: "Paracetamol - 500g",
        dose: "Daily",
        frequency: "3x",
        instructions:
          "Take one tablet daily in the morning with food for the next 20 days",
        status: "Completed",
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        reason: "For headache",
        year: "2024",
      },
      {
        drug: "Paracetamol - 500g",
        dose: "Daily",
        frequency: "3x",
        instructions:
          "Take one tablet daily in the morning with food for the next 20 days",
        status: "Completed",
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        reason: "For headache",
        year: "2024",
      },
    ],
  },
  {
    year: "2023",
    medicalHistory: [
      {
        drug: "Paracetamol - 500g",
        dose: "Daily",
        frequency: "3x",
        instructions:
          "Take one tablet daily in the morning with food for the next 20 days",
        status: "Completed",
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        reason: "For headache",
        year: "2024",
      },
      {
        drug: "Paracetamol - 500g",
        dose: "Daily",
        frequency: "3x",
        instructions:
          "Take one tablet daily in the morning with food for the next 20 days",
        status: "Completed",
        startDate: "2021-01-01",
        endDate: "2021-12-31",
        reason: "For headache",
        year: "2024",
      },
    ],
  },
];

const MedicalHistory: React.FC = () => {
  // Use an object to track expanded state for each year
  const [expandedYears, setExpandedYears] = useState<{[key: string]: boolean}>({});

  const toggleHistory = (year: string) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year]
    }));
  };

  return (
    <div className="grid gap-y-2 w-full">
      {patientHistory.map((history) => (
        <div className="py-8" key={history.year}>
          {/* Year and Number of medications for the year */}
          <div className="flex items-center justify-between">
            <div className="flex gap-x-2 items-center">
              <div
                className="bg-[#F5F5F5] rounded-full p-2 cursor-pointer"
                onClick={() => toggleHistory(history.year)}
              >
                {expandedYears[history.year] ? <ChevronUp /> : <ChevronDown />}
              </div>
              <h2 className="text-[#202224] font-medium text-base">
                {history.year}
              </h2>
            </div>
            <div className="bg-[#F5F5F5] rounded-full p-2">
              <p>{history.medicalHistory.length}</p>
            </div>
          </div>

          <div
            className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
              expandedYears[history.year] ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid gap-y-8">
              {history.medicalHistory.map((med, index) => (
                <div className="flex items-center justify-between py-4" key={index}>
                  <div className="ml-16 border-l border-gray-600 pl-8 relative">
                    {/* Blue dot */}
                    <div className="absolute left-0 bottom-[-18px] w-2 h-2 bg-[#2648EA] rounded-full translate-x-[-50%] translate-y-[-50%] z-10"></div>

                    {/* Drugs and dosage */}
                    <div className="flex items-center gap-x-4">
                      <h3 className="text-[#242525] font-semibold text-sm pr-4 border-r border-gray-300">
                        {med.drug}
                      </h3>
                      <span className="px-4 border-r border-gray-300">
                        {med.dose}
                      </span>
                      <span>{med.frequency}</span>
                    </div>
                    <p className="text-[#202224] font-semibold text-xs mt-2">
                      {med.instructions}
                    </p>
                    <p className="text-[#202224] font-semibold text-xs mt-3">
                      {med.startDate} - {med.endDate}
                    </p>
                  </div>

                  {/* Status */}
                  <div
                    className={clsx(
                      "rounded-3xl font-inter text-sm font-normal",
                      {
                        "text-[#219653] bg-[#21965314] py-2 rounded-3xl px-3":
                          med.status === "Completed",
                        "text-[#FFA70B] bg-[#FFA70B14] px-3 py-2":
                          med.status === "In Progress",
                      }
                    )}
                  >
                    <p>{med.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MedicalHistory;