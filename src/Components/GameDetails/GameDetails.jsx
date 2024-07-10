import { useParams } from 'react-router-dom'
import style from './GameDetails.module.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { PuffLoader } from 'react-spinners'
import { Helmet } from 'react-helmet'

export default function GameDetails() {

    let { id } = useParams()
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(false)

    async function getGameDetails(id) {
        setLoading(true)
        const options = {
            method: 'GET',
            url: 'https://free-to-play-games-database.p.rapidapi.com/api/game',
            params: { id },
            headers: {
                'x-rapidapi-key': '3e6db780a7msh8127baa90f159b5p1130a9jsn9918d2a9b2e5',
                'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
            }
        };

        try {
            const response = await axios.request(options);

            setDetails(response.data)
            setLoading(false)

        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        getGameDetails(id)
    }, [])

    useEffect(() => {
        getGameDetails(id)
    }, [id])

    const ComponentBackGround = {
        backgroundImage: ` linear-gradient(#272729cc 0% 100%), url(${details.thumbnail})`,
        backgroundSize: 'cover',
        backgroundPosition: '100%',
    };

    return <>

        <Helmet>
            <title>
                {details.title}
            </title>
        </Helmet>

        <div style={ComponentBackGround} className={`${style.detailsComponent}`}>
            <div className={`${style.detailsBack} container`}>

                {loading ?

                    <div className='d-flex align-items-center justify-content-center loadingHeight'>
                        <PuffLoader
                            color='rgb(39, 105, 205)'
                            size={80}
                        />
                    </div>
                    :
                    <>
                        <div className='row g-4'>

                            <div className='col-md-4'>
                                <div className={style.leftDetails}>
                                    <div className={style.videoImg}>
                                        <img src={details.thumbnail} alt='game' className='w-100' />
                                        <video autoPlay muted loop className='w-100'>
                                            <source src={details.thumbnail?.replace('thumbnail.jpg', 'videoplayback.webm')} type='video/webm' />
                                        </video>
                                    </div>

                                    <div className='d-flex justify-content-between w-100 mt-3 gap-2'>
                                        <span>Free</span>
                                        <a href={details.game_url} target='_blank' rel="noreferrer">play now</a>
                                    </div>
                                </div>
                            </div>

                            <div className='col-md-8'>
                                <div className={style.rightDetails}>
                                    <h3>About {details.title}</h3>
                                    <span>{details.platform} platform</span>
                                    <p>{details.description}</p>

                                    {details.screenshots?.length === 0 ? ' ' : <><h4>{details.title} Screenshots</h4>

                                        <div className='row g-3 mb-3'>
                                            {details?.screenshots?.map((screenshot) => <div key={screenshot.id} className='col-md-6 col-lg-4'>
                                                <div className={style.screenshots}>
                                                    <img src={screenshot.image} alt='game' className='w-100' />
                                                </div>
                                            </div>)}

                                        </div></>}

                                    {details?.minimum_system_requirements ? <>

                                        <h4>Minimum System Requirements</h4>

                                        <div className='row g-4 mb-3 px-3'>

                                            <div className='col-md-6'>
                                                <div className={style.system}>
                                                    <h6>OS</h6>
                                                    <span>{details?.minimum_system_requirements?.os}</span>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className={style.system}>
                                                    <h6>Processor</h6>
                                                    <span>{details?.minimum_system_requirements?.processor}</span>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className={style.system}>
                                                    <h6>Memory</h6>
                                                    <span>{details?.minimum_system_requirements?.memory}</span>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className={style.system}>
                                                    <h6>Graphics</h6>
                                                    <span>{details?.minimum_system_requirements?.graphics}</span>
                                                </div>
                                            </div>

                                            <div className='col-md-6'>
                                                <div className={style.system}>
                                                    <h6>Storage</h6>
                                                    <span>{details?.minimum_system_requirements?.storage}</span>
                                                </div>
                                            </div>

                                        </div>

                                    </> : ''}
                                </div>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    </>
}
