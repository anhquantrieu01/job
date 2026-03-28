"use client";

import { useTransition } from "react";
import { updateApplicationStatus } from "./actions";

export default function StatusSelect({
  id,
  status,
}: {
  id: string;
  status: string;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => {
        startTransition(() => updateApplicationStatus(formData));
      }}
    >
      <input type="hidden" name="id" value={id} />

      <select
        name="status"
        defaultValue={status}
        disabled={isPending}
        className="border p-1"
      >
        <option value="PENDING">PENDING</option>
        <option value="REVIEWING">REVIEWING</option>
        <option value="ACCEPTED">ACCEPTED</option>
        <option value="REJECTED">REJECTED</option>
      </select>

      <button className="ml-2 text-sm text-blue-500">
        Update
      </button>
    </form>
  );
}