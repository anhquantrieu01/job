"use client";

import { useTransition } from "react";
import { saveJob } from "@/actions/jobs";

export default function JobActions({ jobId }: { jobId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex gap-4 mt-4">

      <button
        onClick={() =>
          startTransition(() => saveJob(jobId))
        }
        disabled={isPending}
        className="px-4 py-2 border rounded-xl"
      >
        {isPending ? "Saving..." : "Save Job"}
      </button>
    </div>
  );
}