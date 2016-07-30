'use strict';

const mongoose = require('mongoose');
const Schema = require('mongoose').Schema;

exports.users_schema = new Schema({
	username: { type: String, trim: true },
	password: { type: String, trim: true },
	namesFirst: { type: String, trim: true },
	namesLast: { type: String, trim: true },
	namesOther: { type: String, trim: true },
	dateOfBirth: { type: Date },
	phone: { type: String, trim: true },
	mobile: { type: String, trim: true },
	email: { type: String, trim: true },
	skypeId: { type: String, trim: true },
	address: { type: String, trim: true },
	zipCode: { type: String, trim: true },

	createdBy: { type: Schema.Types.ObjectId },
	createdOn: { type: Date },
	lastModified: { type: Date },
	markedForDel: { type: Boolean, default: false }
});


exports.contacts_schema = new Schema({
	title: { type: String, trim: true },
	namesFirst: { type: String, trim: true },
	namesLast: { type: String, trim: true },
	namesOther: { type: String, trim: true },
	dateOfBirth: { type: Date },
	phone: { type: String, trim: true },
	mobile: { type: String, trim: true },
	email: { type: String, trim: true },
	skypeId: { type: String, trim: true },
	country: { type: String, trim: true },
	city: { type: String, trim: true },
	address: { type: String, trim: true },
	zipCode: { type: String, trim: true },

	company: { type: String, trim: true },
	companyWebSite: { type: String, trim: true },

	owner: { type: Schema.Types.ObjectId },
	createdOn: { type: Date },
	lastModified: { type: Date },
	markedForDel: { type: Boolean, default: false }
});