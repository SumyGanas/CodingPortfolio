import React from 'react';
import { db } from '../firebase.js'
import { Line } from 'react-chartjs-2';
import { collection, getDocs, limitToLast, orderBy, query } from "firebase/firestore";
import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

//Gets all of the trading account/portfolio data from portfolio collection
async function getPortData() {
    const cashArray = []
    const querySnapshot = await getDocs(collection(db, "portfolio"));
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    cashArray.push([doc.id,doc.data().cash])    
  })
    return cashArray;
};

async function GetOrderData(dateQuery) {
    const orderArray = [];
    const querySnapshot = await getDocs(collection(db, "orders", dateQuery, "orders"));
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const order = {
      "id" : doc.id,
      "symbol" : doc.data().symbol,
      "qty" : doc.data().qty,
      "transaction" : doc.data().side,
      "price" : doc.data().filled_avg_price 
    }
    orderArray.push(order)
    });
    return orderArray
  }


const TransactionTable = ({ dateQuery }) => {
  
  const [orders, setTransArray] = useState([]);
  useEffect (() => {
    async function getTransArray(dateQuery) {
       const TransArray = await GetOrderData(dateQuery);
      setTransArray(TransArray);
    }
    getTransArray(dateQuery);
  }, [dateQuery]);


  function renderTransaction(order) {
    return (
      <tr key={order.id}>
        <td>${order.symbol}</td>
        <td>{(order.qty * order.price)}</td>
      </tr>
    )
  }

  return (
      <Table striped bordered hover>
            {
            orders && orders.length > 0 ?  (
              <>
                <thead>
                  <tr>
                  <th>Symbol</th>
                  <th>Money Spent</th>
                  </tr> 
                </thead>
                <tbody>
                  {orders.map(renderTransaction)}
                </tbody>
             </>
            ) : (
            <>
                <thead>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan="4">No orders were placed today</td>
                  </tr>
                </tbody>
              </>  
             )
            }
        </Table>  
  );
}

const LineChart = () => {
  
  const [data, setData] = useState([]);
  useEffect ( () => {
    async function getPort() {
      const portData = await getPortData();
      setData(portData);
    } 
    getPort(); 
    

   
    
  },[]);
    const chartRef = useRef();
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const labels = data.map(([x]) => x); 
    const values = data.map(([, y]) => y); 



    // Chart data
    const chartData = {
      labels: labels,
      datasets: [{
        label: 'Portfolio Value',
        data: values,
        borderColor: '#b1f0df',
        borderWidth: 2,
        backgroundColor: '#b1f0df'
      }]
    };
  
    // Chart options
    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value, index, ticks) {
              return '$'+value.toLocaleString();
          }
          }
        }
      },
      plugins: { 
        tooltip: { 
            enabled: true,
            callbacks: { //Tooltip settings
              label: function(context) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
                }
                return label;
              },
        },
      },
    }
  };
  const [label, setLabel] = useState();
  const onClick = async (evt) => {
    const points = chartRef.current.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
    if (points.length) {
        const firstPoint = points[0];
        const newLabel = chartRef.current.data.labels[firstPoint.index];
        setLabel(newLabel);
        const value = chartRef.current.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        handleShow();
      }
    }

    return (
      <div>
        <Line ref={chartRef} data={chartData} options={chartOptions} onClick={onClick} />
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Portfolio Transactions</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <TransactionTable dateQuery={label}/>  
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <div><span style={{color : '#414e75', fontSize : '16px'}}><img className="img img-fluid p-1" src="/bulb.png" alt="Logo" width = "25" height = "25" /> Click on the points to view order details</span> </div>
      </div>
      
    );
    
  };

export default LineChart;
