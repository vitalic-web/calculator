import './calculator.css';
import { observer, useLocalObservable } from "mobx-react-lite";
import { buttons } from '../../utils/constants';

const Calculator = observer(() => {
  const screen = useLocalObservable(() => ({
    historyInput: 0,
    mainInput: 0,
    isRightOperand: false,
    isResult: false,
    leftOperand: 0,
    rightOperand: 0,
    operatop: '',
    result: 0,
    calculate(leftOperand, rightOperand, operator) {
      console.log('leftOperand', leftOperand);
      console.log('rightOperand', rightOperand);
      console.log('operator', operator);

      if (operator === '+') {
        this.result = leftOperand + rightOperand;
        console.log('this.result', this.result);
      } else if (operator === '-') {
        this.result = leftOperand - rightOperand;
        console.log('this.result', this.result);
      } else if (operator === '*') {
        this.result = leftOperand * rightOperand;
        console.log('this.result', this.result);
      } else if (operator === '/') {
        this.result = leftOperand / rightOperand;
        console.log('this.result', this.result);
      }
    },
    clear() {
      this.historyInput = 0;
      this.mainInput = 0;
      this.isRightOperand = false;
      this.isResult = false;
      this.leftOperand = 0;
      this.rightOperand = 0;
      this.operatop = '';
      this.result = 0;
    },
    display(evt) {
      if (!isNaN(Number(evt.target.textContent))) {
        if (!this.isRightOperand) {
          this.mainInput = parseInt(this.mainInput + evt.target.textContent);
          this.leftOperand = this.mainInput;
        } else {
          // this.mainInput = parseInt(this.mainInput + evt.target.textContent);
          // this.rightOperand = this.mainInput;
          this.rightOperand = parseInt(this.rightOperand + evt.target.textContent);
          this.mainInput = this.rightOperand;
        }

      } else {
        if (evt.target.textContent !== 'DEL') {
          this.historyInput = String(this.historyInput + this.mainInput + evt.target.textContent);
          this.isRightOperand = true;
          // this.mainInput = 0;
        }

        if ((evt.target.textContent !== '=') && (evt.target.textContent !== 'DEL')) {
          this.operatop = evt.target.textContent;
        }

        if (evt.target.textContent === 'DEL') {
          this.mainInput = parseInt(String(this.mainInput).slice(0, String(this.mainInput).length - 1));
          if (!this.mainInput) {
            this.mainInput = 0;
          }

          if (!this.isRightOperand) {
            this.leftOperand = this.mainInput;
          } else {
            this.rightOperand = this.mainInput;
          }
        }

      }

      if (evt.target.textContent === '=') {
        // this.historyInput.slice(0, -1);
        this.calculate(this.leftOperand, this.rightOperand, this.operatop);
        this.mainInput = this.result;
      }

      if (evt.target.textContent === 'AC') {
        this.clear();
      }

      // if (evt.target.textContent === 'DEL') {
      //   this.mainInput = parseInt(String(this.mainInput).slice(0, String(this.mainInput).length - 1));
      //   if (!this.mainInput) {
      //     this.mainInput = 0;
      //   }
      //   console.log('this.mainInput', this.mainInput);
      // }
    }
  }));

  return (
    <div className="calculator">
      <div className="calculator__screen">
        <div className="calculator__screen-history">{screen.historyInput}</div>
        <div className="calculator__screen-main">{screen.mainInput}</div>
      </div>
      <div className="calculator__keyboard">
        {buttons.map(((item, index) =>
          <div
            onClick={screen.display}
            key={index}
            className="calculator__key"
          >{item}</div>))}
      </div>
    </div>
  )
});

export default Calculator;