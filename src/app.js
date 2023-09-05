/* src/app.js */

const express = require('express');
// const { restart } = require('nodemon');
const {
  sayHello,
  firstCharacters,
  uppercase,
  lowercase,
  firstCharacter,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const app = express();

app.use(express.json());
// the in built express middleware to parse JSOn into JS

app.get('/strings/hello/:string', (req, res) => {
  res.status(200).json({ result: sayHello(req.params.string) });
});

// result is sayHello function with the paramenter as a string

app.get('/strings/upper/:string', (req, res) => {
  res.status(200).json({ result: uppercase(req.params.string) });
});

app.get('/strings/lower/:string', (req, res) => {
  res.status(200).json({ result: lowercase(req.params.string) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  const p = req.params.string;
  const q = req.query.length;
  if (q > 1) {
    res.status(200).json({ result: firstCharacters(p, q) });
  } else {
    res.status(200).json({ result: firstCharacter(p) });
  }
});

// NUMBERS

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  // 10 is radix

  if (Number.isNaN(a) || Number.isNaN(b)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: add(a, b) });
  }
});

app.get('/numbers/subtract/:c/from/:d', (req, res) => {
  const c = parseInt(req.params.c, 10);
  const d = parseInt(req.params.d, 10);

  if (Number.isNaN(c) || Number.isNaN(d)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  } else {
    res.status(200).json({ result: subtract(d, c) });
  }
});

app.post('/numbers/multiply', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }

  const parseA = parseInt(a, 10);
  const parseB = parseInt(b, 10);

  if (Number.isNaN(parseA) || Number.isNaN(parseB)) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  res.status(200).json({ result: multiply(a, b) });
});

app.post('/numbers/divide', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }

  const parseA = parseInt(a, 10);
  const parseB = parseInt(b, 10);

  if (Number.isNaN(parseA) || Number.isNaN(parseB)) {
    res.status(400).send({ error: 'Parameters "a" and "b" must be valid numbers.' });
  }

  if (b === 0 && a !== 0) {
    res.status(400).send({ error: 'Unable to divide by 0.' });
  }

  res.status(200).json({ result: divide(a, b) });
});

app.post('/numbers/remainder', (req, res) => {
  const { a } = req.body;
  const { b } = req.body;

  if (a === undefined || b === undefined) {
    res.status(400).send({ error: 'Parameters "a" and "b" are required.' });
  }

  const parseA = parseInt(a, 10);
  const parseB = parseInt(b, 10);

  if (Number.isNaN(parseA) || Number.isNaN(parseB)) {
    res.status(400).send({ error: 'Parameters must be valid numbers.' });
  }

  if (b === 0 && a !== 0) {
    res.status(400).send({ error: 'Unable to divide by 0.' });
  }

  res.status(200).json({ result: remainder(a, b) });
});

//   const a = parseInt(req.body.a, 10);
//   const b = parseInt(req.body.b, 10);

//   if (a === 0 && b !== 0) {
//     res.status(200).json({ result: 0 });
//   } else if (a !== 0 && b === 0) {
//     res.status(400).send({ error: 'Unable to divide by 0.' });
//   } else if (
//     (Number.isNaN(a) && typeof b === 'number') ||
//     (Number.isNaN(b) && typeof a === 'number')
//   ) {
//     res.status(400).send({ error: 'Parameters must be valid numbers.' });
//   } else {
//     res.status(200).json({ result: remainder(a, b) });
//   }
// });

module.exports = app;
