import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type Props = {
  images: string[];
  height?: string;
};

export default function Carousel({
  images = [],
  height = "h-[120px] sm:h-[200px] md:h-[300px]",
}: Props) {
  if (images.length === 0) return null;

  const settings = {
    dots: true,
    arrows: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots: React.ReactNode) => (
      <ul className="m-0 p-0 flex justify-center gap-2 py-2 static">{dots}</ul>
    ),
  } as const;

  const wrapperClasses = [
    "relative w-full overflow-hidden",
    height,
    "pb-6 [&_.slick-slider]:h-full [&_.slick-list]:h-full [&_.slick-track]:h-full [&_.slick-slide]:h-full [&_.slick-slide>div]:h-full",
  ].join(" ");

  return (
    <div className={wrapperClasses}>
      <Slider {...settings} className="h-full">
        {images.map((src, i) => (
          <div key={i} className="w-full h-full">
            <img
              src={src}
              alt={`slide-${i + 1}`}
              className="block w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
