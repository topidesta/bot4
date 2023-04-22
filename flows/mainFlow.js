const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");
const mainMenu = require("./mainMenu.js");
const mainSignUp = require("./mainSignUp.js");

const exitMessage = {
	body: ["¡Muchas gracias!", "Tenga buen día 👋."].join("\n"),
};

//Options Regex
const validatorRegex = "^(1|2)$";

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
		["_¿Desea Continuar?_", "", "1️⃣. Sí", "2️⃣. No"],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		async (ctx, { fallBack, endFlow, flowDynamic }) => {
			if (!ctx.body.match(validatorRegex)) {
				return fallBack(
					[
						"*⚠ Seleccione una opción correcta:*",
						"",
						"1️⃣. Sí",
						"2️⃣. No",
					].join("\n")
				);
			} else if (ctx.body === "2") {
				return endFlow(exitMessage);
			}

			const customer = await strapi.getCustomerByPhone(
				ctx.from.trim()
			);

			if (customer !== null) {
				flowDynamic(customer);
			} else {
				flowDynamic([
					{
						body:
							"Porfavor, escriba la palabra *REGISTRO* para continuar.",
					},
				]);
			}
		}
	)
	.addAnswer(
		["🖊 Esperando respuesta..."],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		(ctx, { fallBack }) => {
			if (ctx.body !== "MENU" && ctx.body !== "REGISTRO") {
				return fallBack(
					"⚠ Porfavor, escriba la palabra correctamente."
				);
			}
		},
		[mainMenu.mainMenu, mainSignUp.mainSignUp]
	);

module.exports = {
	mainFlow,
};
