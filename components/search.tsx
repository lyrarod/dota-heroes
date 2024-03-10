"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "./ui/input";
import { ModeToggle } from "./mode-toggle";

export function Search() {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }
    replace(`${pathname}?${params.toString().toLowerCase()}`);
  }

  return (
    <div className="sticky top-0 left-0 z-10 flex items-center justify-center w-full p-4 border-b bg-background/80 gap-x-2 backdrop-blur">
      <Input
        type="search"
        placeholder="Search by name..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        className="w-80"
      />
      <ModeToggle />
    </div>
  );
}
