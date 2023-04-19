import React from "react";
import banner1 from "@assets/img/icon_ban/scout_132.png";
import banner2 from "@assets/img/icon_ban/scout_133.png";
import banner3 from "@assets/img/icon_ban/scout_134.png";
import banner4 from "@assets/img/icon_ban/scout_135.png";
import banner5 from "@assets/img/icon_ban/scout_136.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "./swiperHome.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function swiperHome() {
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
        <img className="imgWrapper" src={banner1} alt={banner1} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="imgWrapper" src={banner2} alt={banner2} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="imgWrapper" src={banner3} alt={banner3} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="imgWrapper" src={banner4} alt={banner4} />
      </SwiperSlide>
      <SwiperSlide>
        <img className="imgWrapper" src={banner5} alt={banner5} />
      </SwiperSlide>
    </Swiper>
  )
}