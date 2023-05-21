import React, {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { Select } from "antd";
import { useAppDispatch, useAppSelector } from "../../../Store/Hooks/redux";
import "./AddPost.css"
import { setErrorData } from "../../../Store/Reducers/UserReducer";
import ErrorItem from "../../Error/ErrorItem";

function UpdatePost() {
    const {currentPost} = useAppSelector((state) => state.postReducer)

    const [title, setTitle] = useState(currentPost.title);
    const [description, setDescription] = useState(currentPost.description);
    const [price, setPrice] = useState(currentPost.price);
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(currentPost.category.id);
    const [categoryName, setCategoryName] = useState(currentPost.category.name);
    const [exchanged, setExchanged] = useState(currentPost.exchanged);
    const [delivered, setDelivered] = useState(currentPost.delivered);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const {userToken} = useAppSelector((state)=>state.userReducer);

    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/categories`, {
                method:"GET",
                headers: {
                    'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                    'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `${userToken}`
                },
            });
            const categories = await response.json();
            setCategories(categories);
        };
        fetchCategories();
    }, [userToken]);

    const updatePost = async (event) => {
        event.preventDefault();

        console.log(currentPost);

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts/${currentPost.id}`, {
            method: 'PATCH',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE',
                'Access-Control-Allow-Headers': '*',
                Authorization: `${userToken}`

            },
            body: JSON.stringify({ title, description, price, exchanged, delivered })
        });

        const data = response.json();

        if (response.status === 200) {
            dispatch(setErrorData(''))
            navigate('/posts');
        } else {
            dispatch(setErrorData(data.message))
            navigate(`/posts/${currentPost.id}/edit`)
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
                    className="post-input"
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
                   defaultValue={categoryId}
                    style={{
                        width: 120,
                        marginBottom: -20
                    }}
                    onChange={(e) => {
                        setCategoryId(e);
                        setCategoryName(e.label)
                    }}
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
                        defaultChecked={!exchanged}
                        onSelect={(e) => setExchanged(false)} 
                    />
                    Да
                    <input 
                        className="post-input" 
                        type="radio" 
                        name="exchanged"
                        value={true} 
                        defaultChecked={exchanged}
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
                        defaultChecked={!delivered}
                        onSelect={(e) => setDelivered(false)} 
                    />
                    Да
                    <input 
                        className="post-input" 
                        type="radio" 
                        name="delivered"
                        value={true} 
                        defaultChecked={delivered}
                        onSelect={(e) => setDelivered(true)} 
                    />
                </label>
            </div>
            <div className="form-group">
                <button onClick={updatePost} type="submit">Изменить объяление</button>
            </div>
        </form>
    );
}

export default UpdatePost;