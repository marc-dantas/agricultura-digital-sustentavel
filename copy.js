let copyAddr =  document.querySelector("#copyAddr");
let copyPhone = document.querySelector("#copyPhone");
let copyEmail = document.querySelector("#copyEmail");

let addr = copyAddr.getAttribute("value");
let phone = copyPhone.getAttribute("value");
let email = copyEmail.getAttribute("value");

function copy(text, elem) {
	navigator.clipboard.writeText(text);
	elem.innerText = "Copiado!";
}

copyAddr.addEventListener("click", (_)  => copy(addr, copyAddr));
copyPhone.addEventListener("click", (_) => copy(phone, copyPhone));
copyEmail.addEventListener("click", (_) => copy(email, copyEmail));
