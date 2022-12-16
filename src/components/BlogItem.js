const BlogItem = (props) => {
    return (
      <div className='blogBox'>
          <p className='blogTitle'>{props.Title}</p>
          <p className='blogAuthor'>{props.Description}</p>
          <p className="blogBody">{props.body}</p>
          <p className="blogDate">{props.Date}</p>
      </div>
    )
  }
  
  export default BlogItem