const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword } = require("@bot-whatsapp/bot");

const exitMessage = {
	body: ["¡Muchas gracias!", "Tenga buen día 👋."].join("\n"),
};

//Flows Required
const mainAssistant = require("./mainAssistant.js");

//Keywords Regex
const regex = "^(MENU)$";

//Options Regex
const validatorRegex = "^(0|1|2|3|4|ASESOR)$";

const mainMenu = addKeyword([regex], {
	regex: true,
})
	.addAnswer(
		[
			"¡Bienvenid@ a nuestro menú principal!",
			"",
			"_Porfavor, seleccione el *número* con la opción que desea consultar._",
			"",
			"1️⃣. Venta de Juegos Originales.",
			"2️⃣. Información de Contacto.",
			"3️⃣. Evidencias con Clientes.",
			"4️⃣. Salir",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		async (ctx, { fallBack, flowDynamic, endFlow }) => {
			if (!ctx.body.match(validatorRegex)) {
				return fallBack(
					[
						"*⚠ Seleccione una opción correcta:*",
						"",
						"1️⃣. Venta de Juegos Originales.",
						"2️⃣. Información de Contacto.",
						"3️⃣. Evidencias con Clientes.",
						"4️⃣. Salir.",
					].join("\n")
				);
			} else {
				if (
					ctx.body === "1" ||
					ctx.body === "2" ||
					ctx.body === "3"
				) {
					const data = await strapi.getServiceByID(ctx.body.trim());
					flowDynamic(data);
				}
				if (ctx.body === "4") {
					return endFlow(exitMessage);
				}
			}
		}
	)
	.addAnswer(
		[
			"👤 Si desea contactarse con una persona escriba *ASESOR*.",
			"Para regresar escriba *MENU*.",
			"",
			"0️⃣. Salir",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(1000, 1500),
		},
		(ctx, { fallBack, endFlow }) => {
			if (
				ctx.body !== "0" &&
				ctx.body !== "MENU" &&
				ctx.body !== "ASESOR"
			) {
				return fallBack(
					[
						"*⚠ Seleccione una opción correcta:*",
						"👤 Si desea contactarse con una persona escriba *ASESOR*.",
						"Para regresar escriba *MENU*.",
						"",
						"0️⃣. Salir",
					].join("\n")
				);
			} else if (ctx.body === "0") {
				return endFlow(exitMessage);
			}
		}
	);

module.exports = {
	mainMenu,
};
