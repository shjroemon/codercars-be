const mongoose = require('mongoose');
const Car = require('../models/Car');
const carController = {};

carController.createCar = async (req, res, next) => {
	
	try {
		// YOUR CODE HERE
		const car = req.body;
		const { make, model, price, release_date, size, style, transmission_type } = car;
		if (
			!make ||
			!model ||
			!price ||
			!release_date ||
			!size ||
			!style ||
			!transmission_type
		  ) {
			throw new AppError(401, "Bad request", "Missing body info");
		  }
		  if (!car) throw new AppError(402, "Bad Request", "Create car Error");
		
		  const newCar = await Car.create(car)
		  res.send({ message: "Create Car Successfully!", car: newCar });
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

carController.getCars = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		let {page} = req.query;
		page = parseInt(page) || 1
		const limit = 20;
		let offset = limit * (page - 1)
		// const listOfFound= await Car.find(carController)
		let listCars = await Car.find();
		listCars = listCars.reverse().slice(offset, offset + limit);
		let totalCars = await Car.find().countDocuments();
		
		let totalPage = Math.ceil(totalCars / limit);
		res.status(200).send({
			message: "Get Car List Successfully!",
			cars: listCars,
			page: page,
			total: totalPage,
		  });
        
	} catch (err) {
		next(err)
		// YOUR CODE HERE
	}
};

carController.editCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		const {id} = req.params
		const data = req.body
	
		const options = { new: true };
		const update = await Car.findByIdAndUpdate(id, data, options);
		res.send({ message: "Update Car Successfully!", update });
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

carController.deleteCar = async (req, res, next) => {
	try {
		// YOUR CODE HERE
		const { id } = req.params;
  		const options = { new: true };
		const updateDeleteCar = await Car.findByIdAndDelete(id, options)
		res.send({ message: "Update Car Successfully!", updateDeleteCar })
	} catch (err) {
		// YOUR CODE HERE
		next(err)
	}
};

module.exports = carController;
