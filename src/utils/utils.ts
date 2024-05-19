
export  const data = [
    ["Number of Votes", "Average Cost for Two"],
    [105, 250],
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
    ["Work", 11],
    ["Eat", 2],
    ["Commute", 2],
    ["Watch TV", 2],
    ["Sleep", 7],
  ];
  export   const dataCombo = [
    [
      "Month",
      "Bolivia",
      "Ecuador",
      "Madagascar",
      "Papua New Guinea",
      "Rwanda",
      "Average",
    ],
    ["2004/05", 165, 938, 522, 998, 450, 614.6],
    ["2005/06", 135, 1120, 599, 1268, 288, 682],
    ["2006/07", 157, 1167, 587, 807, 397, 623],
    ["2007/08", 139, 1110, 615, 968, 215, 609.4],
    ["2008/09", 136, 691, 629, 1026, 366, 569.6],
  ];
  
  export   const optionsCombo = {
    title: "Monthly Coffee Production by Country",
    vAxis: { title: "Cups" },
    hAxis: { title: "Month" },
    seriesType: "bars",
    series: { 5: { type: "line" } },
  };
  
  
  export  const options = {
    title: "Number of Votes vs Average Cost for Two",
    hAxis: {
      title: "Number of Votes",
      minValue: 0,
    },
    vAxis: {
      title: "Average Cost for Two (in USD)",
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
    title: "My Daily Activities",
    pieHole: 0.4,
    animation: {
      duration: 1000,
      easing: "out",
      startup: true,
    },
  };
  
  export const dataBar = [
    ["City", "2010 Population", "2000 Population"],
    ["New York City, NY", 8175000, 8008000],
    ["Los Angeles, CA", 3792000, 3694000],
    ["Chicago, IL", 2695000, 2896000],
    ["Houston, TX", 2099000, 1953000],
    ["Philadelphia, PA", 1526000, 1517000],
  ];
  
  export const optionsBar = {
    title: "Population of Largest U.S. Cities",
    chartArea: { width: "50%" },
    hAxis: {
      title: "Total Population",
      minValue: 0,
    },
    vAxis: {
      title: "City",
    },
  };