// Desc: Helper functions


const passwordGenerator = (length) => {
	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let password = '';
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset.charAt(randomIndex);
	}
	return password;
}

const camelCaseToWords = (camelCaseWord) => {
	return camelCaseWord
		.replace(/([a-z])([A-Z])/g, '$1 $2') // Encuentra las letras mayúsculas y las separa
		.split(/(?=[A-Z])/) // Divide la palabra utilizando las mayúsculas como punto de separación
		.map(part => part.toLowerCase()) // Convierte todas las partes a minúsculas
		.join(' '); // Une las partes con espacios
}


export { passwordGenerator, camelCaseToWords }