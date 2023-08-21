const express = require('express');
const { restart } = require('nodemon');
const {
  sayHello,
  firstCharacters,
  uppercase,
  lowercase,
  firstCharacter,
} = require('./lib/strings');

const { add, subtract, multiply, divide, remainder } = require('./lib/numbers');

const app = express();

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
  res.status(200).json({ result: firstCharacter(req.params.string, req.query.length) });
});

app.get('/strings/first-characters/:string', (req, res) => {
  res.status(200).json({ result: firstCharacters(req.params.string, req.query.length) });
});

// numbers

app.get('/numbers/add/:a/and/:b', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  // 10 is radix

  return Number.isNaN(a) || Number.isNaN(b)
    ? res.sendStatus(400).body({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: add(a, b) });
});

app.get('/numbers/subtract/:c/from/:d', (req, res) => {
  const c = parseInt(req.params.c, 10);
  const d = parseInt(req.params.d, 10);

  return Number.isNaN(c) || Number.isNaN(d)
    ? res.sendStatus(400).body({ error: 'Parameters must be valid numbers.' })
    : res.status(200).json({ result: subtract(c, d) });
});

app.post('/numbers/multiply', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  return Number.NaN(a) || Number.NaN(b)
    ? res.status(400).body({ error: 'Parameters "a" and "b" are required.' })
    : res.status(200).json({ result: multiply(req.body.a, req.body.b) });
});

app.post('/numbers/multiply', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  return Number.false(a) || Number.false(b)
    ? res.status(400).body({ error: 'Parameters "a" and "b" are required.' })
    : res.status(200).json({ result: mulitply(req.body.a, req.body.b) });
});

app.post('/numbers/divide', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  return Number.NaN(a) || Number.NaN(b)
    ? res.status(400).body({ error: 'Parameters "a" and "b" must be valid numbers.' })
    : res.status(200).json({ result: divide(req.body.a, req.body.b) });
});

app.post('/numbers/divide', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);
  return Number.null(a) || Number.null(b)
    ? res.status(400).body({ error: 'Parameters "a" and "b" are required.' })
    : res.status(200).json({ result: divide(req.body.a, req.body.b) });
});

app.post('/numbers/remainder', (req, res) => {
  const a = parseInt(req.params.a, 10);
  const b = parseInt(req.params.b, 10);

  res.status(200).json({ result: remainder(a, b) });
});

module.exports = app;
