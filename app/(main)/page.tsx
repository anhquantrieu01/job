import Categories from "@/components/Categories";
import CTA from "@/components/home/CTA";
import FeaturedJobs from "@/components/home/FeaturedJobs";
import Hero from "@/components/home/Hero";
import Stats from "@/components/home/Stats";
import TopCompanies from "@/components/home/TopCompanies";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <div className="max-w-6xl mx-auto">
        <Categories />
        <FeaturedJobs />
        <TopCompanies />
        <Stats />
        <CTA />
      </div>
    </main>
  );
}
