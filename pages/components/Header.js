import Link from "next/link";

export default function Header() {
  return <>
    <header className="bg-white">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8 justify-between">
        <div className=" ">
          <Link className="flex items-center gap-1 font-semibold text-teal-600" href="/">
            <span className="sr-only">Home</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.745 3A23.933 23.933 0 003 12c0 3.183.62 6.22 1.745 9M19.5 3c.967 2.78 1.5 5.817 1.5 9s-.533 6.22-1.5 9M8.25 8.885l1.444-.89a.75.75 0 011.105.402l2.402 7.206a.75.75 0 001.104.401l1.445-.889m-8.25.75l.213.09a1.687 1.687 0 002.062-.617l4.45-6.676a1.688 1.688 0 012.062-.618l.213.09" />
            </svg>
            <p>Xmize</p>
          </Link>
        </div>


          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">

              <Link
                className=" rounded-md bg-gray-200 px-5 py-2.5 text-sm font-medium text-slate-900 transition hover:text-slate-900/75 sm:block"
                href="https://github.com/Eclarkhalid/ai-app"
                target="_blank"
              >
                Github
              </Link>
            </div>

            
          </div>
      </div>
    </header>
  </>
}