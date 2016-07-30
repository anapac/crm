'use strict';

import $ from 'jquery';

export default class UserService {
	constructor(baseUrl) {
		this.url = baseUrl;

		this.getUsers = this.getUsers.bind(this);
		this.getUserById = this.getUserById.bind(this);
	}	// constructor()

	getUsers() {
		return this.getJsonAsPromise(this.url).then((users) => users.map((userData) => {
			if (userData) {
				return userData;
			}
		}));
	}	// getUsers()

	getUserById(userId) {
		const targetUserId = this.url + '/' + userId;

		return this.getJsonAsPromise(targetUserId).then((userData) => {
			if (userData) {
				return userData;
			}
		});
	}	// getUserById()

	updateUserById(userId, data) {
		const targetUserId = this.url + '/' + userId;

		return this.putJsonAsPromise(targetUserId, data).then((userData) => {
			if (userData) {
				return userData;
			}
		});
	}	// updateUserById()

	createUser(data) {
		return this.postJsonAsPromise(this.url, data).then((userData) => {
			if (userData) {
				return userData;
			}
		});
	}	// createUser()

	deleteUserById(userId) {
		const targetUserId = this.url + '/' + userId;

		return this.deleteJsonAsPromise(targetUserId).then((userData) => {
			if (userData) {
				return userData;
			}
		});
	}	// deleteUserById()

	postJsonAsPromise(url, data) {
		return new Promise(function (resolve, reject) {
			// $.post(url, data).done(resolve).fail(reject);
			$.ajax({
				type: 'POST',
				url: url,
				data: JSON.stringify(data),
				success: resolve,
				dataType: 'json',
				contentType: 'application/json'
				// contentType: false,
				// processData: false,
				// crossDomain: true
			}).done(resolve).fail(reject);
		});
	}	// postJsonAsPromise()

	getJsonAsPromise(url, data) {
		return new Promise(function (resolve, reject) {
			// $.getJSON(url, data).done(resolve).fail(reject);
			$.ajax({
				type: 'GET',
				url: url,
				data: data,
				success: resolve
			}).done(resolve).fail(reject);
		});
	}	// getJsonAsPromise()

	putJsonAsPromise(url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'PUT',
				url: url,
				data: JSON.stringify(data),
				success: resolve,
				dataType: 'json',
				contentType: 'application/json'
			}).done(resolve).fail(reject);
		});
	}	// putJsonAsPromise()

	deleteJsonAsPromise(url, data) {
		return new Promise(function (resolve, reject) {
			$.ajax({
				type: 'DELETE',
				url: url,
				data: data,
				success: resolve
			}).done(resolve).fail(reject);
		});
	}	// deleteJsonAsPromise()
}	// class UserService