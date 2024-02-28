class GlobalState {
  _slotStage = 1;

  get slotStage() {
    return this._slotStage;
  }

  set slotStage(value) {
    this._slotStage = value;
  }

  get isLastStage() {
    return this._slotStage >= 3;
  }
}

export const globalState = new GlobalState();
