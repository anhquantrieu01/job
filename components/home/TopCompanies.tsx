import { getTopCompanies } from "@/actions/companies";
import Image from "next/image";

export default async function TopCompanies() {
  const companies = await getTopCompanies();

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-2xl font-bold mb-10">
          Công ty hàng đầu
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {companies.map((c) => (
            <div
              key={c.id}
              className="border rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
            >
              {/* ✅ Next Image */}
              <div className="flex justify-center mb-3">
                <Image
                  src={c.logoUrl || "/no-logo.png"}
                  alt={c.name}
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>

              <p className="font-medium">{c.name}</p>

              <p className="text-sm text-gray-500 mt-1">
                {c._count.jobs} jobs
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}