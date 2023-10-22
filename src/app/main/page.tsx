"use client";
import React, { useState, useEffect } from 'react';

interface Transaction {
  id: number;
  description: string;
  amount: number;
}

const Page = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const [editingId, setEditingId] = useState<number | null>(null);

    // คำนวณยอดรวมรายรับ
  const calculateIncome = () => {
    const incomeTransactions = transactions.filter((transaction) => transaction.amount > 0);
    return incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  };

  // คำนวณยอดรวมรายจ่าย
  const calculateExpenses = () => {
    const expenseTransactions = transactions.filter((transaction) => transaction.amount < 0);
    return Math.abs(expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0));
  };

  // คำนวณยอดรวมรายรับ - รายจ่าย
  const calculateBalance = () => {
    const income = calculateIncome();
    const expenses = calculateExpenses();
    return income - expenses;
  };



  const addTransaction = async () => {
    if (description.trim() === '' || amount === 0) {
      return;
    }
  
    const newTransaction: Transaction = {
      id: Date.now(),
      description,
      amount,
    };
    

    setTransactions([...transactions, newTransaction]);
    setDescription('');
    setAmount(0);
  };

  const editTransaction = (id: number) => {
    const transactionToEdit = transactions.find((transaction) => transaction.id === id);

    if (transactionToEdit) {
      setDescription(transactionToEdit.description);
      setAmount(transactionToEdit.amount);
      setEditingId(id);
    }
  };

  const updateTransaction = () => {
    if (description.trim() === '' || amount === 0 || editingId === null) {
      return;
    }

    const updatedTransactions = transactions.map((transaction) =>
      transaction.id === editingId ? { ...transaction, description, amount } : transaction
    );

    setTransactions(updatedTransactions);
    setDescription('');
    setAmount(0);
    setEditingId(null);
  };

  const deleteTransaction = (id: number) => {
    const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
    setTransactions(updatedTransactions);
  };

  return (
    <div>
      <h1>บันทึกรายรับและรายจ่าย</h1>

      <div>
        <input
          type="text"
          placeholder="รายละเอียด"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          placeholder="จำนวนเงิน"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
        {editingId === null ? (
          <button onClick={addTransaction}>เพิ่ม</button>
        ) : (
          <button onClick={updateTransaction}>บันทึก</button>
        )}
      </div>

      <div>
        <h2>รายการ</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={transaction.id}>
              {transaction.description}: {transaction.amount}
              <button onClick={() => editTransaction(transaction.id)}>แก้ไข</button>
              <button onClick={() => deleteTransaction(transaction.id)}>ลบ</button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p>รายรับ: {calculateIncome()}</p>
        <p>รายจ่าย: {calculateExpenses()}</p>
        <p>ยอดรวม: {calculateBalance()}</p>
      </div>
    </div>
  );
};

export default Page;
