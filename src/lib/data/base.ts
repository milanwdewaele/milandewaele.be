const firstName = 'Milan';
const lastName = 'Dewaele';
const suffix = 'Well, you must have tried everything once, right?';

const BaseData = {
	firstName,
	lastName,
	suffix,
	get fullName() {
		return `${firstName} ${lastName}`;
	}
};

export default BaseData;
