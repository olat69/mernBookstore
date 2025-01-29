import { FiMail } from "react-icons/fi";
import image from "../assets/homeposter.jpg";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
const Banner = () => {
  const { currentUser } = useAuth();

  return (
    <div className="mt-2 md:mt-3 flex flex-col-reverse md:flex-row md:space-x-10">
      <div className="w-full md:w-1/2 mt-6 px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-left">
          Delight Bookstore
        </h1>
        <br />
        <p className="text-base text-gray-700 mb-4">
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

        {!currentUser && (
          <Link
            to={"/signup"}
            className="bg-primary text-white rounded-md px-6 py-2 flex items-center justify-center hover:bg-gray-700 transition-all mt-4 mx-auto md:mx-0"
          >
            <FiMail className="mr-2" /> Signup
          </Link>
        )}
      </div>

      <div className="w-full md:w-1/2 mt-6 flex justify-center md:justify-start">
        <img
          src={image}
          alt="Bookstore banner"
          className="w-full md:w-3/4 md:ml-12 object-cover"
        />
      </div>
    </div>
  );
};

export default Banner;
