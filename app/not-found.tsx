import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col w-full p-4 border rounded shadow-md max-w-80 gap-y-2">
        <span className="flex text-4xl">🤖</span>

        <span className="flex items-center gap-x-2">
          <span className="flex w-1 h-1 rounded-full bg-primary" />
          <p className="flex">Not Found !</p>
        </span>

        <span className="flex items-center gap-x-2">
          <span className="flex w-1 h-1 rounded-full bg-primary" />
          <p>Could not find requested resource</p>
        </span>

        <p className="pt-3 text-sm border-t text-foreground/50">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cum neque
          non aliquid quas laborum, consequuntur aspernatur deserunt impedit
          ullam accusamus!
        </p>

        <Button
          asChild
          size={"sm"}
          variant={"link"}
          className="flex p-0 w-fit gap-x-1"
        >
          <Link href="/" prefetch={false}>
            <ArrowLeftIcon />
            Return Home
          </Link>
        </Button>
      </div>
    </main>
  );
}
