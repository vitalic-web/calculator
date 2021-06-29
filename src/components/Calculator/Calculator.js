import './Calculator.css';
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
    data: 0,
    historyData: '0',
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
      } else if (operator === '÷') {
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
      this.data = 0;
      this.historyData = 0;
    },
    display(evt) {
      if (!isNaN(Number(evt.target.textContent)) || (evt.target.textContent === '.')) {
        if (!this.isRightOperand) {
          this.data = String(this.data + evt.target.textContent);
          this.mainInput = this.data.slice(1);

          if (this.data.includes('.')) {
            this.leftOperand = parseFloat(this.data);
          } else {
            this.leftOperand = parseInt(this.data);
          }
        } else {
          this.data = String(this.data + evt.target.textContent);
          this.mainInput = this.data.slice(1);

          if (this.data.includes('.')) {
            this.rightOperand = parseFloat(this.data);
          } else {
            this.rightOperand = parseInt(this.data);
          }
        }

      } else {
        if (evt.target.textContent !== 'DEL') {
          this.historyData = String(this.historyData + this.mainInput + evt.target.textContent);
          console.log('this.historyData', this.historyData);
          this.historyInput = this.historyData.slice(1);
          this.isRightOperand = true;
          this.data = 0;
        }

        if ((evt.target.textContent !== '=') && (evt.target.textContent !== 'DEL')) {
          this.operatop = evt.target.textContent;
        }

        if (evt.target.textContent === 'DEL') {
          if (this.data.includes('.')) {
            this.mainInput = parseFloat(String(this.mainInput).slice(0, String(this.mainInput).length - 1));
            this.leftOperand = this.mainInput;
          } else {
            this.mainInput = parseInt(String(this.mainInput).slice(0, String(this.mainInput).length - 1));
            this.leftOperand = this.mainInput;
          }

          if (!this.mainInput) {
            this.mainInput = 0;
          }

          if (!this.isRightOperand) {
            this.leftOperand = this.mainInput;
          } else {
            this.rightOperand = this.mainInput;
          }
        }

        if (evt.target.textContent === '=') {
          this.calculate(this.leftOperand, this.rightOperand, this.operatop);
          this.mainInput = this.result;
          this.leftOperand = this.result;
          this.data = String(this.result);
        }

        if (evt.target.textContent === 'AC') {
          this.clear();
        }
      }
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