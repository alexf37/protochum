import Link from "next/link";

function LeftArrowIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-6 w-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

export default async function Home() {
  return (
    <>
      <h1 className="text-center text-5xl font-extrabold tracking-tight drop-shadow sm:text-[5rem]">
        Welcome to <br />
        <span className="text-indigo-500">Chum</span>
      </h1>
      <Link
        href="survey"
        className="group flex items-center gap-2 rounded-full border-2 border-indigo-400 bg-indigo-500 px-5 py-3 text-xl font-semibold drop-shadow"
      >
        Start
        <LeftArrowIcon className="h-5 w-5 transition-all group-hover:translate-x-1" />
      </Link>
    </>
  );
}
