import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const expect = chai.expect;

describe('location api', () => {
	const request = chai.request(`http://localhost:${process.env.PORT}`);

	context('POST /api/location', () => {

		it('Should add to db and respond with 200', (done) => {
			const testTime = 1000;

			request.post('/api/location')
				.set('content-type', 'application/json')
				.send({ locations: [{ visitTime: testTime, location: { coordinates: [ 20, 20] } }] })
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res).to.have.status(200);
					done();
				});
		});

		it('Should fail to add to db and respond with 500', (done) => {
			request.post('/api/location').set('content-type', 'application/json')
				.send({ locations: [{ visitTime: undefined, location: { coordinates: [ 20, 20] } }] })
				.end((err,res) => {
					expect(err).to.be.null;
					expect(res.body).to.deep.equals({
						"result": "Failed to add Locations"
					});
					expect(res).to.have.status(500);
					done();
				});
		});

		it('Should fail to add to db and respond with 400', (done) => {
			request.post('/api/location').set('content-type', 'application/json')
				.send({ locations: null })
				.end((err, res) => {
					expect(err).to.be.null;
					expect(res.body).to.deep.equals({
						"result": "Post failed, Missing Parameter"
					});
					expect(res).to.have.status(400);
					done();
				})
		});
	});

	context('GET /api/location', () => {
		it('should return the location added to the db', async () => {
			const mockObj = { locations: [{ visitTime: 555, location: { type: 'Point', coordinates: [ 20, 20] } }] };
			await request.post('/api/location').set('content-type', 'application/json')
				.send(mockObj);

			const result = await request.get('/api/location').query({ fromTimestamp: 554, toTimestamp: 556 }).send();
			expect(result.body.result).to.be.an('array');
			expect(result.body.result[0].location).to.deep.equal(mockObj.locations[0].location);
			expect(result.body.result[0].visitTime).to.equal(mockObj.locations[0].visitTime);
			expect(result.body.result.length).to.equal(1);
		});

		it('should return an empty array for filter out of range', async () => {
			const mockObj = { locations: [{ visitTime: 556, location: { coordinates: [ 20, 20] } }] };
			await request.post('/api/location')
				.set('content-type', 'application/json')
				.send(mockObj);

			const result = await request.get('/api/location').query({ fromTimestamp: 557, toTimestamp: 558 }).send();
			expect(result.body.result).to.be.an('array');
			expect(result.body.result.length).to.equal(0);
		})
	});
});
