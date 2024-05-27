
export  const data = [
    ["Booking", "Month"],
    [105, 100],
    [105, 250],
    [105, 450],
    [105, 550],
    [105, 750],
    [200, 300],
    [45, 150],
    [60, 200],
    [150, 350],
    [85, 220],
    [120, 270],
    [90, 180],
    [110, 230],
    [80, 190],
  ];
  
  export  const Piedata = [
    ["Task", "Hours per Day"],
    ["Table Booking", 11],
    ["Food Odering", 2],
    ["Pre order", 2],
  
  ];
  export   const dataCombo = [
    [
      "",
      "RowA",
      "RowB",
      "RowC",
      "RowD",
      "RowE",
      "RowF",
    ],
    ["2024/01", 165, 938, 522, 998, 450, 614.6],
    ["2024/02", 135, 1120, 599, 1268, 288, 682],
    ["2024/03", 157, 1167, 587, 807, 397, 623],
    ["2024/04", 139, 1110, 615, 968, 215, 609.4],
    ["2024/05", 136, 691, 629, 1026, 366, 569.6],
  ];
  
  export   const optionsCombo = {
    title: "Monthly Table Price",
    vAxis: { title: "Price" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };
  
  
  export  const options = {
    title: "Price of Table of Price vs Price of Food",
    hAxis: {
      title: "Price of Table",
      minValue: 0,
    },
    vAxis: {
      title: "Price of Votes",
    },  
    legend: { position: "top", alignment: "center" },
    colors: ["#76A789"], // corrected the color code
    animation: {
      duration: 1000,
      easing: "out",
      startup: true,
    },
  };
  
  export   const Pieoptions = {
    title: "Restaurant Daily Activities",
    pieHole: 0.4,
    animation: {
      duration: 1000,
      easing: "out",
      startup: true,
    },
  };
  
  export const dataBar = [
    ["Row", "2023 Price", "2024 Price"],
    ["RowA", 8175000, 8008000],
    ["RowB", 3792000, 3694000],
    ["RowC", 2695000, 2896000],
    ["RowD", 2099000, 1953000],
    ["RowE", 1526000, 1517000],
  ];
  
  export const optionsBar = {
    title: "Yeary price comparison of the restaurant seats",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Price",
      minValue: 0,
    },
    vAxis: {
      title: "Row",
    },
  };