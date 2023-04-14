import style from "./catalog.module.css"
import search from "../../assets/img/search.png"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { format } from "../basket/basket"

const Catalog = () => {
    const [data, setData] = useState()
    const [searchData, setSearch] = useState('')
    const [cat, setCat] = useState(1)

    // const [categories, setCategories] = useState()

    const unDataSale = data?.filter((item) => item.dicsount_percent === 0)

    const fetchServices = async () => {
        const response = await fetch(`https://exam.avavion.ru/api/services`)
        const data = await response.json()

        setData(data.data)
    }

    // const fetchServicesCategories = async () => {
    //     const response = await fetch(`ссылка для вывода всех категорий`)
    //     const data = await response.json()

    //     setCategories(data.data)
    // }

    useEffect(() => {
        fetchServices()
        // fetchServicesCategories()
    }, [])

    // const categoryData = unDataSale?.filter((item) => item.category === cat)

    const searchDataMassive = unDataSale?.filter((item) => item.name.includes(searchData))  

    const handleChangeSearch = (e) => {
        setSearch(e.target.value)
    }

    return (
        <div className={style.catalog} id={'#catalog'}>
            <div className={style.header_catalog}>
                <h1 className={style.h1_catalog}>
                    Каталог
                </h1>
                <div className={style.input}>
                    <input type="text" placeholder="Поиcк..." onChange={(e) => handleChangeSearch(e)} value={searchData}/>
                    <div className={style.ikon_search}>
                        <img src={search} alt=""/>
                    </div>
                </div>
            </div>
            {/* <select name="" id="" onChange={(e) => setCat(parseInt(e.target.value, 10))}>
                {
                    categories.map((category) => {
                        return <option value={category.id}>{category.name}</option>
                    })
                }
            </select> */}
            <div className={style.catalog_wrapper}>
                {
                    searchDataMassive?.map(item => {
                        return (
                            <div className={style.tovar} key={item.id}>
                                <Link to={`/tovar/${item.id}`}>
                                    <div className={style.img_tovar}>
                                        <img src={item.image_url} alt="" />
                                    </div>
                                </Link>
                                <p className={style.price}>от {format(item.price)} ₽</p>
                                <p>{item.title}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Catalog