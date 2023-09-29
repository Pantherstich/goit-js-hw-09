import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', fromSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function fromSubmit(e) {
  e.preventDefault();
    const { delay, step, amount } = e.currentTarget.elements;
  if (delay.value < 0 || step.value < 0 || amount.value < 0) {
    Notiflix.Notify.warning('❌ Please enter number greater than 0');
  }
for (let i = 0; i < amount.value; i += 1) {
    let position = i + 1;
    const intervalDelay = Number(delay.value) + step.value * i;
  createPromise(position, intervalDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
  e.currentTarget.reset();



}