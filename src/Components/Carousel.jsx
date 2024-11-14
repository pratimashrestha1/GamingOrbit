// import React, { useState, useEffect } from "react";
// import "./Carouselcss.css";

// export const Carousel = ({ data, interval = 3000 }) => {
//   const [slide, setSlide] = useState(0);

//   const nextSlide = () => {
//     setSlide(slide === data.length - 1 ? 0 : slide + 1);
//   };

//   useEffect(() => {
//     const slideInterval = setInterval(nextSlide, interval);

//     return () => clearInterval(slideInterval);
//   }, [slide, interval]);

//   return (
//     <div className="carousel">
//       <div className="carousel-inner" style={{ transform: `translateX(-${slide * 100}%)` }}>
//         {data.map((item, idx) => (
//           <div className="carousel-item" key={idx}>
//             <img src={item.src} alt={item.alt} className="slide" />
//           </div>
//         ))}
//       </div>
//       <span className="indicators">
//         {data.map((_, idx) => (
//           <button
//             key={idx}
//             className={slide === idx ? "indicator" : "indicator indicator-inactive"}
//             onClick={() => setSlide(idx)}
//           ></button>
//         ))}
//       </span>
//     </div>
//   );
// };
import React, { useState, useEffect, useCallback } from "react";
import "./Carouselcss.css";

export const Carousel = ({ data, interval = 3000 }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setSlide(slide === data.length - 1 ? 0 : slide + 1);
  }, [slide, data.length]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, interval);

    return () => clearInterval(slideInterval);
  }, [nextSlide, interval]);

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `translateX(-${slide * 100}%)` }}>
        {data.map((item, idx) => (
          <div className="carousel-item" key={idx}>
            <img src={item.src} alt={item.alt} className="slide" />
          </div>
        ))}
      </div>
      <span className="indicators">
        {data.map((_, idx) => (
          <button
            key={idx}
            className={slide === idx ? "indicator" : "indicator indicator-inactive"}
            onClick={() => setSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};
