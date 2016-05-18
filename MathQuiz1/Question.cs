using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MathQuiz1
{
    public enum Oper
    {
        plus,minus,multiplication,division
    }

    public class Question
    {
        int digit1;
        int digit2;
        Oper _operat;

        public Question()
        {
            Random random = new Random();
            Digit1 = random.Next() % 20;
            int operatorChoice = random.Next() % 4;

            switch (operatorChoice)
            {
                case 0:
                    _operat = Oper.plus;
                    break;
                case 1:
                    _operat = Oper.minus;
                    break;
                case 2:
                    _operat = Oper.multiplication;
                    break;
                case 3:
                    _operat = Oper.division;
                    break;
            }

            do
            {
                Digit2 = random.Next() % 20;
            } while (_operat == Oper.division && Digit2 == 0);


        }

        public Question(int digit1, int digit2)
        {
            Digit1 = digit1;
            Digit2 = digit2;
            _operat = Oper.division;
        }
        public Question(int digit1, int digit2, Oper operat)
        {
            Digit1 = digit1;
            Digit2 = digit2;
            _operat = operat;
        }

        public int Digit1
        {
            get
            {
                return digit1;
            }
            set
            {
                digit1 = value;
            }
        }

        public int Digit2
        {
            get
            {
                return digit2;
            }
            set
            {
                digit2 = value;
            }
        }

        public string OperatorSymbol
        {
            get {
            switch (_operat)
            {
                case Oper.plus:
                    return "+";

                case Oper.minus:
                    return "-";

                case Oper.multiplication:
                    return "x";

                case Oper.division:
                    return "/";

                    default:
                        return "?";
            }
            }
        }

        public Oper Operator
        {
            get
            {
                return _operat;
            }
        }

        public string getAnswerString()
        {
            string answer="";
            switch (_operat)
            {
                case Oper.plus:
                    answer = (Digit1 + Digit2).ToString();
                    break;
                case Oper.minus:
                    answer = (Digit1 - Digit2).ToString();
                    break;
                case Oper.multiplication:
                    answer = (Digit1 * Digit2).ToString();
                    break;
                case Oper.division:
                    answer = (Digit1 / Digit2).ToString();
                    break;
            }
            return answer;
        }

        public int getIntAnswer()
        {
            switch (_operat)
            {
                case Oper.plus:
                    return (Digit1 + Digit2);
                case Oper.minus:
                    return (Digit1 - Digit2);
                case Oper.multiplication:
                    return (Digit1 * Digit2);
                case Oper.division:
                    return (Digit1 / Digit2);

                default:
                    return 0;
            }
        }

        public double GetOneDeciAnswer()
        {
            int intAnswer = this.getIntAnswer();
            int deci = this.getDecimal();
            double answer = (double)intAnswer;
            answer += ((double)deci / 10);
            return answer;
        }

        public void Shake(MathQuizSettings settings)
        {
            Random random = new Random();
            int operatorChoice = random.Next() % 4;

            switch (operatorChoice)
            {
                case 0:
                    _operat = Oper.plus;
                    break;
                case 1:
                    _operat = Oper.minus;
                    break;
                case 2:
                    _operat = Oper.multiplication;
                    break;
                case 3:
                    _operat = Oper.division;
                    break;
            }

            if (settings.isset)
            {
                switch (_operat)
                {
                    case Oper.division:
                        Digit1 = random.Next(settings.divisionMin1, settings.divisionMax1);
                        Digit2 = random.Next(settings.divisionMin2, settings.divisionMax2);
                        break;
                    case Oper.multiplication:
                        Digit1 = random.Next(settings.multiplicationMin1, settings.multiplicationMax1);
                        Digit2 = random.Next(settings.multiplicationMin2, settings.multiplicationMax2);
                        break;
                    case Oper.plus:
                        Digit1 = random.Next(settings.aditionMin1, settings.aditionMax1);
                        Digit2 = random.Next(settings.aditionMin2, settings.aditionMax2);
                        break;
                    case Oper.minus:
                        Digit1 = random.Next(settings.subtractionMin1, settings.subtractionMax1);
                        Digit2 = random.Next(settings.subtractionMin2, settings.subtractionMax2);
                        break;
                }
            }
            else
            {
            Digit1 = random.Next() % 20;

            do
            {
                Digit2 = random.Next() % 20;
            } while (_operat == Oper.division && Digit2 == 0);

            }

        }

        public bool answerHasDecimal()
        {
            if (_operat != Oper.division)
            {
                return false;
            }
            else
            {
                if (Digit1 % Digit2 != 0)
                {
                    return true;
                }
                else
                    return false;
            }
        }

        public int getDecimal()
        {
            if (answerHasDecimal())
            {
                int reminder = Digit1 % Digit2;
                int dec = (reminder * 10) / Digit2;
                return dec;
            }
            else
            {
                return 0;
            }
        }

        public bool UserAnswerIsCorrect(UserAnswer userAnswer)
        {
        
            if (!answerHasDecimal())
            {
                if (userAnswer.IsDeci)
                {
                    return false;
                }
                else
                {
                    if (this.getIntAnswer() == userAnswer.IntValue)
                        return true;
                }
            }
            else
            {
                if (!userAnswer.IsDeci)
                {
                    return false;
                }
                else
                {
                    if (this.getIntAnswer() == userAnswer.IntValue &&
                        this.getDecimal() == userAnswer.Deci)
                    {
                        return true;
                    }
                }
                //Nedan fungerade för 12/11
                //if (GetOneDeciAnswer() - userAnswer.FloatValue == 0)
                //{
                //    return true;
                //}
                //else
                //{
                //    return false;
                //}
            }
            return false;

        }

    }
}
