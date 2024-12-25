import { Outlet } from "react-router";

export const NavBar = () => {
  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex shrink-0 items-center">
                <a href="/">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </a>
              </div>
              <div className="sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  <a
                    href="render-3d"
                    className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
                    aria-current="page"
                  >
                    Animation 3D
                  </a>
                  <a
                    href="game-animation"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Game
                  </a>
                  <a
                    href="bg-curve"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Ink Bg
                  </a>
                  <a
                    href="acernity"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Acernity
                  </a>
                  <a
                    href="parallax"
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                  >
                    Parallax
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
