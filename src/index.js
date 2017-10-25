import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import registerServiceWorker from './registerServiceWorker';


let App = React.createClass({
    getItems: function() {
        // some request here
        return [{
            id: 1,
            name: 'Pasta Carbonara',
            price: 12.00,
            currency: '$',
            Total:0,


        },
            {
                id: 2,
                name: 'Margherita Pizza',
                price: 27.00,
                currency: '$',
                Total:0,


            },
            {
                id: 3,
                name: 'Mushroom Risotto',
                price: 16.00,
                currency: '$',
                Total:0,


            },
            {
                id: 4,
                name: 'panzenella',
                price: 10.00,
                currency: '$',
                Total:0,


            },
            {
                id: 5,
                name: 'Bruschetta',
                price: 10.00,
                currency: '$',
                Total:0,


            },
            {
                id: 6,
                name: 'Tiramisu',
                price: 6.00,
                currency: '$',
                Total:0,


            }];
    },
    getInitialState: function() {
        return {
            items: this.getItems(),
            cart: [],
            total:0
        }
    },
    addToCart: function(item) {
        let found = false;
        let total=this.state.total
        total+=item.price;
        //this.calTotal(item)
        let updatedCart = this.state.cart.map((cartItem) => {
            if (cartItem.name === item.name) {
                found = true;
                cartItem.quantity++;
                cartItem.price+=item.price
                cartItem.currency='$'

                return cartItem;
            } else {

                return cartItem;
            }
        });

        if (!found) { updatedCart.push({id: item.id, name: item.name, currency:item.currency, price: item.price, quantity: 1}) }

        this.setState({
            cart: updatedCart,
            total: total
        });
    },



    removefromcart: function(item,id,price) {
        let total=this.state.total;
        let updatedCart = this.state.cart.map((cartItem) => {

            if (cartItem.id === id) {
                if(cartItem.quantity>0) {
                    total -= price;
                    cartItem.quantity--;
                    cartItem.price -= price;
                }
                else
                {
                    console.log(cartItem);
                    cartItem.price =0;
                    cartItem=this.state.cart.slice(id,1);
                }
                return cartItem;
            } else {
                return cartItem;
            }
        });

        //if (!found) { updatedCart.push({id: item.id, name: item.name, price: item.price, quantity: 1}) }

        this.setState({
            cart: updatedCart,
            total: total
        });
    },




    render: function(){
        return (
            <div className="row">
        <div className="col">
            <h3>Menu</h3>
            {this.state.items.map((item) => {
                return <Product details={item} addToCart={this.addToCart} />
            })}
    </div>
                <div  className="col">
        <Cart cart={this.state.cart} removefromcart={this.removefromcart} />
                    <Total total={this.state.total} /></div>

        </div>
    );
    }
});

let Cart = React.createClass({
    removefromcart: function(id,price,quantity) {
        let indi_price=price/quantity
        this.props.removefromcart(this.props.cart,id,indi_price);
    },

    render: function() {
        return (

            <div >

    <p className="Title"><h3>Order</h3></p>
        <div >
        {this.props.cart.length > 0 ? this.props.cart.map((item) => {




            return(

            <div>

                {item.quantity>0 ?
            <div className="box">

                <b>{item.name}</b> <button className="button_example" onClick={this.removefromcart.bind(this,item.id,item.price,item.quantity)}>REMOVE</button> <span className="button_example2">{item.currency}{item.price}</span>
            {item.quantity > 0 ? <span> Qty:{item.quantity}   </span> : ''}

            </div> :'' }
            </div>)

                }) : <p>Empty</p>}

            </div>
        </div>
    );
    }
});

let Total = React.createClass({

    render: function() {

        return (
            <div>
                <hr></hr>
                <p className="Title"><h3>Total:</h3></p>
                <p>${this.props.total}</p>
            </div>

        );
    }


});




let Product = React.createClass({
    addToCart: function() {
        this.props.addToCart(this.props.details);
    },
    render: function() {
        let item = this.props.details;
        return (
            <div  >

                <p className="box"><b>{item.name}</b> {<button onClick={this.addToCart} className="button_example">ADD</button>}<span className="button_example2">{item.currency}{item.price}</span> </p>
        </div>
    );
    }
});


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
