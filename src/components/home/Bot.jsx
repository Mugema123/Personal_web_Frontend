import React from "react";

const Bot = () => {

  const handleClick = () => {
    const element = document.getElementById('contact');
    element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div onClick={handleClick} className="fixed bottom-5 sm:right-8 right-4 z-[999] cursor-pointer text-white text-4xl bg-cyan-600 w-16 h-16 flex items-center justify-center rounded-full animate-bounce">
      <ion-icon name="chatbubble-ellipses"></ion-icon>
    </div>
  );
};

export default Bot;
