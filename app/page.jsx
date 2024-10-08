import Explore from "@/components/Sections/Explore";
import { Hero } from "@/components/Sections/Hero";
import Upcoming from "@/components/Sections/Upcoming";

export default function Home() {
  return <main className="max-w-screen-xl w-full mx-auto">
  <Hero/>
  <Upcoming />
  <Explore />
  </main>;
}
