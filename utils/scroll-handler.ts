// tslint:disable-next-line:only-arrow-functions
const scroll = window.requestAnimationFrame || function(callback) { window.setTimeout(callback, 1000 / 60); };

export function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === 'function' && el instanceof jQuery) {
    el = el[0];
  }
  const rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

export function loopScrollAnimation(elements, animationClass) {

  elements.forEach((element) => {
    if (isElementInViewport(element)) {
      element.classList.add(animationClass);
    } else {
      element.classList.remove(animationClass);
    }
  });

  scroll(loopScrollAnimation(elements, animationClass));
}
