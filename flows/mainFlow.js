const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const exitMessage = {
	body: ["¡Muchas gracias!", "Tenga buen día 👋."].join("\n"),
};

//Options Regex
const validatorRegex = "^(0|1)$";

//Main Flow
const mainFlow = addKeyword([EVENTS.WELCOME])
	.addAnswer(
		[
			"👋 ¡Buen día!",
			"Soy *RysthBot* asistente virtual, estoy aquí para ayudarte a conocer más acerca de nuestros servicios.",
		],
		{
			delay: functions.randomIntFromInterval(400, 600),
			media:
				"https://lh3.googleusercontent.com/p/AF1QipPnRbaXGghCxxmQ2jXh4-jwGGa9IDVGAJKLTlSJ=s400",
		}
	)
	.addAnswer(
		["_¿Desea Continuar?_", "", "0️⃣. Sí", "1️⃣. No"],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		async (ctx, { fallBack, endFlow }) => {
			if (!ctx.body.match(validatorRegex)) {
				return fallBack(
					[
						"*⚠ Seleccione una opción correcta:*",
						"",
						"0️⃣. Sí",
						"1️⃣. No",
					].join("\n")
				);
			} else if (ctx.body === "1") {
				return endFlow(exitMessage);
			}
		}
	);

module.exports = {
	mainFlow,
};
