const express = require('express');
const { randomBytes } = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(express.json({ limit: '5mb' }));
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
	// res.status(200).send(posts);
	res.send(posts);
});

// app.post('/posts', async (req, res) => {
app.post('/posts/create', async (req, res) => {
	const id = randomBytes(4).toString('hex');
	const { title } = req.body;

	posts[id] = {
		id,
		title,
	};

	// await axios.post('http://localhost:4005/events', {
	await axios.post('http://event-bus-srv:4005/events', {
		type: 'PostCreated',
		data: {
			id,
			title,
		},
	});

	// res.status(200).send({
	// 	posts,
	// });
	res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
	console.log('Event received!', req.body.type);

	res.send({});
});

app.listen(4000, () => {
	console.log('v55');
	console.log('Listening to port 4000...');
});
