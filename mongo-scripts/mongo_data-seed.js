var db = db.getSiblingDB('crm');

db.createCollection("users");
db.users.insert({ username: "test1", password: "12345", active: true });
db.users.insert({ username: "test2", password: "12345", active: true });
db.users.insert({ username: "test3", password: "12345", active: true });
db.users.insert({ username: "test4", password: "12345", active: false });
db.users.insert({ username: "test5", password: "12345", active: false });

print("Created users");

db.createCollection("contacts");
db.contacts.insert({ name: "test-contact1", email: "email1@test.srv" });
db.contacts.insert({ name: "test-contact2", email: "email2@test.srv" });
db.contacts.insert({ name: "test-contact3", email: "email3@test.srv" });
db.contacts.insert({ name: "test-contact4", email: "email4@test.srv" });
db.contacts.insert({ name: "test-contact5", email: "email5@test.srv" });

print("Created contacts");