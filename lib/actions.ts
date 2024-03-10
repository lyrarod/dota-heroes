"use server";

export type HeroesProps = {
  localized_name: string;
  img: string;
  icon: string;
  slug: string;
  attack_type: string;
  roles: string[];
  primary_attr: string;
};

export async function fetchHeroes() {
  const res = await fetch("https://api.opendota.com/api/heroStats", {
    next: {
      revalidate: 86400, // 24h
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: HeroesProps[] = await res.json();

  const formattedData = data.map((hero) => {
    const path = "https://cdn.cloudflare.steamstatic.com";

    const name = hero.localized_name;
    const img = path + hero.img;
    const icon = path + hero.icon;

    const slug = hero.localized_name
      .toLowerCase()
      .replaceAll(" ", "-")
      .replaceAll("'", "");

    return {
      name,
      img,
      icon,
      slug,
      attack_type: hero.attack_type,
      roles: hero.roles,
      primary_attr: hero.primary_attr,
    };
  });

  return formattedData;
}

export async function fetchHeroBySlug(slug: string) {
  const heroes = await fetchHeroes();
  const hero = heroes.find((hero) => hero.slug === slug);

  return hero;
}
