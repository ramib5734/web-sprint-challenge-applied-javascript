const Card = (article) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const cardDiv = document.createElement("div");
  const cardHeadline = document.createElement("div");
  const cardAuthor = document.createElement("div");
  const cardImgContainer = document.createElement("div");
  const cardImg = document.createElement("img");
  const cardSpan = document.createElement("span");

  cardDiv.classList.add("card");
  cardHeadline.classList.add("headline");
  cardAuthor.classList.add("author");
  cardImgContainer.add("img-container");

  cardDiv.appendChild(cardHeadline);
  cardDiv.appendChild(cardAuthor);
  cardAuthor.appendChild(cardImgContainer);
  cardImgContainer.appendChild(cardImg);
  cardAuthor.appendChild(cardSpan);

  cardHeadline.textContent = article.headline;
  cardImg.textContent = article.authorPhoto;
  cardSpan.textContent = `By ${article.authorName}`;


  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `http://localhost:5001/api/articles` (test it with console.log!!).
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  axios.get(`http://localhost:5001/api/articles`).then(res =>{
    const article = document.querySelector(selector);

    const keys = []
    for(let key in res.data.articles){
      keys.push(key);
    }

    for(let i = 0; i < keys.length; i++){
      const key = keys[i];

      for(let i = 0; i < res.data.articles[key].length; i++){
        const articleInfo = Card(res.data.articles[key][i])
        article.appendChild(articleInfo);
      }
    }
  })
}

export { Card, cardAppender }
