/* eslint-disable one-var */
var keystone = require('keystone');

var People = keystone.list('People');

/**
 * List People
 */
exports.list = function (req, res) {
	People
	.model.find(function (err, people) {
		if (err) return res.json({ err: err });
		return res.status(200).json({
			people,
		});

	});
};

/**
 * Get People by ID
 */
exports.get = function (req, res) {
	People
	.model.findById(req.params.id)
	.exec(function (err, person) {
		if (err) return res.json({ err: err });
		if (!person) return res.json('not found');
		return res.status(200).json({
			people: person,
		});
	});
};

/**
 * Create a People
 */
exports.create = function (req, res) {
	var people = new People.model();
	var data = (req.method === 'POST') ? req.body : req.query;
	people.getUpdateHandler(req).process(data, function (err) {
		if (err) return res.json({ error: err });
		return res.status(201).json({
			people,
		});

	});
};


/**
 * Patch People by ID
 */
exports.update = function (req, res) {
	People
	.model.findById(req.params.id)
	.exec(function (err, item) {
		if (err) return res.json({ err: err });
		if (!item) return res.json({ err: 'not found' });
		var data = (req.method === 'PUT') ? req.body : req.query;
		item.getUpdateHandler(req).process(data, function (err) {
			if (err) return res.json({ err: err });
			return res.status(201).json({
				people: item,
			});
		});
	});
};


/**
 * Delete People by ID
 */
exports.remove = function (req, res) {
	People
	.model
	.findById(req.params.id)
	.exec(function (err, item) {
		if (err) return res.json({ dberror: err });
		if (!item) return res.json('not found');
		item.remove(function (err) {
			if (err) return res.json({ dberror: err });
			return res.status(200).json({
				success: true,
			});
		});
	});
};
