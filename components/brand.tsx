import React from "react";

type BrandProps = {
  width?: number | string;
};

const Brand = ({ width = 80 }: BrandProps) => {
  return (
    <svg
      width={width}
      height="auto"
      viewBox="0 0 1340 337"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1277.31 246.648C1277.31 240.809 1276.26 235.343 1274.16 230.252C1272.22 225.161 1268.85 220.369 1264.05 215.877C1259.11 211.535 1252.67 207.566 1244.74 203.973C1236.95 200.229 1227.22 196.785 1215.54 193.641C1197.42 188.699 1181.47 182.71 1167.7 175.672C1154.07 168.634 1142.92 160.923 1134.23 152.537C1125.55 144.152 1118.96 134.868 1114.46 124.686C1110.12 114.503 1107.95 103.423 1107.95 91.4434C1107.95 77.6673 1110.87 65.1641 1116.71 53.9336C1122.55 42.7031 1130.64 33.1198 1140.97 25.1836C1151.3 17.2474 1163.5 11.1829 1177.58 6.99023C1191.66 2.64779 1206.93 0.476562 1223.4 0.476562C1240.47 0.476562 1256.04 2.94727 1270.12 7.88867C1284.34 12.8301 1296.55 19.7181 1306.73 28.5527C1316.91 37.5371 1324.85 48.1686 1330.54 60.4473C1336.23 72.7259 1339.07 86.2025 1339.07 100.877H1277.53C1277.23 93.5397 1275.88 86.8014 1273.49 80.6621C1271.24 74.5228 1267.87 69.207 1263.38 64.7148C1258.74 60.3724 1252.97 57.0033 1246.09 54.6074C1239.35 52.0618 1231.41 50.7891 1222.28 50.7891C1213.89 50.7891 1206.4 51.8372 1199.82 53.9336C1193.38 55.8802 1187.91 58.6504 1183.42 62.2441C1178.93 65.9876 1175.48 70.4049 1173.09 75.4961C1170.84 80.4375 1169.72 85.8281 1169.72 91.668C1169.72 97.8073 1171.22 103.348 1174.21 108.289C1177.36 113.23 1181.85 117.648 1187.69 121.541C1193.53 125.584 1200.57 129.253 1208.8 132.547C1217.19 135.841 1226.62 138.911 1237.1 141.756C1248.33 144.9 1259.04 148.719 1269.22 153.211C1279.4 157.703 1288.76 162.869 1297.3 168.709C1310.17 178.292 1320.43 189.448 1328.07 202.176C1335.71 214.904 1339.52 229.578 1339.52 246.199C1339.52 260.574 1336.6 273.377 1330.76 284.607C1325.07 295.688 1317.14 305.047 1306.96 312.684C1296.77 320.47 1284.64 326.385 1270.57 330.428C1256.49 334.321 1241.14 336.268 1224.52 336.268C1208.2 336.268 1192.03 333.872 1176.01 329.08C1160.14 324.139 1146.28 316.951 1134.46 307.518C1123.22 298.234 1114.32 287.303 1107.73 274.725C1101.29 262.146 1098.07 247.397 1098.07 230.477H1160.06C1160.36 240.359 1162.08 248.82 1165.23 255.857C1168.37 262.895 1172.79 268.66 1178.48 273.152C1184.02 277.645 1190.68 280.939 1198.47 283.035C1206.4 285.132 1215.09 286.18 1224.52 286.18C1232.91 286.18 1240.32 285.206 1246.76 283.26C1253.35 281.313 1258.89 278.618 1263.38 275.174C1267.87 271.73 1271.32 267.612 1273.71 262.82C1276.11 257.879 1277.31 252.488 1277.31 246.648Z"
        fill="white"
      />
      <path
        d="M845.158 4.96875H1034.28V55.9551H970.49V281.238H1034.28V332H845.158V281.238H907.375V55.9551H845.158V4.96875Z"
        fill="white"
      />
      <path
        d="M665.695 122.215L723.869 4.96875H797.99L705.9 167.137L800.236 332H726.564L666.594 212.957L606.848 332H532.277L626.613 167.137L534.748 4.96875H608.42L665.695 122.215Z"
        fill="white"
      />
      <path
        d="M506.896 192.518C506.896 206.593 505.624 219.995 503.078 232.723C500.533 245.301 496.864 256.98 492.072 267.762C486.981 278.543 480.692 288.426 473.205 297.41C465.718 306.395 457.183 313.882 447.6 319.871C438.915 325.112 429.331 329.155 418.85 332C408.518 334.995 397.362 336.492 385.383 336.492C372.655 336.492 360.9 334.845 350.119 331.551C339.338 328.257 329.53 323.615 320.695 317.625C312.01 311.336 304.224 303.774 297.336 294.939C290.448 285.955 284.683 275.848 280.041 264.617C275.848 254.285 272.629 243.055 270.383 230.926C268.286 218.797 267.238 205.994 267.238 192.518V144.9C267.238 130.525 268.436 116.899 270.832 104.021C273.378 91.1439 277.046 79.2396 281.838 68.3086C286.48 57.9766 292.095 48.6178 298.684 40.2324C305.422 31.847 313.133 24.6595 321.818 18.6699C330.354 12.8301 339.937 8.33789 350.568 5.19336C361.2 2.04883 372.73 0.476562 385.158 0.476562C397.736 0.476562 409.491 2.1237 420.422 5.41797C431.503 8.5625 441.46 13.1296 450.295 19.1191C459.13 24.8092 466.841 31.6973 473.43 39.7832C480.168 47.8691 485.933 56.7786 490.725 66.5117C495.965 77.5924 499.934 89.7214 502.629 102.898C505.474 116.076 506.896 130.076 506.896 144.9V192.518ZM442.883 144.451C442.883 136.066 442.434 128.13 441.535 120.643C440.786 113.006 439.514 105.968 437.717 99.5293C435.471 91.4434 432.476 84.2559 428.732 77.9668C424.989 71.528 420.572 66.2871 415.48 62.2441C411.438 59.2493 406.87 56.9284 401.779 55.2812C396.838 53.6341 391.298 52.8105 385.158 52.8105C379.318 52.8105 374.003 53.5592 369.211 55.0566C364.569 56.554 360.376 58.7253 356.633 61.5703C351.542 65.763 347.199 71.0039 343.605 77.293C340.161 83.582 337.466 90.9193 335.52 99.3047C334.022 105.743 332.899 112.781 332.15 120.418C331.551 128.055 331.252 136.066 331.252 144.451V192.518C331.252 200.454 331.551 208.09 332.15 215.428C332.749 222.765 333.798 229.578 335.295 235.867C336.942 243.803 339.338 251.066 342.482 257.654C345.777 264.093 349.595 269.334 353.938 273.377C357.98 276.971 362.548 279.741 367.639 281.688C372.88 283.634 378.794 284.607 385.383 284.607C391.672 284.607 397.437 283.709 402.678 281.912C407.919 280.115 412.561 277.495 416.604 274.051C421.695 269.858 425.962 264.617 429.406 258.328C433 251.889 435.845 244.627 437.941 236.541C439.589 230.252 440.786 223.364 441.535 215.877C442.434 208.39 442.883 200.604 442.883 192.518V144.451Z"
        fill="white"
      />
      <path
        d="M218.049 332H155.158L64.1914 121.092V332H0.626953V4.96875H64.1914L154.484 214.979L154.709 4.96875H218.049V332Z"
        fill="white"
      />
    </svg>
  );
};

export default Brand;
