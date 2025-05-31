import iziToast from "izitoast";
// import "iziToast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

form.addEventListener("submit", (evt) => {
    evt.preventDefault();

    const delayInput = evt.currentTarget.elements.delay.value;
    const stateRadio = evt.currentTarget.elements.state.value;

    console.log("wwww");
    
    
    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {

            if(stateRadio === "fulfilled") {
                resolve(delayInput);

            }else{
                reject(delayInput);

            }
        }, delayInput);
    }) 
    
    
    promise
    .then(delay => iziToast.success({message:`✅ Fulfilled promise in ${delay}ms`, position: "topRight"}))
    .catch(delay => iziToast.error({message:`❌ Rejected promise in ${delay}ms`, position: "topRight"}));

    form.reset();
});

