import { ModeToggle } from "./mode-toggle";

function Header() {
  return (
    <header className="z-20 w-full sticky top-0 p-2 backdrop-blur bg-background/10">
      <nav className="flex justify-between space-x-2">
        <div className="flex items-center justify-center space-x-2">
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;
