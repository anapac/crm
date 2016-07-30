'use strict';

import $ from 'jquery';

export default class ContactService {
	constructor(baseUrl) {
		this.url = baseUrl;
	}

	getContacts() {
		return this.getJsonAsPromise(this.url)
			.then((contacts) => contacts.map(
				(contact) => {
					return contact;
				})
			);
	}	// getContacts()

	getSearchContacts(data) {
		let targetUrl = this.url + '/search';

		return this.postJsonAsPromise(targetUrl, data)
			.then((contacts) => contacts.map(
				(contact) => {
					console.info(`getSearchContacts: ${JSON.stringify(contact)}`);
					return contact;
				})
			);
	}	// getContacts()

	getContactById(contactId) {
		const targetContact = this.url + '/' + contactId;

		return this.getJsonAsPromise(targetContact).then((contactData) => {
			return contactData;
		});
	}	// getContactById()

	postJsonAsPromise(url, data) {
		return new Promise(function (resolve, reject) {
			$.post(url, data).done(resolve).fail(reject);
		});
	}

	getJsonAsPromise(url, data) {
        return new Promise(function (resolve, reject) {
            $.getJSON(url, data).done(resolve).fail(reject);
        });
    }
}	// class ContactService