const readline = require('readline');
const yargs = require('yargs');
const { hideBin } = require('yargs/yelpers');
const { Command } = require('commander');
const contacts = require('./contacts');

const program = new Command();
const argv = program.opts(); 
// const rl = readline.createInterface({
//   input: process.stdin, // введення зі стандартного потоку
//   output: process.stdout, // виведення у стандартний потік
// });

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);



const invokeAction = async ({ action, id, name, email, phone }) => {
	switch (action) {
		case 'list':
			const listContacts = await contacts.listContacts();
			return console.log(listContacts);
		case 'get':
			const getContact = await contacts.getContactById(id);
			return console.log(getContact);
		case 'add':
			const addContact = await contacts.addContact(name, email, phone);
			return console.log(addContact);
		case 'update':
			const updateContact = await contacts.updateContact(id, { name, email, phone });
			return console.log(updateContact);
		case 'remove':
			const deletedContact = await contacts.removeContact(id);
			return console.log(deletedContact);
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: 'e6ywwRe4jcqxXfCZOj_1e' });
// invokeAction({ action: 'add', name: 'qwerty', email: '123@123', phone: '123-123-123'});
// invokeAction({ action: 'remove', id:'e6ywwRe4jcqxXfCZOj_1e' });
// invokeAction({ action: 'update', id: 'e6ywwRe4jcqxXfCZOj_1e', name: 'tyuiot', email: '5558@85', phone: '81-8-8' });