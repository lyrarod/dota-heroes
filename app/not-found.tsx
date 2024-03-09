import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col p-4 bg-white rounded shadow gap-y-2">
        <h2>Not Found</h2>
        <p>Could not find requested resource</p>
        <Link
          href="/"
          prefetch={false}
          className="text-gray-400 transition w-fit hover:font-semibold hover:text-black"
        >
          ← <span className="text-xs uppercase">Return Home</span>
        </Link>
      </div>
    </main>
  );
}
