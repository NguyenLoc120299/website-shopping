import React, { useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { GlobalStyle } from './globalStyles';
import Hero from './components/Hero';
import Products from './components/Products';
import { productData, productDataTwo } from './components/Products/data';
import Feature from './components/Feature';
import Footer from './components/Footer';
import './app.css'
import MessengerCustomerChat from 'react-messenger-customer-chat';
import Posts from './components/add-posts/Posts';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/add-posts/Login';
import { Store } from './store/Store';
function App() {
  const { state } = useContext(Store)
  const { isLogin } = state

  return (
    <Router>
      <Switch>
        <Route exact path='/' >
          <GlobalStyle />
          <Hero />
          <Products heading='Được yêu thích nhất' data={productData} />
          <Feature />
          <Products heading='Tất cả sản phẩm' data={productDataTwo} />
          <Footer />
          <MessengerCustomerChat
            pageId="111873581308169"
            appId="1056629958450015"

          />
        </Route>
        <Route exact path='/manager' component={isLogin ? Posts : Login} />
        <Route exact path='*'>
          <h1>Not found</h1>
        </Route>


      </Switch>


    </Router>
  );
}

export default App;
