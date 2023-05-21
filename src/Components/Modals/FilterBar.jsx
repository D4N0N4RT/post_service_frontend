import React, {useState, useEffect} from 'react';
import { Select } from 'antd';
import {setAllPosts, setFilter} from '../../Store/Reducers/PostReducer'
import { useAppDispatch, useAppSelector } from '../../Store/Hooks/redux';
import { useNavigate } from 'react-router-dom';
import "./Filter.css"
import { setErrorData } from '../../Store/Reducers/UserReducer';

const FilterBar = () => {
    const [title, setTitle] = useState(useAppSelector(state => state.postReducer.title));
    const [city, setCity] = useState(useAppSelector(state => state.postReducer.city));
    const [minPrice, setMinPrice] = useState(useAppSelector(state => state.postReducer.minPrice));
    const [maxPrice, setMaxPrice] = useState(useAppSelector(state => state.postReducer.maxPrice));
    const [sortOption, setSortOption] = useState(useAppSelector(state => state.postReducer.sortOption));
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(useAppSelector(state => state.postReducer.currentCategory));

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const {userToken} = useAppSelector((state)=>state.userReducer);

    useEffect(() => {
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
    }, []);

    function rsqlBuilder() {
        let rsqlQuery = '';
        console.log(title, category, city, minPrice, maxPrice, sortOption);
        if (title !== '') {
            rsqlQuery = rsqlQuery.concat(encodeURIComponent(`title==*${title}*;`))
        }
        if (city !== '') {
            rsqlQuery = rsqlQuery.concat(encodeURIComponent(`city==${city};`))
        }
        if (category !== '') {
            rsqlQuery = rsqlQuery.concat(encodeURIComponent(`category.name=='${category}';`))
        }
        if (minPrice !== 0) {
            rsqlQuery = rsqlQuery.concat(encodeURIComponent(`price>=${minPrice};`))
        }
        if (maxPrice !== 0) {
            rsqlQuery = rsqlQuery.concat(encodeURIComponent(`price<=${maxPrice};`))
        }
        console.log(rsqlQuery);
        return rsqlQuery.slice(0, -3);
    }

    const filterPosts = async (event) => {
        event.preventDefault();

        const response = await fetch(`${process.env.REACT_APP_SPRING_URL}/posts/filter?query=${rsqlBuilder()}&sort=${encodeURIComponent(sortOption)}`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Access-Control-Allow-Origin': `${process.env.REACT_APP_SPRING_URL}`,
                'Access-Control-Allow-Methods': 'GET, POST, DELETE',
                'Access-Control-Allow-Headers': '*'
            }
        });
        const data = await response.json();

        if (response.status === 200) {
            dispatch(setAllPosts(data));
            dispatch(setFilter({
                category, title, city, minPrice, maxPrice, sortOption
            }))
            dispatch(setErrorData(''))
            navigate('/posts');
        } else {
            dispatch(setErrorData(data.message))
            navigate('/posts');
        }
    };

    const categoriesSelect = categories.map(function(category) {
        return {
            value: category.name,
            label: category.name
        }
    });
    
    categoriesSelect.push({
        value: '',
        label: "Все категории"
    })

    return (
        <form/* onSubmit={handleSubmit}*/ className='filter'>
            <div className='filter-group'>
                <label htmlFor='title' className='label'>
                    Название:
                </label>
                <input 
                    className='filter-input'
                    type="text"
                    id='title'
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
            </div>
            <div className='filter-group'>
                <Select
                
                defaultValue={category}
                style={{
                    width: 170,
                    textAlign:'left'
                }}
                onChange={(e) => setCategory(e)}
                options={categoriesSelect}
                />
            </div>
            <div className='filter-group'>
                <label htmlFor='min-price' className='label'>
                    Минимальная цена:
                </label>    
                <input 
                    className='filter-input'
                    type="number"
                    id='min-price' 
                    value={minPrice} 
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                />
            </div>
            <div className='filter-group'>
                <label htmlFor='max-price' className='label'>
                    Максимальная цена:
                </label>    
                <input 
                    className='filter-input'
                    type="text"
                    id='max-price'
                    value={maxPrice} 
                    onChange={(e) => setMaxPrice(Number(e.target.value))} 
                />
            </div>
            <div className='filter-group'>
                <label htmlFor='city' className='label'>
                    Город:
                </label>
                <input 
                    className='filter-input'
                    type="text" 
                    id='city'
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                />
            </div>
            <div className='filter-group'>
                <Select
                defaultValue={sortOption}
                style={{
                    width: 170,
                    textAlign:'left'
                }}
                onChange={(e) => setSortOption(e)}
                options={[
                    {
                        value: 0,
                        label: 'По умолчанию',
                    },
                    {
                        value: 1,
                        label: 'По возрастанию цены',
                    },
                    {
                        value: 2,
                        label: 'По убыванию цены',
                    },
                    {
                        value: 3,
                        label: 'По возрастанию даты',
                    },
                    {
                        value: 4,
                        label: 'По убыванию даты',
                    },
                ]}
                />
            </div>
            <div className='filter-group'>
                <button onClick={filterPosts} type="submit">Применить фильтры</button>
            </div>
    </form>
    );
};

export default FilterBar;