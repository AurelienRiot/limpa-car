"use client";
import { CardHightlight } from "@/components/highlight";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import Container from "@/components/ui/container";
import { Gauge } from "@/components/ui/gauge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Loading from "../loading";
import { Parallax } from "react-parallax";

const Animations = () => {
  const [value, setValue] = useState(50);

  const refdivref = useRef(null);

  return (
    <>
      <div className="w-[80vw] relative  " ref={refdivref}>
        {/* <Container>
        <Loading />

        <SquareProgressLoadingBarAnimation />
        <AnimatedGradient />
        <AnimatedText />

        <ExempleCardHightlight />
        <div className="flex gap-2">
          <Icons.package className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.location className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.person className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.settings className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.viewLight className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.viewDark className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.yarn className="w-6 h-6 transition-all duration-300 hover:opacity-50 text-[#2C8EBB]" />
          <Icons.apple className="w-6 h-6 transition-all duration-300 hover:opacity-50 " />
          <Icons.aria className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.bird className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.expedition className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.gitHub className="w-6 h-6 text-black transition-all duration-300 hover:opacity-50" />
          <Icons.google className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.logo className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.npm className="w-6 h-6 text-red-600 transition-all duration-300 hover:opacity-50" />
          <Icons.radix className="w-6 h-6 transition-all duration-300 hover:opacity-50" />
          <Icons.react className="w-6 h-6 text-blue-600 transition-all duration-300 hover:opacity-50" />
          <Icons.tailwind className="w-6 h-6 text-blue-400 transition-all duration-300 hover:opacity-50" />
          <Icons.spinner className="w-6 h-6 transition-all duration-300 hover:opacity-50 " />
          <JumpingDots />
          <button className="bg-gradient-to-t duration-500 from-red-500 via-black to-white bg-[size:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%]">
          Hover me
          </button>
          <Input
          type="number"
          placeholder="value"
          value={value}
            onChange={(e) => setValue(e.currentTarget.valueAsNumber)}
            className="w-16 "
          />
          <Gauge value={value} showValue={true} />
          <AppearSqaure />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mx-auto ">
          <DemoA />
          <DemoB />
          <DemoC />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2 mx-auto ">
          <DemoD />
          <DemoE />
          <DemoF />
        </div>
      </Container> */}
        <Parallax
          bgImage="/detailling_motors.jpeg"
          bgImageAlt="the cat"
          strength={0}
          bgStyle={{}}
          bgImageStyle={{ position: "fixed", objectFit: "cover" }}
          parent={refdivref?.current ? refdivref.current : undefined}
        >
          <div className="bg-primary-foreground/50">
            <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className=" bg-primary-foreground/50">
            <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>

          <div className=" bg-primary-foreground/50">
            <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="px-[30px] py-[100px] bg-primary-foreground/50">
            <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </Parallax>
      </div>
      <div className="z-10 bg-primary-foreground/50">
        <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p className="max-w-[900px] text-base leading-[35px] mx-auto my-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>
    </>
  );
};
export default Animations;

const JumpingDots = () => {
  return (
    <div className="group cursor-pointer grid grid-cols-[repeat(3,5px)] auto-rows-[5px] gap-1 translate-y-[3px] ml-4">
      <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)]  group-hover:animate-[jump_0.9s_ease_2]"></div>
      <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.8s_ease_0.1s_2]"></div>
      <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.7s_ease_0.2s_2]"></div>
      <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.6s_ease_0.3s_2]"></div>
      <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.5s_ease_0.4s_2]"></div>
      <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.4s_ease_0.5s_2]"></div>
    </div>
  );
};

const SquareProgressLoadingBarAnimation = () => {
  return (
    <div className="w-[300px] h-[30px] mt-4  bg-black border-2 border-red-600 flex group flex-row p-1 overflow-hidden box-content">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          style={{ animationDelay: `${i * 200}ms` }}
          className={`w-[30px] h-full   bg-blue-600   translate-x-[-100px] scale-0 group-hover:animate-square-progress `}
        ></div>
      ))}
    </div>
  );
};

const AnimatedGradient = () => {
  return (
    <>
      <div
        className={` mt-4 w-[200px] h-[200px] overflow-hidden from-red-600 via-white to-red-600 
          bg-gradient-to-t bg-[size:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%] transform duration-500`}
      >
        {" "}
        <div
          className={`w-full h-full 
          bg-gradient-to-t  from-teal-300 via-blue-600 to-white 
        bg-[size:200%_200%] bg-[position:0%_0%] 
          hover:bg-[position:100%_100%] hover:skew-y-12 hover:skew-x-12 duration-500 transform`}
        />
      </div>
    </>
  );
};

const AnimatedText = () => {
  const lettres = [
    {
      lettre: "F",
      bg: "bg-teal-600/90",
      class:
        "group-hover:animate-[translate-text-1_5s_linear] left-1/2 right-1/2 top-1/2 bottom-1/2  -translate-x-[30px] w-[14px] h-[34px]",
    },
    {
      lettre: "l",
      bg: "bg-blue-600/90",
      class:
        "group-hover:animate-[translate-text-2_5s_linear] left-1/2 right-1/2 top-1/2 bottom-1/2  -translate-x-[16px] w-[8px] h-[34px]",
    },
    {
      lettre: "i",
      bg: "bg-purple-600/90",
      class:
        "group-hover:animate-[translate-text-3_5s_linear] left-1/2 right-1/2 top-1/2 bottom-1/2  -translate-x-[8px] w-[8px] h-[34px]",
    },
    {
      lettre: "p",
      bg: "bg-indigo-600/90",
      class:
        "group-hover:animate-[translate-text-4_5s_linear] left-1/2 right-1/2 top-1/2 bottom-1/2 w-[14px] h-[34px]",
    },
  ];
  return (
    <div className="relative flex items-center justify-center w-[300px] h-[300px] overflow-hidden text-xl bg-black group ">
      {lettres.map((l, i) => (
        <div
          key={l.lettre}
          style={{ animationDelay: `${i * 200}ms` }}
          className={cn(
            "text-black absolute px-0.5 py-[3px]   flex justify-center items-center ",
            l.class
          )}
        >
          <span
            style={{ animationDelay: `${i * 200}ms` }}
            className={cn(
              l.bg,
              "  absolute top-0 left-0   w-full h-full group-hover:animate-opacity-change-bg "
            )}
          />

          <span className="relative ">{l.lettre}</span>
        </div>
      ))}
      <div className="absolute flex text-base translate-x-6 translate-y-1 top-1/2 left-1/2">
        <div className="text-white px-0.5 pl-1 py-[3px] group-hover:animate-[fade-out-text_5s_linear] ">
          for
        </div>
        <div className="text-white px-0.5 pl-1 py-[3px] group-hover:animate-[fade-out-text_5s_linear]">
          GSAP
        </div>
      </div>
    </div>
  );
};

const AppearSqaure = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div
        data-state={open ? "open" : "closed"}
        style={{ animationDuration: "1000ms" }}
        className="data-[state=open]:w-[200px] data-[state=open]:h-[200px]  data-[state=open]:animate-in data-[state=open]:spin-in-180  data-[state=closed]:animate-out data-[state=closed]:spin-out-180   data-[state=closed]:w-0 data-[state=closed]:h-0 bg-primary transition-all  duration-1000"
      />
      <Button onClick={() => setOpen(!open)}>Button</Button>
    </>
  );
};

const ExempleCardHightlight = () => {
  const [visitors, setVisitors] = useState(0);

  return (
    <CardHightlight
      trigger={visitors}
      duration={500}
      className={`w-[350px] 
    `}
      highlightColor="green"
      highlightVariant="circleFill"
    >
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid items-center w-full gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          onClick={() => setVisitors((prev) => prev - 1)}
          variant="destructive"
          className="text-primary"
        >
          Cancel
        </Button>
        <Button
          variant="shadow"
          onClick={() => {
            setVisitors((previousVisitors) => previousVisitors + 1);
          }}
        >
          Deploy {visitors}
        </Button>
      </CardFooter>
    </CardHightlight>
  );
};

function Marker({
  value,
  setValue,
  color,
}: {
  value: number;
  setValue: (value: number) => void;
  color: string;
}) {
  return (
    <div
      className="absolute grid place-items-center"
      style={{
        width: "24px",
        height: "24px",
        top: "-40px",
        left: `${value * 3}px`,
      }}
    >
      <div className="relative w-full h-full text-sm">
        <div
          className="absolute grid font-semibold text-white rounded-md place-items-center"
          style={{
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            background: color,
            width: "50px",
            height: "30px",
          }}
        >
          <div className="flex pr-1">
            <input
              type="number"
              value={value * 10}
              onChange={(e) => setValue(Number(e.target.value) / 10)}
              className="w-full text-center bg-transparent"
            />
            <span> &euro;</span>
          </div>
        </div>

        <div
          className="absolute"
          style={{
            left: "50%",
            top: "150%",
            transform: "translate(-50%, -50%)",
            width: "15px",
            height: "30px",
          }}
        >
          <svg
            className="w-full"
            viewBox="0 0 22 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.874 26.6557C12.3017 28.5519 9.61685 28.5519 9.04458 26.6557L0.999992 0H20.9186L12.874 26.6557Z"
              fill={color}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

function deriveData(index: number, value: number) {
  const r1 = 130;

  const r2 = 150;
  const r3 = 140;
  const delta = Math.PI / 40;
  const angle = delta * index - Math.PI;

  const ss = Math.sin(angle);
  const cc = Math.cos(angle);

  const rs = index % 5 === 0 ? r1 : r3;

  const x1 = rs * cc;
  const y1 = rs * ss;
  const x2 = r2 * cc;
  const y2 = r2 * ss;

  const color = Math.ceil(value * (41 / 100)) > index ? "#424E82" : "#E8EBF9";
  return { x1, y1, x2, y2, color };
}

function Tick({ index, value }: { index: number; value: number }) {
  const { x1, y1, x2, y2, color } = deriveData(index, value);
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  );
}

function TestTube({ value }: { value: number }) {
  return (
    <svg
      width="119"
      height="324"
      viewBox="0 0 119 324"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30 0C28.3431 0 27 1.34315 27 3V6C27 7.65685 28.3431 9 30 9H34V287C34 300.807 45.1929 312 59 312C72.8071 312 84 300.807 84 287V9H89C90.6569 9 92 7.65685 92 6V3C92 1.34315 90.6569 0 89 0H30Z"
        fill="#E8EBF9"
      />
      <g clipPath="url(#test_tube_clip)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M30 0C28.3431 0 27 1.34315 27 3V6C27 7.65685 28.3431 9 30 9H34V287C34 300.807 45.1929 312 59 312C72.8071 312 84 300.807 84 287V9H89C90.6569 9 92 7.65685 92 6V3C92 1.34315 90.6569 0 89 0H30Z"
          fill="#424E82"
        />
      </g>
      <defs>
        <clipPath id="test_tube_clip">
          <rect width="119" height="324" fill="white" y={value * 3 + 12} />
        </clipPath>
      </defs>
    </svg>
  );
}

function DemoA() {
  const [value, setValue] = useState(37);

  function DemoAGraph({ value }: { value: number }) {
    const demoAGraphData = [
      {
        key: 0,
        path: "M7 95H5C2.23858 95 0 97.2386 0 100H12C12 97.2386 9.76142 95 7 95Z",
      },
      {
        key: 1,
        path: "M27 100V97C27 93.6863 24.3137 91 21 91C17.6863 91 15 93.6863 15 97V100H27Z",
      },
      {
        key: 2,
        path: "M42 100V92C42 88.6863 39.3137 86 36 86C32.6863 86 30 88.6863 30 92V100H42Z",
      },
      {
        key: 3,
        path: "M57 100V87C57 83.6863 54.3137 81 51 81C47.6863 81 45 83.6863 45 87V100H57Z",
      },
      {
        key: 4,
        path: "M72 100V82C72 78.6863 69.3137 76 66 76C62.6863 76 60 78.6863 60 82V100H72Z",
      },
      {
        key: 5,
        path: "M87 100V78C87 74.6863 84.3137 72 81 72C77.6863 72 75 74.6863 75 78V100H87Z",
      },
      {
        key: 6,
        path: "M102 100V73C102 69.6863 99.3137 67 96 67C92.6863 67 90 69.6863 90 73V100H102Z",
      },
      {
        key: 7,
        path: "M117 100V68C117 64.6863 114.314 62 111 62C107.686 62 105 64.6863 105 68V100H117Z",
      },
      {
        key: 8,
        path: "M132 100V63C132 59.6863 129.314 57 126 57C122.686 57 120 59.6863 120 63V100H132Z",
      },
      {
        key: 9,
        path: "M147 100V59C147 55.6863 144.314 53 141 53C137.686 53 135 55.6863 135 59V100H147Z",
      },
      {
        key: 10,
        path: "M162 100V54C162 50.6863 159.314 48 156 48C152.686 48 150 50.6863 150 54V100H162Z",
      },
      {
        key: 11,
        path: "M177 100V49C177 45.6863 174.314 43 171 43C167.686 43 165 45.6863 165 49V100H177Z",
      },
      {
        key: 12,
        path: "M192 100V44C192 40.6863 189.314 38 186 38C182.686 38 180 40.6863 180 44V100H192Z",
      },
      {
        key: 13,
        path: "M207 100V40C207 36.6863 204.314 34 201 34C197.686 34 195 36.6863 195 40V100H207Z",
      },
      {
        key: 14,
        path: "M222 100V35C222 31.6863 219.314 29 216 29C212.686 29 210 31.6863 210 35V100H222Z",
      },
      {
        key: 15,
        path: "M237 100V30C237 26.6863 234.314 24 231 24C227.686 24 225 26.6863 225 30V100H237Z",
      },
      {
        key: 16,
        path: "M252 100V25C252 21.6863 249.314 19 246 19C242.686 19 240 21.6863 240 25V100H252Z",
      },
      {
        key: 17,
        path: "M267 100V21C267 17.6863 264.314 15 261 15C257.686 15 255 17.6863 255 21V100H267Z",
      },
      {
        key: 18,
        path: "M282 100V16C282 12.6863 279.314 10 276 10C272.686 10 270 12.6863 270 16V100H282Z",
      },
      {
        key: 19,
        path: "M297 99V11C297 7.68629 294.314 5 291 5C287.686 5 285 7.68629 285 11V99C285 99.5523 285.448 100 286 100H296C296.552 100 297 99.5523 297 99Z",
      },
    ];
    return (
      <svg
        width="300"
        height="100"
        viewBox="0 0 300 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="background">
          {demoAGraphData.map(({ key, path }) => (
            <path d={path} fill="#E8EBF9" key={key} />
          ))}
        </g>
        <g id="foreground" clipPath="url(#highlight)">
          {demoAGraphData.map(({ key, path }) => (
            <path d={path} fill="#424E82" key={key} />
          ))}
        </g>
        <defs>
          <clipPath id="highlight">
            <rect width={value * 3} height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume</CardTitle>
      </CardHeader>
      <CardContent className="inline-block p-4 bg-white rounded-md shadow-md">
        <div className="px-3">
          <div style={{ width: "300px" }}>
            <DemoAGraph value={value} />
          </div>
        </div>
        <div className="relative " style={{ width: "324px", height: "24px" }}>
          <div
            className="absolute rounded-full bg-[#e8ebf9] "
            style={{
              left: "12px",
              right: "12px",
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
          ></div>
          <div
            className="absolute rounded-full bg-[#424E82]  "
            style={{
              left: "12px",
              width: `${value * 3}px`,
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
          ></div>
          <div
            className="absolute top-0 grid place-items-center"
            style={{
              width: "24px",
              height: "24px",
              left: `${value * 3}px`,
            }}
          >
            <div className="grid w-5 h-5 bg-white rounded-full shadow-md place-items-center">
              <div
                className="rounded-full bg-[#424e82]"
                style={{
                  width: "14px",
                  height: "14px",
                }}
              />
            </div>
          </div>
          <input
            type="range"
            id="demoAInput"
            name="demoAInput"
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={handleChange}
            className="absolute top-0 w-full h-6 m-auto bg-transparent outline-none cursor-pointer "
          />
        </div>
        <div className="flex items-center justify-between h-8 px-3 font-semibold">
          <div> 0 </div>
          <div> {value} </div>
          <div> 100 </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DemoB() {
  const [valueA, setValueA] = useState(25);
  const [valueB, setValueB] = useState(75);

  const handleChangeA = (event: ChangeEvent<HTMLInputElement>) => {
    setValueA(parseInt(event.target.value, 10));
  };
  const handleChangeB = (event: ChangeEvent<HTMLInputElement>) => {
    setValueB(parseInt(event.target.value, 10));
  };

  function DemoBGraph({ start, diff }: { start: number; diff: number }) {
    return (
      <svg
        width="300"
        height="100"
        viewBox="0 0 300 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="background">
          <path
            d="M300 100H0C0 100 20.121 79.019 30 68C40.127 56.704 49.453 34.101 60 33C69.551 32.003 80 56 90 56C100 56 110.08 40.931 120 33C130.083 24.939 140.16 7.63699 150 7.99999C160.171 8.37499 169.563 28.791 180 37C189.628 44.573 199.889 55.623 210 56C219.894 56.369 230.323 39.006 240 40C250.371 41.066 260.381 55.514 270 65C280.45 75.306 300 100 300 100Z"
            fill="#E8EBF9"
          />
        </g>
        <g id="foreground" clipPath="url(#highlight2)">
          <path
            d="M300 100H0C0 100 20.121 79.019 30 68C40.127 56.704 49.453 34.101 60 33C69.551 32.003 80 56 90 56C100 56 110.08 40.931 120 33C130.083 24.939 140.16 7.63699 150 7.99999C160.171 8.37499 169.563 28.791 180 37C189.628 44.573 199.889 55.623 210 56C219.894 56.369 230.323 39.006 240 40C250.371 41.066 260.381 55.514 270 65C280.45 75.306 300 100 300 100Z"
            fill="#424E82"
          />
        </g>
        <defs>
          <clipPath id="highlight2">
            <rect x={start} width={diff} height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    );
  }

  const start = Math.min(valueA, valueB) * 3;
  const diff = Math.abs(valueA - valueB) * 3;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Range</CardTitle>
      </CardHeader>
      <CardContent className="inline-block p-4 bg-white rounded-md shadow-md">
        <div className="px-3">
          <div style={{ width: "300px" }}>
            <DemoBGraph start={start} diff={diff} />
          </div>
        </div>
        <div className="relative " style={{ width: "324px", height: "24px" }}>
          <div
            className="absolute rounded-full bg-[#e8ebf9]"
            style={{
              left: "12px",
              right: "12px",
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
          ></div>
          <div
            className="absolute rounded-full bg-[#424E82]"
            style={{
              left: `${12 + start}px`,
              width: `${diff}px`,
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
            }}
          ></div>
          <div
            className="absolute top-0 grid place-items-center"
            style={{
              width: "24px",
              height: "24px",
              left: `${valueA * 3}px`,
            }}
          >
            <div
              className="grid bg-white rounded-full shadow-md place-items-center"
              style={{
                width: "20px",
                height: "20px",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  background: "#424e82",
                }}
              ></div>
            </div>
          </div>
          <div
            className="absolute grid place-items-center"
            style={{
              width: "24px",
              height: "24px",
              top: 0,
              left: `${valueB * 3}px`,
            }}
          >
            <div
              className="grid bg-white rounded-full shadow-md place-items-center"
              style={{
                width: "20px",
                height: "20px",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  background: "#424e82",
                }}
              ></div>
            </div>
          </div>
          <input
            type="range"
            id="demoBInputA"
            name="demoBInputA"
            min={0}
            max={100}
            step={1}
            value={valueA}
            onChange={handleChangeA}
          />
          <input
            type="range"
            id="demoBInputB"
            name="demoBInputB"
            min="0"
            max="100"
            step="1"
            value={valueB}
            onChange={handleChangeB}
          />
        </div>
        <div className="flex items-center justify-between h-8 px-3 font-semibold">
          <div> 0 </div>
          <div>
            {Math.min(valueA, valueB)} - {Math.max(valueA, valueB)}
          </div>
          <div> 100 </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DemoC() {
  const color = "#424E82";
  const [valueA, setValueA] = useState(25);
  const [valueB, setValueB] = useState(75);

  const handleChangeA = (event: ChangeEvent<HTMLInputElement>) => {
    setValueA(parseInt(event.target.value, 10));
  };
  const handleChangeB = (event: ChangeEvent<HTMLInputElement>) => {
    setValueB(parseInt(event.target.value, 10));
  };

  const start = Math.min(valueA, valueB) * 3;
  const diff = Math.abs(valueA - valueB) * 3;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Price</CardTitle>
      </CardHeader>
      <CardContent className="inline-block p-4 bg-white rounded-md shadow-md">
        <div style={{ padding: "0px 12px" }}>
          <div style={{ width: "300px", height: "100px" }}></div>
        </div>
        <div className="relative " style={{ width: "324px", height: "24px" }}>
          <div
            className="absolute rounded-full"
            style={{
              left: "12px",
              right: "12px",
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
              background: "#e8ebf9",
            }}
          ></div>
          <div
            className="absolute rounded-full"
            style={{
              left: `${12 + start}px`,
              width: `${diff}px`,
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
              background: color,
            }}
          ></div>
          <div
            className="absolute grid place-items-center"
            style={{
              width: "24px",
              height: "24px",
              top: 0,
              left: `${valueA * 3}px`,
            }}
          >
            <div
              className="grid bg-white rounded-full shadow-md place-items-center"
              style={{
                width: "20px",
                height: "20px",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  background: color,
                }}
              ></div>
            </div>
          </div>
          <Marker value={valueA} setValue={setValueA} color={color} />
          <Marker value={valueB} setValue={setValueB} color={color} />
          <div
            className="absolute grid place-items-center"
            style={{
              width: "24px",
              height: "24px",
              top: 0,
              left: `${valueB * 3}px`,
            }}
          >
            <div
              className="grid bg-white rounded-full shadow-md place-items-center"
              style={{
                width: "20px",
                height: "20px",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  background: color,
                }}
              ></div>
            </div>
          </div>
          <input
            type="range"
            id="rangeInput"
            name="rangeInput"
            min={0}
            max={100}
            step={1}
            value={valueA}
            onChange={handleChangeA}
          />
          <input
            type="range"
            id="rangeInput"
            name="rangeInput"
            min="0"
            max="100"
            step="1"
            value={valueB}
            onChange={handleChangeB}
          />
        </div>
        <div className="flex items-center justify-between h-8 px-3 font-semibold">
          <div> 0 &euro;</div>

          <div> 1000 &euro;</div>
        </div>
      </CardContent>
    </Card>
  );
}

function DemoD() {
  const [value, setValue] = useState(24);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Volume</CardTitle>
      </CardHeader>
      <CardContent className="inline-block p-4 bg-white rounded-md shadow-md">
        <div className="relative " style={{ width: "324px", height: "324px" }}>
          <div
            className="absolute rounded-full"
            style={{
              width: "24px",
              height: "24px",
              left: "90px",
              top: `${12 + value * 3}px `,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div className="relative w-full h-full">
              <div
                className="absolute grid font-semibold text-white rounded-md place-items-center"
                style={{
                  width: "60px",
                  height: "24px",
                  background: "#424E82",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                {100 - value}
              </div>
              <div
                className="absolute rounded-md"
                style={{
                  width: "20px",
                  height: "3px",
                  background: "#424E82",
                  left: "35px",
                  top: "50%",
                  transform: "translate(0, -50%)",
                }}
              ></div>
            </div>
          </div>
          <div className="absolute" style={{ top: 0, left: "100px" }}>
            <TestTube value={value} />
          </div>
          <div className="absolute" style={{ top: "150px", left: "-50px" }}>
            <div className="relative" style={{ width: "324px" }}>
              <input
                className="rt90"
                type="range"
                id="rangeInput"
                name="rangeInput"
                min={0}
                max={100}
                step={1}
                value={value}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DemoE() {
  const [value, setValue] = useState(20);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Precentage</CardTitle>
      </CardHeader>
      <CardContent className="inline-block p-4 bg-white rounded-md shadow-md">
        <div style={{ height: "30px" }}></div>
        <div style={{ padding: "0px 12px" }}>
          <div className="relative" style={{ width: "300px" }}>
            <svg
              width="300"
              height="150"
              viewBox="0 0 300 150"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 150C12 131.878 15.5695 113.933 22.5046 97.1897C29.4398 80.4467 39.6048 65.2337 52.4193 52.4193C65.2338 39.6048 80.4468 29.4398 97.1897 22.5046C113.933 15.5695 131.878 12 150 12C168.122 12 186.067 15.5695 202.81 22.5046C219.553 29.4398 234.766 39.6048 247.581 52.4193C260.395 65.2338 270.56 80.4468 277.495 97.1897C284.431 113.933 288 131.878 288 150"
                stroke="#E8EBF9"
                strokeWidth="22"
              />
              <path
                strokeDasharray="434"
                strokeDashoffset={`${434 - 4.34 * value}`}
                d="M12 150C12 131.878 15.5695 113.933 22.5046 97.1897C29.4398 80.4467 39.6048 65.2337 52.4193 52.4193C65.2338 39.6048 80.4468 29.4398 97.1897 22.5046C113.933 15.5695 131.878 12 150 12C168.122 12 186.067 15.5695 202.81 22.5046C219.553 29.4398 234.766 39.6048 247.581 52.4193C260.395 65.2338 270.56 80.4468 277.495 97.1897C284.431 113.933 288 131.878 288 150"
                stroke="#424E82"
                strokeWidth="22"
                strokeLinecap="round"
              />
            </svg>
            <div
              className="absolute text-4xl font-bold"
              style={{
                left: "50%",
                top: "75%",
                transform: "translate(-50%, -50%)",
                color: "#424E82",
              }}
            >
              {value}%
            </div>
          </div>
        </div>
        <div className="relative " style={{ width: "324px", height: "24px" }}>
          <div
            className="absolute rounded-full"
            style={{
              left: "12px",
              right: "12px",
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
              background: "#e8ebf9",
            }}
          ></div>
          <div
            className="absolute rounded-full"
            style={{
              left: "12px",
              width: `${value * 3}px`,
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
              background: "#424E82",
            }}
          ></div>
          <div
            className="absolute grid place-items-center"
            style={{
              width: "24px",
              height: "24px",
              top: 0,
              left: `${value * 3}px`,
            }}
          >
            <div
              className="grid bg-white rounded-full shadow-md place-items-center"
              style={{
                width: "20px",
                height: "20px",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  background: "#424e82",
                }}
              ></div>
            </div>
          </div>
          <input
            type="range"
            id="rangeInput"
            name="rangeInput"
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between h-8 px-3 font-semibold">
          <div> 0 </div>
          <div> 100 </div>
        </div>
      </CardContent>
    </Card>
  );
}

function DemoF() {
  const [value, setValue] = useState(32);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(event.target.value, 10));
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Gauge</CardTitle>
      </CardHeader>
      <CardContent className="inline-block p-4 bg-white rounded-md shadow-md">
        <div style={{ padding: "0px 12px" }}>
          <div className="relative" style={{ width: "300px" }}>
            <svg
              width="300"
              height="180"
              viewBox="0 0 300 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="300" height="180" fill="white" />

              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M152.991 34.67C152.706 30.9785 147.294 30.9785 147.009 34.67L138.696 142.139C136.395 144.776 135 148.225 135 152C135 160.284 141.716 167 150 167C158.284 167 165 160.284 165 152C165 148.225 163.606 144.776 161.304 142.139L152.991 34.67Z"
                fill="#424E82"
                transform={`rotate(${-90 + 1.8 * value}, 150, 152)`}
              />

              <g transform="translate(150, 152)">
                <circle r="8" fill="#FFF" />
                {Array(41)
                  .fill(0)
                  .map((_, i) => (
                    <Tick key={i} index={i} value={value} />
                  ))}
              </g>
            </svg>
          </div>
        </div>
        <div className="relative " style={{ width: "324px", height: "24px" }}>
          <div
            className="absolute rounded-full"
            style={{
              left: "12px",
              right: "12px",
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
              background: "#e8ebf9",
            }}
          ></div>
          <div
            className="absolute rounded-full"
            style={{
              left: "12px",
              width: `${value * 3}px`,
              height: "8px",
              top: "50%",
              transform: "translate(0, -50%)",
              background: "#424E82",
            }}
          ></div>
          <div
            className="absolute grid place-items-center"
            style={{
              width: "24px",
              height: "24px",
              top: 0,
              left: `${value * 3}px`,
            }}
          >
            <div
              className="grid bg-white rounded-full shadow-md place-items-center"
              style={{
                width: "20px",
                height: "20px",
              }}
            >
              <div
                className="rounded-full"
                style={{
                  width: "14px",
                  height: "14px",
                  background: "#424e82",
                }}
              ></div>
            </div>
          </div>
          <input
            type="range"
            id="rangeInput"
            name="rangeInput"
            min={0}
            max={100}
            step={1}
            value={value}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between h-8 px-3 font-semibold">
          <div> 0 </div>
          <div> {value} </div>

          <div> 100 </div>
        </div>
      </CardContent>
    </Card>
  );
}
