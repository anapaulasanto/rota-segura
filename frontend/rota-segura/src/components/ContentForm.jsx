import banner from "../assets/banner.jpg";
import React from "react";
import Form from "./Form";

const ContentForm = () => {
  return(
    <>
      <section>
        <img src={banner} alt="" className="overflow-hidden max-h-2/6 max-w-[100vw] max-xl:h-screen object-cover " />
        <div className=" shadow-2xl bg-central w-screen  max-lg:-bottom-[860px] max-md:-bottom-[570px] max-sm:-bottom-[560px]">
          <div className="pb-10 flex items-center mx-auto w-1/2 pt-8 gap-20 max-lg:flex-col max-lg:w-4/5 max-lg:pt-3">
            <p className="text-center py-24 text-7xl font-title text-white w-96 tracking-widest max-md:text-4xl max-md:w-64 max-md:py-2">Para onde você quer ir?</p>
            <Form />
          </div>
        </div>
      </section>
    </>
  ) 
};

export default ContentForm;
