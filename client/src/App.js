import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react'
import io from 'socket.io-client';
import GetAccount from './GetAccount.js'
import DisplayAccount from './DisplayAccount'
import QRCard from './QRCard'

function App() {

const socket = io();

const [userInfo, setUserInfo] = useState();
const [invoiceAndQuote, setInvoiceAndQuote] = useState();
const [paidIndicator, setPaidIndicator] = useState(false);

socket.on('message', (res) => {
  //console.log(res);
  handleSocketMessage(res);
})

const handleSocketMessage = (res) => {
  console.log(invoiceAndQuote);
  console.log(invoiceAndQuote.invoice.invoiceId);
  console.log(res.invoiceId);
  console.log(res.status);

  if (res.invoiceId == invoiceAndQuote.invoice.invoiceId && res.status == 'PAID') {
    setPaidIndicator(true);
    setInvoiceAndQuote(null);
  }
}

const acceptUserInfo = (uInfo) => {
  //console.log(uInfo);
  setUserInfo(uInfo);
}

const acceptInvoiceAndQuote = (invoiceObject) => {
  //console.log(invoiceObject);
  setInvoiceAndQuote(invoiceObject);
  setPaidIndicator(false);
}

  return (
    <div className="App">
    <h1></h1>
      <GetAccount passUpUserInfo={acceptUserInfo}/>
      {userInfo && <DisplayAccount passUpInvoice={acceptInvoiceAndQuote} userInfo = {userInfo} /> }
      {invoiceAndQuote && <QRCard invoiceAndQuote={invoiceAndQuote}/>}
      {paidIndicator && <h1> Transaccion exitosa. </h1>}
    </div>
  );
}

export default App;