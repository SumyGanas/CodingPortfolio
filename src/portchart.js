import React from 'react';
import db from './firebase.js'
import { Line } from 'react-chartjs-2';
import { collection, getDocs } from "firebase/firestore";
import { useRef, useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Table from 'react-bootstrap/Table';
import { Chart } from 'chart.js/auto';
import bulb from './static_files/bulb.png';

//Gets all of the trading account/portfolio data from portfolio collection
async function getPortData() {
    const cashArray = []
    const querySnapshot = await getDocs(collection(db, "portfolio"));
    querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
    cashArray.push([doc.id,doc.data().cash])
    
  })
    return cashArray
};

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
        label: 'Cash Available',
        data: values,
        borderColor: '#577494',
        borderWidth: 2,
        backgroundColor: '#577494'
      }]
    };
  
    // Chart options
    const chartOptions = {

      scales: {
        y: {
          beginAtZero: true
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
    console.log(points)
    if (points.length) {
        const firstPoint = points[0];
        const newLabel = chartRef.current.data.labels[firstPoint.index];
        setLabel(newLabel);
        const value = chartRef.current.data.datasets[firstPoint.datasetIndex].data[firstPoint.index];
        console.log(newLabel, value);
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
        <div><span style={{color : '#414e75', fontSize : '12px'}}><img className="img img-fluid p-1" src={bulb} alt="Logo" width = "25" height = "25" /> Click on the points to view order details</span> </div>
      </div>
      
    );
    
  };

export default LineChart;