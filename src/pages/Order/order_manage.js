import React, {Component} from 'react'
import { connect } from 'react-redux';
import { trls } from '../../components/translate';
import { Row, Col } from 'react-bootstrap';
// import SessionManager from '../../components/session_manage';
import Select from 'react-select';
// import API from '../../components/api'
// import Axios from 'axios';
// import * as Auth from '../../components/auth'
// import  { Link } from 'react-router-dom';
// import * as authAction  from '../../actions/authAction';
// import Slider from 'react-bootstrap-slider';
// import "bootstrap-slider/dist/css/bootstrap-slider.css"
import $ from 'jquery';
import { BallBeat } from 'react-pure-loaders';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'datatables.net';
import history from '../../history';

const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({

});

class Ordermanage extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        $('#example').dataTable().fnDestroy();
        $('#example').DataTable(
            {
              "language": {
                  "lengthMenu": trls("Show")+" _MENU_ "+trls("Entries"),
                  "zeroRecords": "Nothing found - sorry",
                  "info": trls("Show_page")+" _PAGE_ of _PAGES_",
                  "infoEmpty": "No records available",
                  "infoFiltered": "(filtered from _MAX_ total records)",
                  "search": trls('Search'),
                  "paginate": {
                    "previous": trls('Previous'),
                    "next": trls('Next')
                  }
              }
            }
          );
    }

    showOrderDetail = (orderId) => {
        history.push({
            pathname: '/order-detail/'+orderId,
            state: { id: orderId, newSubmit:true }
          })
    }
    
    render(){   
        return (
            <div className="order_div">
                <div className="content__header content__header--with-line">
                    <div id="google_translate_element"></div>
                    <h2 className="title">{trls("Orders")}</h2>
                </div>
                <div className="orders">
                    <Row className="order_filter">
                        <Col md={2} style={{paddingLeft: 0}}>
                            <Select
                                name="filter"
                                //options={}
                                className="select-order_view-filter"
                                onChange={val => this.setState({showMode: val.value})}
                                //defaultValue={}
                            />
                        </Col>
                        <Col lg={4} xl={3} style={{display: "flex", marginRight: 30, paddingLeft: 0}}>
                            <span style={{marginTop:6}}>{trls('Order_Date')}</span>
                            <div style={{display: "flex", paddingLeft: 12}}>
                                <DatePicker name="startdate" className="myDatePicker order-filter_date" dateFormat="dd-MM-yyyy" selected={new Date()} onChange={date =>this.setState({startdate:date})} />
                                <DatePicker name="startdate" className="myDatePicker order-filter_date" dateFormat="dd-MM-yyyy" selected={new Date()} onChange={date =>this.setState({startdate:date})} />
                            </div>
                        </Col>
                        <Col lg={4} xl={3} style={{display: "flex", paddingLeft: 0}}>
                            <span style={{marginTop:6}}>{trls('Shipping_Date')}</span>
                            <div style={{display: "flex"}}>
                                <DatePicker name="startdate" className="myDatePicker order-filter_date" dateFormat="dd-MM-yyyy" selected={new Date()} onChange={date =>this.setState({startdate:date})} />
                                <DatePicker name="startdate" className="myDatePicker order-filter_date" dateFormat="dd-MM-yyyy" selected={new Date()} onChange={date =>this.setState({startdate:date})} />
                            </div>
                        </Col>
                    </Row>
                    <div className="table-responsive">
                            <table id="example" className="place-and-orders__table table table--striped prurprice-dataTable" width="100%">
                            <thead>
                                <tr>
                                    <th>{trls("Sales_No")}</th>
                                    <th>{trls("PO_No")}</th>
                                    <th>{trls("Order_Date")}</th>
                                    <th>{trls("Shipping_Date")}</th>
                                    <th>{trls("Total")}</th>
                                    <th>{trls("Currency")}</th>
                                    <th>{trls("Status")}</th>
                                    <th>{trls("Download")}</th>
                                </tr>
                            </thead>
                            {/* {productData && !this.state.loading&&(<tbody>
                                {
                                    productData.map((data,i) =>(
                                    <tr id={data.id} key={i}>
                                        <td>
                                        <div id={data.id} style={{cursor: "pointer", color:'#004388', fontSize:"14px", fontWeight:'bold'}} onClick={this.loadProductDetail}>{data.Productcode}</div>
                                        </td>
                                        <td>
                                            {data.Supplier}
                                        </td>
                                        <td>{data.Product}</td>
                                        <td>{data.Customer}</td>
                                        <td>{data.Productgroup}</td>
                                        <td>{data.SalesUnit}</td>
                                        <td>{data.Kilogram}</td>
                                        <td>
                                        <Row style={{justifyContent:"center"}}>
                                            <img src={require("../../assets/images/icon-orders.svg")} id={data.id} alt="copy" className="statu-item" onClick={()=>this.copyProduct(data)}/>
                                        </Row>
                                        </td>
                                    </tr>
                                ))
                                }
                            </tbody>)} */}
                            <tbody>
                                <tr>
                                    <td>
                                        <div style={{cursor: "pointer", color:'#004388', fontSize:"14px", fontWeight:'bold'}} onClick={()=>this.showOrderDetail(72827193)}>72827193</div>
                                    </td>
                                    <td>
                                        <a href="/#">ABC-728178</a>
                                    </td>
                                    <td>09/04/18</td>
                                    <td>13/04/18</td>
                                    <td>3,873.92</td>
                                    <td>EUR</td>
                                    <td>
                                        <div className="table-status">
                                            <img src={require("../../assets/images/icon-open-box.svg")} alt="open"/>
                                            <span>Open</span>
                                        </div>
                                    </td>
                                    <td>
                                        <img src={require("../../assets/images/icon-pdf.svg")} alt="pdf"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{cursor: "pointer", color:'#004388', fontSize:"14px", fontWeight:'bold'}} onClick={()=>this.showOrderDetail(72827193)}>72827193</div>
                                    </td>
                                    <td>
                                        <a href="/#">ABC-728178</a>
                                    </td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>1,928.31</td>
                                    <td>EUR</td>
                                    <td>
                                        <div className="table-status">
                                            <img src={require("../../assets/images/icon-draft.svg")} alt="Draft"/>
                                            <span>Draft</span>
                                        </div>
                                    </td>
                                    <td>
                                        <img src={require("../../assets/images/icon-pdf.svg")} alt="pdf"/>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div style={{cursor: "pointer", color:'#004388', fontSize:"14px", fontWeight:'bold'}} onClick={()=>this.showOrderDetail(72827193)}>72827193</div>
                                    </td>   
                                    <td>
                                        <a href="/#">ABC-728178</a>
                                    </td>
                                    <td>N/A</td>
                                    <td>N/A</td>
                                    <td>2,192.11</td>
                                    <td>EUR</td>
                                    <td>
                                        <div className="table-status">
                                            <img src={require("../../assets/images/icon-cancelled.svg")} alt="cancelled"/>
                                            <span>Cancelled</span>
                                        </div>
                                    </td>
                                    <td>
                                        <img src={require("../../assets/images/icon-pdf.svg")} alt="pdf"/>
                                    </td>
                                </tr>
                            </tbody>
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
                </div>
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Ordermanage);