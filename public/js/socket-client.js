const lblOn = document.querySelector("#lblOn");
const lblOff = document.querySelector("#lblOff");
const txtMsg = document.querySelector("#txtMsg");
const btnSend = document.querySelector("#btnSend");
const txtMsg2 = document.querySelector("#txtMsg2");
const btnSendCallback = document.querySelector("#btnSendCallback");
const socket = io();

socket.on("connect", () => {
  console.log("Server connected");
  lblOn.style.display = "";
  lblOff.style.display = "none";
});

socket.on("disconnect", () => {
  console.log("Server disconnected");
  lblOn.style.display = "none";
  lblOff.style.display = "";
});

socket.on("msgPayload", (payload) => {
  console.log(payload);
});

btnSend.addEventListener("click", () => {
  const payload = {
    msg: txtMsg.value,
    dateSended: new Date(),
  };
  socket.emit("msgPayload", payload);
});

socket.on("msgPayloadCallback", (payload) => {
  console.log(payload);
});

btnSendCallback.addEventListener("click", () => {
  const payload = {
    msg: txtMsg2.value,
    dateSended: new Date(),
  };
  socket.emit("msgPayloadCallback", payload, (event) => {
    console.log("This event is from server by callback", event);
  });
});
