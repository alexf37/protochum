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

function WrenchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21.75 6.75a4.5 4.5 0 0 1-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 1 1-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 0 1 6.336-4.486l-3.276 3.276a3.004 3.004 0 0 0 2.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852Z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.867 19.125h.008v.008h-.008v-.008Z"
      />
    </svg>
  );
}

function LinkAwayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
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
      <div className="flex gap-4">
        <Link
          href="#calendly"
          className="group flex items-center gap-2 rounded-full border-2 border-indigo-400 bg-indigo-500 px-5 py-3 text-xl font-semibold drop-shadow"
        >
          Calendly
          <LinkAwayIcon className="h-5 w-5 transition-all group-hover:-translate-y-0.5" />
        </Link>
        <Link
          href="survey"
          className="group flex items-center gap-2 rounded-full border-2 border-indigo-400 bg-indigo-500 px-5 py-3 text-xl font-semibold drop-shadow"
        >
          Start
          <LeftArrowIcon className="h-5 w-5 transition-all group-hover:translate-x-1" />
        </Link>
      </div>
      <Link
        href="admin"
        className=" group fixed bottom-2 left-2 flex aspect-square items-center gap-2 rounded-full border-2 border-indigo-400 bg-indigo-500 p-3 text-xl font-semibold drop-shadow"
      >
        <WrenchIcon className="h-5 w-5 transition-all group-hover:-rotate-12" />
      </Link>
    </>
  );
}
