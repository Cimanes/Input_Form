/* *************************************************************************
* Change background color of different elements based on their "input-color"
* **************************************************************************/
const 
	header = document.getElementById('header'),
	main = document.getElementById('main'),
  sect1 = document.getElementById('sect1'),
  sect2 = document.getElementById('sect2'),
  sect3 = document.getElementById('sect3'),
  foot = document.getElementById('foot'),
  headerColor = document.getElementById('headerColor'),
  mainColor = document.getElementById('mainColor'),
  sect1Color = document.getElementById('sect1Color'),
  sect2Color = document.getElementById('sect2Color'),
  sect3Color = document.getElementById('sect3Color'),
  footColor = document.getElementById('footColor');

headerColor.onchange = () => {header.style.backgroundColor = headerColor.value;};
mainColor.onchange = () => {main.style.backgroundColor = mainColor.value;};
sect1Color.onchange =() => {sect1.style.backgroundColor = sect1Color.value};
sect2Color.onchange =() => {sect2.style.backgroundColor = sect2Color.value};
sect3Color.onchange =() => {sect3.style.backgroundColor = sect3Color.value};
footColor.onchange =() => {foot.style.backgroundColor = footColor.value};

/* *************************************************************************
* Show / hide the navigation menu
* **************************************************************************/
const
	menubutton = d3.select('#menuButton'),
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
idNode.onkeyup =  () => {
	d3.select('#idNum').attr('class', idNode.checkValidity() ? 'valid' : 'invalid');
	const idOption = /(\d){8}(-?)([A-Za-z]){1}/,
				nieOption = /([X-Zx-z]){1}(-?)(\d){7}(-?)([A-Za-z]){1}/;
	
	d3.select("#idFormat")
    .attr('class', (idNode.value.match(idOption) || idNode.value.match(nieOption) ) ? 'valid' : 'invalid')
}

/* *************************************************************************
* Password validation
* **************************************************************************/
const	
	pwdTip = d3.select('#pwdMessage'),
	pwdNode = d3.select('#pwd').node(),
  pwdQuality = d3.select('#pwdQuality').node();

// Click on the password field => show message box:
pwdNode.onfocus = function() {	
  pwdTip.style('display', 'block'); 
}

// Click outside of the password field => hide the message box:
pwdNode.onblur = function() {	pwdTip.style('display', 'none'); }

// Type inside the password field => check requirements:
pwdNode.onkeyup = function() {

	// Validate lowercase letters using D3
  const lowerReq = /[a-z]/g;
  d3.select("#lower")
    .attr('class', pwdNode.value.match(lowerReq) ? 'valid' : 'invalid')

  // Validate Uppercase letters using D3
  const upperReq = /[A-Z]/g;
  d3.select("#upper")
    .attr('class', pwdNode.value.match(upperReq) ? 'valid' : 'invalid')

  // Validate numbers using D3
  const numberReq = /[0-9]/g;
  d3.select("#number")
    .attr('class', pwdNode.value.match(numberReq) ? 'valid' : 'invalid')
  
  // Validate Symbols using D3
  const symbolReq = /[!@#$%^&*_=+\-]/g;
  d3.select("#symbol")
    .attr('class', pwdNode.value.match(symbolReq) ? 'valid' : 'invalid')

  // Validate length
  d3.select('#length')
    .attr('class', (8 <= pwdNode.value.length) ? 'valid' : 'invalid')

  // Validate password input field
  d3.select('#pwd').attr('class', this.checkValidity() ? 'valid' : 'invalid');

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
  for (let i = 1; i <= arrQuality.length; i++) {
    d3.select('#pwd' + i).attr('class', (quality >= i/5) ? 'show' : 'hide')
  }
}
