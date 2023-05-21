import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../Store/Hooks/redux";
import "./AddPost.css"
import { setErrorData } from "../../../Store/Reducers/UserReducer";
import ErrorItem from "../../Error/ErrorItem";

function AddPost() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(0);
    const [exchanged, setExchanged] = useState(false);
    const [delivered, setDelivered] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {userToken, isLogin} = useAppSelector((state)=>state.userReducer);

    useEffect(() => {
        if (!isLogin) {
            navigate('/auth/login')
        }
        const fetchCategories = async () => {
            const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/categories`, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*'
                },
            });
            const categories = await response.json();
            setCategories(categories);
        };
        fetchCategories();
    }, [userToken]);

    const addPost = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `${userToken}`

            },
            body: JSON.stringify({ title, description, price, categoryId: category, exchanged, delivered })
        });
        const data = response.json();

        if (response.status === 201) {
            dispatch(setErrorData(''))
            navigate('/');
        } else {
            dispatch(setErrorData(data.message))
            navigate('/posts/add')
        }
    };

    return (
        <form/* onSubmit={handleSubmit}*/ className="add-post-form">
            <ErrorItem/>
            <div className="form-group">
                <label htmlFor="title">
                    Название:
                </label>
                <input 
                    className="post-input"
                    type="text" 
                    value={title} 
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </div>
            <div className="form-group">
                <label htmlFor="desc">
                    Описание:
                </label>
                <textarea 
                    className="post-input-area"
                    type="text" 
                    value={description} 
                    id="desc"
                    onChange={(e) => setDescription(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <label htmlFor="price">
                    Цена:
                </label>
                <input 
                    className="post-input"
                    type="number" 
                    value={price} 
                    id='price'
                    onChange={(e) => setPrice(Number(e.target.value))} 
                />
            </div>
            <div className="form-group">
                <Select
                    defaultValue={1}
                    style={{
                        width: 200,
                        marginBottom: -20
                    }}
                    onChange={(e) => setCategory(e)}
                    options={categories.map(function(category) { 
                        return {
                            value: category.id,
                            label: category.name
                        }
                    })}
                />
            </div>
            <div className="form-group">
                <h4>Обмен:</h4>
                <label>
                    Нет
                    <input 
                        className="post-input" 
                        type="radio" 
                        name="exchanged"
                        value={false} 
                        onSelect={(e) => setExchanged(false)} 
                    />
                    Да
                    <input 
                        className="post-input" 
                        type="radio" 
                        name="exchanged"
                        value={true} 
                        onSelect={(e) => setExchanged(true)} 
                    />
                </label>
            </div>
            <div className="form-group">
                <h4>Доставка:</h4>
                <label>
                    Нет
                    <input 
                        className="post-input" 
                        type="radio" 
                        name="delivered"
                        value={false} 
                        onSelect={(e) => setDelivered(false)} 
                    />
                    Да
                    <input 
                        className="post-input" 
                        type="radio" 
                        name="delivered"
                        value={true} 
                        onSelect={(e) => setDelivered(true)} 
                    />
                </label>
            </div>
            <div className="form-group">
                <button onClick={addPost} type="submit">Добавить объяление</button>
            </div>
        </form>
    );
}

export default AddPost;