import React, {Component} from 'react'
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import SessionManager from '../../components/session_manage';
import API from '../../components/api'
import Axios from 'axios';
import { trls } from '../../components/translate';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';

const mapStateToProps = state => ({ 
    ...state.auth,
});

const mapDispatchToProps = (dispatch) => ({

});

class Addpurchase extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {  
            filsterList: [{"value": "1", "label": "Packing slip"}, {"value": "2", "label": "Containernumber"}, {"value": "3", "label": "Shippingdocument "}],
            quantity: 0,
            filterValue: '',
            productData: [],
            checkedData: []
        };
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    
    componentDidMount() {
        this.getProductList();
    }

    handleSubmit = (event) => {
        console.log('4231', this.props)
        event.preventDefault();
        const clientFormData = new FormData(event.target);
        const data = {};
        let params = [];
        let URL = '';
        for (let key of clientFormData.keys()) {
            data[key] = clientFormData.get(key);
        }
       
        var headers = SessionManager.shared().getAuthorizationHeader();
        if(data.filter==="1"){
            params = {
                supplier: this.props.suppliercode,
                number: data.number
            }
            if(!this.props.transport){
                URL = API.GetOrderLinesByPacking;
            }else{
                URL = API.GetTransportLinesByPacking;
            }
            Axios.post(URL, params, headers)
            .then(result => {
                if(this._isMounted){
                    this.setState({productData: result.data.Items})
                }
            });
        }else if(data.filter==="2"){
            params = {
                supplier: this.props.suppliercode,
                number: data.number
            }
            if(!this.props.transport){
                URL = API.GetOrderLinesByContainer;
            }else{
                URL = API.GetTransportLinesByContainer;
            }
            Axios.post(URL, params, headers)
            .then(result => {
                if(this._isMounted){
                    this.setState({productData: result.data.Items})
                }
            });
        }else if(data.filter==="3"){
            params = {
                supplier: this.props.suppliercode,
                number: data.number
            }
            if(!this.props.transport){
                URL = API.GetOrderLinesByShipping;
            }else{
                URL = API.GetTransportLinesByShipping;
            }
            Axios.post(URL, params, headers)
            .then(result => {
                if(this._isMounted){
                    this.setState({productData: result.data.Items})
                }
            });
        }
    }
    
    getProductList = () =>{
        this._isMounted = true;
        var headers = SessionManager.shared().getAuthorizationHeader();
        var params = {
            customercode: this.props.customercode,
            suppliercode: this.props.suppliercode
        }
        Axios.post(API.GetSalesItems, params, headers)
        .then(result => {
            if(this._isMounted){
                let product = result.data.Items.map( s => ({value:s.key,label:s.value}));
                this.setState({productListData: product});
            }
        });
    }

    changeProductId = (id) => {
        let productArray = this.state.productData;
        productArray.map((product, index)=>{
            if(product.id===id){
                if(product.checked){
                    product.checked = false
                }else{
                    product.checked = true
                }
            }
            return productArray;
        });
        this.setState({productData: productArray});
    }

    postPurchaseLines = () => {
        let product = this.state.productData;
        let params = [];
        var headers = SessionManager.shared().getAuthorizationHeader();
        if(!this.props.transport){
            product.map((product, index)=>{
                if(product.checked){
                    params = {
                        purchaseid: this.props.purchaseid,
                        id: product.id
                    }
                    Axios.post(API.PostPurchaseOrderLine, params, headers)
                    .then(result => {
                        params ={ 
                            id: product.id,
                            postId: result.data.NewId
                        }
                        Axios.post(API.PutSalesPurchaseId, params, headers)
                        .then(result => {
                            if(index===this.state.productData.length-1){
                                this.onHide();
                            }
                        });
                    });
                }
                
                return product;
            });
        }else{
            product.map((product, index)=>{
                if(product.checked){
                    params = {
                        purchaseid: this.props.purchaseid,
                        id: product.id
                    }
                    Axios.post(API.PostPurchaseLinesTransport, params, headers)
                    .then(result => {
                        params ={ 
                            id: product.id,
                            postId: result.data.NewId
                        }
                        Axios.post(API.PutTransportPurchaseId , params, headers)
                        .then(result => {
                            if(index===this.state.productData.length-1){
                                this.onHide();
                            }
                        });
                    });
                }
                
                return product;
            });
        }
    }

    onHide = () => {
        this.setState({
            quantity: 0,
            filterValue: '',
            productData: [],
            checkedData: []
        })
        this.props.onHide();
        this.props.getPurchaseOrderLines();
    }

    render(){
        return (
            <Modal
                show={this.props.show}
                onHide={()=>this.onHide()}
                size="xl"
                aria-labelledby="contained-modal-title-vcenter"
                backdrop= "static"
                centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {!this.props.transport?(
                        trls('Purchase')
                    ):trls('Transport')}
                    
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className="container product-form" onSubmit = { this.handleSubmit }>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            Where do you want to filter on
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            <Select
                                name="filter"
                                options={this.state.filsterList}
                                onChange={val => this.setState({filterValue: val.value})}
                            />
                            {!this.props.disabled && (
                                <input
                                    onChange={val=>console.log()}
                                    tabIndex={-1}
                                    autoComplete="off"
                                    style={{ opacity: 0, height: 0 }}
                                    value={this.state.filterValue}
                                    required
                                />
                            )}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                            {trls("Number")}  
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            <Form.Control type="text" name="number" required defaultValue={this.state.quantity} placeholder={trls("Quantity")}  />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} controlId="formPlaintextPassword">
                        <Form.Label column sm="3">
                        </Form.Label>
                        <Col sm="9" className="product-text">
                            <Button type="submit" style={{width:"100px", float: 'right'}}>{trls('Search')}</Button>
                        </Col>
                    </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <div className="table-responsive">
                            <table id="example" className="place-and-orders__table table table--striped prurprice-dataTable" width="100%">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>{!this.props.transport ? trls('Productcode') : trls('Pricingtype')}</th>
                                        <th>{!this.props.transport ? trls('Quantity') : trls('Price')}</th>
                                    </tr>
                                </thead>
                                {this.state.productData.length>0 ? (
                                    <tbody>
                                    {
                                        this.state.productData.map((data,i) =>(
                                        <tr id={data.id} key={i}>
                                            <td><input type="checkbox" onChange={()=>this.changeProductId(data.id)} /></td>
                                            <td>{!this.props.transport ? data.ProductCode :data.pricingtype}</td>
                                            <td>{!this.props.transport ? data.Quantity : data.price}</td>
                                        </tr>
                                    ))
                                    }
                                </tbody>):
                                <tbody>
                                    <tr>
                                        <td colSpan='3'>{trls('No_Result')}</td>
                                    </tr>
                                </tbody>}
                            </table>
                        </div>     
                    </Form.Group>
                    <Form.Group style={{textAlign:"center"}}>
                        <Button style={{width:"100px"}} onClick={()=>this.postPurchaseLines()}>{trls('Save')}</Button>
                    </Form.Group>
                </Form>
            </Modal.Body>
            </Modal>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Addpurchase);