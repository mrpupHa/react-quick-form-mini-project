import { Film } from "lucide-react";
function Header() {
  return (
    <div className="flex gap-3 p-6 bg-gradient-to-r from-purple-700 to-indigo-600 text-white">
      <Film size={24} />
      <h2 className="text-2xl font-bold leading-none ">Movie Survey</h2>
    </div>
  );
}

export default Header;
