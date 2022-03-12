import React, { useContext, useEffect } from 'react';
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
import { db } from './firebase.config'
import { collection, getDocs } from 'firebase/firestore'
function App() {
  const { state, dispatch } = useContext(Store)
  const { isLogin, posts } = state
  const usersCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(usersCollectionRef);
      dispatch({
        type: 'GET_ALL',
        payload: data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      })

    };

    getPosts()
  }, [state.callBack]);

  return (
    <Router>
      <Switch>
        <Route exact path='/' >
          <GlobalStyle />
          <Hero />
          <Products heading='Được yêu thích nhất' data={posts.slice(0, 4)} />
          <Feature />
          <Products heading='Tất cả sản phẩm' data={posts} />
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
