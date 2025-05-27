// import React, { Component } from 'react'
// import NewsItem from './NewsItem.js';
// import Spinner from './spinner';
// import PropTypes from 'prop-types'

// export default class News extends Component {
   
//     static defaultProps={
//         country: 'in',
//         pageSize: 9,
//         category: 'general',
//     }

//     static propTypes={
//         country: PropTypes.string,
//         pageSize: PropTypes.number,
//         category: PropTypes.string
//     }

//     capitalizeFirstLetter=(string)=>{
//         return string.charAt(0).toUpperCase()+string.slice(1);
//     }

//     constructor(props){
//         super(props)
//         console.log("Hello i am news constructor")
//         this.state={
//             articles: [],
//             loading: false,
//             page: 1
//         };
//         document.title=`ManaswiNews ${this.capitalizeFirstLetter(props.category)}`;
//     }

//     //componentDidMount runs after the whole render function is executed
//     async componentDidMount() {
//     try {
//         let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=78fa6df69138492abcafb9a78535e238&page=${this.state.page+1}&pageSize=${props.pageSize}`;
//         let data = await fetch(url);
//         let parsedData = await data.json();
//         console.log(parsedData);
//         this.setState({
//             articles: parsedData.articles || [],
//             totalResults: parsedData.totalResults || 0,
//             loading: false
//         });
//     } catch (error) {
//         console.error("Failed to fetch news:", error);
//         this.setState({ articles: [], loading: false });
//         }
//     }



//     nextButton=async()=>{
//         if (this.state.page+1 <= Math.ceil(this.state.totalResults/props.pageSize)){
//             let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=78fa6df69138492abcafb9a78535e238&page=${this.state.page+1}&pageSize=${props.pageSize}`;
//             this.setState({loading:true});
//             let data=await fetch(url);
//             let parsedData=await data.json()
//             this.setState({
//                 page: this.state.page + 1,
//                 articles: parsedData.articles,
//                 loading: false
//             })
//         }
//     }

//     prevButton=async()=>{
//         let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=78fa6df69138492abcafb9a78535e238&page=${this.state.page-1}&pageSize=${props.pageSize}`;
//         let data=await fetch(url);
//         this.setState({loading:true});
//         let parsedData=await data.json()
//         console.log(parsedData); 
//         this.setState({
//             page: this.state.page - 1,
//             articles: parsedData.articles,
//             loading: false
//         })
//     }

//   render() {
//     return (
//       <div className='container my-3'>
//         <h1 className='text-center' style={{margin: '5px 0px'}}><strong>ManaswiNews: Top {this.capitalizeFirstLetter(props.category)} Headlines.</strong></h1>
//         {this.state.loading && <Spinner/>}
//         <div className="row my-3">
//         {!this.state.loading && this.state.articles.map((element)=>{
//              return <div className="col-md-4" key={element.url} >
//                 <NewsItem title={element.title?element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88): ""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt}/>
//             </div>
//         })}        
//         </div>
//         <div className="d-flex justify-content-between my-3">
//             <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.prevButton}>&larr; Previous</button>
//             <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/15)} className="btn btn-dark" onClick={this.nextButton}>Next &rarr;</button>
//         </div>
//       </div>
//     )
//   }
// }


import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem.js';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    // document.title=`ManaswiNews ${this.capitalizeFirstLetter(props.category)}`;


    const capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    //componentDidMount runs after the whole render function is executed
    useEffect(() => {
  const fetchData = async () => {
    props.setProgress(10);
    try {
      let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=1&pageSize=${props.pageSize}`;
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      setArticles([]);
      setLoading(false);
    }
    props.setProgress(100);
  };

  fetchData(); // call the async function
}, []);


    const fetchMoreData = async()=> {
    setPage(page+1)
    try {
        let url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    } catch (error) {
        console.error("Failed to fetch news:", error);
        setArticles([])
        setLoading(false)
        }
  };


    return (
      <>
      <div className="container my-4">
        <h1 className='text-center' style={{margin: '5px 0px'}}><strong>ManaswiNews: Top {capitalizeFirstLetter(props.category)} Headlines.</strong></h1>
      </div>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length!=totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
            <div className="row">
                {articles.map((element, index)=>{
                    return <div className="col-md-4" key={`{element.url}-${index}`}>
                        <NewsItem title={element.title?element.title.slice(0, 45): ""} description={element.description?element.description.slice(0, 88): ""} imageURL={element.urlToImage} newsURL={element.url} author={element.author} date={element.publishedAt}/>
                    </div>
                })}   
            </div> 
        </div>
        </InfiniteScroll>
      </>
    )
}


News.defaultProps={
    country: 'in',
    pageSize: 9,
    category: 'general',
}

News.propTypes={
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

export default News