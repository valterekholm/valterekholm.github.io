using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MathQuiz1
{
    public class UserAnswer
    {
        string value;
        int intValue;
        double floatValue;
        int dec;
        bool isDeci;

        public UserAnswer()
        {
            isDeci = false;
        }

        public string Value
        {
            get
            {
                return value;
            }
        }

        public int IntValue
        {
            get
            {
                return intValue;
            }
        }

        public double FloatValue
        {
            get
            {
                return floatValue;
            }
        }

        public int Deci
        {
            get
            {
                return dec;
            }
        }

        public bool IsDeci
        {
            get
            {
                return isDeci;
            }
        }
        public bool SetAnswer(string str)
        {
            int tenTimesBigger;
            value = str;
            if(int.TryParse(str, out intValue))
            {
                isDeci = false;
                return true;
            }
            else if(double.TryParse(str, out floatValue)){
                
                intValue = (int)floatValue;
                tenTimesBigger = (int)(floatValue * 10);
                dec = (tenTimesBigger - (intValue * 10));
                isDeci = true;
                return true;

            }
            else
            {
                intValue = 0;
                return false;
            }

        }

        public void Clear()
        {
            value = "";
            intValue = 0;
            floatValue = 0;
            dec = 0;
            isDeci = false;
        }

        override public string ToString()
        {
            if (isDeci)
            {
                return floatValue.ToString();
            }
            else return intValue.ToString();
        }
    }
}
