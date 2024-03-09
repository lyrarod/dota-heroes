import { fetchHeroes } from "@/lib/actions";
import { Search } from "@/components/search";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    search?: string;
  };
}) {
  const heroes = await fetchHeroes();

  const search = searchParams?.search || "";
  // console.log(search);

  const filteredHeroes = search
    ? heroes.filter((hero) => hero.name.toLowerCase().includes(search))
    : heroes;

  return (
    <main className="flex flex-col items-center justify-center">
      <Search />
      <ul className="relative z-0 flex flex-wrap justify-center gap-8 mt-8">
        {filteredHeroes.map((hero) => {
          return (
            <li key={hero.name} className="relative w-64 overflow-hidden h-36">
              <Link href={`/hero/${hero.slug}`}>
                <img
                  src={hero.img}
                  alt={hero.name}
                  width={256}
                  height={144}
                  title={hero.name}
                  className="transition hover:scale-110"
                />

                <span className="absolute bottom-0 left-0 right-0 flex items-center justify-center w-full font-semibold text-center pointer-events-none text-foreground bg-background/70 backdrop-blur-sm">
                  {hero.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
