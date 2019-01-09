export const validatorLeastOneNonAlphanumeric = (value) => {
	const validator = /[!"$%^&*()-_+=:;'@~#?<>]/;
	return validator.test(value);
};

export function validatorNumber(value) {
	const validator = /^[1-9]\d*(\.\d+)?$/;
	console.log('validatorNumber - value = ' + value + ' , return = ' + validator.test(value));
	return validator.test(value);
};
