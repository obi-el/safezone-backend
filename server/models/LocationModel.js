import mongoose from'mongoose';
const Schema = mongoose.Schema;

const locationSchema = new Schema({
	location: {
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point',
			required: true
		},
		coordinates: {
			type: [Number],
			required: true
		}
	},
	visitTime: { type: Number, required: true }
}, {
	timestamps: true
});

locationSchema.index({ location: "2dsphere" });

export default mongoose.model('Location', locationSchema);
