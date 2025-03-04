import Slider from "@/components/Slider";
import { Button } from "@/components/ui/button";
import IsLoading from "@/components/ui/IsLoading";
import { ShoppingCartContext } from "@/contexts/ShoppingCartContext";
import useFetch from "@/hooks/useFetch";
import { StarIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const ItemDetails = () => {
  const { urlId } = useParams();
  const { addToCart } = useContext(ShoppingCartContext);
  const { data, loading, error } = useFetch(
    `https://dummyjson.com/products/${urlId}`
  );

  const handeAddToCart = (e) => {
    e.preventDefault();

    addToCart(data);

    toast.success(`${data.title} was successfully added!`, {
      duration: 2000,
    });
  };

  if (loading)
    return (
      <div className="min-h-[70vh] sm:min-h-90 flex justify-center items-center">
        <IsLoading />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data found</div>;

  const reviews = {
    href: "#",
    average: parseFloat(data.rating),
    totalCount: data.reviews.length,
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div className="bg-white">
      <div className="pt-6 max-w-[1382px] mx-auto">
        <div className="text-left mb-5 flex flex-col lg:mx-auto">
          {/* Image Gallery */}
          <div className=" flex items-center justify-center bg-gray-200 rounded-md h-full mx-3 sm:mx-4 md:mx-6">
            <Slider data={data} loading={loading} />
          </div>

          {/* Data Info */}
          <div className=" max-w-7xl mt-2 mx-3 sm:mx-4 md:mx-6 flex flex-col lg:flex-row lg:gap-8">
            {/* Title and Description */}
            <div className="flex-1 lg:border-r lg:border-gray-200 lg:pr-8 ">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {data.title}
              </h1>
              <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-500/10 ring-inset">
                {data.brand}
              </span>

              {/* Description */}
              <div className="py-3 sm:py-4 md:py-8 lg:py-10">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-xl text-gray-900">{data.description}</p>
                </div>
                <div className="py-3 sm:py-4 md:py-8 lg:py-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Shipping
                  </h3>
                  <ul
                    role="list"
                    className="mt-4 list-disc marker:text-gray-300 space-y-2 pl-4 text-sm"
                  >
                    <li>Free shipping on orders over $300</li>
                    <li>International shipping available</li>
                    <li>Expedited shipping options</li>
                    <li>Signature required upon delivery</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Options Section */}
            <div className="flex flex-col lg:w-1/3 lg:pl-8">
              {/* Price */}
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${data.price}
              </p>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        aria-hidden="true"
                        className={classNames(
                          reviews.average > rating
                            ? "text-gray-900"
                            : "text-gray-200",
                          "w-5 h-5 shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                  <a
                    href={reviews.href}
                    className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    {reviews.totalCount} reviews
                  </a>
                </div>
              </div>

              {/* Add to Cart Button */}
              <form className="mt-10">
                <Button
                  onClick={handeAddToCart}
                  className="flex w-full items-center justify-center rounded-md  px-8 py-3 text-base font-medium"
                >
                  Add to cart
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
