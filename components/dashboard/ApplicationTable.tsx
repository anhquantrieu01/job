export default function ApplicationTable() {
  const applications = [
    {
      name: "Nguyen Van A",
      job: "React Developer",
      status: "Pending",
    },
    {
      name: "Tran Thi B",
      job: "Backend Developer",
      status: "Accepted",
    },
  ]

  return (
    <div className="rounded-xl border bg-white p-6">

      <h3 className="mb-4 font-semibold">
        Recent Applications
      </h3>

      <table className="w-full text-sm">

        <thead>
          <tr className="text-left text-gray-500">
            <th className="pb-2">Candidate</th>
            <th className="pb-2">Job</th>
            <th className="pb-2">Status</th>
          </tr>
        </thead>

        <tbody>

          {applications.map((a, i) => (
            <tr key={i} className="border-t">

              <td className="py-3">{a.name}</td>
              <td>{a.job}</td>
              <td>
                <span className="rounded bg-green-100 px-2 py-1 text-green-700">
                  {a.status}
                </span>
              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  )
}