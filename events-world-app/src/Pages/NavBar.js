import React, { useState } from "react";
import { LinkRouter, Link } from "react-router-dom";

function NavBar() {
  return (
    <>
      <header
        id="header"
        className="px-5 xl:px-24 lg:px-16 md:px-14 sm:px-10 z-50 mx-auto text-black border-b border-gray-400"
      >
        <div className="flex space-x-5 py-3">
          <Link to="/auth" className="font-bold hover:text-lime py-2">
            Логин/Регистрация
          </Link>
          <Link to="/places" className="font-bold hover:text-lime py-2">
            Местоположение
          </Link>

          <Link to="/about" className="font-bold hover:text-lime py-2">
            О сервисе
          </Link>
          <Link to="/errorpage" className="font-bold hover:text-lime py-2">
            404
          </Link>
          <Link to="/cityinfo" className="font-bold hover:text-lime py-2">
            Информация о городе
          </Link>
        </div>
      </header>
    </>
  );
}

export default NavBar;
