import handlebars from 'handlebars';
import { SignUpForm, compileSignUpFormMarkup } from 'mayanbet-sdk';
import signUpBonusesTemplate from '@/partials/sign-up-bonuses.hbs?raw';
import { openModal } from '@/js/modal';
// import { openLoginModal } from '@/js//login';
import { globalState } from '@/js/global-state';
import { setToLS } from '@/js/local-storage';

const modalContentRef = document.querySelector('.js-app-modal-content');

export const openSignUpModal = ({ isBlocked } = {}) => {
  const bonusesMarkup = handlebars.compile(signUpBonusesTemplate)({
    slotStage: globalState.slotStage,
  });

  const markup = compileSignUpFormMarkup({
    bonusesMarkup,
    title: globalState.slotStage === 1 ? 'Junte-se a nós' : 'Parabéns',
  });

  modalContentRef.innerHTML = '';
  modalContentRef.insertAdjacentHTML('beforeend', markup);

  new SignUpForm({
    formRef: document.forms.signUp,
    submitCallback: async () => {
      setToLS('isAlreadyRegistered', true);
    },
  });

  openModal({ isBlocked });
};
