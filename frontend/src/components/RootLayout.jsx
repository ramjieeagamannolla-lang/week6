import Header from "./Header";
import { Outlet } from "react-router";

function RootLayout() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto min-h-[calc(100vh-73px)] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
