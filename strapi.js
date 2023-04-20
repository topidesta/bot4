const URL = "https://strapi-production-c3e3.up.railway.app/api";

//Get a Service with his Name,Price,Description by ID
async function getServiceByID(serviceID) {
	const service = await fetch(
		`${URL}/services/${serviceID}?fields=name&fields=price&fields=description`
	).then((response) => response.json());

	const { data } = service;

	const arrayContent = [
		{
			body: [
				`*${data.attributes.name.toUpperCase()}*`,
				``,
				`${data.attributes.description}`,
			].join("\n"),
		},
	];

	return arrayContent;
}

//Create a new Customer with his Name,Phone,Email.
async function setCustomer(name, phone, email) {
	const newCustomer = {
		name: name,
		phone: `${phone}`,
		email: email,
	};

	await fetch(`${URL}/customers`, {
		method: "POST",
		body: JSON.stringify({
			data: newCustomer,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	}).then((response) => response.json());

	const arrayContent = [
		{
			body: [
				`*Nombre:* ${newCustomer.name}`,
				`*Celular:* ${newCustomer.phone}`,
				`*Email:* ${newCustomer.email}`,
			].join("\n"),
		},
	];

	return arrayContent;
}

//Get a Customer only with his Name by Phone.
async function getCustomerByPhone(phone) {
	const customer = await fetch(
		`${URL}/customers?filters[phone][$eq]=${phone}&fields=name`
	).then((response) => response.json());

	let answer = null;
	let { data } = customer;

	if (data.length !== 0) {
		answer = [
			{
				body: [
					`Bienvenid@ nuevamente *${data[0].attributes.name.toUpperCase()}*.`,
					`Porfavor, escriba la palabra *MENU* para continuar.`,
				].join("\n"),
			},
		];
	}

	return answer;
}
//Need to export each Function,Array,Variable,etc..
module.exports = {
	getServiceByID,
	setCustomer,
	getCustomerByPhone,
};
