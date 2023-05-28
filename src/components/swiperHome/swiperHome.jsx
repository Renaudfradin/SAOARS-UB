import React from "react";
import banner2 from "@assets/img/icon_ban/scout_133.png";
import banner3 from "@assets/img/icon_ban/scout_134.png";
import banner4 from "@assets/img/icon_ban/scout_135.png";
import banner5 from "@assets/img/icon_ban/scout_136.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiperHome.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useBanner from "@hook/useBanner.jsx";

export default function swiperHome() {
  function randomId(min,max) {
    const random = Math.floor(Math.random() * (max - min) + min);
    return random;
  }
  const { banner } = useBanner(randomId(0, 136));
  const  banner2  = useBanner(randomId(0, 136));
  const  banner3  = useBanner(randomId(0, 136));
  const  banner4  = useBanner(randomId(0, 136));
  const  banner5  = useBanner(randomId(0, 136));

  console.log(banner2.banner.img_baner);
  return (
    <Swiper
      className="swippeWrapper"
      breakpoints={{
        1440: {
          slidesPerView: 3,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 100
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        425: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        375: {
          slidesPerView: 1,
          spaceBetween: 50
        },
        320: {
          slidesPerView: 1,
          spaceBetween: 100
        }
      }}
    >
      <SwiperSlide>
        <img className="imgWrapper" src={banner.img_baner} alt={banner.img_baner} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="imgWrapper" src={banner2.banner.img_baner} alt={banner2.banner.img_baner} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="imgWrapper" src={banner3.banner.img_baner} alt={banner3.banner.img_baner} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="imgWrapper" src={banner4.banner.img_baner} alt={banner4.banner.img_baner} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="imgWrapper" src={banner5.banner.img_baner} alt={banner5.banner.img_baner} />
      </SwiperSlide>
    </Swiper>
  )
}