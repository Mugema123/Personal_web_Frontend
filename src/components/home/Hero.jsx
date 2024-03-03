import React, { useState, useEffect } from "react";
import hero from "../../assets/images/heroImage.png";
const Hero = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState('');
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [ "Software Engineer", "Deep Learning Engineer", "Data Scientist" ];
  const period = 2000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker) };
  }, [text, delta])

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta(prevDelta => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex(prevIndex => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === '') {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex(prevIndex => prevIndex + 1);
    }
  }

  const social_media = [
    { icon: "logo-github", link: "https://github.com/Mugema-Leo/" },
    { icon: "logo-instagram", link: "https://www.instagram.com/your_instagram_username/" },
    { icon: "logo-linkedin", link: "https://www.linkedin.com/in/mugema-leonidas-0362b321b/" },
    { icon: "logo-twitter", link: "https://twitter.com/your_twitter_username/" },
  ];

  const handleClick = () => {
    const element = document.getElementById('contact');
    element.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <section
      id="home"
      className="banner min-h-screen flex py-10 md:flex-row flex-col-reverse items-center"
    >
      <div className="flex-1 flex items-center justify-center h-full bannerImg">
        <img src={hero} alt="" className="md:w-10/12 h-full object-cover" />
      </div>
      <div className="flex-1 my-20 md:my-0">
        <div className="md:text-left text-center">
          <h1 className="md:text-5xl text-2xl md:leading-normal leading-10 text-white font-bold">
            <span className="text-cyan-600 md:text-6xl text-5xl">
              👋
              <br />
            </span>
            <span className="text-cyan-600 md:text-6xl text-5xl">
              Hello,
              <br />
            </span>
            My Name is <span>Mugema</span>
          </h1>
          <h4 dataperiod="1000" data-rotate='[ "Software Engineer", "Deep Learning Engineer", "Data Scientist" ]' className="md:text-2xl text-lg mt-4 font-bold border-r-2 border-cyan-600 text-cyan-600 inline-block min-h-[1.55rem]">
            {text}
          </h4>
          <button onClick={handleClick} className="border border-cyan-600 font-semibold text-white md:mx-0 mx-auto py-3 px-6 flex items-center rounded-md gap-2 mt-8 hover:bg-cyan-600">Contact Me 🤙 📨</button>
          <div className="mt-8 text-3xl flex items-center md:justify-start justify-center gap-5">
            {social_media?.map((item) => (
              <div
                key={item.icon}
                className="text-gray-400 hover:text-white cursor-pointer "
              >
                <a href={item.link} target="__blank">
                  <ion-icon name={item.icon}></ion-icon>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
