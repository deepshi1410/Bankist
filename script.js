'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// SELECTING ELEMENTS
// document is not enough to select document element of the DOM. use documentElement method of document to select the needed.
console.log(document.documentElement)
const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')

// this selector returns a html collection which is a liev collection which gets updated as soon as there are chnages are in any buttons
const allButtons = document.getElementsByTagName('button')
console.log(allButtons)
console.log(allSections)

// return a ive html collection
console.log(document.getElementsByClassName('btn'))

// CREATING AND INSERTING ELEMENTS
const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'We use cookies for an enhanced experience <button class="btn btn--close-cookie">Got it!</button>'
header.append(message)

// prepend is used to attach the argument element as a first child .
// after is sued to attach the argument element after the header element.
// before as the name describes.

// deleting elements
document.querySelector('.btn--close-cookie').addEventListener('click', function () {
  // message.remove();
  message.parentElement.removeChild(message)
})

//styles
message.style.height = '120%';
message.style.backgroundColor = 'blue'

// getComputedStyle is used to get details regarding the style property
console.log(getComputedStyle(message).height)
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// similar to js, we have variables in css also. to change them we use , setProperty()
document.documentElement.style.setProperty('--color-primary', 'orangered')

// attributes
// used to log predefined attributes of an element
const logo = document.querySelector('.nav__logo')
console.log(logo.alt)

// to get access of user defined attribute, use setAttribute and getAttribute
logo.setAttribute('author', 'deepshi')
console.log(logo.getAttribute('author'))

// getattribute returns relative path in case of links

console.log(logo.dataset.version)

// Classes - learn how to add, remove, toggle the class
logo.classList.add('class')
logo.classList.remove('class')
logo.classList.toggle('class')
logo.classList.contains('class')

// alternate way of setting up class of an element or attribute - Do not use
// logo.className('class')

// Implementing Smooth Scroll 
const scrollToButton = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')

scrollToButton.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect()
  console.log(s1Coords)
  console.log(e.target.getBoundingClientRect())
  // boudingclientrect is relative to viewport
  //current scroll - pagexoffset, pageyoffset returns the pixel , window has been scrolled from top left corner
  console.log('scroll x/y', window.pageXOffset, window.pageYOffset)
  console.log('viewport width/height', document.documentElement.clientWidth, document.documentElement.clientHeight)
  // this scroll position arguments are relative to viewprt and not the document
  // window.scrollTo(s1Coords.left, s1Coords.top)
  // this scroll position arguments are relative to document
  // window.scrollTo(s1Coords.left + window.pageXOffset, s1Coords.top + window.pageYOffset)
  // smooth scrolling 
  // old way of calculating values and doing smooth croll
  // window.scrollTo({
  //   left: s1Coords.left + window.pageXOffset,
  //   right: s1Coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // });
  // modern way
  section1.scrollIntoView({ behavior: 'smooth' })
})

/* Even and event handler*/
// an event is just a signal created by a DOM node. a sinal that something ahs happened in the webpage - a user scrolling the mouse,
// mouse click, keypress and so on. to listen to these events are the methos called event handlers.
// mouseenter event is similar to hover event
let h1Element = document.querySelector('h1')
console.log('12', h1Element)
// new way of event listener
h1Element.addEventListener('mouseenter', function (e) {
  console.log('mouseenter occurred')
})

// old way
// h1Element.onmouseenter = function () {
//   console.log('mouseenter occurred')
// }
// rather we can create a function and pass it as argument to addeventlistener and in same function, remove evnetlistener
// generate random values for rgb
// rgb(255, 255, 255)
const randomValues = (min, max) => Math.random() * (max - min + 1);
console.log(randomValues(0, 255))
const linkElement = document.querySelector('.nav__link')
linkElement.addEventListener('click', function () {
  console.log('link');
  this.style.backgroundColor = rgb(randomValues(0, 255), randomValues(0, 255), randomValues(0, 255))
})




