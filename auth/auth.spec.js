const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig.js');
const bcrypt = require('bcryptjs');

describe('server', () => {
	beforeEach(async () => {
		await db('users').truncate();
	});

	describe('POST /REGISTER', () => {
		it('should return 400 status', () => {
			return request(server)
				.post('/api/auth/register')
				.send({
					username: 'test',
					password: 'testpass'
				})
				.set('Content-Type', 'application/json')
				.then(res => {
					expect(res.status).toBe(400);
					expect(res.body.message).toBe('Missing input');
				});
		});
	});
});

let token;

describe('POST /LOGIN', () => {
	it('should return 401 status', () => {
		return request(server)
			.post('/api/auth/login')
			.send({
				username: 'test',
				password: 'testpass'
			})
			.set('Content-Type', 'application/json')
			.then(res => {
				expect(res.status).toBe(401);
				expect(res.body.message).toBe('Invalid Credentials');
			});
	});
});
