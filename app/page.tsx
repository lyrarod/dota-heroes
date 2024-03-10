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
      <ul className="z-0 flex flex-wrap justify-center gap-8 p-8">
        {filteredHeroes.map((hero) => {
          return (
            <li
              key={hero.name}
              className="relative flex w-64 overflow-hidden rounded-full shadow-md h-36"
            >
              <Link href={`/hero/${hero.slug}`}>
                <img
                  src={hero.img}
                  alt={hero.name}
                  width={256}
                  height={144}
                  title={hero.name}
                  className="duration-300 hover:scale-110"
                />

                <span className="absolute bottom-0 left-0 right-0 flex items-center justify-center w-full overflow-hidden font-semibold text-center pointer-events-none bg-background/80 backdrop-blur">
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
