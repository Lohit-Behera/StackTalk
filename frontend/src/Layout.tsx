import { Outlet, ScrollRestoration } from "react-router-dom";
import Header from "./components/header";

function Layout() {
  return (
    <div className="w-full min-h-[100vh] flex flex-col justify-center items-center">
      <Header />
      <main className="w-full flex-1 flex justify-center items-center my-6">
        <ScrollRestoration />
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
