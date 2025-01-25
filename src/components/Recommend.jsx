import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useFetchAllBooksQuery } from "../redux/features/book/booksApi";
import BookCard from "../pages/BookCard";

const Recommend = () => {
  const { data: books = [], isLoading, isError } = useFetchAllBooksQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching books</div>;

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold">Recommended For You</h1>
      <div className="py-5 "></div>
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
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1180: {
            slidesPerView: 3,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <div>
          {books.map((book) => (
            <SwiperSlide modules={[]} key={book._id}>
              <BookCard book={book} />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
    </div>
  );
};

export default Recommend;
