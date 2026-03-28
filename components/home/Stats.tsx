import { getStats } from "@/actions/stats";

export default async function Stats() {
  const stats = await getStats();

  return (
    <section className="bg-green-600 py-16 text-white">
      <div className="mx-auto max-w-6xl px-4 grid grid-cols-3 text-center">

        <div>
          <p className="text-3xl font-bold">
            {stats.jobs}
          </p>
          <p>Công việc</p>
        </div>

        <div>
          <p className="text-3xl font-bold">
            {stats.companies}
          </p>
          <p>Công ty</p>
        </div>

        <div>
          <p className="text-3xl font-bold">
            {stats.users}
          </p>
          <p>Ứng viên</p>
        </div>

      </div>
    </section>
  );
}