const selected = document.querySelector('.custom-select__selected')
const options = document.querySelector('.custom-select__options')
const optionList = document.querySelectorAll('.custom-select__option')

selected.addEventListener('click', () => {
	options.classList.toggle('active')
})

optionList.forEach(option => {
	option.addEventListener('click', () => {
		selected.innerHTML = option.querySelector('span').innerText
		options.classList.remove("active")
	})
})