"use client";
import Container from "@/components/ui/container";
import Loading from "../loading";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";

const Animations = () => {
  return (
    <Container>
      <Loading />
      <div className="w-[300px] h-[30px]  bg-black border-2 border-red-600 flex group flex-row p-1 overflow-hidden box-content">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 200}ms` }}
            className={`w-[30px] h-full   bg-blue-600   translate-x-[-100px] scale-0 group-hover:animate-square-progress `}
          ></div>
        ))}
      </div>
      <div className=" mt-4 w-[200px] h-[200px] overflow-hidden from-red-600 via-white to-red-600 bg-gradient-to-t">
        <div className="w-full h-full bg-gradient-to-t duration-500 from-white via-blue-600 to-white bg-[size:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%] transform hover:skew-y-12 hover:skew-x-12" />
      </div>
      <button className="bg-gradient-to-t duration-500 from-red-500 via-black to-white bg-[size:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%]">
        Hover me
      </button>

      <div className="relative flex items-center justify-center w-[300px] h-[300px] overflow-hidden text-xl bg-black group ">
        {lettres.map((l, i) => (
          <div
            key={l.lettre}
            style={{ animationDelay: `${i * 200}ms` }}
            className={cn(
              "text-black absolute px-0.5 py-[3px]   flex justify-center items-center",
              l.class
            )}
          >
            <span
              style={{ animationDelay: `${i * 200}ms` }}
              className={cn(
                l.bg,
                "  absolute top-0 left-0    w-full h-full group-hover:animate-translate-bg"
              )}
            />
            <span className="relative ">{l.lettre}</span>
          </div>
        ))}
        <div className="absolute flex text-base translate-x-6 translate-y-1 top-1/2 left-1/2">
          <div className="text-white px-0.5 pl-1 py-[3px] group-hover:animate-fade-out-text ">
            for
          </div>
          <div className="text-white px-0.5 pl-1 py-[3px] group-hover:animate-fade-out-text">
            GSAP
          </div>
        </div>
      </div>
      <Button
        onClick={async () => {
          await axios.get("/api/throw-error");
        }}
      >
        Throw Error
      </Button>
    </Container>
  );
};
export default Animations;

const lettres = [
  {
    lettre: "F",
    bg: "bg-teal-600",
    class:
      "group-hover:animate-translate-text-1 left-1/2 right-1/2 top-1/2 bottom-1/2  -translate-x-[30px] w-[14px] h-[34px]",
  },
  {
    lettre: "l",
    bg: "bg-blue-600",
    class:
      "group-hover:animate-translate-text-2 left-1/2 right-1/2 top-1/2 bottom-1/2  -translate-x-[16px] w-[8px] h-[34px]",
  },
  {
    lettre: "i",
    bg: "bg-purple-600",
    class:
      "group-hover:animate-translate-text-3 left-1/2 right-1/2 top-1/2 bottom-1/2  -translate-x-[8px] w-[8px] h-[34px]",
  },
  {
    lettre: "p",
    bg: "bg-indigo-600",
    class:
      "group-hover:animate-translate-text-4 left-1/2 right-1/2 top-1/2 bottom-1/2 w-[14px] h-[34px]",
  },
];
