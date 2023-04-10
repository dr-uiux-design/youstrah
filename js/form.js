var date = new Date();
var today = ('0' + date.getDate()).slice(-2) + '.' + ('0' + (date.getMonth() + 1)).slice(-2) + '.' + date.getFullYear();

let valueInputLength = null;
category = null;
trailer = null;
brand = null;
model = null;
year = null;
years = [];
power = null;
powers = [];
vehicleDocumentType = 'pts';
ownerless = false;
driversCount = null;
address = null;
tb = {
  ros: 1,
  alf: 1,
  ren: 1
};

function throttle(callback, limit) {
  var waiting = false;                      // Initially, we're not waiting
  return function () {                      // We return a throttled function
    if (!waiting) {                       // If we're not waiting
      callback.apply(this, arguments);  // Execute users function
      waiting = true;                   // Prevent future invocations
      setTimeout(function () {          // After a period of time
        waiting = false;              // And allow future invocations
      }, limit);
    }
  }
}

var insuranceDate = document.getElementById('insurance-date');
var categoryChange = document.querySelectorAll('.category-buttons input');
var categoryValue = document.getElementById('category-value');
var trailerWrap = document.getElementById('trailer-wrap');
var brandSelect = document.getElementById('brand-select');
var modelSelect = document.getElementById('model-select');
var brandcustom = document.getElementById('brand-custom');
var modelcustom = document.getElementById('model-custom');
var yearSelect = document.getElementById('year-select');
var yearOptions = document.getElementById('year-options');
var powerSelect = document.getElementById('power-select');
var powerOptions = document.getElementById('power-options');
var brandModelCustom = document.getElementById('brand-model-custom');
var brandCustomWrap = document.getElementById('brand-custom-wrap');
var modelCustomWrap = document.getElementById('model-custom-wrap');
var vehicleDocumentSeriaNumber = document.getElementById('vehicle-document-seria-number');
var vehicleDocumentSeria = document.getElementById('vehicle-document-seria');
var vehicleDocumentNumber = document.getElementById('vehicle-document-number');
var vehicleDocumentTypeSelect = document.getElementById('vehicle-document-type-select');
var vehicleDocumentDate = document.getElementById('vehicle-document-date');
var plate = document.getElementById('plate');
var plateless = document.getElementById('plateless');
var vinType = document.getElementById('vin-type');
var vinNumber = document.getElementById('vin-number');
var vinHint = document.getElementById('vin-hint');
var owner = document.getElementById('owner');
var ownerlessElement = document.getElementById('ownerless');
var insurantEmail = document.getElementById('insurant-email');
var insurantTelephone = document.getElementById('insurant-telephone');
var insurantSurname = document.getElementById('insurant-surname');
var insurantName = document.getElementById('insurant-name');
var insurantMidname = document.getElementById('insurant-midname');
var insurantBirthdate = document.getElementById('insurant-birthdate');
var insurantSeria = document.getElementById('insurant-seria');
var insurantNumber = document.getElementById('insurant-number');
var insurantIssuedate = document.getElementById('insurant-issuedate');
var insurantIssuer = document.getElementById('insurant-issuer');
var insurantAddressSelect = document.getElementById('insurant-address-select');
var ownerEmail = document.getElementById('owner-email');
var ownerTelephone = document.getElementById('owner-telephone');
var ownerSurname = document.getElementById('owner-surname');
var ownerName = document.getElementById('owner-name');
var ownerMidname = document.getElementById('owner-midname');
var ownerBirthdate = document.getElementById('owner-birthdate');
var ownerSeria = document.getElementById('owner-seria');
var ownerNumber = document.getElementById('owner-number');
var ownerIssuedate = document.getElementById('owner-issuedate');
var ownerIssuer = document.getElementById('owner-issuer');
var ownerAddressSelect = document.getElementById('owner-address-select');
var insurantAddressOptions = document.getElementById('insurant-address-options');
var ownerAddressOptions = document.getElementById('owner-address-options');
var driversCountChange = document.querySelectorAll('.drivers-count-buttons input');
var drivers = document.querySelector('.drivers');
var driverPrototype = document.querySelector('.driver-prototype');
var driver = document.querySelectorAll('.driver');
var addDriver = document.querySelector('.add-driver');
var deleteDriver = document.querySelectorAll('.delete-driver > div');
var result = document.querySelector('.result');
var driverSurnameInput = document.querySelector('.drivers .driver-surname');
var driverNameInput = document.querySelector('.drivers .driver-name');
var driverMidnameInput = document.querySelector('.drivers .driver-midname');
var driverBirthdateInput = document.querySelector('.drivers .driver-birthdate');
var driverExpdateInput = document.querySelector('.drivers .driver-expdate');
var driverLicenseSeriesInput = document.querySelector('.drivers .driver-license-series');
var driverLicenseNumberInput = document.querySelector('.drivers .driver-license-number');

insuranceDate.value = today;

var validations = [
  {
    el: categoryValue,
    validate: function (el) {
      return el.value !== '' ? [] : ['Категория автомобиля не выбрана'];
    }
  },
  {
    el: brandSelect,
    validate: function (el) {
      return el.value !== '' ? [] : ['Обязательное поле'];
    }
  },
  {
    el: modelSelect,
    // validate: function (el) {
    //   return el.value !== '' ? [] : ['Обязательное поле'];
    // }
    // validate: function (el) {
    //   if (brandSelect.value === 'other') {
    //     return [];
    //   }
    // }
    validate: function (el) {
      if (brandSelect.value === 'other') {
        return [];
      }
      else{        
        return el.value !== '' ? [] : ['Обязательное поле'];
      }
    }        
  },
  {
    el: brandcustom, //проверить новую марку авто 
    validate: function (el) {
      if (brandSelect.value === 'other') {
        return el.value !== '' ? [] : ['Обязательное поле'];
      }else{
        return [];
      }
    }    
  },  
  {
    el: modelcustom, //проверить новую марку авто modelcustom
    validate: function (el) {
      if ( brandSelect.value !== 'other' ) {
          //return [];        
          if(modelSelect.value == 'other'){
            return el.value !== '' ? [] : ['Обязательное поле'];
          }else{
            return [];
          }
      }else{
        
        return el.value !== '' ? [] : ['Обязательное поле'];
      }
    }    
  },   
  {
    el: yearSelect,
    validate: function (el) {
      return el.value !== '' ? [] : ['Обязательное поле'];
    }
  },
  {
    el: powerSelect,
    validate: function (el) {
      return el.value !== '' ? [] : ['Обязательное поле'];
    }
  },
  {
    el: vinNumber,
    validate: function (el) {
      if (vinType.value === 'vin') {
        var regex = /^[A-Z0-9а-я]{17}$/i;
        return el.value.match(regex) ? [] : ['VIN номер состоит всегда из 17 знаков, если у вас в документах их меньше, то скорее всего это номер кузова или шасси, выберите в списке соответствующее значение'];
      } else {
        return el.value !== '' ? [] : ['Обязательное поле'];
      }
    }
  },
  {
    el: vehicleDocumentSeria,
    validate: function (el) {
      if (vehicleDocumentType === 'sts' || vehicleDocumentType === 'pts') {
        var regex = /^[0-9]{2}[a-z0-9а-я]{2}$/gi;
        return el.value.match(regex) ? [] : ['Серия документа на ТС содержит 4 символа'];
      } else {
        return [];
      }
    }
  },
  {
    el: vehicleDocumentNumber,
    validate: function (el) {
      if (vehicleDocumentType === 'sts' || vehicleDocumentType === 'pts') {
        var regex = /^[0-9]{6}$/i;
        return el.value.match(regex) ? [] : ['Номер документа на ТС содержит 6 цифр'];
      } else {
        var regex = /^[0-9]{15}$/i;
        return el.value.match(regex) ? [] : ['Номер ЭПТС всегда состоит из 15 цифр'];
      }
    }
  },
  {
    el: vehicleDocumentDate,
    validate: function (el) {
      if (!el.value.match(/\d{2}\.\d{2}\.\d{4}/i)) {
        return ['Дата введена некорректно'];
      }

      var date = el.value.split('.')[2];
      return date >= year ? [] : ['Дата выдачи документа на ТС должна быть позже года выпуска авто'];
    }
  },
  {
    el: insurantEmail,
    validate: function (el) {
      var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      return el.value.match(regex) ? [] : ['Email введен некорректно'];
    }
  },
  {
    el: insurantTelephone,
    validate: function (el) {
      var regex = /^\+7[0-9]{10}$/i;
      return el.value.match(regex) ? [] : ['Телефон введен неверно'];
    }
  },
  {
    el: insurantSurname,
    validate: function (el) {
      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Фамилия введена неверно'];
    }
  },
  {
    el: insurantName,
    validate: function (el) {
      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Имя введено неверно'];
    }
  },
  {
    el: insurantMidname,
    validate: function (el) {
      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Отчество введено неверно'];
    }
  },
  {
    el: insurantBirthdate,
    validate: function (el) {
      if (!el.value.match(/\d{2}\.\d{2}\.\d{4}/i)) {
        return ['Дата введена некорректно'];
      }

      var dateString = el.value.split('.');
      var date = new Date(dateString[2], dateString[1] - 1, dateString[0]);
      var age = calculateDiff(date);
      return age >= 18 ? [] : ['Возраст должен быть 18 лет или старше'];
    }
  },
  {
    el: insurantSeria,
    validate: function (el) {
      return el.value.match(/^\d{4}$/i) ? [] : ['Серия паспорта содержит 4 цифры'];
    }
  },
  {
    el: insurantNumber,
    validate: function (el) {
      return el.value.match(/^\d{6}$/i) ? [] : ['Номер паспорта содержит 6 цифр'];
    }
  },
  {
    el: insurantIssuedate,
    validate: function (el) {
      return el.value.match(/\d{2}\.\d{2}\.\d{4}/i) ? [] : ['Дата введена некорректно'];
    }
  },
  {
    el: insurantIssuer,
    validate: function (el) {
      return el.value !== '' ? [] : ['Поле заполнено неверно'];
    }
  },
  {
    el: insurantAddressSelect,
    validate: function (el) {
      return el.value !== '' ? [] : ['Поле заполнено неверно'];
    }
  },
  // {
  //   el: ownerEmail,
  //   validate: function (el) {
  //     if (ownerless) return [];
  //     var regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  //     return el.value.match(regex) ? [] : ['Email введен некорректно'];
  //   }
  // },
  // {
  //   el: ownerTelephone,
  //   validate: function (el) {
  //     if (ownerless) return [];
  //     var regex = /^\+7[0-9]{10}$/i;
  //     return el.value.match(regex) ? [] : ['Телефон введен неверно'];
  //   }
  // },
  {
    el: ownerSurname,
    validate: function (el) {
      if (ownerless) return [];
      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Фамилия введена неверно'];
    }
  },
  {
    el: ownerName,
    validate: function (el) {
      if (ownerless) return [];
      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Имя введено неверно'];
    }
  },
  {
    el: ownerMidname,
    validate: function (el) {
      if (ownerless) return [];
      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Отчество введено неверно'];
    }
  },
  {
    el: ownerBirthdate,
    validate: function (el) {
      if (ownerless) return [];
      if (!el.value.match(/\d{2}\.\d{2}\.\d{4}/i)) {
        return ['Дата введена некорректно'];
      }

      var dateString = el.value.split('.');
      var date = new Date(dateString[2], dateString[1] - 1, dateString[0]);
      var age = calculateDiff(date);
      return age >= 18 ? [] : ['Возраст должен быть 18 лет или старше'];
    }
  },
  {
    el: ownerSeria,
    validate: function (el) {
      if (ownerless) return [];
      return el.value.match(/^\d{4}$/i) ? [] : ['Серия паспорта содержит 4 цифры'];
    }
  },
  {
    el: ownerNumber,
    validate: function (el) {
      if (ownerless) return [];
      return el.value.match(/^\d{6}$/i) ? [] : ['Номер паспорта содержит 6 цифр'];
    }
  },
  {
    el: ownerIssuedate,
    validate: function (el) {
      if (ownerless) return [];
      return el.value.match(/\d{2}\.\d{2}\.\d{4}/i) ? [] : ['Дата введена некорректно'];
    }
  },
  {
    el: ownerIssuer,
    validate: function (el) {
      if (ownerless) return [];
      return el.value !== '' ? [] : ['Поле заполнено неверно'];
    }
  },
  {
    el: ownerAddressSelect,
    validate: function (el) {
      if (ownerless) return [];
      return el.value !== '' ? [] : ['Поле заполнено неверно'];
    }
  },
  {
    el: null,
    validate: function (el) {
      return driversCount !== null ? [] : ['Выберите количество водителей']
    }
  },
  {
    el: driverSurnameInput,
    validate: function (el) {
      if (driversCount === 'unlimited') {
        return [];
      }

      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Фамилия введена неверно'];
    }
  },
  {
    el: driverNameInput,
    validate: function (el) {
      if (driversCount === 'unlimited') {
        return [];
      }

      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Имя введено неверно'];
    }
  },
  {
    el: driverMidnameInput,
    validate: function (el) {
      if (driversCount === 'unlimited') {
        return [];
      }

      return el.value.match(/^[а-я-]+$/ig) ? [] : ['Отчество введено неверно'];
    }
  },
  {
    el: driverBirthdateInput,
    validate: function (el) {
      if (driversCount === 'unlimited') {
        return [];
      }

      if (!el.value.match(/\d{2}\.\d{2}\.\d{4}/i)) {
        return ['Дата введена некорректно'];
      }

      var dateString = el.value.split('.');
      var date = new Date(dateString[2], dateString[1] - 1, dateString[0]);
      var age = calculateDiff(date);
      return age >= 18 ? [] : ['Возраст должен быть 18 лет или старше'];

    }
  },
  {
    el: driverExpdateInput,
    validate: function (el) {
      if (driversCount === 'unlimited') {
        return [];
      }

      if (!el.value.match(/\d{2}\.\d{2}\.\d{4}/i)) {
        return ['Дата введена некорректно'];
      }

      var dateString = el.value.split('.');
      var date = new Date(dateString[2], dateString[1] - 1, dateString[0]);
      var age = calculateDiff(date);

      if (date.getTime() > (new Date()).getTime()) {
        return ['Дата введена некорректно'];
      }

      var _dateString = el.parentElement.parentElement.querySelector('.driver-birthdate').value.split('.');
      var _date = new Date(_dateString[2], _dateString[1] - 1, _dateString[0]);
      var _age = calculateDiff(_date);

      return (_age - age) >= 18 ? [] : ['Водительское удостоверение может быть получено только в 18 лет'];
    }
  },
  {
    el: driverLicenseSeriesInput,
    validate: function (el) {
      if (driversCount === 'unlimited') {
        return [];
      }

      var regex = /^[0-9]{2}[a-z0-9а-я]{2}$/gi;
      return el.value.match(regex) ? [] : ['Серия ВУ содержит 4 символа'];
    }
  },
  {
    el: driverLicenseNumberInput,
    validate: function (el) {
      if (driversCount === 'unlimited') {
        return [];
      }

      var regex = /^[0-9]{6}$/i;
      return el.value.match(regex) ? [] : ['Номер ВУ содержит 6 символов'];
    }
  }
];

function validate(el, isCalculate = false, isInput = false) {
  var invalid = false;

  if (el === null) {

    validations.forEach(function (v) {
      if (isInput) {
        if (!el.classList.contains('is-invalid')) return;
      }
      if (v.el instanceof Node) {
        //console.log('5'+el);
        v.el.classList.remove('is-invalid');
        var feedback = v.el.parentNode.querySelector('.invalid-feedback');
        feedback && feedback.classList.remove('show');
        var errors = v.validate(v.el);

        if (errors.length > 0) {
          invalid = true;
          //console.log('4'+el);
          v.el.classList.add('is-invalid');
          if (feedback) {
            feedback.innerHTML = errors[0];
            feedback.classList.add('show');
          }
        }
      } else {
        var els = document.querySelectorAll(v.el);

        var errors = v.validate(v.el);
        //console.log('3'+el);

        els.forEach(function (el, i) {
          el.classList.remove('is-invalid');
          //console.log('1'+el);
          var feedback = el.parentNode.querySelector('.invalid-feedback');
          feedback && feedback.classList.remove('show');

          if (errors[i].length > 0) {
            invalid = true;
            //console.log('2'+el);
            el.classList.add('is-invalid');
            if (feedback) {
              feedback.innerHTML = errors[0];
              feedback.classList.add('show');
            }
          }
        });
      }
    });
  } else {
    if (isInput) {
      if (!el.classList.contains('is-invalid')) return;
    }
    var validation = validations.find(function (v) {
      return v.el === el;
    });

    el.classList.remove('is-invalid');
    var feedback = el.parentNode.querySelector('.invalid-feedback');
    feedback && feedback.classList.remove('show');
    var errors = validation && validation.validate(el);

    if (errors && errors.length > 0) {
      invalid = true;
      el.classList.add('is-invalid');
      if (feedback) {
        feedback.innerHTML = errors[0];
        feedback.classList.add('show');
      }
    }
  }

  if (invalid && isCalculate === true) {
    var element = document.querySelector('.is-invalid');
    var headerOffset = 10;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = 100;//elementPosition + window.pageYOffset + headerOffset;

    if ($(window).width() <= '995'){
        var w = -100;
    } else {
        var w = 0;
    }

    topq = $('#'+element.id).offset().top+w; //определим высоту от начала страницы до якоря
    $('body,html').animate({scrollTop: topq}, 1500);
    console.log(topq+'_'+w);



    // window.scrollTo({
    //   top: offsetPosition,
    //   behavior: "smooth"
    // });
  }

  return !invalid;
}


function requestKBM(el) {
  return new Promise(function (resolve, reject) {


    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/kbm.php');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("Authorization", "Basic Y5eIqH37l5Gztxt7ZRV7cCd8t_Gj023b");

    xhr.send(JSON.stringify({
      lastname: el.querySelector('.driver-surname').value,
      firstname: el.querySelector('.driver-name').value,
      middlename: el.querySelector('.driver-midname').value,
      birthday: el.querySelector('.driver-birthdate').value,
      driverDocSeries: el.querySelector('.driver-license-series').value,
      driverDocNumber: el.querySelector('.driver-license-number').value
      // date: el.querySelector('.driver-expdate').value
    }));

    //console.log(el.querySelector('.driver-surname').value);   


    xhr.onload = function () {

      if (xhr.status === 200) {
        //var response = JSON.parse(xhr.response);
        console.log(xhr.response);
        //if (response.status === 'success') {
        resolve(parseFloat(xhr.response));
        //}
      }
    }

    console.log('requestKBM');
  });
}

function focus(el) {
  el.style.marginTop = '-25px';
  el.style.marginLeft = '-5px';
  el.style.fontSize = '14px';
  el.style.padding = '0 4px';
  el.style.background = '#fff';
}

function blur(el) {
  el.style.marginTop = '0';
  el.style.marginLeft = '0';
  el.style.fontSize = '16px';
  el.style.padding = '0';
  if (el.classList.contains('disabled')) {
    el.style.background = 'transparent';
  } else {
    el.style.background = '#fff';
  }
}

document.querySelectorAll('.form-control, .form-select').forEach(function (el) {
  var label = el.parentElement.querySelector('.form-label');

  if (el.value !== '') {
    focus(label);
  }

  el.addEventListener('focus', function (e) {
    focus(label);
  });

  el.addEventListener('blur', function (e) {
    var label = el.parentElement.querySelector('.form-label');
    if (e.target.value !== '') return;
    blur(label);
  });
});

setTimeout(() => {
  document.querySelectorAll('.form-label').forEach(function (el) {
    const input = el.parentElement.querySelector('.form-control');
    if (input && input.value !== '') {
      focus(el);
    }

    el.addEventListener('click', function (e) {
      focus(e.target);
      e.target.parentElement.querySelector('.form-control').focus();
    });
  });
}, 1000);

categoryChange.forEach(function (el) {

  if (el.type === 'checkbox') {
    el.addEventListener('change', function (e) {
      trailer = e.target.checked;
    });
    return;
  }

  el.addEventListener('change', function (e) {
    category = e.target.value;

    categoryValue.value = e.target.value;
    validate(categoryValue);

    if (category === 'B') {
      trailer = false;
      document.getElementById('trailer').checked = false;
      trailerWrap.style.display = 'none';
    } else {
      trailerWrap.style.display = 'inline-flex';
    }

    brand = null;
    model = null;
    brandSelect.disabled = false;
    modelSelect.disabled = true;
    brandModelCustom.style.display = 'none';
    brandCustomWrap.style.display = 'none';
    modelCustomWrap.style.display = 'none';

    var xhr = new XMLHttpRequest();

    var categoryId = category === 'B' ? '2' : '3';

    xhr.open('GET', 'https://www.alfastrah.ru/ajax/calc_eosago_dictionaries.php?action=brands&categoryId=' + categoryId);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200) {

        brandSelect.innerHTML = '';

        var option = document.createElement('option');
        option.value = '';
        option.innerHTML = '';
        brandSelect.appendChild(option);

        var brands = JSON.parse(xhr.response).lookup;

        brands.forEach(function (brand) {
          var slug = brand.data;
          var name = brand.value;
          var option = document.createElement('option');
          option.value = slug;
          option.innerHTML = name;
          brandSelect.appendChild(option);
        });

        option = document.createElement('option');
        option.value = 'other';
        option.innerHTML = 'Другое ТС';
        brandSelect.appendChild(option);
      }
    }
  })
});

brandSelect.addEventListener('change', function (e) {

  validate(e.target);

  if (e.target.value === '') {
    return;
  }

  brand = e.target.value;
  localStorage.brand = brand;
  model = null;

  if (brand === 'other') {
    modelSelect.disabled = true;
    brandModelCustom.style.display = 'flex';
    brandCustomWrap.style.display = 'block';
    modelCustomWrap.style.display = 'block';
  } else {
    modelSelect.disabled = false;
    brandModelCustom.style.display = 'none';
    brandCustomWrap.style.display = 'none';
    modelCustomWrap.style.display = 'none';
  }

  var xhr = new XMLHttpRequest();

  var cat = category === 'B' ? 'B - легковые' : 'C - грузовые';

  xhr.open('GET', 'https://www.alfastrah.ru/ajax/calc_eosago_dictionaries.php?action=models&brand=' + brand + '&category=' + cat);
  xhr.send();

  xhr.onload = function () {
    if (xhr.status === 200) {

      modelSelect.innerHTML = '';

      var option = document.createElement('option');
      option.value = '';
      option.innerHTML = '';
      modelSelect.appendChild(option);

      var models = JSON.parse(xhr.response).lookup;
      years = models.map(function (m) {
        return {
          model: m.data,
          years: m.outYears
        }
      });

      models.forEach(function (model) {
        var slug = model.data;
        var name = model.value;
        var option = document.createElement('option');
        option.value = slug;
        option.innerHTML = name;
        modelSelect.appendChild(option);
      });

      option = document.createElement('option');
      option.value = 'other';
      option.innerHTML = 'Другая модель';
      modelSelect.appendChild(option);

    }
  }
});

function handleYearChange() {
  var label = yearSelect.parentElement.querySelector('.form-label');
  focus(label);

  yearOptions.style.display = 'none';
  powerOptions.style.display = 'none';
  powerSelect.value = '';

  var modelYears = years.find(function (y) {
    return y.model === model;
  }).years;

  var yearExists = modelYears.includes(year.toString());

  powers = [];

  if (yearExists) {
    var xhr = new XMLHttpRequest();

    var cat = category === 'B' ? 'B - легковые' : 'C - грузовые';
    xhr.open('GET', 'https://www.alfastrah.ru/ajax/calc_eosago_dictionaries.php?action=modifications&brand=' + brand + '&category=' + cat + '&model=' + model + '&year=' + year);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200) {

        powers = JSON.parse(xhr.response).lookup.map(function (p) {
          return {
            power: p.engCap,
            name: p.value
          }
        });

        powers.forEach(function (p) {
          var option = document.createElement('div');
          option.dataset.power = p.power;
          option.innerHTML = p.name;
          powerOptions.appendChild(option);
          option.addEventListener('click', function (e) {
            var label = powerSelect.parentElement.querySelector('.form-label');
            focus(label);

            power = e.target.dataset.power;
            localStorage.powerInput = power;
            powerSelect.value = power;
            powerOptions.style.display = 'none';
            validate(powerSelect);
          });
        });

        powerOptions.style.display = 'block';



      }
    }
  }
}

modelSelect.addEventListener('change', function (e) {

  validate(e.target);

  if (e.target.value === '') {
    return;
  }

  model = e.target.value;
  localStorage.model = model;
  yearSelect.value = '';
  powerSelect.value = '';
  yearOptions.style.display = 'none';
  powerOptions.style.display = 'none';

  if (model === 'other') {
    brandModelCustom.style.display = 'flex';
    brandCustomWrap.style.display = 'none';
    modelCustomWrap.style.display = 'block';
  } else {
    brandModelCustom.style.display = 'none';
    brandCustomWrap.style.display = 'none';
    modelCustomWrap.style.display = 'none';

    var modelYears = years.find(function (y) {
      return y.model === model;
    }).years;

    modelYears.forEach(function (y) {
      var option = document.createElement('div');
      option.dataset.year = y;
      option.innerHTML = y;
      yearOptions.appendChild(option);
      option.addEventListener('click', function (e) {
        year = e.target.dataset.year;
        yearSelect.value = year;
        validate(yearSelect);
        handleYearChange();
      });
    });

    yearOptions.style.display = 'block';
  }
});

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

yearSelect.addEventListener('click', function (e) {
  validate(e.target);

  var modelYears = years.find(function (y) {
    return y.model === model;
  });
  modelYears = modelYears && modelYears.years;
  if (modelYears) yearOptions.style.display = 'block';
});

yearSelect.addEventListener('change', function (e) {
  validate(e.target);
  year = e.target.value;
  handleYearChange();
});

powerSelect.addEventListener('click', function (e) {
  if (powers.length > 0) powerOptions.style.display = 'block';
});

powerSelect.addEventListener('change', function (e) {
  validate(e.target);
  power = e.target.value;
  localStorage.powerInput = power;
  yearOptions.style.display = 'none';
  powerOptions.style.display = 'none';
});

vehicleDocumentTypeSelect.addEventListener('change', function (e) {
  vehicleDocumentType = e.target.value;

  if (vehicleDocumentType === 'epts') {
    vehicleDocumentSeriaNumber.children[1].style.display = 'none';
    vehicleDocumentSeriaNumber.children[2].classList.remove('col-6');
    vehicleDocumentSeriaNumber.children[2].classList.add('col-8');
  } else {
    vehicleDocumentSeriaNumber.children[1].style.display = 'block';
    vehicleDocumentSeriaNumber.children[2].classList.remove('col-8');
    vehicleDocumentSeriaNumber.children[2].classList.add('col-6');
  }
});

plateless.addEventListener('change', function (e) {
  if (e.target.checked) {
    plate.disabled = true;
  } else {
    plate.disabled = false;
  }
});

vinType.addEventListener('change', function (e) {
  if (e.target.value === 'vin') {
    vinHint.style.display = 'block';
  } else {
    vinHint.style.display = 'none';
  }
});

vinNumber.addEventListener('change', function (e) {
  validate(e.target);
});

vinNumber.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

vehicleDocumentSeria.addEventListener('change', function (e) {
  validate(e.target);
});

vehicleDocumentSeria.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

vehicleDocumentNumber.addEventListener('change', function (e) {
  validate(e.target);
});

vehicleDocumentNumber.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

vehicleDocumentDate.addEventListener('change', function (e) {
  validate(e.target);
});

vehicleDocumentDate.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

insurantEmail.addEventListener('change', function (e) {
  validate(e.target);
});

insurantEmail.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

insurantTelephone.addEventListener('change', function (e) {
  validate(e.target);
});

insurantTelephone.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

insurantSurname.addEventListener('change', function (e) {
  validate(e.target);
});

insurantSurname.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

insurantName.addEventListener('change', function (e) {
  validate(e.target);
});

insurantName.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

insurantMidname.addEventListener('change', function (e) {
  validate(e.target);
});

insurantMidname.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

insurantBirthdate.addEventListener('change', function (e) {
  validate(e.target);
});

insurantBirthdate.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

insurantSeria.addEventListener('change', function (e) {
  validate(e.target);
});

insurantSeria.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

insurantNumber.addEventListener('change', function (e) {
  validate(e.target);
});

insurantNumber.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

insurantIssuedate.addEventListener('change', function (e) {
  validate(e.target);
});

insurantIssuedate.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

insurantIssuer.addEventListener('change', function (e) {
  validate(e.target);
});

insurantIssuer.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

ownerEmail.addEventListener('change', function (e) {
  validate(e.target);
});

ownerEmail.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

ownerTelephone.addEventListener('change', function (e) {
  validate(e.target);
});

ownerTelephone.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

ownerSurname.addEventListener('change', function (e) {
  validate(e.target);
});

ownerSurname.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

ownerName.addEventListener('change', function (e) {
  validate(e.target);
});

ownerName.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

ownerMidname.addEventListener('change', function (e) {
  validate(e.target);
});

ownerMidname.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

ownerBirthdate.addEventListener('change', function (e) {
  validate(e.target);
});

ownerBirthdate.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

ownerSeria.addEventListener('change', function (e) {
  validate(e.target);
});

ownerSeria.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

ownerNumber.addEventListener('change', function (e) {
  validate(e.target);
});

ownerNumber.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

ownerIssuedate.addEventListener('change', function (e) {
  validate(e.target);
});

ownerIssuedate.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

ownerIssuer.addEventListener('change', function (e) {
  validate(e.target);
});

ownerIssuer.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

ownerlessElement.addEventListener('change', function (e) {
  if (e.target.checked) {
    ownerless = true;
    owner.style.display = 'none';
    // $('#owner-surname').val('');
    // $('#owner-name').val('');
    // $('#owner-midname').val('');
    // $('#owner-birthdate').val('');
    // $('#owner-seria').val('');
    // $('#owner-number').val('');
    // $('#owner-issuedate').val('');
    // $('#owner-issuer').val('');
    // $('#owner-address-select').val('');
  } else {
    ownerless = false;
    owner.style.display = 'block';
  }
});

driverSurnameInput.addEventListener('change', function (e) {
  validate(e.target);
});

driverSurnameInput.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

driverNameInput.addEventListener('change', function (e) {
  validate(e.target);
});

driverNameInput.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

driverMidnameInput.addEventListener('change', function (e) {
  validate(e.target);
});

driverMidnameInput.addEventListener('input', function (e) {
  validate(e.target, false, true);
  e.target.value = capitalizeFirstLetter(e.target.value);
});

driverBirthdateInput.addEventListener('change', function (e) {
  validate(e.target);
});

driverBirthdateInput.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

driverExpdateInput.addEventListener('change', function (e) {
  validate(e.target);
});

driverExpdateInput.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

driverLicenseSeriesInput.addEventListener('change', function (e) {
  validate(e.target);
});

driverLicenseSeriesInput.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

driverLicenseNumberInput.addEventListener('change', function (e) {
  validate(e.target);
});

driverLicenseNumberInput.addEventListener('input', function (e) {
  validate(e.target, false, true);
});

function getAddresses(target, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address');
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader("Authorization", "Token a4ee7c6e6fb53a0295caa87461dd82ba14bfaa2f");//f3794cbc5dc3dde20fa49fe7b27e0c9f46588839 a4ee7c6e6fb53a0295caa87461dd82ba14bfaa2f e1fea6413e7344235f0ddeb748e6ec16b8151725
  xhr.send(JSON.stringify({ query: target.value }));

  xhr.onload = function () {
    if (xhr.status === 200) {
      var _addresses = JSON.parse(xhr.response).suggestions;
      callback(_addresses);
      //console.log(_addresses);
    }
  }
}

insurantAddressSelect.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    return;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    return;
  }
});

insurantAddressSelect.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activateNextElement('down', '#insurant-address-options');
    return;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    activateNextElement('up', '#insurant-address-options');
    return;
  }
  if (e.key === 'Enter') {
    const activeItem = document.querySelector('#insurant-address-options[style="display: block;"] ._active');
    if (activeItem) activeItem.click();
    return;
  }
  if (e.key === 'Escape') {
    hideDropdownList();
    return;
  }

  hideDropdownList();

  validate(e.target);

  if (e.target.value === '') {
    return;
  }

  getAddresses(e.target, function (_addresses) {
    if (_addresses.length > 0) {
      insurantAddressOptions.innerHTML = '';
      _addresses.forEach(function (a) {
        var option = document.createElement('div');
        option.dataset.region = a.data.region_fias_id;
        option.dataset.city = a.data.city_fias_id;
        option.innerHTML = a.value;
        insurantAddressOptions.appendChild(option);
        option.addEventListener('click', function (e) {
          address = {
            region: e.target.dataset.region,
            city: e.target.dataset.city
          };
          localStorage.insurantRegion = e.target.dataset.region;
          localStorage.insurantCity = e.target.dataset.city;
          insurantAddressSelect.value = a.unrestricted_value;//value
          hideDropdownList();
          validate(insurantAddressSelect);
        });
      });
      setTimeout(() => {
        $('#insurant-address-label').addClass('act');
        insurantAddressOptions.style.display = 'block';
      }, 500);
    }
  });

  function hideDropdownList() {
    insurantAddressOptions.style.display = 'none';
    $('#insurant-address-label').removeClass('act');
  }
});

ownerAddressSelect.addEventListener('keyup', function (e) {
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    activateNextElement('down', '#owner-address-options');
    return;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    activateNextElement('up', '#owner-address-options');
    return;
  }
  if (e.key === 'Enter') {
    const activeItem = document.querySelector('#owner-address-options[style="display: block;"] ._active');
    if (activeItem) activeItem.click();
    return;
  }
  if (e.key === 'Escape') {
    hideDropdownList();
    return;
  }

  hideDropdownList();

  validate(e.target);

  if (e.target.value === '') {
    return;
  }

  getAddresses(e.target, function (_addresses) {
    if (_addresses.length > 0) {
      ownerAddressOptions.innerHTML = '';
      _addresses.forEach(function (a) {
        var option = document.createElement('div');
        option.dataset.region = a.data.region_fias_id;
        option.dataset.city = a.data.city_fias_id;
        option.innerHTML = a.value;
        ownerAddressOptions.appendChild(option);
        option.addEventListener('click', function (e) {
          address = {
            region: e.target.dataset.region,
            city: e.target.dataset.city
          }
          localStorage.ownerRegion = e.target.dataset.region;
          localStorage.ownerCity = e.target.dataset.city;
          ownerAddressSelect.value = a.unrestricted_value;//value
          hideDropdownList();
          validate(ownerAddressSelect);

        });
      });
      $('#owner-address-label').addClass('act');
      ownerAddressOptions.style.display = 'block';
    }
  });

  function hideDropdownList() {
    ownerAddressOptions.style.display = 'none';
    $('#owner-address-label').removeClass('act');
  }
});

document.querySelectorAll('#insurant-telephone, #owner-telephone').forEach(function (el) {
  el.addEventListener('keyup', function (e) {
    var char = e.target.value;
    if (char.length === 1) {
      if (char === '7' || char === '8') {
        e.target.value = '+7';
      } else if (char === '9') {
        e.target.value = '+79';
      }
    } else if (char.length === 2 && char.charAt(0) === '+' && char.charAt(1) !== '7') {
      e.target.value = '+7';
    }
  });
});

function sanitizeTelephone(el) {
  var value = el.value;
  if (value.length === 2) {
    el.value = value + '.';
  } else if (value.length === 5) {
    el.value = value + '.';
  } else if (value.length > 10) { //!value.slice(-1).match(/^\d{1}$/i) ||
    el.value = value.slice(0, -1);
  }
}

document.querySelectorAll('#insurance-date, #vehicle-document-date, #insurant-birthdate, #insurant-issuedate, #owner-birthdate, #owner-issuedate, .driver-birthdate, .driver-expdate').forEach(function (el) {
  el.addEventListener('keydown', function (e) {
    valueInputLength = e.target.value.length;
  });
  el.addEventListener('keyup', function (e) {
    if (valueInputLength > e.target.value.length) return;
    sanitizeTelephone(e.target);
  });
});

driversCountChange.forEach(function (el) {
  el.addEventListener('change', function (e) {
    driversCount = e.target.value;

    if (driversCount === 'unlimited') {
      drivers.classList.remove('show');
      addDriver.style.display = 'none';
    } else {
      drivers.classList.add('show');
      addDriver.style.display = 'block';
    }
  });
});

function copyInsurantToDriver(driver) {
  driver.querySelector('.driver-surname').value = document.getElementById('insurant-surname').value;
  if (document.getElementById('insurant-surname').value !== '') {
    var label = driver.querySelector('.driver-surname').parentElement.querySelector('.form-label');
    focus(label);
  }
  driver.querySelector('.driver-name').value = document.getElementById('insurant-name').value;
  if (document.getElementById('insurant-name').value !== '') {
    var label = driver.querySelector('.driver-name').parentElement.querySelector('.form-label');
    focus(label);
  }
  driver.querySelector('.driver-midname').value = document.getElementById('insurant-midname').value;
  if (document.getElementById('insurant-midname').value !== '') {
    var label = driver.querySelector('.driver-midname').parentElement.querySelector('.form-label');
    focus(label);
  }
  driver.querySelector('.driver-birthdate').value = document.getElementById('insurant-birthdate').value;
  if (document.getElementById('insurant-birthdate').value !== '') {
    var label = driver.querySelector('.driver-birthdate').parentElement.querySelector('.form-label');
    focus(label);
  }

  return driver;
}

function copyOwnerToDriver(driver) {
  if (ownerless) {
    return copyInsurantToDriver(driver);
  }

  driver.querySelector('.driver-surname').value = document.getElementById('owner-surname').value;
  if (document.getElementById('owner-surname').value !== '') {
    var label = driver.querySelector('.driver-surname').parentElement.querySelector('.form-label');
    focus(label);
  }
  driver.querySelector('.driver-name').value = document.getElementById('owner-name').value;
  if (document.getElementById('owner-name').value !== '') {
    var label = driver.querySelector('.driver-name').parentElement.querySelector('.form-label');
    focus(label);
  }
  driver.querySelector('.driver-midname').value = document.getElementById('owner-midname').value;
  if (document.getElementById('owner-midname').value !== '') {
    var label = driver.querySelector('.driver-midname').parentElement.querySelector('.form-label');
    focus(label);
  }
  driver.querySelector('.driver-birthdate').value = document.getElementById('owner-birthdate').value;
  if (document.getElementById('owner-birthdate').value !== '') {
    var label = driver.querySelector('.driver-birthdate').parentElement.querySelector('.form-label');
    focus(label);
  }

  return driver;
}

driverPrototype.querySelector('.copy-insurant > div').addEventListener('click', function (e) {
  copyInsurantToDriver(driverPrototype);
});

driverPrototype.querySelector('.copy-owner > div').addEventListener('click', function (e) {
  copyOwnerToDriver(driverPrototype);
});

addDriver.children[0].addEventListener('click', function (e) {
  var driversCount = drivers.children.length;

  if (driversCount >= 4) {
    return;
  }

  if (driversCount >= 3) {
    addDriver.children[0].classList.remove('btn-primary');
    addDriver.children[0].classList.add('btn-default');
    addDriver.style.display = 'none';
  }

  var newDriver = driverPrototype.cloneNode(true);
  newDriver.dataset.index = drivers.children.length;
  newDriver.querySelector('.driver-title').innerHTML = 'Водитель ' + (parseInt(drivers.children.length) + 1);
  newDriver.querySelectorAll('input').forEach(function (el) {
    el.value = '';

    var label = el.parentElement.querySelector('.form-label');

    if (el.value !== '') {
      focus(label);
    }

    el.addEventListener('focus', function (e) {
      focus(label);
    });

    el.addEventListener('blur', function (e) {
      var label = el.parentElement.querySelector('.form-label');
      if (e.target.value !== '') return;
      blur(label);
    });

    el.addEventListener('keydown', function (e) {
      valueInputLength = e.target.value.length;
    });
    el.addEventListener('keyup', function (e) {
      if (e.target.classList.contains('driver-birthdate') || e.target.classList.contains('driver-expdate')) {
        if (valueInputLength > e.target.value.length) return;
        sanitizeTelephone(e.target);
      }
    });
  });
  var driverSurnameInput = newDriver.querySelector('.driver-surname');
  var driverNameInput = newDriver.querySelector('.driver-name');
  var driverMidnameInput = newDriver.querySelector('.driver-midname');
  var driverBirthdateInput = newDriver.querySelector('.driver-birthdate');
  var driverExpdateInput = newDriver.querySelector('.driver-expdate');
  var driverLicenseSeriesInput = newDriver.querySelector('.driver-license-series');
  var driverLicenseNumberInput = newDriver.querySelector('.driver-license-number');
  validations.push(
    {
      el: driverSurnameInput,
      validate: function (el) {
        if (driversCount === 'unlimited') {
          return [];
        }

        return el.value.match(/^[а-я-]+$/ig) ? [] : ['Фамилия введена неверно'];
      }
    },
    {
      el: driverNameInput,
      validate: function (el) {
        if (driversCount === 'unlimited') {
          return [];
        }

        return el.value.match(/^[а-я-]+$/ig) ? [] : ['Имя введено неверно'];
      }
    },
    {
      el: driverMidnameInput,
      validate: function (el) {
        if (driversCount === 'unlimited') {
          return [];
        }

        return el.value.match(/^[а-я-]+$/ig) ? [] : ['Отчество введено неверно'];
      }
    },
    {
      el: driverBirthdateInput,
      validate: function (el) {
        if (driversCount === 'unlimited') {
          return [];
        }

        if (!el.value.match(/\d{2}\.\d{2}\.\d{4}/i)) {
          return ['Дата введена некорректно'];
        }

        var dateString = el.value.split('.');
        var date = new Date(dateString[2], dateString[1] - 1, dateString[0]);
        var age = calculateDiff(date);
        return age >= 18 ? [] : ['Возраст должен быть 18 лет или старше'];

      }
    },
    {
      el: driverExpdateInput,
      validate: function (el) {
        if (driversCount === 'unlimited') {
          return [];
        }

        if (!el.value.match(/\d{2}\.\d{2}\.\d{4}/i)) {
          return ['Дата введена некорректно'];
        }

        var dateString = el.value.split('.');
        var date = new Date(dateString[2], dateString[1] - 1, dateString[0]);
        var age = calculateDiff(date);

        if (date.getTime() > (new Date()).getTime()) {
          return ['Дата введена некорректно'];
        }

        var _dateString = el.parentElement.parentElement.querySelector('.driver-birthdate').value.split('.');
        var _date = new Date(_dateString[2], _dateString[1] - 1, _dateString[0]);
        var _age = calculateDiff(_date);

        return (_age - age) >= 18 ? [] : ['Водительское удостоверение может быть получено только в 18 лет'];
      }
    },
    {
      el: driverLicenseSeriesInput,
      validate: function (el) {
        if (driversCount === 'unlimited') {
          return [];
        }

        var regex = /^[0-9]{2}[a-z0-9а-я]{2}$/gi;
        return el.value.match(regex) ? [] : ['Серия ВУ содержит 4 символа'];
      }
    },
    {
      el: driverLicenseNumberInput,
      validate: function (el) {
        if (driversCount === 'unlimited') {
          return [];
        }

        var regex = /^[0-9]{6}$/i;
        return el.value.match(regex) ? [] : ['Номер ВУ содержит 6 символов'];
      }
    }
  );

  driverSurnameInput.addEventListener('change', function (e) {
    validate(e.target);
  });

  driverSurnameInput.addEventListener('input', function (e) {
    validate(e.target, false, true);
    e.target.value = capitalizeFirstLetter(e.target.value);
  });

  driverNameInput.addEventListener('change', function (e) {
    validate(e.target);
  });

  driverNameInput.addEventListener('input', function (e) {
    validate(e.target, false, true);
    e.target.value = capitalizeFirstLetter(e.target.value);
  });

  driverMidnameInput.addEventListener('change', function (e) {
    validate(e.target);
  });

  driverMidnameInput.addEventListener('input', function (e) {
    validate(e.target, false, true);
    e.target.value = capitalizeFirstLetter(e.target.value);
  });

  driverBirthdateInput.addEventListener('change', function (e) {
    validate(e.target);
  });

  driverBirthdateInput.addEventListener('input', function (e) {
    validate(e.target, false, true);
  });

  driverExpdateInput.addEventListener('change', function (e) {
    validate(e.target);
  });

  driverExpdateInput.addEventListener('input', function (e) {
    validate(e.target, false, true);
  });

  driverLicenseSeriesInput.addEventListener('change', function (e) {
    validate(e.target);
  });

  driverLicenseSeriesInput.addEventListener('input', function (e) {
    validate(e.target, false, true);
  });

  driverLicenseNumberInput.addEventListener('change', function (e) {
    validate(e.target);
  });

  driverLicenseNumberInput.addEventListener('input', function (e) {
    validate(e.target, false, true);
  });

  var copyInsurant = newDriver.querySelector('.copy-insurant > div');
  var copyOwner = newDriver.querySelector('.copy-owner > div');
  var deleteDriver = newDriver.querySelector('.delete-driver > div');
  deleteDriver.style.display = 'block';
  deleteDriver.classList.remove('btn-default');
  deleteDriver.classList.add('btn-danger');

  drivers.appendChild(newDriver);

  newDriver.querySelectorAll('.form-label').forEach(function (el) {
    el.addEventListener('click', function (e) {
      focus(e.target);
      e.target.parentElement.querySelector('.form-control').focus();
    });
  });

  copyInsurant.addEventListener('click', function (e) {
    copyInsurantToDriver(newDriver);
  });

  copyOwner.addEventListener('click', function (e) {
    copyOwnerToDriver(newDriver);
  });

  deleteDriver.addEventListener('click', function (e) {
    var driversCount = drivers.children.length;

    if (driversCount <= 4) {
      addDriver.children[0].classList.add('btn-primary');
      addDriver.children[0].classList.remove('btn-default');
      addDriver.style.display = 'block';
    }

    newDriver.remove();

    drivers.querySelectorAll('.driver').forEach(function (el, i) {
      el.querySelector('.driver-title').innerHTML = 'Водитель ' + (i + 1);
    });
  });
});

function calculateDiff(birthday) { // birthday is a date
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}


function calculate() {

  return new Promise(function (resolve, reject, kt) {
    var kt;
    var dkvs;
    var kbm;
    var kvs;
    var kp = 1;
    var ko = 1;
    var ks = 1;
    var km;
    var responses = 0;



    function createXhrRequest(httpMethod, url, callback, pmr, dopparam, dopdwa) {
      if ((localStorage.ownerRegion || localStorage.ownerCity) && !ownerlessElement.checked) {
        address = {
          region: localStorage.ownerRegion,
          city: localStorage.ownerCity
        };
      } else if ((localStorage.insurantRegion || localStorage.insurantCity) && ownerlessElement.checked) {
        address = {
          region: localStorage.insurantRegion,
          city: localStorage.insurantCity
        };
      }
      var xhr = new XMLHttpRequest();
      xhr.open(httpMethod, url, false);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.setRequestHeader("Authorization", "Basic Y5eIqH37l5Gztxt7ZRV7cCd8t_Gj023b");
      xhr.onload = function () {
        if (xhr.status === 200) {
          var xr = JSON.parse(xhr.response);
          callback(null, xr);
        }
      };
      xhr.onerror = function () {
        callback(xhr.response);
      };
      xhr.send(JSON.stringify({
        region: address.region,
        city: address.city,
        param: pmr,
        dop: dopparam,
        exp: dopdwa,
      }));
    }

    createXhrRequest('POST', '/getkt.php', function (err, response) {
      //resolve(response);
      kt = response.kt;
      km = response.km;

      kbm = response.kbm;
      kvs = response.kvs;
      ko = response.ko;

      tb.ros = response.ros;
      tb.alf = response.alf;
      tb.ren = response.ren;

      console.log('response_getKT:' + response.kt);
      //console.log('response_exp:'+response.exp);
      return response.kt;

    }, 'kt1', 111, category + '.' + power + '.' + driversCount);



    if (driversCount === 'unlimited') {

      resolve({
        ros: tb.ros,
        alf: tb.alf,
        ren: tb.ren,
        kt: kt,
        kbm: kbm,
        kvs: kvs,
        kp: kp,
        ko: ko,
        ks: ks,
        km: km
      });
    } else {
      var kvses = [];
      var kbmKvs = 0;
      document.querySelectorAll('.drivers .driver').forEach(function (el, i) {

        var dateString = document.querySelector('.drivers .driver[data-index="' + i + '"] .driver-birthdate').value.split('.');
        var date = (new Date(dateString[2], dateString[1] - 1, dateString[0]));
        var age = calculateDiff(date);

        dateString = el.querySelector('.driver-expdate').value.split('.');
        date = (new Date(dateString[2], dateString[1] - 1, dateString[0]));
        var exp = calculateDiff(date);

        console.log('exp:' + exp);
        console.log('dateString:' + dateString);

        createXhrRequest('POST', '/getkt.php', function (err, response) {
          //resolve(response);
          kt = response.kt;
          dkvs = response.exp;
          console.log('response_getKT:' + response.kt);
          console.log('response_exp:' + response.exp);
          return response.kt && response.exp;

        }, 'kt', age, exp);


        kvses[i] = dkvs;

        //kvses[i] = _kvs;

        console.log('kvses[i]:' + kvses[i]);

        requestKBM(el).then(function (_kbm) {
          responses++;
          var _kbmKvs = kvses[i] * _kbm;
          if (_kbmKvs > kbmKvs) {
            kbmKvs = _kbmKvs;
            kbm = _kbm;
            kvs = kvses[i];
          }

          el.dataset.kvs = kvses[i];
          el.dataset.kbm = _kbm;

          if (responses === document.querySelectorAll('.drivers .driver').length) {
            resolve({
              ros: tb.ros,
              alf: tb.alf,
              ren: tb.ren,
              kt: kt,
              kbm: kbm,
              kvs: kvs,
              kp: kp,
              ko: ko,
              ks: ks,
              km: km
            });
          }
        })
      });
    }

  });
}

function getData(c = null) {
  return {
    insuranceDate: insuranceDate.value,
    category: category,
    trailer: trailer,
    brand: brandSelect.options[brandSelect.selectedIndex].text,
    model: modelSelect.options[modelSelect.selectedIndex].text,
    year: yearSelect.value,
    modelcustom: modelcustom.value,
    brandcustom: brandcustom.value,
    power: powerSelect.value,
    plate: plate.value,
    plateless: plateless.checked,
    vinType: vinType.value,
    vinNumber: vinNumber.value,
    vehicleDocumentType: vehicleDocumentTypeSelect.value,
    vehicleDocumentSeria: vehicleDocumentSeria.value,
    vehicleDocumentNumber: vehicleDocumentNumber.value,
    vehicleDocumentDate: vehicleDocumentDate.value,
    insurantEmail: insurantEmail.value,
    insurantTelephone: insurantTelephone.value,
    insurantSurname: insurantSurname.value,
    insurantName: insurantName.value,
    insurantMidname: insurantMidname.value,
    insurantBirthdate: insurantBirthdate.value,
    insurantSeria: insurantSeria.value,
    insurantNumber: insurantNumber.value,
    insurantIssuedate: insurantIssuedate.value,
    insurantIssuer: insurantIssuer.value,
    insurantAddress: insurantAddressSelect.value,
    ownerEmail: ownerEmail.value,
    ownerTelephone: ownerTelephone.value,
    ownerSurname: ownerSurname.value,
    ownerName: ownerName.value,
    ownerMidname: ownerMidname.value,
    ownerBirthdate: ownerBirthdate.value,
    ownerSeria: ownerSeria.value,
    ownerNumber: ownerNumber.value,
    ownerIssuedate: ownerIssuedate.value,
    ownerIssuer: ownerIssuer.value,
    ownerAddress: ownerAddressSelect.value,
    ownerless: ownerlessElement.checked,
    driversCount: driversCount,
    drivers: Array.from(document.querySelectorAll('.driver')).map(function (d) {
      return {
        kvs: d.dataset.kvs,
        kbm: d.dataset.kbm,
        surname: d.querySelector('.driver-surname').value,
        name: d.querySelector('.driver-name').value,
        midname: d.querySelector('.driver-midname').value,
        birthdate: d.querySelector('.driver-birthdate').value,
        expdate: d.querySelector('.driver-expdate').value,
        licenseSeries: d.querySelector('.driver-license-series').value,
        licenseNumber: d.querySelector('.driver-license-number').value
      };
    }),
    company: c,
    result: {
      tbs: tb,
      kt: document.querySelector('.result-kt').textContent,
      kbm: document.querySelector('.result-kbm').textContent,
      kvs: document.querySelector('.result-kvs').textContent,
      kp: document.querySelector('.result-kp').textContent,
      ko: document.querySelector('.result-ko').textContent,
      ks: document.querySelector('.result-ks').textContent,
      km: document.querySelector('.result-km').textContent,
      result: c ? document.querySelector('.result-' + c).textContent : 0,
      allResults: {
        ros: document.querySelector('.result-ros').textContent,
        alf: document.querySelector('.result-alf').textContent,
        ren: document.querySelector('.result-ren').textContent
      }
    }
  };
}

document.querySelector('.calculate').addEventListener('click', function (e) {
  if (result.classList.contains('_show')) {
    result.classList.remove('_show');
    hideSearchResults();
  }
  if (!validate(null, true)) return;
  document.querySelector('.calculating').classList.add('show');

  // e.target.innerHTML = '\
  //   <div class="spinner-border spinner-border-sm text-light" role="status">\
  //     <span class="visually-hidden">Рассчитываем...</span>\
  //   </div>\
  //   Рассчитываем\
  // ';

  calculate()
    .then(function (data) {
      document.querySelector('.result-kt').innerHTML = data.kt;
      document.querySelector('.result-kbm').innerHTML = data.kbm;
      document.querySelector('.result-kvs').innerHTML = data.kvs;
      document.querySelector('.result-kp').innerHTML = data.kp;
      document.querySelector('.result-ko').innerHTML = data.ko;
      document.querySelector('.result-ks').innerHTML = data.ks;
      document.querySelector('.result-km').innerHTML = data.km;

      if (data.kbm == '1.16' || data.kbm == '1.165' || data.kbm == '1.169') {
        $('#kbmid').hide();
      } else {
        $('#kbmid').show();
      }

      console.log(data.kbm);


      function createXhrRequest(httpMethod, url, callback, pmr, dopparam, dopdwa) {
        var xhr = new XMLHttpRequest();
        xhr.open(httpMethod, url, false);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Authorization", "Basic Y5eIqH37l5Gztxt7ZRV7cCd8t_Gj023b");
        xhr.onload = function () {
          if (xhr.status === 200) {
            var xr = JSON.parse(xhr.response);
            callback(null, xr);
          }
        };
        xhr.onerror = function () {
          callback(xhr.response);
        };
        xhr.send(JSON.stringify({
          region: address.region,
          city: address.city,
          param: pmr,
          dop: dopparam,
          exp: dopdwa,
        }));
      }

      function sayHi() {
        //alert('Привет');
      }

      setTimeout(sayHi, 1000);

      var ros;
      var alf;
      var ren;

      createXhrRequest('POST', '/getkt.php', function (err, response) {
        //resolve(response);
        // var ros = response.ros.toFixed(2);
        // var alf = response.alf.toFixed(2);
        // var ren = response.ren.toFixed(2);

        // document.querySelector('.result-ros').innerHTML = Number(ros).toLocaleString();
        // document.querySelector('.result-alf').innerHTML = Number(alf).toLocaleString();
        // document.querySelector('.result-ren').innerHTML = Number(ren).toLocaleString();

        var ros = response.ros;
        var alf = response.alf;
        var ren = response.ren;

        document.querySelector('.result-ros').innerHTML = ros;
        document.querySelector('.result-alf').innerHTML = alf;
        document.querySelector('.result-ren').innerHTML = ren;

        //return response.ros;

      }, 'kt2', 112, data.ros + '#' + data.alf + '#' + data.ren + '#' + data.kt + '#' + data.kbm + '#' + data.kvs + '#' + data.kp + '#' + data.ko + '#' + data.ks + '#' + data.km);

      result.classList.add('_show');


      var insurant_address = $("input[name='insurant_address']").val();
      var insurant_email = $("input[name='insurant_email']").val();
      var owner_address = $("input[name='owner_address']").val();

      //console.log(insurant_address+'#'+insurant_email);

      setTimeout(showAnimatedSearchResults, 1000);

      jQuery.ajax({
        type: "POST",
        url: "blockip.php",
        data: {
          'email': insurant_email, 'address_s': insurant_address, 'address_strah': owner_address,
        },
        async: false,
        success: function (son) {
          //console.log(emailAddress);
          document.getElementById('brez').innerHTML = son;
          bl = $('#brez').find('input[name="brez"]').val();
          //console.log('bl:'+bl);
          if (bl == 'block') {
            //отказать пользователю
            //$('.strah-wrap-info').html('Предложения от страховой компании не поступило');
            //$('#alf').hide();
            //company__button 


            $('.company__button').html('Отказ <div class="company__preloader js-preloader"></div>');
            $('.company__button').removeClass('company__button_success');
            $('.company__button').addClass('company__button_rejected');
            $('.company__price, .company__payment, #subtitle-rejected').hide();
          } else {
            $('#subtitle-rejected').show();
            $('.company__price, .company__payment').removeAttr('style');
            $('#alf .company__button, #ros .company__button, #ren .company__button').html('Купить <div class="company__preloader js-preloader"></div>');
            $('#alf .company__button, #ros .company__button, #ren .company__button').addClass('company__button_success');
            $('#alf .company__button, #ros .company__button, #ren .company__button').removeClass('company__button_rejected');
          }
        }
      });

      // e.target.innerHTML = 'Рассчитать';
      document.querySelector('.calculating').classList.remove('show');

      var xhr = new XMLHttpRequest();
      xhr.open('POST', '/mail.php');
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(getData()));

      xhr.onload = function () {
        if (xhr.status === 200) {
          var response = JSON.parse(xhr.response);
          if (response.status === 'success') {
            ym(92246354, 'reachGoal', 'rass');
            //console.log('ok');
          }
        }
      }
    })
    .catch(function (e) {
      console.log(e);
    });
});

function showAnimatedSearchResults() {
  const progressLine = document.querySelector('#progress-line');
  const ren = document.querySelector('#ren');
  const alf = document.querySelector('#alf');
  const ros = document.querySelector('#ros');
  const allCompany = document.querySelectorAll('.company');
  const progressBar = document.querySelector('.progress-bar');
  const subtitleRejected = document.querySelector('#subtitle-rejected');
  const resultCalc = document.querySelector('.js-result-calc');

  progressLine.classList.add('_active');

  const titlePosition = document.querySelector('#title-result').getBoundingClientRect().top;
  const offsetPosition = titlePosition + window.pageYOffset - 20;
  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });

  setTimeout(() => {
    resultCalc.classList.remove('_hide');
    ren.classList.add('_success');
  }, 10000);

  setTimeout(() => {
    ros.classList.add('_success');
  }, 16000);

  setTimeout(() => {
    alf.classList.add('_success');
  }, 21000);

  setTimeout(() => {
    subtitleRejected.classList.remove('_hide');
    for (const company of allCompany) {
      if (company.classList.contains('_success')) continue;
      company.classList.add('_rejected');
    }
    progressBar.classList.add('_hide');
    const resultCalcPosition = resultCalc.getBoundingClientRect().top;
    const offsetPosition = resultCalcPosition + window.pageYOffset - 20;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });
  }, 25000);
}

function hideSearchResults() {
  const progressLine = document.querySelector('#progress-line');
  const ren = document.querySelector('#ren');
  const alf = document.querySelector('#alf');
  const ros = document.querySelector('#ros');
  const allCompany = document.querySelectorAll('.company');
  const progressBar = document.querySelector('.progress-bar');
  const subtitleRejected = document.querySelector('#subtitle-rejected');
  const resultCalc = document.querySelector('.js-result-calc');

  progressLine.classList.remove('_active');
  resultCalc.classList.add('_hide');
  ren.classList.remove('_success');
  ros.classList.remove('_success');
  alf.classList.remove('_success');
  subtitleRejected.classList.add('_hide');
  for (const company of allCompany) {
    if (company.classList.contains('_success')) continue;
    company.classList.remove('_rejected');
  }
  progressBar.classList.remove('_hide');
}

document.querySelectorAll('.company button').forEach(function (el) {
  el.addEventListener('click', function (e) {
    // Записываем данные о водителях в localStorage
    const driversAll = document.querySelectorAll('.driver-prototype');
    const driversLimit = document.querySelector('[name="drivers_limit"]');
    if (driversLimit.checked) {
      const driversInfo = [];
      for (let i = 0; i < driversAll.length; i++) {
        driversInfo.push(new Object());
        driversInfo[i].surname = driversAll[i].querySelector('.driver-surname').value;
        driversInfo[i].name = driversAll[i].querySelector('.driver-name').value;
        driversInfo[i].midname = driversAll[i].querySelector('.driver-midname').value;
        driversInfo[i].birthdate = driversAll[i].querySelector('.driver-birthdate').value;
        driversInfo[i].expdate = driversAll[i].querySelector('.driver-expdate').value;
        driversInfo[i].licenseSeries = driversAll[i].querySelector('.driver-license-series').value;
        driversInfo[i].licenseNumber = driversAll[i].querySelector('.driver-license-number').value;
      }
      localStorage.driversInfo = JSON.stringify(driversInfo);
    }
    localStorage.returnFromPayment = 'true';
    // Записываем Email и стоимость в localStorage
    const email = $("input[name='insurant_email']").val();
    const price = e.target.closest('.company').querySelector('.company__price span').textContent.replace(/\s/g, '').replace(/,/g, '.');
    localStorage.insurantPriceValue = price;
    localStorage.insurantEmailValue = email;

    var c = e.target.dataset.c;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/mail.php');
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(getData(c)));

    xhr.onload = function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.response);
        if (response.status === 'success') {
          ym(92246354, 'reachGoal', 'oplata');
          //alert('Заявка отправлена.');
          console.log(response.pay_url);
          location.href = response.pay_url;
          //window.open(response.pay_url, '_blank');
        }
      }
    }
  });
});


/**
 * Функция выбирает следующий пункт списка при нажатии стрелки вниз или вверх
 * @param {String} arrow - если 'up' - нажата стрелка вверх, 'down' - нажата стрелка вниз
 */
function activateNextElement(arrow, dropListSelector) {
  const dropdownList = document.querySelector(dropListSelector + '[style="display: block;"]');
  if (!dropdownList) return;
  const items = dropdownList.querySelectorAll('div');
  if (!items) return;
  const activeItem = document.querySelector(dropListSelector + ' ._active');
  // Если никакой пункт ещё не выбран
  if (!activeItem && arrow === 'down') {
    items[0].classList.add('_active');
    return;
  } else if (!activeItem && arrow === 'up') {
    items[items.length - 1].classList.add('_active');
    return;
  }
  // Если какой-то пункт уже выбран
  for (let i = 0; i < items.length; i++) {
    if (items[i].classList.contains('_active')) {
      items[i].classList.remove('_active');
      if (arrow === 'down' && items[i + 1]) {
        // Если есть следующий элемент при нажатии стрелки вниз
        items[i + 1].classList.add('_active');
        scrollDropdownList(dropListSelector);
        break;
      }
      if (arrow === 'up' && items[i - 1]) {
        // Если есть следующий элемент при нажатии стрелки вверх
        items[i - 1].classList.add('_active');
        scrollDropdownList(dropListSelector);
        break;
      }
      if (arrow === 'down') {
        // Если нет следующего элемента при нажатии стрелки вниз
        items[0].classList.add('_active');
        scrollDropdownList(dropListSelector, 'top');
        break;
      }
      if (arrow === 'up') {
        // Если нет следующего элемента при нажатии стрелки вверх
        items[items.length - 1].classList.add('_active');
        scrollDropdownList(dropListSelector, 'bottom', items[items.length - 1].getBoundingClientRect().bottom);
      }
      break;
    }
  }
}

function scrollDropdownList(dropListSelector, position, positionBottomElement) {
  const dropdownList = document.querySelector(dropListSelector);
  if (!dropdownList) return;
  const dropdownListPostition = dropdownList.getBoundingClientRect();
  const activeItem = document.querySelector(dropListSelector + ' ._active');
  const activeItemPosition = activeItem.getBoundingClientRect();
  if (position === 'top') {
    dropdownList.scroll({ top: 0, left: 0, behavior: 'smooth' });
    return;
  }
  if (position === 'bottom') {
    dropdownList.scrollTo({ top: positionBottomElement, left: 0, behavior: 'smooth' });
    return;
  }
  if (activeItemPosition.top < dropdownListPostition.top) {
    dropdownList.scrollBy({ top: activeItemPosition.height * (-1), left: 0, behavior: 'smooth' });
    return;
  }
  if (activeItemPosition.bottom > dropdownListPostition.bottom) {
    dropdownList.scrollBy({ top: activeItemPosition.height, left: 0, behavior: 'smooth' });
    return;
  }
}

function showTrueValues() {
  // Чекбокс "Страхователь является собственником"
  if (ownerlessElement.checked) {
    ownerless = true;
    owner.style.display = 'none';
  } else {
    ownerless = false;
    owner.style.display = 'block';
  }
  // Радиокнопка "Количество водителей: 1 и более"
  const driversLimit = document.querySelector('[name="drivers_limit"]');
  if (driversLimit.checked) {
    drivers.classList.add('show');
    addDriver.style.display = 'block';

    if (localStorage.driversInfo) {
      const driversInfo = JSON.parse(localStorage.driversInfo);
      setTimeout(async () => {
        for (let i = 0; i < driversInfo.length - 1; i++) {
          await addDriver.children[0].click();
        }
      }, 500);
      setTimeout(() => {
        const driversAll = document.querySelectorAll('.driver-prototype');
        for (let i = 0; i < driversAll.length; i++) {
          driversAll[i].querySelector('.driver-surname').value = driversInfo[i].surname;
          driversAll[i].querySelector('.driver-name').value = driversInfo[i].name;
          driversAll[i].querySelector('.driver-midname').value = driversInfo[i].midname;
          driversAll[i].querySelector('.driver-birthdate').value = driversInfo[i].birthdate;
          driversAll[i].querySelector('.driver-expdate').value = driversInfo[i].expdate;
          driversAll[i].querySelector('.driver-license-series').value = driversInfo[i].licenseSeries;
          driversAll[i].querySelector('.driver-license-number').value = driversInfo[i].licenseNumber;
        }
      }, 1000);
    }
  } else {
    drivers.classList.remove('show');
    addDriver.style.display = 'none';
  }
  // Селект "Тип документа"
  vehicleDocumentType = vehicleDocumentTypeSelect.value;
  if (vehicleDocumentType === 'epts') {
    vehicleDocumentSeriaNumber.children[1].style.display = 'none';
  }
  // Инпут "Адрес регистрации"
  if ((localStorage.ownerRegion || localStorage.ownerCity) && !ownerlessElement.checked) {
    address = {
      region: localStorage.ownerRegion,
      city: localStorage.ownerCity
    };
  } else if ((localStorage.insurantRegion || localStorage.insurantCity) && ownerlessElement.checked) {
    address = {
      region: localStorage.insurantRegion,
      city: localStorage.insurantCity
    };
  }
  // Чекбокс "Гос. номер отсутствует"
  if (plateless.checked) {
    plate.setAttribute('disabled', '');
  } else {
    plate.removeAttribute('disabled');
  }

  // Радиокнопка "Количество водителей"
  for (const driverCountChange of driversCountChange) {
    if (driverCountChange && driverCountChange.checked) {
      driversCount = driverCountChange.value;
    }
  }

  // Мощность:
  power = localStorage.powerInput;

  // Используется с прицепом:
  trailer = document.getElementById('trailer').checked;

  // Вставляем марку и модель автомобиля
  const changeCategoryBrandModel = new Promise((resolve, reject) => {
    for (const categoryChanged of categoryChange) {
      if (categoryChanged && categoryChanged.checked) {
        category = categoryChanged.value;
        break;
      }
    }
    if (!category) return;
    if (category === 'B') {
      trailer = false;
      document.getElementById('trailer').checked = false;
      trailerWrap.style.display = 'none';
    } else {
      trailerWrap.style.display = 'inline-flex';
    }
    brand = null;
    model = null;
    brandSelect.disabled = false;
    modelSelect.disabled = true;
    brandModelCustom.style.display = 'none';
    brandCustomWrap.style.display = 'none';
    modelCustomWrap.style.display = 'none';

    var xhr = new XMLHttpRequest();

    var categoryId = category === 'B' ? '2' : '3';

    xhr.open('GET', 'https://www.alfastrah.ru/ajax/calc_eosago_dictionaries.php?action=brands&categoryId=' + categoryId);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200) {

        brandSelect.innerHTML = '';

        var option = document.createElement('option');
        option.value = '';
        option.innerHTML = '';
        brandSelect.appendChild(option);

        var brands = JSON.parse(xhr.response).lookup;

        brands.forEach(function (brand) {
          var slug = brand.data;
          var name = brand.value;
          var option = document.createElement('option');
          option.value = slug;
          option.innerHTML = name;
          brandSelect.appendChild(option);
        });

        option = document.createElement('option');
        option.value = 'other';
        option.innerHTML = 'Другое ТС';
        brandSelect.appendChild(option);

        brandSelect.value = localStorage.brand;
        const label = brandSelect.parentElement.querySelector('label');
        if (label) focus(label);
        resolve(brandSelect.value);
      }
    }
  });

  changeCategoryBrandModel.then((brand) => {
    if (brand === 'other') {
      modelSelect.disabled = true;
      brandModelCustom.style.display = 'flex';
      brandCustomWrap.style.display = 'block';
      modelCustomWrap.style.display = 'block';
    } else {
      modelSelect.disabled = false;
      brandModelCustom.style.display = 'none';
      brandCustomWrap.style.display = 'none';
      modelCustomWrap.style.display = 'none';
    }

    var xhr = new XMLHttpRequest();

    var cat = category === 'B' ? 'B - легковые' : 'C - грузовые';

    xhr.open('GET', 'https://www.alfastrah.ru/ajax/calc_eosago_dictionaries.php?action=models&brand=' + brand + '&category=' + cat);
    xhr.send();

    xhr.onload = function () {
      if (xhr.status === 200) {

        modelSelect.innerHTML = '';

        var option = document.createElement('option');
        option.value = '';
        option.innerHTML = '';
        modelSelect.appendChild(option);

        var models = JSON.parse(xhr.response).lookup;
        years = models.map(function (m) {
          return {
            model: m.data,
            years: m.outYears
          }
        });

        models.forEach(function (model) {
          var slug = model.data;
          var name = model.value;
          var option = document.createElement('option');
          option.value = slug;
          option.innerHTML = name;
          modelSelect.appendChild(option);
        });

        option = document.createElement('option');
        option.value = 'other';
        option.innerHTML = 'Другая модель';
        modelSelect.appendChild(option);

        modelSelect.value = localStorage.model;
        const label = modelSelect.parentElement.querySelector('label');
        if (label) focus(label);
      }
    }
  }).then(() => {
    model = localStorage.model;

    yearOptions.style.display = 'none';
    powerOptions.style.display = 'none';

    if (model === 'other') {
      brandModelCustom.style.display = 'flex';
      brandCustomWrap.style.display = 'none';
      modelCustomWrap.style.display = 'block';
    } else {
      brandModelCustom.style.display = 'none';
      brandCustomWrap.style.display = 'none';
      modelCustomWrap.style.display = 'none';
    }
  });
  localStorage.removeItem('returnFromPayment');
}

setTimeout(() => {
  if (localStorage.returnFromPayment && localStorage.returnFromPayment === 'true') {
    showTrueValues();
  }
}, 1000);