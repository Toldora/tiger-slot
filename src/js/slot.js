import { globalState } from '@/js/global-state';
import { setToLS } from '@/js/local-storage';
import { openSignUpModal } from '@/js/sign-up';

// const slotRef = document.querySelector('.js-slot');
const spinSlotBtnRef = document.querySelector('.js-spin-slot-btn');
const bonusesSectionRef = document.querySelector('.js-bonuses-section');
const bodyRef = document.body;
const rootStyles = getComputedStyle(document.documentElement);

const state = {
  isSpinning: false,
};

const onClickSlot = () => {
  if (state.isSpinning) return;

  state.isSpinning = true;

  switch (globalState.slotStage) {
    case 1:
      bodyRef.classList.add('slot-stage-2');
      bodyRef.classList.remove('slot-stage-1', 'spin-finished');
      break;

    case 2:
      bodyRef.classList.add('slot-stage-3');
      bodyRef.classList.remove('slot-stage-2', 'spin-finished');
      break;

    default:
      break;
  }

  const slotAnimationDuration = Number(
    rootStyles.getPropertyValue('--slot-animation-duration').slice(0, -1),
  );
  const slotAnimationDelay = Number(
    rootStyles.getPropertyValue('--slot-animation-delay').slice(0, -1),
  );
  const slotColumnQuantity = Number(
    rootStyles.getPropertyValue('--slot-column-quantity'),
  );

  const delay =
    (slotAnimationDuration + slotAnimationDelay * slotColumnQuantity) * 1000;

  setTimeout(() => {
    switch (globalState.slotStage) {
      case 1:
        bodyRef.classList.add('spin-finished');
        bonusesSectionRef.classList.add('bonuses-section--visible-first-bonus');
        globalState.slotStage += 1;

        break;

      case 2:
        bodyRef.classList.add('spin-finished');
        bonusesSectionRef.classList.add(
          'bonuses-section--visible-second-bonus',
        );
        globalState.slotStage += 1;

        setToLS('isLastStage', globalState.isLastStage);

        setTimeout(() => {
          openSignUpModal({ isBlocked: true });
        }, 500);

        break;

      default:
        break;
    }

    state.isSpinning = false;
  }, delay);
};

export const setSlotLastStage = () => {
  bodyRef.classList.add('slot-stage-3');
  bodyRef.classList.remove('slot-stage-1', 'slot-stage-2');
  bonusesSectionRef.classList.add(
    'bonuses-section--visible-first-bonus',
    'bonuses-section--visible-second-bonus',
  );
  globalState.slotStage = 3;
};

// slotRef.addEventListener('click', onClickSlot);
spinSlotBtnRef.addEventListener('click', onClickSlot);
