import React, {Component} from 'react'
import { connect } from 'react-redux';
import { trls } from '../../components/translate';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
// import SessionManager from '../../components/session_manage';
import Select from 'react-select';
// import API from '../../components/api'
// import Axios from 'axios';
// import * as Auth from '../../components/auth'
// import  { Link } from 'react-router-dom';
// import * as authAction  from '../../actions/authAction';
// import Slider from 'react-bootstrap-slider';
// import "bootstrap-slider/dist/css/bootstrap-slider.css"
// import $ from 'jquery';
import { BallBeat } from 'react-pure-loaders';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'datatables.net';
// import history from '../../history';

const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({

});

class Placemanage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            rows: []
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        // let pathname = window.location.pathname;
        // let pathArray = pathname.split('/')
        // let orderId = pathArray.pop();
        // this.setState({orderId: orderId})
    }
    
    handleAddRow = () => {
        const item = {
          productcode:''
        };
        // if(!this.state.addnum){
          this.setState({
              rows: [...this.state.rows, item]
          });
          this.setState({addnum:true})
        // }
        
      };
    // showOrderDetail = (orderId) => {
    //     history.push({
    //         pathname: '/order-detail/orderId',
    //         state: { id: orderId, newSubmit:true }
    //       })
    // }
    
    render(){   
        return (
            <div className="order_div">
                <div className="content__header content__header--with-line">
                    <div id="google_translate_element"></div>
                    <h2 className="title">{trls("Place_an_order")}</h2>
                </div>
                <Container>
                    <Row className="order__info-bill">
                        <Col sm={6} style={{paddingLeft: 0, paddingTop: 10}}>
                            <Form className="container product-form" onSubmit = { this.handleSubmit }>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        {trls("Requested_Delivery_Date")}  
                                    </Form.Label>
                                    <Col sm="8" className="product-text">
                                    <DatePicker name="startdate" className="myDatePicker" dateFormat="dd-MM-yyyy" selected={new Date()} onChange={date =>this.setState({startdate:date})} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        {trls("PO_Reference")}  
                                    </Form.Label>
                                    <Col sm="8" className="product-text">
                                        <Form.Control type="text" name="reference" required placeholder={trls('PO_Reference')} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        {trls("Billing_Address")}  
                                    </Form.Label>
                                    <Col sm="8" className="product-text">
                                        <Select
                                            name="billingaddress"
                                            placeholder={trls('Billing_Address')}
                                            // options={this.state.supplier}
                                            onChange={val => this.setState({val1:val})}
                                            // defaultValue = {this.getSupplierData()}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        {trls("Shipping_Address")}  
                                    </Form.Label>
                                    <Col sm="8" className="product-text">
                                        <Select
                                            name="shippingaddress"
                                            placeholder={trls('Shipping_Address')}
                                            // options={this.state.supplier}
                                            onChange={val => this.setState({val1:val})}
                                            // defaultValue = {this.getSupplierData()}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} controlId="formPlaintextPassword">
                                    <Form.Label column sm="4">
                                        {trls("Order_Comments")}  
                                    </Form.Label>
                                    <Col sm="8" className="product-text">
                                        <Form.Control as="textarea" rows="3" placeholder={trls('Order_Comments')} />
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={2}>
                        </Col>
                        <Col sm={4} style={{paddingLeft: 0, paddingTop: 50}}>
                            <div className="place-and-orders__addresses">
                                <div className="place-and-orders__addresses-item">
                                    <div className="txt-bold">Billing Address</div>
                                    <div className="place-and-orders__addresses-item-row">Frankfurt</div>
                                    <div className="place-and-orders__addresses-item-row">
                                        Neue Mainzer Str. 52-58, 60311 Frankfurt am Main
                                    </div>
                                    <div className="place-and-orders__addresses-item-row">
                                        Germany
                                    </div>
                                </div>
                                <div className="place-and-orders__addresses-item">
                                    <div className="txt-bold">Shipping Address</div>
                                    <div className="place-and-orders__addresses-item-row">Ul. Rymarska 16/5</div>
                                    <div className="place-and-orders__addresses-item-row">
                                        Wroclaw doloslaskie
                                    </div>
                                    <div className="place-and-orders__addresses-item-row">
                                        Poland
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="table-responsive">
                        <table id="example" className="place-and-orders__table table table--striped prurprice-dataTable" width="100%">
                        <thead>
                            <tr>
                                <th>{trls("Product_Lookup")}</th>
                                <th>{trls("Description")}</th>
                                <th>{trls("Quantity")}</th>
                                <th>{trls("Item_Price")}</th>
                                <th>{trls("Line_Total")}</th>
                                <th>{trls("Price")}</th>
                            </tr>
                        </thead>
                        {this.state.rows &&(<tbody>
                            {
                                this.state.rows.map((data,i) =>(
                                <tr id={data.id} key={i}>
                                    <td>
                                        <Form.Control type="text" name="product" required placeholder={trls('Search')} />
                                    </td>
                                    <td>
                                        <i className="fas fa-tasks" style={{fontSize: 18, cursor: "pointer"}}></i>
                                    </td>
                                    <td>
                                        <Form.Control type="text" name="quantity" required placeholder={trls('Quantity')} />
                                    </td>
                                    <td>
                                        49.99
                                    </td>
                                    <td>
                                        49.99
                                    </td>
                                    <td>
                                        €1,025.00
                                    </td>
                                </tr>
                            ))
                            }
                        </tbody>)}
                    </table>
                    { this.state.loading&& (
                    <div className="col-md-4 offset-md-4 col-xs-12 loading" style={{textAlign:"center"}}>
                        <BallBeat
                            color={'#222A42'}
                            loading={this.state.loading}
                        />
                    </div>
                    )}
                </div>
                <div>
                    <Button variant="secondary" style={{height: 40, borderRadius: 20}} onClick={()=>this.handleAddRow()}>{trls('Click_to_make_new_row')}</Button>
                </div>
                <Col sm={4} style={{float: 'right', paddingLeft: 0, paddingRight: 0}}>
                    <div className="info-block info-block--green">
                        <span className="txt-bold">Order Total</span>
                        <span>€428.00</span>
                    </div>
                    <Button variant="secondary" style={{height: 50, borderRadius: 5, float: 'right'}} onClick={()=>this.handleAddRow()}>{trls('Submit_Order')}</Button>
                </Col>
            </Container>
        </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Placemanage);