"use client";
import Container from "@/components/ui/container";
import Loading from "../loading";
import { cn } from "@/lib/utils";
import { Gauge } from "@/components/ui/gauge";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Animations = () => {
  const [open, setOpen] = useState(false);

  const [visitors, setVisitors] = useState(0);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [value, setValue] = useState(50);

  return (
    <Container>
      <Loading />
      <div className="group cursor-pointer grid grid-cols-[repeat(3,5px)] auto-rows-[5px] gap-1 translate-y-[3px] ml-4">
        <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)]  group-hover:animate-[jump_0.9s_ease_2]"></div>
        <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.8s_ease_0.1s_2]"></div>
        <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.7s_ease_0.2s_2]"></div>
        <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.6s_ease_0.3s_2]"></div>
        <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.5s_ease_0.4s_2]"></div>
        <div className="border rounded-[50%] border-solid border-[rgb(139,136,136)] group-hover:animate-[jump_0.4s_ease_0.5s_2]"></div>
      </div>
      <div className="w-[300px] h-[30px] mt-4  bg-black border-2 border-red-600 flex group flex-row p-1 overflow-hidden box-content">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            style={{ animationDelay: `${i * 200}ms` }}
            className={`w-[30px] h-full   bg-blue-600   translate-x-[-100px] scale-0 group-hover:animate-square-progress `}
          ></div>
        ))}
      </div>
      <div className=" mt-4 w-[200px] h-[200px] overflow-hidden from-red-600 via-white to-red-600 bg-gradient-to-t bg-[size:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%] transform duration-500">
        <div className="w-full h-full bg-gradient-to-t duration-500 from-teal-300 via-blue-600 to-white bg-[size:200%_200%] bg-[position:0%_0%] hover:bg-[position:100%_100%] transform hover:skew-y-12 hover:skew-x-12" />
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
      <Gauge value={value} showValue={true} />
      <Input
        type="number"
        placeholder="value"
        value={value}
        onChange={(e) => setValue(e.currentTarget.valueAsNumber)}
      />

      <div
        data-state={open ? "open" : "closed"}
        style={{ animationDuration: "1000ms" }}
        className="data-[state=open]:w-[200px] data-[state=open]:h-[200px]  data-[state=open]:animate-in data-[state=open]:spin-in-180  data-[state=closed]:animate-out data-[state=closed]:spin-out-180   data-[state=closed]:w-0 data-[state=closed]:h-0 bg-primary transition-all  duration-1000"
      />

      <Button onClick={() => setOpen(!open)}>Button</Button>

      <Card
        data-state={isHighlighted ? "true" : "false"}
        className={`w-[350px] 
        data-[state=true]:bg-blue-600 
        transition-colors duration-200`}
      >
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
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
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setVisitors((previousVisitors) => previousVisitors + 1);
              setIsHighlighted(true);
              setTimeout(() => {
                setIsHighlighted(false);
              }, 400);
            }}
          >
            Deploy {visitors}
          </Button>
        </CardFooter>
      </Card>
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
