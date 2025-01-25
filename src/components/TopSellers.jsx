import { useState } from "react";
import BookCard from "../pages/BookCard";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../redux/features/book/booksApi";

const category = [
  "Choose a genre",
  "Business",
  "Fiction",
  "Horror",
  "Adventure",
];

const TopSellers = () => {
  const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching books</div>;

  const filteredBooks =
    selectedCategory === "Choose a genre"
      ? books
      : books.filter(
          (book) => book.category === selectedCategory.toLowerCase()
        );

  return (
    <div className="py-16 w-full">
      <h1 className="text-3xl font-semibold">Top Sellers</h1>
      <div className="py-5 ">
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="rounded-md py-2 pl-3 pr-3 focus:outline-none hover:bg-gray-200"
        >
          {category.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1, // Change to 1 slide per view for medium screens
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
      >
        <div>
          {filteredBooks.map((book) => (
            <SwiperSlide modules={[]} key={book._id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default TopSellers;
