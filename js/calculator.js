/* ------------------- Step Forms -------------------- */
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".calculator__step");
const progressSteps = document.querySelectorAll(".calculator__progressbar-number");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		formStepsNum++;
		updateFormSteps();
		updateProgressbar();
	});
});

prevBtns.forEach((btn) => {
	btn.addEventListener("click", () => {
		formStepsNum--;
		updateFormSteps();
		updateProgressbar();
	});
});

function updateFormSteps() {
	formSteps.forEach((formStep) => {
		formStep.classList.contains("is-active") &&
			formStep.classList.remove("is-active");
	});

	formSteps[formStepsNum].classList.add("is-active");
};

function updateProgressbar() {
	progressSteps.forEach((progressStep, idx) => {
		if (idx < formStepsNum + 1) {
			progressStep.classList.add("is-active");
		} else {
			progressStep.classList.remove("is-active");
		}
	});

	const progressActive = document.querySelectorAll(".form-calc__progressbar-number.is-active");

	progress.style.width =
		((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
};

/* ------------------- Custom Select -------------------- */
// const selected = document.querySelector('.custom-select__selected')
// const options = document.querySelector('.custom-select__options')
// const optionList = document.querySelectorAll('.custom-select__option')

// selected.addEventListener('click', () => {
// 	options.classList.toggle('active')
// })

// optionList.forEach(option => {
// 	option.addEventListener('click', () => {
// 		selected.innerHTML = option.querySelector('span').innerText
// 		options.classList.remove("active")
// 	})
// });

// Custom JS
// 	function checkValidity() {
//   const selected = document.querySelector('input[name="category"]:checked + .radio__label');
  
//   if (selected.textContent === 'C' || selected.textContent === 'C++') {
//     const divToShow = document.querySelector('#trailer-wrap');
//     divToShow.style.display = 'block';
//   } else {
//     const divToShow = document.querySelector('#trailer-wrap');
//     divToShow.style.display = 'none';
//   }
// }