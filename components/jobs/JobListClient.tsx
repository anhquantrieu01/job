"use client";

import { useState, useTransition } from "react";
import { getJobsAction } from "@/actions/jobs";
import JobList from "./JobList";
import { JobExpanded } from "@/types";



export default function JobListClient({
  initialJobs,
  initialCursor,
  search,
  locationId,
  jobType,
}: {
    initialJobs: JobExpanded[]
    initialCursor: string | undefined
    cursorId?: string
    search?: string
    locationId?: string
    jobType?: string
}) {
  const [jobs, setJobs] = useState(initialJobs);
  const [cursor, setCursor] = useState(initialCursor);
  const [isPending, startTransition] = useTransition();



  const loadMore = () => {
    if (!cursor) return;

    startTransition(async () => {
      const data = await getJobsAction({
        cursorId: cursor,
        search,
        locationId,
        jobType,
      });

      setJobs((prev) => [...prev, ...(data.jobs as JobExpanded[])]);
      setCursor(data.nextCursor!);
    });
  };

  return (
    <JobList
      jobs={jobs}
      hasMore={!!cursor}
      onLoadMore={loadMore}
      loading={isPending}
    />
  );
}