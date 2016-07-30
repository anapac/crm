'use strict';

const mongoose = require('mongoose');
const boom = require('boom');

const Schemas = require('../../schemas/schemas');
const User = mongoose.model('User', Schemas.users_schema);


exports.getUserList = (request, reply) => {
	User.find({ markedForDel: false }, (err, user_docs) => {
		if (err) {
			console.error(err);
			throw err;
		}

		reply(user_docs);
	});
};

exports.getUserInstance = (request, reply) => {
	let usr = request.params.userId;
	User.findById(usr, (err, user_doc) => {
		if (err) {
			console.error(err);
			throw err;
		}

		if (user_doc === null || user_doc === 'udefined') {
			reply(boom.notFound(`User with _id: ${usr} not found!`));
		}

		reply(user_doc);
	});
};

exports.updateUser = (request, reply) => {
	let usr = request.params.userId;
	let newInstance = request.payload;

	if (!usr || !newInstance) {
		reply(Boom.badRequest(`Bad Request: ${test}`));
		return;
	}

	User.findByIdAndUpdate(
		{ _id: newInstance._id },
		{
			$set: {
			username: newInstance.username,
			namesFirst: newInstance.namesFirst,
			namesLast: newInstance.namesLast,
			namesOther: newInstance.namesOther,
			dateOfBirth: newInstance.dateOfBirth || new Date,
			phone: newInstance.phone,
			mobile: newInstance.mobile,
			email: newInstance.email,
			skypeId: newInstance.skypeId,
			address: newInstance.address,
			zipCode: newInstance.zipCode,

			lastModified: Date.now(),
			markedForDel: false
			}
		}, 
		{	// options:
			new: true,
			upsert: false,
			runValidators: true,
			setDefaultsOnInsert: true
		}, (err, updated_user_doc) => {
			if (err) {
				console.error(err);
				reply(Boom.badImplementation(`Server error: ${err}`));
			} else {
				reply(updated_user_doc)
			}
		}
	);
};

exports.createUser = (request, reply) => {
	let data = request.payload;

	User.create({
		username: data.username,
		password: data.password,
		namesFirst: data.namesFirst,
		namesLast: data.namesLast,
		namesOther: data.namesOther,
		dateOfBirth: data.dateOfBirth || new Date,
		phone: data.phone,
		mobile: data.mobile,
		email: data.email,
		skypeId: data.skypeId,
		address: data.address,
		zipCode: data.zipCode,

		createdBy: new mongoose.Types.ObjectId,
		createdOn: Date.now(),
		lastModified: null,
		markedForDel: false
	}, (err, result) => {
		if (err) {
			console.error(err);
			throw err;
		}

		reply(result);
	});
};

exports.deleteUser = (request, reply) => {
	let usr = request.params.userId;

	User.findByIdAndUpdate(usr, { $set: { markedForDel: true } }, {
		// options:
		new: true,
		upsert: false,
		runValidators: true,
		setDefaultsOnInsert: true
	}, (err, updated_user_doc) => {
		if (err) {
			console.error(err);
			reply(Boom.badImplementation(`Server error: ${err}`));
		}

		reply(updated_user_doc.markedForDel);
	});
};