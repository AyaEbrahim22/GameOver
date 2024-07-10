import { Link, useParams } from 'react-router-dom'
import style from './Categories.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import PuffLoader from "react-spinners/PuffLoader";
import { Helmet } from 'react-helmet';

export default function Categories() {

  let { category } = useParams()
  const [allGames, setAllGames] = useState([])
  const [loading, setLoading] = useState(false)
  
  async function getAllGames(category) {

    setLoading(true)
    const options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      params: {
        category
      },
      headers: {
        'x-rapidapi-key': '3e6db780a7msh8127baa90f159b5p1130a9jsn9918d2a9b2e5',
        'x-rapidapi-host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      setAllGames(response.data)
      setLoading(false)

    } catch (error) {
      console.error(error);
    }

  }

  useEffect(() => {
    getAllGames(category)

  }, [])

  useEffect(() => {
    getAllGames(category)

  }, [category])

  function startVideo(event) {
    const imgLoadingElement = event.currentTarget.querySelector('.imgLoading')
    const videoElement = event.currentTarget.querySelector('video');
    const imgElement = event.currentTarget.querySelector('img');
    const sourceElement = videoElement.querySelector('source');

    if (videoElement && imgElement && sourceElement) {

      imgLoadingElement.classList.remove('d-none')

      videoElement.muted = true;

      sourceElement.src = imgElement.src.replace('thumbnail.jpg', 'videoplayback.webm');

      videoElement.load();

      videoElement.onloadeddata = () => {
        videoElement.play()
          .then(() => {
            videoElement.classList.remove('d-none');
            imgElement.classList.add('d-none');
            imgLoadingElement.classList.add('d-none')

          })
          .catch(error => {
            console.error('Video play error:', error);
          });
      };
    } else {
      console.error('Video, image, or source element not found.');
    }
  }

  function endVideo(event) {

    const imgLoadingElement = event.currentTarget.querySelector('.imgLoading')
    const videoElement = event.currentTarget.querySelector('video');
    const imgElement = event.currentTarget.querySelector('img');

    if (videoElement && imgElement) {

      videoElement.pause()
      videoElement.classList.add('d-none');
      imgElement.classList.remove('d-none');
      imgLoadingElement.classList.add('d-none')

    } else {
      console.error('Video or image element not found.');
    }
  }

  return <>

    <Helmet>
      <title>
        {category.toUpperCase()} Games
      </title>
    </Helmet>

    <Navbar />

    <div>
      <div className='container'>
        <h1 className={style.topTitle}>Top Free Moba Games For PC And Browser In 2023!</h1>

        {loading ?

          <div className='d-flex align-items-center justify-content-center loadingHeight'>
            <PuffLoader
              color='rgb(39, 105, 205)'
              size={80}
            />
          </div>

          : <div className='row g-4'>

            {allGames.map((game, index) => <div key={index} className='col-md-6 col-lg-4 col-xl-3'>


              <Link to={`/details/${game.id}`}>
                <div
                  onMouseEnter={(event) => startVideo(event)}
                  onMouseLeave={(event) => endVideo(event)}
                  className={`${style.singleGame} card bg-transparent`}
                >
                  <div className='card-body'>

                    <div className='position-relative w-100'>
                      <img src={game.thumbnail} alt='game' className='w-100 object-fit-cover handleSpace' />
                      <div className='imgLoading d-none'>
                        <PuffLoader color='rgb(18, 69, 146)' size={40} />
                      </div>
                    </div>

                    <video muted loop className='w-100 d-none'>
                      <source type='video/webm' />
                    </video>

                    <div className={style.topGamePart}>
                      <h3>{game.title.split(' ').splice(0, 3).join(' ')}</h3>
                      <span className={style.free}>Free</span>
                    </div>

                    <p>{game.short_description}</p>
                  </div>

                  <footer className={style.bottomGamePart}>
                    <span>{game.genre}</span>
                    <span>{game.platform}</span>
                  </footer>
                </div>
              </Link>

            </div>
            )}

          </div>
        }
      </div>
    </div>
  </>
}
