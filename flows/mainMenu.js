const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword } = require("@bot-whatsapp/bot");

const exitMessage = {
	body: ["¡Muchas gracias!", "Tenga buen día 👋."].join("\n"),
};
const regexMenu = /^(MENU)$/;

const mainMenu = addKeyword(["MENU"], {
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
			if (
				ctx.body !== "1" &&
				ctx.body !== "2" &&
				ctx.body !== "3" &&
				ctx.body !== "4"
			) {
				return fallBack(
					[
						"*⚠ _Seleccione una opción correcta:_*",
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
			"Para regresar escriba *MENU*.",
			"Si desea comunícarse con una persona escriba *ASESOR*.",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		(ctx, { fallBack }) => {
			if (ctx.body !== "MENU" && ctx.body !== "ASESOR") {
				return fallBack(
					"⚠ ¡Porfavor, escriba la palabra *MENU* o *ASESOR* correctamente!."
				);
			}
		}
	);

module.exports = {
	mainMenu,
};
