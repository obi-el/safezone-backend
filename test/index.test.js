import server, { connection } from "../server/app";
import Location from '../server/models/LocationModel';

before(done => {
	connection.on('open', done);
});

after(done => {
	server.close(done);
});

afterEach( done => {
	Location.deleteMany().then(()=> {
		done();
	})
});

