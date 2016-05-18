using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MathQuiz1;


namespace UnitTest_mathquiz1
{
    [TestClass]
    public class UnitTest1
    {
        /* Testa klassen Question */
        [TestMethod]
        public void TestAdditionHeltal()
        {
            Question q = new MathQuiz1.Question(20, 30, Oper.plus);
            Assert.AreEqual(q.getIntAnswer(), 50);
        }
        [TestMethod]
        public void TestMinusHeltal()
        {
            Question q = new Question(30, 20, Oper.minus);
            Assert.AreEqual(q.getIntAnswer(), 10);
        }
        [TestMethod]
        public void TestGangerHeltal()
        {
            Question q = new Question(10, 11, Oper.multiplication);
            Assert.AreEqual(q.getIntAnswer(), 110);
        }
        [TestMethod]
        public void TestDivisionHeltalUtanRest()
        {
            Question q = new Question(15, 3, Oper.division);
            Assert.AreEqual(q.getIntAnswer(), 5);
        }
        [TestMethod]
        public void TestPlusNegativt()
        {
            Question q = new Question(15, -14, Oper.plus);
            Assert.AreEqual(q.getIntAnswer(), 1);
        }
        [TestMethod]
        public void TestMinusNegativt()
        {
            Question q = new Question(10, -5, Oper.minus);
            Assert.AreEqual(q.getIntAnswer(), 15);
        }
        [TestMethod]
        public void TestGangerNegativt1()
        {
            Question q = new Question(-5, 20, Oper.multiplication);
            Assert.AreEqual(q.getIntAnswer(), -100);
        }
        [TestMethod]
        public void TestDivisionDecimal()
        {
            Question q = new Question(10, 3, Oper.division);
            Assert.AreEqual(q.GetOneDeciAnswer(), 3.3);
        }

        /* Testa klassen UserAnswer */
        [TestMethod]
        public void TestUserAnswerIsSet()
        {
            UserAnswer ua = new UserAnswer();
            ua.SetAnswer("22.3");
            Assert.IsNotNull(ua.FloatValue);
        }
        [TestMethod]
        public void TestUserAnswerIs10AndHalf()
        {
            UserAnswer ua = new UserAnswer();
            ua.SetAnswer("10.5");
            Assert.AreEqual(ua.FloatValue, 10.5f);
        }
    }
}
