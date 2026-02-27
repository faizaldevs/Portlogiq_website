import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const SwipeImage = () => {
  return (
    <div className="w-full relative -mb-14 mt-12">
      <Swiper
        loop={true}
        centeredSlides={true}
        // Auto-advance every 2 seconds on all devices
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        // Mobile default: 1 image per view, full width
        slidesPerView={1}
        className="rounded-2xl"
        breakpoints={{
          // Keep original desktop behavior
          1920: { slidesPerView: 4, spaceBetween: 30 },
          1028: { slidesPerView: 2, spaceBetween: 10 },
          990: { slidesPerView: 1, spaceBetween: 0 },
        }}
      >
        {[
          "/img/vege.png",
          "/img/frozen_banner.png",
          "/img/meat_banner.png",
          "/img/frozen_banner.png",
          "/img/meat_banner.png",
        ].map((img, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="bg-cover bg-center rounded-2xl h-[700px] flex justify-center items-center"
              style={{ backgroundImage: `url(${img})` }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SwipeImage;
