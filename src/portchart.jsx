import React from 'react';
import { db } from './firebase.js'
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { collection, getDocs, limitToLast, orderBy, query } from "firebase/firestore";
import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

//Gets all of the trading account/portfolio data from portfolio collection
async function getPortData() {
    const cashArray = []
    const changeArray = []
    const q = query(collection(db, "portfolio"), orderBy("created_at"), limitToLast(30))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    cashArray.push([doc.id,doc.data().cash])
    changeArray.push([doc.id, (((Number(doc.data().portfolio_value) - Number(doc.data().last_equity))/Number(doc.data().portfolio_value))*100).toFixed(2)])
    
  })
    return changeArray;
};

// Get last 30 days of SPY data from FMP
async function getSpyData() {
  const spyArray = []
  const changeArray = []
  const apiKey = 'Yb5fn72ew0DmFJ6yAtCEtV9Ez26oB248'
  const path = `https://financialmodelingprep.com/stable/historical-price-eod/full?symbol=SPY&apikey=${apiKey}`
  try {
    const res = await fetch(path);
    const data = await res.json();
    spyArray.push(data.slice(0, 30)); 
    for (let i = 0; i < spyArray[0].length; i++) {
      changeArray.push(spyArray[0][i].changePercent);
    }
    return changeArray;
  } catch (err) {
    console.error('Fetch error:', err);
    return [];
  }
}


//Gets all the orders from a particular day
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

const OrderTable = ({ dateQuery }) => {
  
  const [orders, setOrderArray] = useState([]);
  useEffect (() => {
    async function getOrderArray(dateQuery) {
       const orderArray = await GetOrderData(dateQuery);
      setOrderArray(orderArray);
    }
    getOrderArray(dateQuery);
  }, [dateQuery]);

  function renderOrder(order) {
    return (
      <tr key={order.id}>
        <td>${order.symbol}</td>
        <td>{order.qty}</td>
        <td>{order.transaction}</td>
        <td>{order.price}</td>
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
                  <th>Quantity</th>
                  <th>Transaction</th>
                  <th>Price per Share</th>
                  </tr> 
                </thead>
                <tbody>
                  {orders.map(renderOrder)}
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

const PortChart = () => {
  
  const [data, setData] = useState([]);
  const [spyData, setSpyData] = useState([])
  useEffect ( () => {
    async function getPort() {
      const portData = await getPortData();
      const spyVals = await getSpyData();
      setData(portData);
      setSpyData(spyVals);
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
        label: 'Portfolio Change',
        data: values,
        borderColor: '#b1f0df',
        borderWidth: 2,
        backgroundColor: '#b1f0df'
      }, 
    {
      label: 'Spy Change',
        data: spyData,
        borderColor: '#945761',
        borderWidth: 2,
        backgroundColor: '#945761'
    }]
    };
  
    // Chart options
    const chartOptions = {

      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value, index, ticks) {
              return value + '%';
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
                    label += `${context.parsed.y}%`
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
            <Modal.Title>Order Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OrderTable dateQuery={label}/>  
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

export default PortChart;
