import { Button } from "./components/Button";

const myButton = new Button<string>({
  value: "Click Me",
  onClick: (value) => {
    console.log("Botón clicado con valor:", value);
  },
});

const appDiv = document.getElementById("app");
if (appDiv) {
  appDiv.innerHTML = myButton.render();

  // Agrega el manejador de eventos
  const buttonElement = appDiv.querySelector("button");
  if (buttonElement) {
    buttonElement.addEventListener("click", (event) =>
      myButton.handleClick(event)
    );
  }
}
