import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchHeroBySlug, fetchHeroes } from "@/lib/actions";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props) {
  const { slug } = params;
  const hero = await fetchHeroBySlug(slug);

  return {
    title: hero?.name,
  };
}

export async function generateStaticParams() {
  const heroes = await fetchHeroes();
  const topHeroes = heroes.slice(0, 10);

  return topHeroes.map((hero) => ({
    slug: hero.slug,
  }));
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  const hero = await fetchHeroBySlug(slug);

  if (!hero) redirect("/");

  return (
    <main className="flex items-center justify-center w-full min-h-screen">
      <div className="flex justify-center w-full py-4 rounded shadow-md max-w-72 bg-secondary">
        <div className="flex flex-col gap-y-2 w-full max-w-[256px]">
          <img
            src={hero?.img}
            alt={hero?.name}
            title={hero?.name}
            width={256}
            height={144}
          />

          <span className="flex items-center justify-between border-b border-foreground">
            <h1 className="text-xl font-bold">{hero?.name}</h1>
            <img src={hero?.icon} alt={hero?.name} width={32} height={32} />
          </span>

          <span className="border-b border-foreground">
            <strong>Attack Type:</strong>{" "}
            <span className="text-sm">{hero?.attack_type}</span>
          </span>

          <span className="border-b border-foreground">
            <strong>Roles:</strong>{" "}
            <span className="text-sm">{hero?.roles}</span>
          </span>

          <Link
            href={"/"}
            className="transition w-fit text-primary hover:text-primary/70"
          >
            {`←`} <span className="text-xs uppercase">Back</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
