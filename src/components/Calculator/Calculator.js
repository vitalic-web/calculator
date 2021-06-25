import './calculator.css';
import { observer, useLocalObservable } from "mobx-react-lite";
import { buttons } from '../../utils/constants';

const Calculator = observer(() => {
  const table = useLocalObservable(() => ({
    historyInput: 123123,
    mainInput: 123123,
    increaseTimer() {
      this.secondsPassed++
    }
  }));

  const button = useLocalObservable(() => ({
    pickedCell: 0,
  }));

  return (
    <div className="calculator">
      <div className="calculator__screen">
        <div className="calculator__screen-history">{table.historyInput}</div>
        <div className="calculator__screen-main">{table.mainInput}</div>
      </div>
      <div className="calculator__keyboard">
        {buttons.map(((item, index) => <div key={index} className="calculator__key">{item}</div>))}
      </div>
    </div>
  )
});

export default Calculator;