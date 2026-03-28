"use client";

import { useTransition, useState } from "react";
import { applyJobWithCV } from "@/actions/jobs";

export default function ApplyForm({ jobId }: { jobId: string }) {
  const [isPending, startTransition] = useTransition();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <form
      action={(formData) =>
        startTransition(() => applyJobWithCV(formData))
      }
      className="space-y-4"
    >
      <input type="hidden" name="jobId" value={jobId} />

      {/* Upload CV */}
      <label className="block">
        <span className="text-sm font-medium text-gray-700">
          Upload CV (PDF)
        </span>

        <div className="mt-2 flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-green-300 rounded-xl cursor-pointer bg-green-50 hover:bg-green-100 transition">
            
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {fileName ? (
                <p className="text-sm text-green-700 font-medium">
                  ✅ {fileName}
                </p>
              ) : (
                <>
                  <p className="text-sm text-gray-600">
                    📄 Click to upload your CV
                  </p>
                  <p className="text-xs text-gray-400">
                    PDF only (max 2MB)
                  </p>
                </>
              )}
            </div>

            <input
              type="file"
              name="cv"
              accept="application/pdf"
              required
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  setFileName(file.name); 
                }
              }}
            />
          </label>
        </div>
      </label>

      {/* Submit */}
      <button
        type="submit"
        disabled={isPending}
        className="w-full py-3 rounded-xl text-white font-semibold 
                   bg-green-600 hover:bg-green-700 
                   transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Uploading..." : "Apply with CV"}
      </button>
    </form>
  );
}