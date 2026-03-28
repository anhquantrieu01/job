"use client";

import { useTransition, useState } from "react";
import { saveJob, unsaveJob } from "@/actions/jobs";

export default function SaveJobButton({
  jobId,
  initialSaved = false,
}: {
  jobId: string;
  initialSaved?: boolean;
}) {
  const [isPending, startTransition] = useTransition();
  const [saved, setSaved] = useState(initialSaved);

  const handleToggle = () => {
    startTransition(async () => {
      if (saved) {
        setSaved(false);
        await unsaveJob(jobId);
      } else {
        setSaved(true);
        await saveJob(jobId);
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isPending}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-xl border transition w-full
        ${
          saved
            ? "bg-green-600 text-white border-green-600"
            : "bg-white text-gray-700 border-gray-300 hover:border-green-500 hover:text-green-600"
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {/* Icon */}
      <span className="text-lg">
        {saved ? "❤️" : "🤍"}
      </span>

      {/* Text */}
      <span className="text-sm font-medium">
        {isPending
          ? saved
            ? "Removing..."
            : "Saving..."
          : saved
          ? "Saved"
          : "Save Job"}
      </span>
    </button>
  );
}