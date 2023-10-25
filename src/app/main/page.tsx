"use client";
import React, { useState, useEffect , useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import './styles.css';


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

  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.push("/signin");
    return null;
  }


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

  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    async function fetchCurrencies() {
      try {
        const response = await fetch('https://apicurrency.saransun.repl.co/currencys');
        if (response.ok) {
          const data = await response.json();
          setCurrencies(data);
        } else {
          console.error('Failed to fetch currencies');
        }
      } catch (error) {
        console.error('Error fetching currencies:', error);
      }
    }

    fetchCurrencies();
  }, []);

  const tableRef = useRef(null);

  const scrollToTable = () => {
    if (tableRef.current) {
      // ให้เลื่อนไปยังตาราง
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };


  return (
    <div>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN"
        crossOrigin="anonymous"
      ></link>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>บันทึกรายรับและรายจ่าย</h1>
        <button
          style={{ marginLeft: 'auto' }}
          type="button"
          className="btn btn-dark"
          onClick={scrollToTable}
        >
          อัตราการแลกเปลี่ยน
        </button>
      </div>

      <div>
        <h2>รายการ</h2>
        <table className="table table-bordered">
            <thead>
              <tr>
                <th>รายละเอียด</th>
                <th>จำนวนเงิน</th>
                <th>ประเภท</th>
                <th>แก้ไข</th>
                <th>ลบ</th>
              </tr>
            </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id}>
                <td>{transaction.description}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.amount < 0 ? 'รายจ่าย' : 'รายรับ'}</td>
                <td>
                  <button onClick={() => editTransaction(transaction.id)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => deleteTransaction(transaction.id)}
                    className="red-button"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="inc-exp-container">        
        <div>
          <h4>รายรับ</h4><span className="money plus">{calculateIncome()} บาท</span>
        </div>
        <div>
          <h4>รายจ่าย</h4><span className="money minus">{calculateExpenses()} บาท</span>
        </div>
      </div>
      
      <div className="inc-exp-container">          
        <div>
          <h4>ยอดรวม </h4><h5>{calculateBalance()} บาท</h5>
        </div>
      </div>


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
          <h1><button className="btn btn-glow btn-gradient" onClick={addTransaction}>เพิ่ม</button></h1>
        ) : (
          <h1><button className="btn btn-glow btn-gradient" onClick={updateTransaction}>บันทึก</button></h1>
        )}
      </div>

      <div>
        <h2 ref={tableRef}>อัตราการแลกเปลี่ยน</h2>
        <div>
          <table className="table table-dark table-striped-columns">

            <thead>
              <tr>
                <th scope="col">ลำดับ</th>
                <th scope="col">ประเทศ</th>
                <th scope="col">รหัส</th>
                <th scope="col">รับเข้า</th>
                <th scope="col">ส่งออก</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency, index) => (
                <tr key={currency.currencycode}>
                  <th scope="row">{index + 1}</th>
                  <td>{currency.country}</td>
                  <td>{currency.currencycode}</td>
                  <td>{currency.import}</td>
                  <td>{currency.export}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>


    </div>
  );
};

export default Page;
