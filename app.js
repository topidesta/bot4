const {
	createBot,
	createProvider,
	createFlow,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require("@bot-whatsapp/portal");
const VenomProvider = require("@bot-whatsapp/provider/venom");
const MockAdapter = require("@bot-whatsapp/database/mock");

//Flows
const mainFlow = require("./flows/mainFlow.js");
const mainMenu = require("./flows/mainMenu.js");
const mainAssistant = require("./flows/mainAssistant.js");

const main = async () => {
	const adapterDB = new MockAdapter();
	const adapterFlow = createFlow([
		mainFlow.mainFlow,
		mainMenu.mainMenu,
		mainAssistant.mainAssistant,
	]);
	const adapterProvider = createProvider(VenomProvider);
	createBot({
		flow: adapterFlow,
		provider: adapterProvider,
		database: adapterDB,
	});

	QRPortalWeb();
};

main();
