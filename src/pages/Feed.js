import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { startsWith } from '../utility/utils'
import BlogItem from '../components/BlogItem'
import ReactDOMServer from 'react-dom/server';
import axios from '../api/axios'
const Home = () => {
    const {auth} = useAuth()
    const getFeedUrl = '/posts'
    const container = document.getElementsByClassName('blogContainer')
    const getFeed = async (values) => {
      // e.preventDefault();
      const response = await axios.get(getFeedUrl);
      try {
        response.map((element, index) => {
          container.innerHTML += ReactDOMServer.renderToString(<BlogItem
            title={element.Title} body={element.body} author={element.author} date={element.Date}
          />)
        })
      } catch (err) {
        alert("Failed to get the feed")
      }
  
}
useEffect(()=>[
  getFeed()
])
  return (
    <section>
        <h2>Blog</h2>
        <div className='blogContainer'>

        </div>
    </section>
  )
}

export default Home