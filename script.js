'use strict';

////////  All Selections  /////////////////
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollToButton = document.querySelector('.btn--scroll-to')
const section1 = document.querySelector('#section--1')


///////////////////////////////////////
// Modal window
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

// Scrolling
// Implementing Smooth Scroll 
scrollToButton.addEventListener('click', function (e) {
  const s1Coords = section1.getBoundingClientRect()
  // modern way
  section1.scrollIntoView({ behavior: 'smooth' })
  // console.log(s1Coords)
  // console.log(e.target.getBoundingClientRect())
  // boudingclientrect is relative to viewport
  //current scroll - pagexoffset, pageyoffset returns the pixel , window has been scrolled from top left corner
  // console.log('scroll x/y', window.pageXOffset, window.pageYOffset)
  // console.log('viewport width/height', document.documentElement.clientWidth, document.documentElement.clientHeight)
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
})

//Tab Component
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')

// firdt approach to attach evet handler to each of the tabs
// not an efficient approach as what if we have > 200 tabs
// tabs.forEach(tab => {
//   tab.addEventListener('click', function () {
//     console.log('tab clicked')
//   })
// })
tabsContainer.addEventListener('click', function (e) {
  // parentElement was not working because when we click on span or button, it returned a div element.
  const clickedTab = e.target.closest('.operations__tab')
  // console.log(clickedTab)
  // guard close
  if (!clickedTab) return;
  //removing active classes from tabs and content 
  tabs.forEach(tab => {
    tab.classList.remove('operations__tab--active')
  })
  tabsContent.forEach(tab => {
    tab.classList.remove('operations__content--active')
  })
  //adding active class to tab now
  clickedTab.classList.add('operations__tab--active')
  //Activating the content area corresponding to tab selected
  // console.log(clickedTab.dataset.tab)
  document.querySelector(`.operations__content--${clickedTab.dataset.tab}`).classList.add('operations__content--active')
})

// Menu options fading
// when hovering over one menu item, others should get fade
const nav = document.querySelector('.nav')
const handleMenuHover = function (e) {
  const clicked = e.target;
  if (clicked.classList.contains('nav__link')) {
    const targetLink = e.target
    // find sibling links
    const siblingLinks = targetLink.closest('.nav').querySelectorAll('.nav__link')
    const logo = targetLink.closest('.nav').querySelector('img')
    siblingLinks.forEach(link => {
      if (link != targetLink) link.style.opacity = this
    })
    logo.style.opacity = this
  }
}
// looks kinda ugly that a method is called inside a callback
// bind is the function where 'this' is the parameter passed in the bind function
nav.addEventListener('mouseover', handleMenuHover.bind(0.5))
nav.addEventListener('mouseout', handleMenuHover.bind(1))

// Sticky Scroll
// not efficient as each time we scroll, this event is fired
// window.addEventListener('scroll', function (e) {
//   console.log(e)
// })
// not an efficient way of implemnenting stiky scroll
// const initialCoords = section1.getBoundingClientRect()
// window.addEventListener('scroll', function () {
//   console.log('scroll', this.window.scrollY)
//   console.log(window.scrollY, ' ', initialCoords.top)
//   if (window.scrollY > initialCoords.top) {
//     console.log('sticky');
//     nav.classList.add('sticky')
//   } else {
//     nav.classList.remove('sticky')
//   }
// })
// sticky toolbar by intersection observer API
// This api is used when we want to observe changes when there is intersection between target element and the ancestor or parent element.
// const observerCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry)
//   })
// }
// // an array is passed in threshold so that both moving in moving out can be obsrved while intersection
// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2]
// }
// const observer = new IntersectionObserver(observerCallback, observerOptions)
// // observing section1 is intersecting the viewport
// observer.observe(section1)

// we want heading to be our target.
const headerElement = document.querySelector('.header')
const stickyNav = function (entries) {
  const [entry] = entries
  console.log(entry)
  if (!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const navHeight = nav.getBoundingClientRect().height
const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
}
const headerObserver = new IntersectionObserver(stickyNav, observerOptions)
headerObserver.observe(headerElement)


//////////////////////////////////////////
// Page navigation
// not an efficient approach to implement page scroll
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault()
//     const id = this.getAttribute('href')
//     console.log('id', id)
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     })
//   })
// })

// event delegation
// event listeners are set on page load. what if the element to which event listener is attached is not pesent on initial load?
// call the handler on parent element which is present on initial page load - event delegation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // preventig default behaviour that on clicking link, user will be redirected to section id present in href
  e.preventDefault()
  // matching the correct element
  if (e.target.classList.contains('nav__link')) {
    console.log('inside contain')
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  }
})

// DOM Traversing
// basically reaching child elements, sibling elements , parent elements from one particular element.
// traversing DOM in upward, sideways and downward direction

const h1 = document.querySelector('h1')
// console.log(h1)
// // displaying all child nodes
// console.log(h1.childNodes)
// // displaying direct children nodes
// console.log(h1.children)
// //displaying first child node
// console.log('node', h1.firstChild)
// console.log(h1.firstElementChild)
// // displaying last child node
// console.log(h1.lastElementChild)
// // displaying parent element
// console.log(h1.parentElement)
// console.log(h1.parentNode)
// finding the closest ancestor of the element that matches the selector
// console.log(h1.closest('.header'))
// finding siblings (sideways traversal)
//getting previos sibling 
// console.log(h1.previousSibling)
// console.log(h1.previousElementSibling)
// //getting next sibling
// console.log('elem', h1.nextElementSibling)
// console.log(h1.nextSibling)
// // getting all siblings
// console.log(h1.parentElement.children)
/////////////////////////////////////////////////////
// SELECTING ELEMENTS
// document is not enough to select document element of the DOM. use documentElement method of document to select the needed.
// console.log(document.documentElement)
const header = document.querySelector('.header')
const allSections = document.querySelectorAll('.section')

// this selector returns a html collection which is a liev collection which gets updated as soon as there are chnages are in any buttons
const allButtons = document.getElementsByTagName('button')
// console.log(allButtons)
// console.log(allSections)

// return a ive html collection
// console.log(document.getElementsByClassName('btn'))

// CREATING AND INSERTING ELEMENTS
const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML = 'We use cookies to improve your journey and to personalize your web experience. By continuing to use this site, you are accepting the bank’s cookie policy.<button class="btn btn--close-cookie">I accept</button>'
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
// console.log(getComputedStyle(message).height)
message.style.height = Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

// similar to js, we have variables in css also. to change them we use , setProperty()
document.documentElement.style.setProperty('--color-primary', 'orangered')

// attributes
// used to log predefined attributes of an element
const logo = document.querySelector('.nav__logo')
// console.log(logo.alt)

// to get access of user defined attribute, use setAttribute and getAttribute
logo.setAttribute('author', 'deepshi')
// console.log(logo.getAttribute('author'))

// getattribute returns relative path in case of links

// console.log(logo.dataset.version)

// Classes - learn how to add, remove, toggle the class
logo.classList.add('class')
logo.classList.remove('class')
logo.classList.toggle('class')
logo.classList.contains('class')

// alternate way of setting up class of an element or attribute - Do not use
// logo.className('class')

/* Even and event handler*/
// an event is just a signal created by a DOM node. a sinal that something ahs happened in the webpage - a user scrolling the mouse,
// mouse click, keypress and so on. to listen to these events are the methos called event handlers.
// mouseenter event is similar to hover event
// let h1Element = document.querySelector('h1')
// console.log('12', h1Element)
// // new way of event listener
// h1Element.addEventListener('mouseenter', function (e) {
//   console.log('mouseenter occurred')
// })

// old way
// h1Element.onmouseenter = function () {
//   console.log('mouseenter occurred')
// }
// rather we can create a function and pass it as argument to addeventlistener and in same function, remove evnetlistener
// generate random values for rgb
// rgb(255, 255, 255)
// const randomValues = (min, max) => Math.random() * (max - min + 1);
// console.log(randomValues(0, 255))
// const randomColor = () => `rgb(${randomValues(0, 255)}, ${randomValues(0, 255)}, ${randomValues(0, 255)}`;

// on click of link element , an event actually happens at root element and it passes from root element to target element and then bubbles up .
// bubbling up means the event happens at all parent element
// e.target is the element where the click event first happened
// e.currentTarget is the current element to which the event listener is attached
// this === e.currentTarget
// to stop event propagation , use e.stopPropagation
// const linkElement = document.querySelector('.nav__link')
// linkElement.addEventListener('click', function (e) {
//   console.log('link', e.target);
//   this.style.backgroundColor = randomColor()
//   // e.stopPropagation()
// })
// const parentOfLinkElement = document.querySelector('.nav__links')
// parentOfLinkElement.addEventListener('click', function (e) {
//   console.log('parent', e.target)
//   // this.style.backgroundColor = randomColor()
// })
// // by setting third parameter to true, we mean that capture the events at capturing phase of an event.
// const superParent = document.querySelector('.nav')
// superParent.addEventListener('click', function (e) {
//   console.log('super parent', e.target, e.currentTarget);
// }, false)




