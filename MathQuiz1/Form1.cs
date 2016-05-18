using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MathQuiz1
{
    public struct MathQuizSettings
    {
        public bool isset;

        public int divisionMax1;
        public int divisionMin1;
        public int divisionMax2;
        public int divisionMin2;
        public int multiplicationMax1;
        public int multiplicationMin1;
        public int multiplicationMax2;
        public int multiplicationMin2;
        public int aditionMax1;
        public int aditionMin1;
        public int aditionMax2;
        public int aditionMin2;
        public int subtractionMax1;
        public int subtractionMin1;
        public int subtractionMax2;
        public int subtractionMin2;
    }
    public partial class Form1 : Form
    {
        Question question = new Question(12,11);
        UserAnswer userAnswer = new UserAnswer();
        char lastKey;
        bool hasComma;
        int decimalZeroCount, decimalCount;
        MathQuizSettings settings;

        public Form1()
        {
            InitializeComponent();
            //To do: Hämta 
            settings.divisionMax1 = 15;
            settings.divisionMin1 = 5;
            settings.divisionMax2 = 10;
            settings.divisionMin2 = 1;
            settings.multiplicationMax1 = 11;
            settings.multiplicationMin1 = 0;
            settings.multiplicationMax2 = 14;
            settings.multiplicationMin2 = 1;
            settings.aditionMax1 = 60;
            settings.aditionMin1 = -1;
            settings.aditionMax2 = 75;
            settings.aditionMin2 = 10;
            settings.subtractionMax1 = 200;
            settings.subtractionMin1 = 5;
            settings.subtractionMax2 = 155;
            settings.subtractionMin2 = 1;
            settings.isset = true;


            label2.Text = question.Digit1 + " " + question.OperatorSymbol + " " + question.Digit2;

            if (question.Operator == Oper.division)
            {
                lblInfo.Text = "Om det blir decimaler, skriv bara en (utan avrundning)...";
            }
            else
            {
                lblInfo.Text = "";
            }
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            userAnswer.Clear();

            question.Shake(settings);
            label2.Text = question.Digit1 + " " + question.OperatorSymbol + " " + question.Digit2;

            if(question.Operator == Oper.division)
            {
                lblInfo.Text = "Om det blir decimaler, skriv bara en (utan avrundning)...";
            }
            else
            {
                lblInfo.Text = "";
            }
            txtBoxAnswer.Text = "";


            if (lblLatOssBorja.Visible == true)
            {
                lblLatOssBorja.Visible = false;
            }

        }

        private void btnAnswered_Click(object sender, EventArgs e)
        {


            if (txtBoxAnswer.Text.Contains('.'))
            {
                txtBoxAnswer.Text=txtBoxAnswer.Text.Replace('.', ',');
            }

            if (hasComma && decimalCount == decimalZeroCount && decimalCount>1)
            {
                //Ta bort onödiga nollor
                txtBoxAnswer.Text = txtBoxAnswer.Text.Remove(txtBoxAnswer.Text.IndexOf(',')+1, decimalCount-1);
            }
            if (userAnswer.SetAnswer(txtBoxAnswer.Text))
            {


                lblInfo.Text = "Lyckades ta answer - " + userAnswer.ToString();
                if (question.UserAnswerIsCorrect(userAnswer))
                {
                    lblInfo.Text = "Rätt";
                    //userAnswer.Clear();
                }
                else
                {
                    lblInfo.Text = userAnswer.ToString() + " är Fel ";//+ userAnswer.IsDeci;
                    //userAnswer.Clear();
                }

                lblAnswerHasDeci.Text = question.answerHasDecimal().ToString();
            }
            else
            {
                lblInfo.Text = "Lyckades ej ta answer";
            }
        }

        private void btnGetAnswer_Click(object sender, EventArgs e)
        {
            if(!question.answerHasDecimal())
                lblInfo.Text = question.getAnswerString();
            else
            {
                lblInfo.Text = question.getIntAnswer().ToString() + "," + question.getDecimal().ToString();
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void txtBoxAnswer_TextChanged(object sender, EventArgs e)
        {
            //lblInfo.Text = e.ToString();
        }

        private void btnTestUA_Click(object sender, EventArgs e)
        {
            lblInfoTextTest.Text = userAnswer.FloatValue.ToString();
        }

        private void txtBoxAnswer_KeyPress(object sender, KeyPressEventArgs e)
        {
            lastKey = e.KeyChar;
            switch (lastKey)
            {
                case ',':
                case '.':
                    hasComma = true;
                    decimalZeroCount = decimalCount = 0;
                    break;
                case '0':
                    decimalZeroCount++;
                    break;

                    
            }
            if (lastKey >= '0' && lastKey <= '9') decimalCount++;
        }
    }
}
