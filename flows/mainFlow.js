const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword, EVENTS } = require("@bot-whatsapp/bot");

const exitMessage = {
	body: ["¡Muchas gracias!", "Tenga buen día 👋."].join("\n"),
};

//Flows
const mainSignUp = require("./mainSignUp.js");
const mainMenu = require("./mainMenu.js");

//Main Flow
let word = "REGISTRO";
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
		async (ctx, { fallBack, flowDynamic, endFlow }) => {
			if (ctx.body !== "1" && ctx.body !== "2") {
				return fallBack(
					[
						"*⚠ Seleccione una Opción Correcta:*",
						"",
						"1️⃣. Sí",
						"2️⃣. No",
					].join("\n")
				);
			} else if (ctx.body === "2") {
				return endFlow(exitMessage);
			} else {
				customer = await strapi.getCustomerByPhone(ctx.from);
				if (customer !== null) {
					flowDynamic(customer);
					word = "MENU";
				} else {
					flowDynamic([
						{
							body: `Porfavor, escriba la palabra *${word}* para continuar.`,
						},
					]);
				}
			}
		}
	)
	.addAnswer(
		`_Esperando respuesta..._`,
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		(ctx, { fallBack }) => {
			if (ctx.body !== word) {
				return fallBack(
					`⚠ ¡Porfavor, escriba la palabra *${word}* correctamente!.`
				);
			} else {
				word = "REGISTRO";
			}
		},
		[mainSignUp.mainSignUp, mainMenu.mainMenu]
	);

module.exports = {
	mainFlow,
};
