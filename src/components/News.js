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
//         document.title=`ManaswiNews ${this.capitalizeFirstLetter(this.props.category)}`;
//     }

//     //componentDidMount runs after the whole render function is executed
//     async componentDidMount() {
//     try {
//         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=78fa6df69138492abcafb9a78535e238&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
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
//         if (this.state.page+1 <= Math.ceil(this.state.totalResults/this.props.pageSize)){
//             let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=78fa6df69138492abcafb9a78535e238&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
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
//         let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=78fa6df69138492abcafb9a78535e238&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
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
//         <h1 className='text-center' style={{margin: '5px 0px'}}><strong>ManaswiNews: Top {this.capitalizeFirstLetter(this.props.category)} Headlines.</strong></h1>
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


import React, { Component } from 'react'
import NewsItem from './NewsItem.js';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static defaultProps={
        country: 'in',
        pageSize: 9,
        category: 'general',
    }

    static propTypes={
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter=(string)=>{
        return string.charAt(0).toUpperCase()+string.slice(1);
    }

    constructor(props){
        super(props)
        console.log("Hello i am news constructor")
        this.state={
            articles: [],
            loading: true,
            page: 1, 
            totalResults: 0
        };
        document.title=`ManaswiNews ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    //componentDidMount runs after the whole render function is executed
    async componentDidMount() {
    this.props.setProgress(10);
    try {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: parsedData.articles || [],
            totalResults: parsedData.totalResults || 0,
            loading: false
        });
    } catch (error) {
        console.error("Failed to fetch news:", error);
        this.setState({ articles: [], loading: false });
        }
        this.props.setProgress(100);
    }

    fetchMoreData = async()=> {
    this.setState({page:this.state.page + 1})
    try {
        let url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
            articles: this.state.articles.concat(parsedData.articles) || [],
            totalResults: parsedData.totalResults || 0
        });
    } catch (error) {
        console.error("Failed to fetch news:", error);
        this.setState({ articles: [], loading: false });
        }
  };

  render() {
    return (
      <>
      <div className="container my-4">
        <h1 className='text-center' style={{margin: '5px 0px'}}><strong>ManaswiNews: Top {this.capitalizeFirstLetter(this.props.category)} Headlines.</strong></h1>
      </div>
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!=this.state.totalResults}
          loader={<Spinner/>}
        >
        <div className="container">
            <div className="row">
                {this.state.articles.map((element, index)=>{
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
}
