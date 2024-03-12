import { nanoid } from "nanoid";
import fs from "fs/promises";
import path from "path";

const api = {};
const __dirname = import.meta.dirname;
const contactsPath = path.join(__dirname, "db", "contacts.json");

const updateContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

api.getAll = async () => {
  const contacts = await fs.readFile(contactsPath);

  return JSON.parse(contacts);
};

api.getById = async (id) => {
  const contacts = await api.getAll();

  return contacts.find((contact) => contact.id === id) || null;
};

api.add = async (contact) => {
  const contacts = await api.getAll();
  const newContact = { id: nanoid(), ...contact };
  contacts.push(newContact);

  await updateContacts(contacts);

  return newContact;
};

api.remove = async (id) => {
  const contacts = await api.getAll();
  const removedContact = await api.getById(id);

  if (removedContact) {
    const newContacts = contacts.filter((contact) => contact.id !== id);
    await updateContacts(newContacts);
  }

  return removedContact;
};

export default api;
