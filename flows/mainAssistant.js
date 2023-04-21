const strapi = require("../strapi.js");
const functions = require("../functions.js");

const { addKeyword } = require("@bot-whatsapp/bot");

const exitMessage = {
	body: ["¡Muchas gracias!", "Tenga buen día 👋."].join("\n"),
};

//Keywords Regex
const regex = "^(ASESOR)$";

//Options Regex
const validatorRegex = "^(0|1)$";

const mainAssistant = addKeyword([regex], {
	sensitive: true,
})
	.addAnswer(
		[
			"📩 *¡Servicio de Atención al Cliente!*".toUpperCase(),
			"",
			"_Porfavor a continuación escriba *un* solo mensaje detallando su solicitud._",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		async (ctx, { provider }) => {
			await functions.contactAssistant(provider, ctx);
		}
	)
	.addAnswer(
		[
			"🛎️ *Solicitud Envíada* ¡Muchas gracias!",
			"Uno de nuestros asesores se *contactará* con usted lo más pronto posible para revisar su solicitud.",
		],
		{
			media:
				"https://lh3.googleusercontent.com/p/AF1QipN7Urqyg4Ad6jFpLw7V8-FLGwT0ggZGySIwDREy=s300",
			delay: functions.randomIntFromInterval(400, 600),
		}
	)
	.addAnswer(
		[
			"Porfavor, seleccione un *NÚMERO* para continuar.",
			"",
			"0️⃣. Regresar",
			"1️⃣. Salir",
		],
		{
			capture: true,
			delay: functions.randomIntFromInterval(400, 600),
		},
		(ctx, { fallBack, endFlow }) => {
			if (!ctx.body.match(validatorRegex)) {
				return fallBack(
					[
						"*⚠ Seleccione una opción correcta:*",
						"",
						"0️⃣. Regresar",
						"1️⃣. Salir",
					].join("\n")
				);
			} else if (ctx.body === "1") {
				return endFlow(exitMessage);
			}
		}
	);

module.exports = {
	mainAssistant,
};
