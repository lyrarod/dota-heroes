"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

export function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

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
    <div className="sticky top-0 left-0 z-10 flex items-center justify-center w-full p-4 border-b bg-background/80 gap-x-4 backdrop-blur-sm">
      <input
        placeholder="Search by name..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("search")?.toString()}
        className="h-10 p-2 bg-transparent border rounded border-foreground"
      />
      <ModeToggle />
    </div>
  );
}
