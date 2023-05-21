import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PostsPage from "./Pages/PostsWithFilter";
import UserProfile from "./Pages/UserProfile";
import RegistrationForm from "./Components/Forms/Authorization/Register";
import Header from "./Components/Modals/Header";
import Footer from "./Components/Modals/Footer";
import LoginForm from "./Components/Forms/Authorization/Login";
import AddPost from './Components/Forms/Posts/AddPost';
import PromotePost from './Components/Forms/Posts/PromotePost';
import { useAppDispatch, useAppSelector } from './Store/Hooks/redux';
import Main from './Pages/Main';
import ExcPostPage from './Pages/PostPage';
import AddReview from './Components/Forms/Review/AddReview';
import UpdatePost from './Components/Forms/Posts/UpdatePost';
import UpdateUser from './Components/Forms/User/UpdateUser';
import AdminPage from './Pages/AdminPage';
import { changeLogin, changeUserCredentials, changeUserTokens, setErrorData } from './Store/Reducers/UserReducer';
import AddAdmin from './Components/Forms/User/AddAdmin';

function App() {
  const dispatch = useAppDispatch();
  const {refreshToken} = useAppSelector((state) => state.userReducer.isLogin)

  useEffect(() => {
    const fetchRefresh = async () => {
      if (refreshToken) {
        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/auth/refresh`, {
          method:"POST",
          headers: {
              'Access-Control-Allow-Origin': 'http://localhost:8081',
              'Access-Control-Allow-Methods': 'GET, POST, DELETE',
              'Access-Control-Allow-Headers': '*',
          },
          body: JSON.stringify({ refreshToken: refreshToken })
        });

        console.log(refreshToken)
        
        if (response.status === 200) {
          const data = await response.json();
          console.log(data)
          dispatch(changeUserTokens(data))
          dispatch(changeLogin(true))
          dispatch(setErrorData(''))
        } else {
          dispatch(changeLogin(false))
          dispatch(changeUserCredentials({
            accessToken: '',
            refreshToken: '',
            id: 0,
            role: ''
          }))
          dispatch(setErrorData(''))
        }
      } else {
        dispatch(changeLogin(false))
          dispatch(changeUserCredentials({
            accessToken: '',
            refreshToken: '',
            id: 0,
            role: ''
          }))
          dispatch(setErrorData(''))
      }
    };
    fetchRefresh();
  }, []);

  return (
    <BrowserRouter>
    <div>
        <Header/>
          <Routes>
              <Route path="/" element={<Main/>}/>
              <Route path="/posts" element={<PostsPage/>}/>
              <Route path="/posts/:id" element={<ExcPostPage/>}/>
              <Route path="/users/:id" element={<UserProfile/>}/>
              <Route path="/users/:id/edit" element={<UpdateUser/>}/>
              <Route path="/auth/registration" element={<RegistrationForm/>}/>
              <Route path="/auth/login" element={<LoginForm/>}/>
              <Route path="/posts/add" element={<AddPost/>}/>
              <Route path="/posts/:id/review" element={<AddReview/>}/>
              <Route path="/posts/:id/edit" element={<UpdatePost/>}/>
              <Route path="/posts/:id/promote" element={<PromotePost/>}/>
              <Route path="/admin" element={<AdminPage/>}/>
              <Route path="/admin/add" element={<AddAdmin/>}/>
          </Routes>
        <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
