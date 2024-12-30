const firstName = 'Milan';
const lastName = 'Dewaele';
const suffix = 'Ready to take on anything.';

const BaseData = {
	firstName,
	lastName,
	suffix,
	get fullName() {
		return `${firstName} ${lastName}`;
	}
};

export default BaseData;
