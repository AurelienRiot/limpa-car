import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

function Parallax() {
  const [background, setBackground] = useState(20);

  const parallaxRef = useRef(null);
  const mountain3 = useRef(null);
  const mountain2 = useRef(null);
  const mountain1 = useRef(null);
  const cloudsBottom = useRef(null);
  const cloudsLeft = useRef(null);
  const cloudsRight = useRef(null);
  const stars = useRef(null);
  const sun = useRef(null);
  const copy = useRef(null);
  const btn = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger);
      var tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: parallaxRef.current,
          start: "top top",
          end: "5000 bottom",
          scrub: true,
          pin: true,
          onUpdate: (self) => {
            setBackground(Math.ceil(self.progress * 100 + 20));
          },
        },
      });
      tl.to(
        mountain3.current,
        {
          y: "-=80",
        },
        0
      );
      tl.to(
        mountain2.current,
        {
          y: "-=30",
        },
        0
      );
      tl.to(
        mountain1.current,
        {
          y: "+=50",
        },
        0
      );
      tl.to(
        stars.current,
        {
          top: 0,
        },
        0.5
      );
      tl.to(
        cloudsBottom.current,
        {
          opacity: 0,
          duration: 0.5,
        },
        0
      );
      tl.to(
        cloudsLeft.current,
        {
          x: "-20%",
          opacity: 0,
        },
        0
      );
      tl.to(
        cloudsRight.current,
        {
          x: "20%",
          opacity: 0,
        },
        0
      );
      tl.to(
        sun.current,
        {
          y: "+=210",
        },
        0
      );
      tl.to(
        copy.current,
        {
          y: "-250%",
          opacity: 1,
        },
        0
      );
      tl.to(
        btn.current,
        {
          opacity: 1,
        },
        1.5
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#282a57] text-[#e4e4e4] box-border m-0 p-0">
      <div className="overflow-hidden">
        <div
          ref={parallaxRef}
          style={{
            background: `linear-gradient(#0F2B9C, #673D7D ${background}%, #A74A67, #EDFC54 )`,
          }}
          className="relative w-full h-[110vh]"
        >
          <svg
            ref={mountain3}
            className="absolute  z-[3] w-full bottom-0 top-0 "
            xmlns="http://www.w3.org/2000/svg"
            width="4228.726"
            height="1091.234"
            viewBox="0 0 4228.726 1091.234"
          >
            <path
              id="mountain-3"
              d="M4224.5,238.46C4202.247,263.8,3976.16,407.57,3942.352,416.04s-143.771,76.085-270.6,160.71c-126.833,84.555-270.6,296.012-380.567,346.759s-287.543,126.832-372.1,126.832-608.893,8.469-676.579,0-735.726-135.3-854.158-169.11S948.563,661.375,872.477,635.966C811.791,615.737,229.146,417.929-4.15,338.694v991H4224.576V238.46Z"
              transform="translate(4.15 -238.46)"
              fill="#282a57"
            />
          </svg>
          <svg
            ref={mountain2}
            className="absolute z-[2] w-full top-0 bottom-5 "
            xmlns="http://www.w3.org/2000/svg  "
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="4228.796"
            height="1066.036"
            viewBox="0 0 4228.796 1066.036"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="0.476"
                y1="-0.734"
                x2="0.504"
                y2="0.845"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stopColor="#de5654" />
                <stop offset="0.13" stopColor="#ce5254" />
                <stop offset="0.37" stopColor="#a74854" />
                <stop offset="0.7" stopColor="#673955" />
                <stop offset="1" stopColor="#282a57" />
              </linearGradient>
              <linearGradient
                id="linear-gradient-2"
                x1="0.595"
                y1="-0.18"
                x2="0.485"
                y2="0.693"
                xlinkHref="#linear-gradient"
              />
              <linearGradient
                id="linear-gradient-3"
                x1="0.684"
                y1="-0.16"
                x2="0.549"
                y2="0.69"
                xlinkHref="#linear-gradient"
              />
            </defs>
            <g id="mountain-2" transform="translate(-3898.812 -6245.361)">
              <path
                id="Path_139"
                data-name="Path 139"
                d="M4224.625,474.246C4133.911,436.8,3961.3,363.023,3857.847,343.634c-135.3-25.339-126.833-33.808-194.518-50.747s-262.134-50.747-312.881-8.47-245.265,194.518-287.543,219.857-211.457,84.555-253.735,126.832-422.844,236.8-532.808,219.857-549.677-160.71-710.387-228.326c-160.71-67.686-338.29-177.579-422.845-228.326S830.25,242.07,779.5,242.07s-287.543,76.085-338.29,84.555-194.518,59.216-304.482,59.216c-40.948,0-92.394,3.5-140.9,7.91V1307.9H4224.555V474.106Z"
                transform="translate(3902.982 6003.291)"
                fill="url(#linear-gradient)"
              />
              <path
                id="Path_140"
                data-name="Path 140"
                d="M136.742,385.861c-40.948,0-92.394,3.5-140.9,7.91v914.145H1679.448C1236.655,1087.779,659.19,790.577,624.682,721.561,568.266,608.8,951.7,417.079,940.433,366.333S779.443,242.09,779.443,242.09c-50.747,0-287.543,76.085-338.29,84.555s-194.518,59.216-304.482,59.216Z"
                transform="translate(3903.042 6003.412)"
                fill="url(#linear-gradient-2)"
              />
              <path
                id="Path_141"
                data-name="Path 141"
                d="M1166.424,274.088c-59.146-14.769-215.167-42.488-287.4-21l.28,9.939s-50.747,112.763-39.478,169.18,191.718,169.18,191.718,287.543c0,74.616-353.689,364.118-619.533,569.486H1727.721V455.447C1637.006,418,1464.4,344.224,1360.943,324.835,1225.641,299.5,1234.11,291.027,1166.424,274.088Z"
                transform="translate(6399.886 6022.16)"
                fill="url(#linear-gradient-3)"
              />
            </g>
          </svg>

          <svg
            className="absolute  z-[1] w-full top-10   "
            ref={mountain1}
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="4228.796"
            height="1129.942"
            viewBox="0 0 4228.796 1129.942"
          >
            <defs>
              <linearGradient
                id="linear-gradient"
                x1="0.496"
                y1="-0.121"
                x2="0.502"
                y2="0.874"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stopColor="#de5654" />
                <stop offset="0.13" stopColor="#ce5254" />
                <stop offset="0.37" stopColor="#a74854" />
                <stop offset="0.7" stopColor="#673955" />
                <stop offset="1" stopColor="#282a57" />
              </linearGradient>
            </defs>
            <g id="mountain-1" transform="translate(-3898.812 -6192.585)">
              <path
                id="mountain-1-2"
                data-name="mountain-1"
                d="M4224.625,277.857c-54.947-14.279-117.1-30.448-134.882-34.858-33.808-8.469-84.555-8.469-84.555-8.469l-101.494,76.085-109.964,8.469-93.024,67.686-93.025,84.555s-135.3,8.469-160.71,25.338c-25.338,16.939-109.963,59.216-109.963,59.216l-118.433,8.469s-160.71-16.939-194.518-16.939-118.433-16.939-143.771-16.939-223.917-55.017-223.917-55.017-139.991,51.657-165.4,60.126c-25.338,8.469-86.445,71.4-86.445,71.4l-73.916,75.665s-126.833,16.939-152.241,16.939-84.555-50.747-84.555-50.747S1966.981,631.9,1941.573,623.5c-25.339-8.469-109.963-8.469-135.3-16.939s-109.963-25.339-177.579-59.216c-67.686-33.808-118.433-76.085-143.771-84.555s-126.832-42.277-177.579-33.808-143.771,25.338-202.988,25.338-160.71,0-253.735-25.338-287.543-135.3-321.351-160.71C495.46,242.93,326.28,285.207,233.256,319.015,183.559,337.074,80.8,355.133-4.17,368.082v996.39H4224.555V277.788Z"
                transform="translate(3902.982 5958.055)"
                fill="url(#linear-gradient)"
              />
              <g
                id="Group_15"
                data-name="Group 15"
                transform="translate(4713.731 6385.86)"
              >
                <path
                  id="Path_137"
                  data-name="Path 137"
                  d="M1137.748,1016.61l1142.681-15.049,266.894-266.894,127.812-172.89L2612.7,391.827l-97.014,6.93s-160.71-16.939-194.518-16.939c-20.579,0-59.917-6.23-93.234-11.129-11.409,25.2-26.808,52.077-45.147,67.056-41.368,33.808-165.4,52.637-199.208,56.417s-78.955,56.417-105.274,78.955S1769.32,663.341,1724.173,674.61c-45.077,11.269-127.812,22.539-161.62,15.049s-82.665,0-135.3-33.808-78.955-52.637-131.592-67.686-165.4,18.829-191.718,0c-26.318-18.759-165.4-101.494-233.016-154.131-67.686-52.637-56.417-82.665-154.131-135.3A455.324,455.324,0,0,0,626.569,262.2a123.146,123.146,0,0,0-22.189,1.26c-49.557,8.259-139.292,24.569-198.648,25.268-37.658,23.308-72.8,45.5-79.865,43.747-15.049-3.78-116.543,67.686-116.543,67.686S133.8,467,113.01,472.883c35,20.859,235.4,190.388,235.4,190.388l789.343,353.339Z"
                  transform="translate(-107.719 -262.143)"
                  fill="#282a57"
                  opacity="0.55"
                />
                <path
                  id="Path_138"
                  data-name="Path 138"
                  d="M117.475,292.437c-3.64-2.17-5.53-2.73-5.18-1.33C112.715,292.927,114.605,293.207,117.475,292.437Z"
                  transform="translate(-112.254 -92.966)"
                  fill="#282a57"
                />
              </g>
            </g>
          </svg>
          <p className="absolute bottom-0 z-10 text-black">test</p>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1623.833"
            height="1323.396"
            viewBox="0 0 1623.833 1323.396"
            className="absolute -translate-x-1/2 -translate-y-1/2 w-2/5 left-1/2 top-[70%]"
            ref={sun}
          >
            <defs>
              <radialGradient
                id="radial-gradient"
                cx="0.509"
                cy="0.49"
                r="0.502"
                gradientTransform="translate(0.094) scale(0.812 1)"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stopColor="#fff" />
                <stop offset="0.09" stopColor="#fefeff" stopOpacity="0.98" />
                <stop offset="0.22" stopColor="#fdfeff" stopOpacity="0.91" />
                <stop offset="0.36" stopColor="#fafdff" stopOpacity="0.8" />
                <stop offset="0.52" stopColor="#f7fbff" stopOpacity="0.651" />
                <stop offset="0.68" stopColor="#f3f9ff" stopOpacity="0.459" />
                <stop offset="0.85" stopColor="#eef7ff" stopOpacity="0.231" />
                <stop offset="1" stopColor="#eaf5ff" stopOpacity="0" />
              </radialGradient>
              <radialGradient
                id="radial-gradient-2"
                cx="0.428"
                cy="0.561"
                r="0.756"
                gradientTransform="matrix(0.237, 0.972, -0.972, 0.237, 0.982, -0.081)"
                gradientUnits="objectBoundingBox"
              >
                <stop offset="0" stopColor="#de5654" />
                <stop offset="0.17" stopColor="#e47243" />
                <stop offset="0.56" stopColor="#f2b21f" />
                <stop offset="0.85" stopColor="#fbd908" />
                <stop offset="1" stopColor="#ffe900" />
              </radialGradient>
            </defs>
            <g id="sun" transform="translate(-5255.05 -5987.931)">
              <path
                id="Path_161"
                data-name="Path 161"
                d="M1813.422,865.58c0,364.328-415.565,659.64-779.893,659.64s-843.939-300.7-843.939-665.03S669.2,205.87,1033.529,205.87s779.893,295.312,779.893,659.64Z"
                transform="translate(5065.46 5786.107)"
                fill="url(#radial-gradient)"
              />
              <circle
                id="Ellipse_23"
                data-name="Ellipse 23"
                cx="498.02"
                cy="498.02"
                r="498.02"
                transform="matrix(0.237, -0.972, 0.972, 0.237, 5470.802, 6955.594)"
                fill="url(#radial-gradient-2)"
              />
            </g>
          </svg>

          <svg
            ref={cloudsBottom}
            className="absolute bottom-0 w-full"
            xmlns="http://www.w3.org/2000/svg"
            width="4228.796"
            height="1567.345"
            viewBox="0 0 4228.796 1567.345"
          >
            <path
              id="cloud-bottom"
              d="M4224.625,370.838c-88.475,2.31-217.267,14.909-337.87,60.756C3675.3,512.019,3692.237,650.961,3489.25,643.681s-228.326-58.516-397.506,36.538c-169.11,95.054-194.518,153.571-397.506,109.683s-328.42-203.2-608.193-178.349c-279.773,24.778-245.965,119.9-465.822,127.182s-380.567,109.684-515.869-29.258S952.112,387.707,706.847,387.707,520.8,570.536,309.341,475.482C144.291,401.286,138.971,233.506-4.17,170.44V1737.785H4224.555V370.838Z"
              transform="translate(4.17 -170.44)"
              fill="#fff"
              opacity="0.09"
            />
          </svg>

          <svg
            ref={cloudsLeft}
            className="absolute left-0 w-1/5"
            xmlns="http://www.w3.org/2000/svg"
            width="1435.803"
            height="1417.032"
            viewBox="0 0 1435.803 1417.032"
          >
            <g id="clouds-left" transform="translate(-3898.882 -4624.399)">
              <path
                id="Path_165"
                data-name="Path 165"
                d="M1385.826,973.056c-62.016-22.539-107.094-22.539-197.318-50.747s-101.494-62.016-191.718-84.555S878.357,815.216,788.2,781.338,681.109,719.321,579.615,668.574,472.521,578.35,376.627,516.334C280.8,454.317,325.88,414.84,252.595,347.154s-56.417-101.494-129.7-191.718C80.4,103.148,30.428,85.02-4.15,78.93V645.756c18.759,0,36.258-4.13,59.356-11.129,56.417-16.939,28.208-16.939,84.555-11.269s33.808-22.539,90.225,5.67S292,707.982,376.557,764.329c84.555,56.417,163.51,45.077,248.065,73.286s129.7,33.808,236.8,33.808,101.494,11.269,202.988,50.747,73.286,33.808,157.84,73.286,90.225,11.269,157.841,16.939c67.686,5.67,67.686-16.939,5.67-39.478Z"
                transform="translate(3903.102 5024.521)"
                fill="#fff"
                opacity="0.09"
              />
              <path
                id="Path_166"
                data-name="Path 166"
                d="M432.964,701.488c-45.077-33.808-33.808-45.077-62.016-73.286s-73.286-62.016-112.763-107.094-11.269-62.016-39.478-95.824S190.5,374.538,167.96,329.461s-16.939-67.686-62.016-95.824C60.866,205.428,89,154.681,49.527,75.8,34.058,44.578,14.249,24.069-4.16,10.49V368.378c40.458,40.808,55.507,34.3,127.042,96.244,84.555,73.286,45.077,62.016,78.955,107.094,33.808,45.077,45.077,50.747,112.763,95.824s50.747,45.077,118.433,73.286,90.225,73.286,101.494,50.747-56.417-56.417-101.494-90.225Z"
                transform="translate(3903.042 4613.909)"
                fill="#fff"
                opacity="0.09"
              />
            </g>
          </svg>

          <svg
            className="absolute right-0 w-1/5 "
            ref={cloudsRight}
            xmlns="http://www.w3.org/2000/svg"
            width="1302.707"
            height="1318.787"
            viewBox="0 0 1302.707 1318.787"
          >
            <g id="clouds-right" transform="translate(-6824.689 -4847.336)">
              <path
                id="Path_162"
                data-name="Path 162"
                d="M1518.88,149.5c-16.939,56.417,28.208,67.686,5.669,107.094s-50.747,0-50.747,33.808-11.269,39.478-16.939,73.286,11.269,33.808,0,73.286-28.208,28.208-56.417,101.494-5.67,62.016-28.208,107.094-22.539,50.747-78.956,112.763S1225.6,826.013,1169.251,871.09c-56.417,45.077-28.208,50.747-90.225,112.763s-112.763,118.433-180.449,157.841c-67.686,39.478-95.824,62.016-163.51,78.955s-118.433,28.208-180.449,56.417-107.094,33.808-118.433,39.478c-11.269,5.67,67.686,11.269,146.571-11.269,78.955-22.539,56.417-5.67,163.51-39.478s84.555-22.539,214.257-84.555,118.433-118.433,202.988-146.571c84.555-28.208,129.7-62.016,157.84-101.494,28.208-39.478,16.939-56.417,84.555-62.016,67.686-5.67,95.824-28.208,107.094-56.417s50.4-45.077,75.945-56.417V42.34c-25.969,29.748-60.2,73.5-70.276,107.164Z"
                transform="translate(6538.451 4804.996)"
                fill="#fff"
                opacity="0.09"
              />
              <path
                id="Path_163"
                data-name="Path 163"
                d="M510.309,233.744s-31.008-22.539-47.947-2.8-53.547,0-47.947,22.539c5.67,22.539,19.739,31.008,45.077,19.739s45.077-5.67,56.417-16.939-5.67-22.539-5.67-22.539Z"
                transform="translate(6410.851 5887.936)"
                fill="#fff"
                opacity="0.09"
              />
              <path
                id="Path_164"
                data-name="Path 164"
                d="M830.984,174.249s-14.07,22.539-28.209,67.686c-14.069,45.077-14.069,33.808-47.947,87.425-33.808,53.547-45.077,62.016-84.555,95.824s-62.016,59.216-87.425,78.955c-25.339,19.739-50.747,45.077-62.016,47.947-11.269,2.8,25.338-47.947,53.547-70.486s36.678-31.008,73.285-87.425c36.678-56.417,11.269-64.816,59.217-112.763s47.947-50.747,73.285-78.955,39.478-42.277,56.417-62.016,42.277-59.216,36.678-33.808c-5.67,25.338-42.277,67.686-42.277,67.686Z"
                transform="translate(7040.229 5141.148)"
                fill="#fff"
                opacity="0.09"
              />
            </g>
          </svg>
          <svg
            ref={stars}
            className="absolute top-[-550px] w-full left-0"
            xmlns="http://www.w3.org/2000/svg"
            width="3927.533"
            height="1518.769"
            viewBox="0 0 3927.533 1518.769"
          >
            <g id="stars" transform="translate(-4066.592 -4600.531)">
              <g
                id="Group_21"
                data-name="Group 21"
                transform="translate(4066.592 4869.245)"
              >
                <path
                  id="Path_149"
                  data-name="Path 149"
                  d="M552.029,67.7a4.2,4.2,0,1,1-4.2-4.2A4.212,4.212,0,0,1,552.029,67.7Z"
                  transform="translate(3122.959 62.702)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_6"
                  data-name="Ellipse 6"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(726.836 360.828)"
                  fill="#fff"
                />
                <path
                  id="Path_150"
                  data-name="Path 150"
                  d="M505.909,192.7a6.37,6.37,0,1,1-6.37-6.37A6.393,6.393,0,0,1,505.909,192.7Z"
                  transform="translate(2820.22 799.631)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_7"
                  data-name="Ellipse 7"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(1170.12 592.024)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_8"
                  data-name="Ellipse 8"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(2569.125 175.479)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_9"
                  data-name="Ellipse 9"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(1362.538 1070.516)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_10"
                  data-name="Ellipse 10"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(2844.698 1088.154)"
                  fill="#fff"
                />
                <path
                  id="Path_151"
                  data-name="Path 151"
                  d="M335.039,51.84a6.37,6.37,0,1,1-6.37-6.37A6.393,6.393,0,0,1,335.039,51.84Z"
                  transform="translate(1795.072 -45.47)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_11"
                  data-name="Ellipse 11"
                  cx="13.509"
                  cy="13.509"
                  r="13.509"
                  transform="translate(1093.474 11.619)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_12"
                  data-name="Ellipse 12"
                  cx="10.079"
                  cy="10.079"
                  r="10.079"
                  transform="translate(360.828 385.327)"
                  fill="#fff"
                />
                <path
                  id="Path_152"
                  data-name="Path 152"
                  d="M56.079,231.259A10.079,10.079,0,1,1,46,221.18,10.082,10.082,0,0,1,56.079,231.259Z"
                  transform="translate(76.913 1008.716)"
                  fill="#fff"
                />
                <path
                  id="Path_153"
                  data-name="Path 153"
                  d="M598.189,215.949a10.079,10.079,0,1,1-10.079-10.08A10.082,10.082,0,0,1,598.189,215.949Z"
                  transform="translate(3329.344 916.862)"
                  fill="#fff"
                />
                <path
                  id="Path_154"
                  data-name="Path 154"
                  d="M46.818,158.649A13.509,13.509,0,1,1,33.309,145.14,13.517,13.517,0,0,1,46.818,158.649Z"
                  transform="translate(-19.8 552.508)"
                  fill="#fff"
                />
              </g>
              <g
                id="Group_22"
                data-name="Group 22"
                transform="translate(4066.662 4600.531)"
                opacity="0.55"
              >
                <path
                  id="Path_155"
                  data-name="Path 155"
                  d="M551.68,12.72a4.2,4.2,0,1,0,4.2-4.2A4.212,4.212,0,0,0,551.68,12.72Z"
                  transform="translate(3171.186 1.559)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_13"
                  data-name="Ellipse 13"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(3187.958 420.885)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_14"
                  data-name="Ellipse 14"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(601.334 1046.087)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_15"
                  data-name="Ellipse 15"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(1910.185 809.991)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_16"
                  data-name="Ellipse 16"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(1345.599 235.536)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_17"
                  data-name="Ellipse 17"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(1070.026 1148.281)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_18"
                  data-name="Ellipse 18"
                  cx="6.37"
                  cy="6.37"
                  r="6.37"
                  transform="translate(1797.422 60.056)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_19"
                  data-name="Ellipse 19"
                  cx="13.509"
                  cy="13.509"
                  r="13.509"
                  transform="translate(2807.041 71.746)"
                  fill="#fff"
                />
                <path
                  id="Path_156"
                  data-name="Path 156"
                  d="M526.48,80.789A10.079,10.079,0,1,0,536.56,70.71,10.082,10.082,0,0,0,526.48,80.789Z"
                  transform="translate(3019.996 374.673)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_20"
                  data-name="Ellipse 20"
                  cx="10.079"
                  cy="10.079"
                  r="10.079"
                  transform="translate(793.822 0)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_21"
                  data-name="Ellipse 21"
                  cx="10.079"
                  cy="10.079"
                  r="10.079"
                  transform="translate(2073.695 377.767)"
                  fill="#fff"
                />
                <path
                  id="Path_157"
                  data-name="Path 157"
                  d="M495.87,25.379A10.079,10.079,0,1,0,505.95,15.3,10.082,10.082,0,0,0,495.87,25.379Z"
                  transform="translate(2836.349 42.237)"
                  fill="#fff"
                />
                <path
                  id="Path_158"
                  data-name="Path 158"
                  d="M561.92,201.449A10.079,10.079,0,1,0,572,191.37,10.082,10.082,0,0,0,561.92,201.449Z"
                  transform="translate(3232.621 1098.582)"
                  fill="#fff"
                />
                <path
                  id="Path_159"
                  data-name="Path 159"
                  d="M19.81,186.149A10.079,10.079,0,1,0,29.889,176.07,10.082,10.082,0,0,0,19.81,186.149Z"
                  transform="translate(-19.81 1006.789)"
                  fill="#fff"
                />
                <circle
                  id="Ellipse_22"
                  data-name="Ellipse 22"
                  cx="13.509"
                  cy="13.509"
                  r="13.509"
                  transform="translate(3900.445 757.704)"
                  fill="#fff"
                />
              </g>
            </g>
          </svg>

          <div
            ref={copy}
            className="absolute -translate-x-2/4 -translate-y-2/4 z-0 text-[color:var(--secondaryColor)] flex justify-center items-center flex-col opacity-0 left-2/4 bottom-[0%]"
          >
            <h1 className="text-[10rem]">Journey</h1>
            <span className="p-4 font-extrabold rounded-lg opacity-0" ref={btn}>
              Discover more
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Parallax;
