/* *************************************************************************
* Change background color of different elements based on their "input-color"
* **************************************************************************/
const 
	pwdBars = document.getElementsByClassName('bar').length, 
	header = document.getElementById('header'),
	form   = document.getElementById('form'),
  sect1  = document.getElementById('sect1'),
  sect2  = document.getElementById('sect2'),
  sect3  = document.getElementById('sect3'),
  foot   = document.getElementById('foot'),
			
  headerColor = document.getElementById('headerColor'),
  formColor   = document.getElementById('formColor'),
  sect1Color  = document.getElementById('sect1Color'),
  sect2Color  = document.getElementById('sect2Color'),
  sect3Color  = document.getElementById('sect3Color'),
  footColor   = document.getElementById('footColor');

headerColor.onchange = () => { header.style.backgroundColor = headerColor.value; };
formColor.onchange   = () => { form.style.backgroundColor = formColor.value; };
sect1Color.onchange  = () => { sect1.style.backgroundColor = sect1Color.value };
sect2Color.onchange  = () => { sect2.style.backgroundColor = sect2Color.value };
sect3Color.onchange  = () => { sect3.style.backgroundColor = sect3Color.value };
footColor.onchange   = () => { foot.style.backgroundColor = footColor.value };

/* *************************************************************************
* Show / hide the navigation menu
* **************************************************************************/
const
	menuButton = document.getElementById('menuButton'),
  menuNode = document.getElementsByTagName('ul');

// Click on the menu button => show menu list:
menuButton.onclick = () => menuNode.classList.toggle('shown');

/* *************************************************************************
* ID validation
* **************************************************************************/
const
  idTip = document.getElementById('idMessage'),
  idNode = document.getElementById('idNum');

// Click on the ID field => show message box:
idNode.onfocus = function() { idTip.style.display = 'block'; };

// Click outside of the ID field => hide the message box:
idNode.onblur = function() { idTip.style.display = 'none'; };

// Validate ID input field
idNode.onkeyup =  function() { checkId(); };

function checkId() {
	const format = document.getElementById('idFormat');

	if (idNode.checkValidity()) {
		idNode.classList.replace('invalid', 'valid');
		format.classList.replace('invalid', 'valid');
	}
	else {
		idNode.classList.replace('valid', 'invalid');
		format.classList.replace('valid', 'invalid');
	}

}

/* *************************************************************************
* Password validation
* **************************************************************************/
const	
	pwdTip = document.getElementById('pwdMessage'),
	pwdNode = document.getElementById('pwd'),
  pwdQuality =document.getElementById('pwdQuality');

// Click on the password field => show message box:
pwdNode.onfocus = function() { pwdTip.style.display = 'block'; };

// Click outside of the password field => hide the message box:
pwdNode.onblur = function() {	pwdTip.style.display = 'none'; };

// Type inside the password field => check requirements:
pwdNode.onkeyup = function() { checkPassword(); };
function checkPassword() {
	// Create function to validate one element complies with one regex.
	function checkReg(reg, element) {
		if(pwdNode.value.match(reg)) element.classList.replace('invalid', 'valid');
		else element.classList.replace('valid', 'invalid');
	}	
	
	// Validate lowercase letters
  const 
		lowerReq = /[a-z]/g,
		lowerTip = document.getElementById('lower');
	checkReg(lowerReq, lowerTip);

  // Validate Uppercase letters
  const 
		upperReq = /[A-Z]/g,
		upperTip = document.getElementById('upper');
	checkReg(upperReq, upperTip);

  // Validate numbers
  const 
		numberReq = /[0-9]/g,
		numberTip = document.getElementById('number');
	checkReg(numberReq, numberTip);
  
  // Validate Symbols
  const 
		symbolReq = /[!@#$%^&*_=+\-]/g,
		symbolTip = document.getElementById('symbol');
	checkReg(symbolReq, symbolTip);

  // Validate length
	const lengthTip = document.getElementById('length');
	if(pwdNode.value.length >= 8) lengthTip.classList.replace('invalid', 'valid');
	else lengthTip.classList.replace('valid', 'invalid');
 
  // Validate password input field
	if (pwdNode.checkValidity()) pwdNode.classList.replace('invalid', 'valid');
	else pwdNode.classList.replace('valid', 'invalid');

  // Measure quality of the password
  const 
    arrQuality = [
      pwdNode.value.match(lowerReq), 
      pwdNode.value.match(upperReq), 
      pwdNode.value.match(numberReq), 
      pwdNode.value.match(symbolReq), 
      (pwdNode.value.length >= 8)
    ],
    quality = arrQuality.filter(Boolean).length / arrQuality.length;

  // Update quality mark 
  if (pwdNode.value.length > 0) {
    pwdQuality.innerHTML = arrQuality.filter(Boolean).length + " / " + arrQuality.length;  
  }
  else pwdQuality.innerHTML = '';

  // Update color of the password quality bars
  for (let i = 1; i <= pwdBars; i++) {
		const ibar = document.getElementById('pwd' + i);
		
		if(quality >= i/5) ibar.classList.add('show');
		else ibar.classList.remove('show');
  }
}

/* *************************************************************************
* Reset formats when resetting form
* **************************************************************************/
form.onreset = function() { 
	const valids = document.getElementsByClassName('valid'),
				size = valids.length;
	for (let i = 0; i < size; i++) {	valids[0].classList.replace('valid', 'invalid'); }
	for (let i = 1; i <= pwdBars; i++) { document.getElementById('pwd' + i).classList.remove('show'); }
}
