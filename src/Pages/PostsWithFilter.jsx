import FilteredPostList from "../Components/Posts/FilteredPostList";
import "./FilteredPosts.css";
import {useAppSelector} from "../Store/Hooks/redux";
import FilterBar from "../Components/Modals/FilterBar";
import ErrorItem from "../Components/Error/ErrorItem";


const PostsPage = () => {
    const {userData, isLogin} = useAppSelector(state=>state.userReducer);

    return (
        <div className="filter-page-container">
            <ErrorItem/>
            <div className="filter-container">
                <FilterBar/>
                <FilteredPostList/>
            </div>
        </div>
    );
};

export default PostsPage;