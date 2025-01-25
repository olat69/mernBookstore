import image from "../assets/homeposter.jpg";

const Banner = () => {
  return (
    <div className=" mt-3 flex flex-wrap-reverse md:flex ">
      <div className="w-full md:w-1/2 mt-6 ">
        <h1 className="text-4xl font-semibold">Delight BookstorE</h1>
        <br></br>
        <p>
          Welcome to your new literary haven! Whether you are searching for a
          gripping thriller, a soul-stirring romance, a thought-provoking
          non-fiction, or the latest bestsellers, our carefully curated
          selection has something for every type of reader. Explore our diverse
          collection, discover hidden gems, and find your next unforgettable
          read. We are here to help you embark on new adventures, dive deep into
          captivating worlds, and spark your imagination. With easy browsing,
          fast delivery, and recommendations tailored just for you, your next
          great story is only a click away.
        </p>
      </div>
      <div className="w-full md:w-1/2 ">
        <img
          src={image}
          alt="image"
          className="w-full md:w-3/4 items-center md:ml-28"
        />
      </div>
    </div>
  );
};

export default Banner;
