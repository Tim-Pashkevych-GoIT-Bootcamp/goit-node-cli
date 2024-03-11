import { program } from "commander";
import api from "./src/contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await api.getAll();
      console.log(allContacts);
      break;

    case "get":
      const contact = await api.getById(id);
      console.log(contact);
      break;

    case "add":
      const newContact = await api.add({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await api.remove(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
