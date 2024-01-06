import React, { useCallback, useEffect, useState } from "react";
// import bg from './public/bg.png'

function About() {
  return (
    <>
      <section>
        <div className="h-auto w-auto">
          <img className="z-10" src="/bg.png" />
          <div className="z-20 absolute text-center text-white w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <h1 className="text-7xl mb-5">Сервис</h1>
            <p className="px-[250px]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
