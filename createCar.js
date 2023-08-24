const fs = require("fs");
const csv = require("csvtojson");

const createCar = async () => {
  let newData = await csv().fromFile("./archive/data.csv");
  let data = JSON.parse(fs.readFileSync("./archive/carData.json"));

  newData = newData.slice(0, 200).map((e, i) => {
    return {
      id: Number(i + 1),
      make: e.Make,
      model: e.Model,
      release_date: e.Year,
      transmission_type: e["Transmission Type"],
      size: e["Vehicle Size"],
      style: e["Vehicle Style"],
      price: e.MSRP,
    };
  });

  data.data = newData;
  data.totalCar = newData.length;

  // function unique(arr) {
  //   var newArr = [];
  //   for (var i = 0; i < arr.length; i++) {
  //     if (newArr.indexOf(arr[i]) === -1) {
  //       newArr.push(arr[i]);
  //     }
  //   }
  //   return newArr;
  // }

  // for (let x = 0; x < data.totalCar; x++) {
  //   var styleCar = [];
  //   styleCar.push(data.data[x].style);
  // }
  // console.log(styleCar);

  fs.writeFileSync("./archive/carData.json", JSON.stringify(data));

  console.log("Transform data successfully");
};

createCar();
