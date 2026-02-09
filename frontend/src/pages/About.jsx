import React from "react";
import Title from "../components/Title";
import NewsLetterBox from "../components/NewsLetterBox"
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t  ">
        <Title text1={"ABOUT "} text2={"US"} />
      </div>
      <div className=" my-10 flex flex-col md:flex-row gap-16  ">
        <img
          className="w-full md:max-w-[450px] "
          src={assets.about_img}
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600  ">
          <p>
            Forever was born out of a paasion for innovation and a desire to
            revalutionize the way people shope online. Our journey began with a
            simple idea : to provide a platform where customers can easily
            discover,explore,and purchase a wide range of products from the
            comfort of thier homes.
          </p>
          <p>
            Since our inception, we've worked tirelessly to curate a divarse
            selection of high-quality products that carter to every taste and
            performence. From fashion and beauty to electronic and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>
          <b className="text-gray-800 ">Our Mission </b>
          <p>
            Our mission at forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a seamless
            shopping experience that exceeds expectation, from browsing and
            ordering to delivery and beyond.
          </p>
        </div>
      </div>
      <div className="text-xl py-4 ">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 " >
        <div className="px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 " >
          <b>Quality Assurance : </b>
          <p className="text-gray-600" >
            We meticulously select and vet each product to ensure it meets our stringent quality standards.  
          </p>
        </div>
        <div className="px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 " >
          <b>Convenience : </b>
          <p className="text-gray-600" >
            With our user-friendly interface and hassle-free ordering process, shoping has never been easier.   
          </p>
        </div>
        <div className="px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 " >
          <b>Exceptional Customer Service : </b>
          <p className="text-gray-600" >
            Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
          </p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  );
};

export default About;
