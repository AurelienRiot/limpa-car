"use client";
import usePrevious from "@/hooks/use-previous";

export const Gauge = ({
  value,
  size = "small",
  showValue = false,
}: {
  value: number;
  size?: "small" | "medium" | "large";
  showValue?: boolean;
}) => {
  const circumference = 332; //2 * Math.PI * 53; // 2 * pi * radius
  const valueInCircumference = (value / 100) * circumference;
  const strokeDasharray = `${circumference} ${circumference}`;
  const initialOffset = circumference;
  const strokeDashoffset = initialOffset - valueInCircumference;

  const sizes = {
    small: {
      width: "36",
      height: "36",
      textSize: "text-xs",
    },
    medium: {
      width: "72",
      height: "72",
      textSize: "text-lg",
    },
    large: {
      width: "144",
      height: "144",
      textSize: "text-3xl",
    },
  };

  const previousValue = usePrevious(value);

  return (
    <div
      key={previousValue}
      className="relative flex flex-col items-center justify-center"
    >
      <svg
        fill="none"
        shapeRendering="crispEdges"
        height={sizes[size].height}
        width={sizes[size].width}
        viewBox="0 0 120 120"
        strokeWidth="2"
        className="transform -rotate-90"
      >
        <circle
          className="text-gray-300"
          strokeWidth="12"
          stroke="currentColor"
          fill="transparent"
          shapeRendering="geometricPrecision"
          r="53"
          cx="60"
          cy="60"
        />
        <circle
          className={`text-green-600 animate-gauge-fill 
           gauge-fill-[${
             previousValue
               ? Math.round(
                   initialOffset - (previousValue / 100) * circumference
                 )
               : 332
           }]
          `}
          strokeWidth="12"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={initialOffset}
          shapeRendering="geometricPrecision"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="53"
          cx="60"
          cy="60"
          style={{
            strokeDashoffset: strokeDashoffset,
            transition: "stroke-dasharray 1s ease 0s,stroke 1s ease 0s",
          }}
        />
      </svg>
      {showValue ? (
        <div className="absolute flex duration-1000 animate-in fade-in-0 ">
          <p className={`text-primary ${sizes[size].textSize}`}>{value}</p>
        </div>
      ) : null}
    </div>
  );
};

// gauge-fill-[0]
// gauge-fill-[1]
// gauge-fill-[2]
// gauge-fill-[3]
// gauge-fill-[4]
// gauge-fill-[5]
// gauge-fill-[6]
// gauge-fill-[7]
// gauge-fill-[8]
// gauge-fill-[9]
// gauge-fill-[10]]
// gauge-fill-[11]]
// gauge-fill-[12]]
// gauge-fill-[13]]
// gauge-fill-[14]]
// gauge-fill-[15]]
// gauge-fill-[16]]
// gauge-fill-[17]]
// gauge-fill-[18]]
// gauge-fill-[19]]
// gauge-fill-[20]
// gauge-fill-[21]
// gauge-fill-[22]
// gauge-fill-[23]
// gauge-fill-[24]
// gauge-fill-[25]
// gauge-fill-[26]
// gauge-fill-[27]
// gauge-fill-[28]
// gauge-fill-[29]
// gauge-fill-[30]
// gauge-fill-[31]
// gauge-fill-[32]
// gauge-fill-[33]
// gauge-fill-[34]
// gauge-fill-[35]
// gauge-fill-[36]
// gauge-fill-[37]
// gauge-fill-[38]
// gauge-fill-[39]
// gauge-fill-[40]
// gauge-fill-[41]
// gauge-fill-[42]
// gauge-fill-[43]
// gauge-fill-[44]
// gauge-fill-[45]
// gauge-fill-[46]
// gauge-fill-[47]
// gauge-fill-[48]
// gauge-fill-[49]
// gauge-fill-[50]
// gauge-fill-[51]
// gauge-fill-[52]
// gauge-fill-[53]
// gauge-fill-[54]
// gauge-fill-[55]
// gauge-fill-[56]
// gauge-fill-[57]
// gauge-fill-[58]
// gauge-fill-[59]
// gauge-fill-[60]
// gauge-fill-[61]
// gauge-fill-[62]
// gauge-fill-[63]
// gauge-fill-[64]
// gauge-fill-[65]
// gauge-fill-[66]
// gauge-fill-[67]
// gauge-fill-[68]
// gauge-fill-[69]
// gauge-fill-[70]
// gauge-fill-[71]
// gauge-fill-[72]
// gauge-fill-[73]
// gauge-fill-[74]
// gauge-fill-[75]
// gauge-fill-[76]
// gauge-fill-[77]
// gauge-fill-[78]
// gauge-fill-[79]
// gauge-fill-[80]
// gauge-fill-[81]
// gauge-fill-[82]
// gauge-fill-[83]
// gauge-fill-[84]
// gauge-fill-[85]
// gauge-fill-[86]
// gauge-fill-[87]
// gauge-fill-[88]
// gauge-fill-[89]
// gauge-fill-[90]
// gauge-fill-[91]
// gauge-fill-[92]
// gauge-fill-[93]
// gauge-fill-[94]
// gauge-fill-[95]
// gauge-fill-[96]
// gauge-fill-[97]
// gauge-fill-[98]
// gauge-fill-[99]
// gauge-fill-[100]
// gauge-fill-[101]
// gauge-fill-[102]
// gauge-fill-[103]
// gauge-fill-[104]
// gauge-fill-[105]
// gauge-fill-[106]
// gauge-fill-[107]
// gauge-fill-[108]
// gauge-fill-[109]
// gauge-fill-[110]
// gauge-fill-[111]
// gauge-fill-[112]
// gauge-fill-[113]
// gauge-fill-[114]
// gauge-fill-[115]
// gauge-fill-[116]
// gauge-fill-[117]
// gauge-fill-[118]
// gauge-fill-[119]
// gauge-fill-[120]
// gauge-fill-[121]
// gauge-fill-[122]
// gauge-fill-[123]
// gauge-fill-[124]
// gauge-fill-[125]
// gauge-fill-[126]
// gauge-fill-[127]
// gauge-fill-[128]
// gauge-fill-[129]
// gauge-fill-[130]
// gauge-fill-[131]
// gauge-fill-[132]
// gauge-fill-[133]
// gauge-fill-[134]
// gauge-fill-[135]
// gauge-fill-[136]
// gauge-fill-[137]
// gauge-fill-[138]
// gauge-fill-[139]
// gauge-fill-[140]
// gauge-fill-[141]
// gauge-fill-[142]
// gauge-fill-[143]
// gauge-fill-[144]
// gauge-fill-[145]
// gauge-fill-[146]
// gauge-fill-[147]
// gauge-fill-[148]
// gauge-fill-[149]
// gauge-fill-[150]
// gauge-fill-[151]
// gauge-fill-[152]
// gauge-fill-[153]
// gauge-fill-[154]
// gauge-fill-[155]
// gauge-fill-[156]
// gauge-fill-[157]
// gauge-fill-[158]
// gauge-fill-[159]
// gauge-fill-[160]
// gauge-fill-[161]
// gauge-fill-[162]
// gauge-fill-[163]
// gauge-fill-[164]
// gauge-fill-[165]
// gauge-fill-[166]
// gauge-fill-[167]
// gauge-fill-[168]
// gauge-fill-[169]
// gauge-fill-[170]
// gauge-fill-[171]
// gauge-fill-[172]
// gauge-fill-[173]
// gauge-fill-[174]
// gauge-fill-[175]
// gauge-fill-[176]
// gauge-fill-[177]
// gauge-fill-[178]
// gauge-fill-[179]
// gauge-fill-[180]
// gauge-fill-[181]
// gauge-fill-[182]
// gauge-fill-[183]
// gauge-fill-[184]
// gauge-fill-[185]
// gauge-fill-[186]
// gauge-fill-[187]
// gauge-fill-[188]
// gauge-fill-[189]
// gauge-fill-[190]
// gauge-fill-[191]
// gauge-fill-[192]
// gauge-fill-[193]
// gauge-fill-[194]
// gauge-fill-[195]
// gauge-fill-[196]
// gauge-fill-[197]
// gauge-fill-[198]
// gauge-fill-[199]
// gauge-fill-[200]
// gauge-fill-[201]
// gauge-fill-[202]
// gauge-fill-[203]
// gauge-fill-[204]
// gauge-fill-[205]
// gauge-fill-[206]
// gauge-fill-[207]
// gauge-fill-[208]
// gauge-fill-[209]
// gauge-fill-[210]
// gauge-fill-[211]
// gauge-fill-[212]
// gauge-fill-[213]
// gauge-fill-[214]
// gauge-fill-[215]
// gauge-fill-[216]
// gauge-fill-[217]
// gauge-fill-[218]
// gauge-fill-[219]
// gauge-fill-[220]
// gauge-fill-[221]
// gauge-fill-[222]
// gauge-fill-[223]
// gauge-fill-[224]
// gauge-fill-[225]
// gauge-fill-[226]
// gauge-fill-[227]
// gauge-fill-[228]
// gauge-fill-[229]
// gauge-fill-[230]
// gauge-fill-[231]
// gauge-fill-[232]
// gauge-fill-[233]
// gauge-fill-[234]
// gauge-fill-[235]
// gauge-fill-[236]
// gauge-fill-[237]
// gauge-fill-[238]
// gauge-fill-[239]
// gauge-fill-[240]
// gauge-fill-[241]
// gauge-fill-[242]
// gauge-fill-[243]
// gauge-fill-[244]
// gauge-fill-[245]
// gauge-fill-[246]
// gauge-fill-[247]
// gauge-fill-[248]
// gauge-fill-[249]
// gauge-fill-[250]
// gauge-fill-[251]
// gauge-fill-[252]
// gauge-fill-[253]
// gauge-fill-[254]
// gauge-fill-[255]
// gauge-fill-[256]
// gauge-fill-[257]
// gauge-fill-[258]
// gauge-fill-[259]
// gauge-fill-[260]
// gauge-fill-[261]
// gauge-fill-[262]
// gauge-fill-[263]
// gauge-fill-[264]
// gauge-fill-[265]
// gauge-fill-[266]
// gauge-fill-[267]
// gauge-fill-[268]
// gauge-fill-[269]
// gauge-fill-[270]
// gauge-fill-[271]
// gauge-fill-[272]
// gauge-fill-[273]
// gauge-fill-[274]
// gauge-fill-[275]
// gauge-fill-[276]
// gauge-fill-[277]
// gauge-fill-[278]
// gauge-fill-[279]
// gauge-fill-[280]
// gauge-fill-[281]
// gauge-fill-[282]
// gauge-fill-[283]
// gauge-fill-[284]
// gauge-fill-[285]
// gauge-fill-[286]
// gauge-fill-[287]
// gauge-fill-[288]
// gauge-fill-[289]
// gauge-fill-[290]
// gauge-fill-[291]
// gauge-fill-[292]
// gauge-fill-[293]
// gauge-fill-[294]
// gauge-fill-[295]
// gauge-fill-[296]
// gauge-fill-[297]
// gauge-fill-[298]
// gauge-fill-[299]
// gauge-fill-[300]
// gauge-fill-[301]
// gauge-fill-[302]
// gauge-fill-[303]
// gauge-fill-[304]
// gauge-fill-[305]
// gauge-fill-[306]
// gauge-fill-[307]
// gauge-fill-[308]
// gauge-fill-[309]
// gauge-fill-[310]
// gauge-fill-[311]
// gauge-fill-[312]
// gauge-fill-[313]
// gauge-fill-[314]
// gauge-fill-[315]
// gauge-fill-[316]
// gauge-fill-[317]
// gauge-fill-[318]
// gauge-fill-[319]
// gauge-fill-[320]
// gauge-fill-[321]
// gauge-fill-[322]
// gauge-fill-[323]
// gauge-fill-[324]
// gauge-fill-[325]
// gauge-fill-[326]
// gauge-fill-[327]
// gauge-fill-[328]
// gauge-fill-[329]
// gauge-fill-[330]
// gauge-fill-[331]
// gauge-fill-[332]
