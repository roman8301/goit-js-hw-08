import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const state = { email: '', message: '' };
const KEY_LS = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(e => {
    state[e.target.name] = e.target.value;
    localStorage.setItem(KEY_LS, JSON.stringify(state));
  }, 500),
);

function setFormFields() {
  const stateFromLocal = JSON.parse(localStorage.getItem(KEY_LS));
  if (stateFromLocal) {
    [...form.elements].forEach(el => {
      if (el.name) {
        state[el.name] = stateFromLocal[el.name];
        el.value = stateFromLocal[el.name];
      }
    });
  }
}

form.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  e.currentTarget.reset();
  localStorage.removeItem(KEY_LS);
  console.log(state);
  state['email'] = '';
  state['message'] = '';
}
window.addEventListener('DOMContentLoaded', setFormFields);
