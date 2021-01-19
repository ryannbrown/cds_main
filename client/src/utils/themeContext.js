import React, { Component } from "react";
require('dotenv').config();
const { Provider, Consumer } = React.createContext();

 class ThemeContextProvider extends Component {
   constructor(props) {
    super(props);

    this.listener = null;
     this.state = {
       isCartOpen: false,
       testState:'test',
       userLoggedIn: false,
       userEmail: '',
       userData: [],
       currentCart: { lineItems: [] }
       
     };

   }
  


  componentDidMount() {
    let userStorageEmail = sessionStorage.getItem("email")

    if ( userStorageEmail) {
    //   console.log(userStorageEmail, "get it")

      fetch(`/api/${userStorageEmail}`)
      .then(res => res.json())
      .then(json => {
        //   console.log(json)
        this.setState({
          userData: json.data[0],
          userLoggedIn: true,
          userEmail: userStorageEmail
        })

      })
    //   this.setState({
    //     userData:JSON.parse(foundUserData)
    //   })
    }

 
}

componentDidUpdate(){
  console.log("context updated state", this.state.currentCart)
  // console.log(this.state.client)
  // console.log(this.state)
}


  toggleTheme = () => {
    console.log('toggle theme')
    this.setState(prevState => {
      return {
        theme: prevState.theme === "Day" ? "Night" : "Day"
      };
    });
  };

  handleCartClose = () => {
    // console.log("clicked to close")
    this.setState({
      isCartOpen: false,
    });
  }
handleCartOpen = () =>  {
    // console.log("clicked to open")
    this.setState({
      isCartOpen: true,
    });
  }

  activateUser = (email) => {
console.log(email, "email in backend")

 fetch(`/api/${email}`)
      .then(res => res.json())
      .then(json => {
          // console.log(json)
        this.setState({
          userData: json.data[0],
          userLoggedIn: true,
          userEmail: email
        })
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("loggedIn", true);

      })

  }

  addToCart = (id, name, price) => {
    // console.log('this id is', id)
    // this.setState( prevState => ({
    //   currentCart: { lineItems : [... prevState.currentCart.lineItems], lineItems: [id] }})
    //   )
    // this.state.currentCart.lineItems.push(id)
    // sessionStorage.setItem("email", email);
    // sessionStorage.setItem("loggedIn", true);
    // sessionStorage.setItem("firstItem", firstItem);

    var added = this.state.currentCart.lineItems.concat(id)
    this.setState({
      currentCart: { lineItems: added}
    })
  }


  render() {
    return (
      <Provider
        value={{ 
           isCartOpen: this.state.isCartOpen,
            handleCartOpen: this.handleCartOpen,
            handleCartClose: this.handleCartClose,
            toggleTheme: this.toggleTheme,
            testState: this.state.testState,
            activateUser: this.activateUser,
            userEmail: this.state.userEmail,
            userLoggedIn: this.state.userLoggedIn,
            userData: this.state.userData,
            addToCart: this.addToCart,
            currentCart: this.state.currentCart
           }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export { ThemeContextProvider, Consumer as ThemeContextConsumer };
