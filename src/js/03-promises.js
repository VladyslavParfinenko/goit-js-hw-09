import Notiflix from 'notiflix';

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const form = document.querySelector('.form');
console.log(form);

form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  console.log(event.target);
  
  const firstDelay = parseInt(document.querySelector('[name="delay"]').value);
  const delayStep = parseInt(document.querySelector('[name="step"]').value);
  const amount = parseInt(document.querySelector('[name="amount"]').value);

  for (let i = 1; i <= amount; i++) {
    const delay = i === 1 ? firstDelay : firstDelay + (i * delayStep);
    
    setTimeout(() => {
      createPromise(i, delay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delay);
  }
}

