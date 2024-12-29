const firstName = 'Milan';
const lastName = 'Dewaele';
const suffix = 'Developer from Bruges, Belgium.';

const BaseData = {
	firstName,
	lastName,
	suffix,
	get fullName() {
		return `${firstName} ${lastName}`;
	}
};

export default BaseData;
