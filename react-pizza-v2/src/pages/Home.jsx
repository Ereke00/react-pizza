import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock/index'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination'
import { AppContext } from '../App'
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice'
import axios from 'axios'
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import { sortList } from './../components/Sort';
const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const { categoryId, sort, currentPage } = useSelector((state) => state.filter)
    const { searchValue } = React.useContext(AppContext)
    const [items, setItems] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(true)

    const search = searchValue ? `search=${searchValue}` : ''
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj} />)
    const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
        console.log(dispatch(setCategoryId(id)));
    }

    React.useEffect(() => {

        if (isMounted.current) {
            const queryString = qs.stringify({
                sort: sort.sort,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sort, searchValue, search, currentPage, navigate])


    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = sortList.find((obj) => obj.sort === params.sort)
            dispatch(setFilters({
                ...params,
                sort
            }))
            isSearch.current = true
        }
    }, [dispatch])
    React.useEffect(() => {
        window.scrollTo(0, 0)

        //if (!isSearch.current) {
        setIsLoading(true)
        axios.get(`https://63c3d4c8a9085635752cf8ee.mockapi.io/items?page=${currentPage}&limit=4${categoryId > 0
            ? `category=${categoryId}`
            : ''}
             &sortBy=${sort.sort}
             &order=desc&${search}`).then((res) => {
                setItems(res.data)
                setIsLoading(false)
            })


        //}
        isSearch.current = false
    }, [categoryId, sort.sort, searchValue, search, currentPage])

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number))
    }
    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    value={categoryId}
                    onChangeCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home
