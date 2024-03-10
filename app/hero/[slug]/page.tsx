import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchHeroBySlug, fetchHeroes } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ReloadIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
      <Card className="w-full max-w-72">
        <CardHeader>
          <div className="w-64 overflow-hidden rounded-full h-36">
            <img
              src={hero.img}
              alt={hero.name}
              title={hero.name}
              width={256}
              height={144}
              className="duration-1000 hover:scale-125"
            />
          </div>

          <div className="flex items-center justify-between border-b">
            <CardTitle>{hero.name}</CardTitle>
            <Avatar>
              <AvatarImage src={hero.icon} width={32} height={32} />
              <AvatarFallback>
                <ReloadIcon className="animate-spin" />
              </AvatarFallback>
            </Avatar>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col text-xs uppercase gap-y-2">
          <div className="flex gap-x-2">
            <strong className="flex items-center h-fit">
              <span className="flex w-1 h-1 mr-2 rounded-full bg-primary" />
              attack_type:
            </strong>{" "}
            <span>{hero.attack_type}</span>
          </div>

          <div className="flex gap-x-2">
            <strong className="flex items-center h-fit">
              <span className="flex w-1 h-1 mr-2 rounded-full bg-primary" />
              primary_attr:
            </strong>{" "}
            <span>{hero.primary_attr}</span>
          </div>

          <div className="flex flex-wrap items-center gap-1">
            <strong className="flex items-center mr-1 h-fit">
              <span className="flex w-1 h-1 mr-2 rounded-full bg-primary" />
              roles:
            </strong>
            {hero.roles.map((role) => (
              <Badge key={role} variant="outline">
                {role}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button asChild variant={"default"} size={"sm"} className="w-full">
            <Link href={"/"}>
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* <div className="flex justify-center w-full py-4 rounded shadow-md max-w-72 bg-secondary">
        <div className="flex flex-col gap-y-4 w-full max-w-[256px]">
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

          <Button asChild variant={"default"} size={"sm"}>
            <Link href={"/"}>
              <ArrowLeftIcon /> Back
            </Link>
          </Button>
        </div>
      </div> */}
    </main>
  );
}
