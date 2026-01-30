
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-10 px-4">
      <h1 className="text-5xl md:text-7xl font-bangers tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg uppercase">
        Guglielmometer
      </h1>
      <p className="mt-4 text-gray-400 text-lg md:text-xl max-w-2xl mx-auto font-light italic">
        "Sei abbastanza perfetto da avvicinarti allo standard aureo di <span className="text-yellow-400 font-bold">Giacomo Guglielmi</span>?"
      </p>
    </header>
  );
};

export default Header;
