/* *************************************************************************
* Change background color of different elements based on their "input-color"
* **************************************************************************/
const 
  pwdBars = document.getElementsByClassName('bar').length, 
	header = d3.select('#header').node(),
	form   = d3.select('#form').node(),
  sect1  = d3.select('#sect1').node(),
  sect2  = d3.select('#sect2').node(),
  sect3  = d3.select('#sect3').node(),
  foot   = d3.select('#foot').node(),
			
  headerColor = d3.select('#headerColor').node(),
  formColor   = d3.select('#formColor').node(),
  sect1Color  = d3.select('#sect1Color').node(),
  sect2Color  = d3.select('#sect2Color').node(),
  sect3Color  = d3.select('#sect3Color').node(),
  footColor   = d3.select('#footColor').node();

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
	menuButton = d3.select('#menuButton').node(),
  menuNode = d3.select('ul').node();

// Click on the menu button => show menu list:
menuButton.onclick = () => menuNode.classList.toggle('shown');

/* *************************************************************************
* ID validation
* **************************************************************************/
const
  idTip = d3.select('#idMessage'),
  idNode = d3.select('#idNum').node();

// Click on the ID field => show message box:
idNode.onfocus = function() {	idTip.style('display', 'block'); }

// Click outside of the ID field => hide the message box:
idNode.onblur = function() {	idTip.style('display', 'none'); }

// Validate ID input field
idNode.onkeyup =  () => checkId();

function checkId() {
	d3.select('#idNum').attr('class', idNode.checkValidity() ? 'valid' : 'invalid');
	
	d3.select("#idFormat").attr('class', idNode.checkValidity() ? 'valid' : 'invalid');
}

/* *************************************************************************
* Password validation
* **************************************************************************/
const	
	pwdTip = d3.select('#pwdMessage'),
	pwdNode = d3.select('#pwd').node(),
  pwdQuality = d3.select('#pwdQuality').node();

// Click on the password field => show message box:
pwdNode.onfocus = function() { pwdTip.style('display', 'block'); }

// Click outside of the password field => hide the message box:
pwdNode.onblur = function() {	pwdTip.style('display', 'none'); }

// Type inside the password field => check requirements:
pwdNode.onkeyup = () => checkPassword(); 
function checkPassword() {
  	// Create function to validate one element complies with one regex.
	function checkReg(reg, element) {
    d3.select(element).attr('class', pwdNode.value.match(reg) ? 'valid': 'invalid');
	}	
	let arrQuality = [];
	
	// Validate lowercase letters using D3
  let reg = /[a-z]/g;
  let element = "#lower";
  checkReg(reg, element);
	arrQuality.push(pwdNode.value.match(reg));

  // Validate Uppercase letters using D3
  reg = /[A-Z]/g;
  element = "#upper";
  checkReg(reg, element);
	arrQuality.push(pwdNode.value.match(reg));

  // Validate numbers using D3
  reg = /[0-9]/g;
  element = "#number";
  checkReg(reg, element);
	arrQuality.push(pwdNode.value.match(reg));	
  
  // Validate Symbols using D3
  reg = /[!@#$%^&*_=+\-]/g;
  element = "#symbol";
  checkReg(reg, element);
	arrQuality.push(pwdNode.value.match(reg));	

  // Validate length
  d3.select('#length')
    .attr('class', (8 <= pwdNode.value.length) ? 'valid' : 'invalid');
	arrQuality.push(pwdNode.value.length >= 8);	

  // Validate password input field
  d3.select('#pwd').attr('class', pwdNode.checkValidity() ? 'valid' : 'invalid');

  // Measure quality of the password
  // const 
  //   arrQuality = [
  //     pwdNode.value.match(lowerReq), 
  //     pwdNode.value.match(upperReq), 
  //     pwdNode.value.match(numberReq), 
  //     pwdNode.value.match(symbolReq), 
  //     (pwdNode.value.length >= 8)
  //   ],
    quality = arrQuality.filter(Boolean).length / arrQuality.length;

  // Update quality mark 
  if (pwdNode.value.length > 0) {
    pwdQuality.innerHTML = arrQuality.filter(Boolean).length + " / " + arrQuality.length;  
  }
  else pwdQuality.innerHTML = '';

  // Update color of the password quality bars
  for (let i = 1; i <= pwdBars; i++) {
    d3.select('#pwd' + i).attr('class', (quality >= i/5) ? 'show' : 'bar')
  }
}

/* *************************************************************************
* Reset formats when resetting form
* **************************************************************************/
form.onreset = function() { 
	const valids = document.getElementsByClassName('valid'),
				size = valids.length;
	for (let i = 0; i < size; i++) {	valids[0].classList.replace('valid', 'invalid'); }
	for (let i = 1; i <= pwdBars; i++) { d3.select('#pwd' + i).attr('class', 'bar'); }
}