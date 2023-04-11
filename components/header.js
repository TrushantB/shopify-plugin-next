import Link from "next/link";
import Head from "next/head";

const Header = ({ isHomePage = false }) => {
  return (
    <>
      <Head>
        <title>Navneet</title>
        <meta name="description" content="Creating customized notbook" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="bg-white py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center h-14">
            <Link
              href="/specification"
              className="font-bold text-xl text-indigo-600"
            >
              NAVNEET
            </Link>
            {/* <button className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden" id="navbar-toggle">
                            <i className="fas fa-bars"></i>
                        </button> */}
          </div>
          {isHomePage && (
            <div
              className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0"
              id="navbar-collapse"
            >
              <Link
                href={"/specification"}
                className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-500 hover:bg-indigo-700"
              >
                Design Your Notebook
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};
export default Header;
