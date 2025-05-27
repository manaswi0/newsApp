import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    // this. props is an obj from which the title and the descriotion will be given to the card
    let {title, description, imageURL, newsURL, author, date}=this.props;
    return (
      <div className="my-3" style={{width: '25rem'}}>
        <div className="card h-100 shadow-sm">
            <img src={!imageURL?"https://heise.cloudimg.io/bound/1200x1200/q85.png-lossy-85.webp-lossy-85.foil1/_www-heise-de_/imgs/18/4/8/5/0/7/8/8/shutterstock_709061209-930a4263b1a2f4ce.jpg": imageURL} className="card-img-top img-fluid" alt="..." style={{ maxHeight: '180px', objectFit: 'cover' }}/>
            <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-body-secondary">By {!author?"Unknown": author} on {new Date(date).toGMTString()}</small></p>
                <a href={newsURL} target="_blank" className="btn btn-sm btn-dark">Read More</a>
                {/* blank opens the other link in the new tab */}
            </div>
        </div>
      </div>
    )
  }
}