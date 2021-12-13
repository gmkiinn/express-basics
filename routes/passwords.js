const express = require('express');
const router = express.Router();

//data
const passwords = [
  { id: 1, username: 'Mahesh', password: 'mahesh123' },
  { id: 2, username: 'Kumar', password: 'kumar123' },
];

// Handling Get Requests
router.get('/', (req, res) => {
  res.status(200).send(passwords);
});

//request params => "req.params" and search params => "req.query"
router.get('/:id', (req, res) => {
  // check the record with id
  const password = passwords.find((p) => p.id === parseInt(req.params.id));

  //not found
  if (!password) {
    return res.status(404).send('password not found with given id');
  }

  //send
  res.send(password);
});

// Handling Post requests
router.post('/', (req, res) => {
  // validation
  // joi schema
  const accountSchema = Joi.object({
    username: Joi.string().required().min(4).max(50).alphanum(),
    password: Joi.string().required().min(4).max(50),
  });
  // validate
  const { error } = accountSchema.validate(req.body, { abortEarly: false });

  if (error) {
    //Bad Request
    return res.status(400).send(error.details[0].message);
  }

  // Add record
  const accountInfo = { id: passwords.length + 1, ...req.body };
  passwords.push(accountInfo);

  // Add record and Send the response
  res.send(accountInfo);
});

// Handling PUT requests
router.put(' /:id', (req, res) => {
  // check the record with id
  const password = passwords.find((p) => p.id === parseInt(req.params.id));

  //not found
  if (!password) {
    return res.status(404).send('password not found with given id');
  }

  // validation
  // joi schema
  const accountSchema = Joi.object({
    username: Joi.string().required().min(4).max(50).alphanum(),
    password: Joi.string().required().min(4).max(50),
  });

  // validate
  const { error } = accountSchema.validate(req.body, { abortEarly: false });

  if (error) {
    //Bad Request
    return res.status(400).send(error.details[0].message);
  }

  // Update
  passwords.forEach((p) => {
    if (p.id === parseInt(req.params.id)) {
      p.username = req.body.username;
      p.password = req.body.password;
    }
  });
  const passwordInfo = passwords.find((p) => p.id === parseInt(req.params.id));
  res.send(passwordInfo);
});

// Handling DELETE requests
router.delete('/:id', (req, res) => {
  // check the record with id
  const password = passwords.find((p) => p.id === parseInt(req.params.id));

  //not found
  if (!password) {
    return res.status(404).send('password not found with given id');
  }

  // Delete
  const filteredPasswords = passwords.filter(
    (p) => p.id !== parseInt(req.params.id)
  );
  passwords.length = 0;
  passwords.push(...filteredPasswords);
  res.send(password);
});

module.exports = router;
