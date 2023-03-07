const qrcode = require("qrcode-terminal");
const {
  Client,
  LocalAuth,
  Buttons,
  Location,
  List,
} = require("whatsapp-web.js");

const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("ready", async () => {
  console.clear();
  console.log("Bot activo");
  client.sendMessage("573154968999@c.us", "Bot activado");
});

client.on("message", async (msg) => {
  const { from, body, hasMedia, type, selectedButtonId } = msg;
  const _type = type.toLowerCase();

  if (_type == "buttons_response") {
    console.log("selectedButtonId: ", selectedButtonId);
  }
  const numero = Math.floor(Math.random() * 100);
  if (msg.body === "2") {
    let button = new Buttons(
      "Esto es el api de Whatsapp",
      [
        { id: "1234", body: "Atender" },
        { id: "1234", body: "Rechazar" },
      ],
      "Dos opciones",
      "-------------------"
    );
    client.sendMessage(msg.from, button);
  } else if (msg.body.includes("Atender")) {
    msg.react("👍");
    client.sendMessage(msg.from, "...");
    function envio() {
      client.sendMessage(msg.from, `Has elegido el  ${msg.body}`);
    }
    setTimeout(envio, 3000);
  } else if (msg.body.includes("Rechazar")) {
    msg.react("👍");
    if (_type == "buttons_response") {
      console.log("selectedButtonId: ", selectedButtonId);
      var idBotton = selectedButtonId;
      client.sendMessage(msg.from, `Has elegido el ${idBotton}` );
    }
  } else if (msg.body === "!list") {
    let sections = [
      {
        title: "Secton title",
        rows: [
          { title: "ListItem1", description: "desc" },
          { title: "Try clicking me (id: test)", id: "test" },
        ],
      },
    ];
    let list = new List(
      "List body",
      "btnText",
      sections,
      "Custom title",
      "custom footer, google.com"
    );
    await client.sendMessage(msg.from, list);
  }

  console.log("Mensaje Enviado ✉️");
});

client.initialize();
