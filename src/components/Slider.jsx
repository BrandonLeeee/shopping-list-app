import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

const Slider = ({ data }) => {
  const [screenSize, setScreenSize] = useState(window.innerWidth <= 768);

  // Check if the screen is less than 768px
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [screenSize]);

  return (
    <>
      {screenSize ? (
        <Carousel
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto"
        >
          <CarouselContent>
            {data.images
              .filter((img) => img !== undefined)
              .map((img, index) => (
                <CarouselItem key={index}>
                  <img
                    key={index}
                    alt={data.title}
                    src={img}
                    className="max-w-70 h-auto mx-auto rounded-lg object-cover"
                  />
                </CarouselItem>
              ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="flex md:flex-row justify-center items-center gap-4 mb-4 flex-col">
          {[data.images[1], data.images[0], data.images[2]]
            .filter((img) => img !== undefined)
            .map(
              (img, index) =>
                img != undefined && (
                  <img
                    key={index}
                    alt={data.title}
                    src={img}
                    className="w-1/2 h-auto md:w-1/4 rounded-lg object-cover"
                  />
                )
            )}
        </div>
      )}
    </>
  );
};

export default Slider;
