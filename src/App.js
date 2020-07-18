import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import { FormControl, Form } from 'react-bootstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPersonBooth, faLocationArrow, faHashtag, faEnvelope, faPhone, faMapPin, faUserPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import Table from 'react-bootstrap/Table';

function App() {
  const apiUrl="https://qdf9j1vva8.execute-api.ap-south-1.amazonaws.com/release";
  // let state={
  //   customer_name:"heelo"
  // };

  

  const [modalShow, setModalShow] = useState(false);
  let form, [isEdit, setIsEdit]=useState(false);
  const handleClose = () => setModalShow(false);
  const handleShow = () => setModalShow(true);

  const handleSubmit=async (event)=>{
    // console.log("submitted", event.target);
    event.preventDefault();
    console.log("sumitted");

    if(isEdit){
      console.log(selectedCustomer);

      const newData={
        _id:selectedCustomer._id,
        name,
        phone,
        email,
        gst,
        address,
        pin,
        state
      };

      const response=await (await fetch(`${apiUrl}/customers`, {
        method:"PUT",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(newData)
      })).json();

      console.log(response)

      let editedData=data.map(d=>{
        if(d._id == selectedCustomer._id){
          return newData;
        }
        return d;
      });
      
      setData(editedData);

    }else{
      let tempData=data;
      const newData={
        name,
        phone,
        email,
        gst,
        address,
        pin,
        state
      };

      const response=await (await fetch(`${apiUrl}/customers`, {
        method:"POST",
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(newData)
      })).json();

      console.log(response);

      tempData.push(response);
      

      setData(tempData)
    }

    setModalShow(false);
  }

  const addCustomer=(state, customer)=>{
    console.log(customer)
    state.push(customer);
    console.log(state);
    return state;
  }

  // let initialData=[
  //   {
  //     _id:Date.now(),
  //     name:"Shane",
  //     phone:"8442952816",
  //     email:"shaneromelkujur@gmail.com",
  //     address:"C/204",
  //     pin:"700014",
  //     state:"West Bengal",
  //     gst:"2343243"
  //   }
  // ], nameInput, phoneInput, emailInput, gstInput, addressInput, pinInput, stateInput;

  

  

  const [name, setName]=useState('');
  const [phone, setPhone]=useState('');
  const [email, setEmail]=useState('');
  const [gst, setGst]=useState('');
  const [address, setAddress]=useState('');
  const [pin, setPin]=useState('');
  const [state, setState]=useState('');

  const [selectedCustomer, setSelectedCustomer]=useState();
  const [data, setData]=useState([]);

  useEffect(()=>{
    fetch("https://qdf9j1vva8.execute-api.ap-south-1.amazonaws.com/release/customers").then(response=>response.json()).then(data=>setData(data));
  }, []);

  

  console.log("changed")

  const openEditModal=(id)=>{
    const customer=data.filter((value)=>{
      if(value._id==id){
        return value
      }
    })[0];
    setIsEdit(true)
    console.log(customer)

    setSelectedCustomer(customer);

    if(customer){
      setName(customer.name);
      setPhone(customer.phone);
      setEmail(customer.email);
      setGst(customer.gst);
      setAddress(customer.address);
      setPin(customer.pin);
      setState(customer.state);
    }

    setModalShow(true)

  }

  const openEnterModal=()=>{
    setName('')
    setPhone('');
    setEmail('');
    setGst('');
    setAddress('');
    setPin('');
    setState('');
    setIsEdit(false);
    setModalShow(true);
  }

  const handleFormChange=(event)=>{
    console.log(event.target.name, event.target.value);
    const value=event.target.value;

    switch(event.target.name){
      case "name":
        setName(value);
      break;
      case "phone":
        setPhone(value);
      break;
      case "email":
        setEmail(value);
      break;
      case "gst":
        setGst(value);
      break;
      case "address":
        setAddress(value);
      break;
      case "pin":
        setPin(value);
      break;
      case "state":
        setState(value);
      break;
    }
  }
  
  return (
    <>
    <Navbar bg="light" className="justify-content-between" expand="lg">
      <Navbar.Brand href="#home">Customer data</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      <Button onClick={openEnterModal} variant="outline-info">Add New Customer</Button>

    </Navbar>

    <Table responsive>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Mobile Number</th>
          <th>Address</th>
          <th>City pincode</th>
          <th>State</th>
          <th>GST Number</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>

        {data.map((value, index)=>{
          return <tr key={value._id}>
            <td>{value.name}</td>
            <td>{value.email}</td>
            <td>{value.phone}</td>
            <td>{value.address}</td>
            <td>{value.pin}</td>
            <td>{value.state}</td>
            <td>{value.gst}</td>
            <td>
              <Button onClick={()=>openEditModal(value._id)} variant="secondary">
                <FontAwesomeIcon icon={faPen} />
              </Button>
            </td>
          </tr>
        })}
      </tbody>
    </Table>

    <Modal onHide={handleClose} show={modalShow}>
      <Modal.Header closeButton>
        <Modal.Title>Please {isEdit ? 'edit' : 'enter'} customer details</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form onSubmit={handleSubmit} ref={(ref)=>{form=ref;}}> 
          <Form.Group controlId="name">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faPersonBooth} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Customer name"
                aria-label="Username"
                aria-describedby="basic-addon1"
                value={name}
                name="name"
                onChange={handleFormChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="phone">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faPhone} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Mobile Number"
                aria-label="phone"
                aria-describedby="basic-addon1"
                name="phone"
                value={phone}
                onChange={handleFormChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="email">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Email"
                aria-label="Email"
                aria-describedby="basic-addon1"
                name="email"
                value={email}
                onChange={handleFormChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="gst">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faHashtag} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="GST No"
                aria-label="GST"
                aria-describedby="basic-addon1"
                name="gst"
                value={gst}
                onChange={handleFormChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="address">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faLocationArrow} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Customer address"
                aria-label="Address"
                aria-describedby="basic-addon1"
                name="address"
                value={address}
                onChange={handleFormChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="pincode">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faMapPin} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="City pincode"
                aria-label="Address"
                aria-describedby="basic-addon1"
                name="pin"
                value={pin}
                onChange={handleFormChange}
              />
            </InputGroup>
          </Form.Group>

          <Form.Group controlId="state">
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">
                  <FontAwesomeIcon icon={faUserPlus} />
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="State"
                aria-label="State"
                aria-describedby="basic-addon1"
                name="state"
                value={state}
                onChange={handleFormChange}
              />
            </InputGroup>
          </Form.Group>

        </form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={()=>setModalShow(false)}>
          Close
        </Button>
        <Button onClick={ () => { form.dispatchEvent(new Event('submit')) }} variant="primary">
          Add
        </Button>
      </Modal.Footer>
    </Modal>

    </>

  );
}

export default App;
