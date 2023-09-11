import Container from "@/components/ui/container";
import Loading from "../loading";

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
    </Container>
  );
};

export default Animations;
