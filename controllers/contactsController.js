const {RequestError} = require('../helpers');
const Contact = require('../models/contacts');
const {addSchema, updateFavoriteSchema} = require('../schemas/schema');

const getAll = async (req, res) => {
  const {id: owner} = req.user;

  const result = await Contact.find({owner}, '-createAt -updateAt').populate(
      'owner',
      'name email',
  );
  res.json(result);
};

const getById = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw new RequestError(404, 'Not found');
  }
  res.json(result);
};

const getPost = async (req, res) => {
  const {error} = addSchema.validate(req.body);
  if (error) throw new RequestError(400, 'missing required name field');

  const {id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const {error} = addSchema.validate(req.body);
  if (error) throw new RequestError(400, 'missing fields');
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw new RequestError(404, 'Not Found');
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const {error} = updateFavoriteSchema.validate(req.body);
  if (error) throw new RequestError(400, 'missing field favorite');
  const {contactId} = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) throw new RequestError(404, 'Not Found');
  res.json(result);
};

const deleteById = async (req, res) => {
  const {contactId} = req.params;
  const result = await Contact.findByIdAndRemove(contactId);
  if (!result) throw new RequestError(404, 'Not found');
  res.json({message: 'contact deleted'});
};

module.exports = {
  getAll,
  getById,
  getPost,
  deleteById,
  updateById,
  updateStatusContact,
};
