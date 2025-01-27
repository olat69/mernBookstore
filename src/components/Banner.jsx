import { FiMail } from "react-icons/fi";
import image from "../assets/homeposter.jpg";
import { Link } from "react-router";

const Banner = () => {
  return (
    <div className="mt-3 flex flex-col-reverse md:flex-row md:space-x-10">
      <div className="w-full md:w-1/2 mt-6 px-4">
        <h1 className="text-4xl font-semibold text-left">Delight BookstorE</h1>
        <br />

        <Link
          to={"/signup"}
          className="bg-primary text-white rounded-md px-6 py-2 flex items-center justify-center hover:bg-gray-700 transition-all mt-4 mx-auto md:mx-0"
        >
          <FiMail className="mr-2" /> Signup
        </Link>
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
