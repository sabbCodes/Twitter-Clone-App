import tweetsData from "./data.js"
import { v4 as uuidv4 } from 'https://jspm.dev/uuid'


window.addEventListener("load", function(){
    this.window.setTimeout(function(){
        document.getElementById("loading").style.display = ("none")
    }, 2000)
})

//this is the theme changer event listener
document.getElementById("theme").addEventListener("click", 
    () => document.body.classList.toggle("dark-theme")
)

//this is the general body's event listener
document.body.addEventListener("click", function(e){
    if (e.target.dataset.heart){
        listenForLikes(e.target.dataset.heart)
    } else if(e.target.dataset.retweet){
        listenForRetweets(e.target.dataset.retweet)
    } else if(e.target.dataset.comment){
        listenForComments(e.target.dataset.comment)
    } else if(e.target.id === "new-btn"){
        popupNewTweet()
    } else if(e.target.id === "close-tweet-modal"){
        closePopup()
    } else if(e.target.id === "update-tweet"){
        addNewTweet()
    } else if(e.target.dataset.delete){
        deleteSelectedTweet(e.target.dataset.delete)
    }
})

//this is in charge of main tweets likes
function listenForLikes(tweetId){
    const intendedTweet = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (!intendedTweet.isLiked){
        intendedTweet.likes++
    } else {
        intendedTweet.likes--
    }

    intendedTweet.isLiked = !intendedTweet.isLiked
    renderTweets()
}

//this is in charge of main tweets retweets
function listenForRetweets(tweetId){
    const intendedTweet = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (!intendedTweet.isRetweeted){
        intendedTweet.retweets++
    } else {
        intendedTweet.retweets--
    }

    intendedTweet.isRetweeted = !intendedTweet.isRetweeted
    renderTweets()
}

//this is in charge of replies likes
// function listenForReplyLikes(tweetId){
//     for 

//     const intendedReply = intendedTweet.filter(function(reply){
//         return reply.includes(tweetId)
// else if(e.target.dataset.reptwo){
//     listenForReplyLikes(e.target.dataset.reptwo)
// } else if(e.target.dataset.repone){
//     listenForReplyRetweets(e.target.dataset.repone)
// }
//     })

//     console.log(intendedTweet)
//     // tweetsData.forEach(function(tweet){
//     //     return tweet.replies.forEach(function(reply){

//     //     })
//     // })
//     // const intendedReply = () => {
//     //     return tweetsData.filter(function(tweet){
//     //     return tweet.
//     // })[0]

//     console.log(intendedReply)

//     if (!intendedReply.isLiked){
//         intendedReply.likes++
//     } else {
//         intendedReply.likes--
//     }

//     intendedReply.isLiked = !intendedReply.isLiked
//     renderTweets()
// }

//this is in charge of replies retweets
// function listenForReplyRetweets(tweetId){
//     const intendedTweet = tweetsData.filter(function(tweet){
//         return tweet.replies.uuid === tweetId
//     })[0]

//     if (!intendedTweet.isRetweeted){
//         intendedTweet.retweets++
//     } else {
//         intendedTweet.retweets--
//     }

//     intendedTweet.isRetweeted = !intendedTweet.isRetweeted
//     renderTweets()
// }

//this is in charge of main tweets comments
function listenForComments(tweetId){
    document.getElementById(`replies-${tweetId}`).classList.toggle("hidden-replies")
}

//New tweet page popup
function popupNewTweet(){
    document.body.innerHTML = `
        <div class="new-tweet" id="new-tweet">
            <button id="close-tweet-modal">x</button>
            <button id="update-tweet">Tweet</button>
            <div class="new-tweet-inner" id="new-tweet-inner">
                <img src="profilePic.jpeg" alt="Profile pic">
                <textarea id="new-tweet-text" placeholder="What's happening?"></textarea>
            </div>
        </div>
    `
}

//close popup and render new tweet
function closePopup(){
    document.body.innerHTML = `
    <header>
        <div class="header-contents">
            <img src="profilePic.jpeg" alt="Profile pic">
            <i class="fa-brands fa-twitter" id="twitter-logo"></i>
            <i class="fa-solid fa-star-half-stroke" id="theme"></i>
        </div>
    </header>
    <section>
        <div class="feed" id="feed"></div>
        <button class="new-btn" id="new-btn">+</button>
    </section>
    <footer>
        <div class="footer-icons">
            <i class="fa-sharp fa-solid fa-house"></i>
            <i class="fas fa-magnifying-glass"></i>
            <i class="fa-solid fa-microphone"></i>
            <i class="fa-solid fa-bell"></i>
            <i class="fa-regular fa-envelope"></i>
        </div>
    </footer>
    `
    renderTweets()
}

//Adds new tweet to the array
function addNewTweet(){
    const newTweetText = document.getElementById("new-tweet-text").value

   if (newTweetText){
    const newObj = {
        userName: "Sabb ✨🚀",
        handle: "@OlanrewajuAb",
        profilePic: `./profilePic.jpeg`,
        likes: 0,
        retweets: 0,
        tweetText: newTweetText,
        replies: [],
        time: "0s",
        isLiked: false,
        isRetweeted: false,
        uuid: uuidv4(),
    }

    tweetsData.unshift(newObj)
    closePopup()
    renderTweets()
   } else{
    closePopup()
    renderTweets()
   }
}

//lets us remove intended tweets
function deleteSelectedTweet(tweetId){
    const intendedArray = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    const checkArray = (x) => {
        return x === intendedArray 
    }

    const tweetIndex = tweetsData.findIndex(checkArray)

    tweetsData.splice(tweetIndex, 1)
    renderTweets()
}

//setting the app's html
function setTweetsHtml(){
    //holding the string of html
    let tweetsHtml = ""

    tweetsData.forEach(function(tweet){

        //For main tweets
        let likedIcon = ""

        if (tweet.isLiked){
            likedIcon = "liked"
        }

        let retweetedIcon = ""

        if (tweet.isRetweeted){
            retweetedIcon = "retweeted"
        }

        //for replies
        let likedReplyIcon = ""

        if (tweet.replies.isLiked){
            likedReplyIcon = "liked"
        }

        let retweetedReplyIcon = ""

        if (tweet.replies.isRetweeted){
            retweetedReplyIcon = "retweeted"
        }

        //holding the string of html
        let repliesHtml = ""

        if (tweet.replies.length > 0){
           tweet.replies.forEach(function(reply){
            repliesHtml += `
                <div class="reply-inner">
                    <img src="${reply.profilePic}">
                    <div class="reply-inner-second">
                        <span class="username"><b>${reply.userName}</b></span>
                        <span class="handle">${reply.handle}</span>
                        <p class="tweetText">${reply.tweetText}</p>
                        <div class="tweet-actions">
                            <span class="action">
                                <i class="fa-regular fa-comment"></i>
                            </span>
                            <span class="action">
                                <i class="fa-solid fa-retweet ${retweetedReplyIcon}"
                                data-RepOne="${reply.uuid}"
                                ></i>
                                ${reply.retweets}
                            </span>
                            <span class="action">
                                <i class="fa-solid fa-heart ${likedReplyIcon}"
                                data-RepTwo="${reply.uuid}"
                                ></i>
                                ${reply.likes}
                            </span>
                            <span class="action">
                                <i class="fa-solid fa-share-nodes"></i>
                            </span>
                        </div>
                    </div>
                </div>`
           })
        }

        //main tweet html
        tweetsHtml += `
            <div class="tweets" id="tweets">
                <div class="tweets-inner">
                    <img src="${tweet.profilePic}" alt="Profile pic" id="profilePic">
                    <i class="fa-solid fa-ellipsis-vertical" 
                    data-delete="${tweet.uuid}" title="Delete tweet"
                    ></i>
                    <div class="tweets-inner-second">
                        <span class="username"><b>${tweet.userName}</b></span>
                        <span class="handle">${tweet.handle}</span>
                        <span class="time"> ${tweet.time}</span>
                        <p class="tweetText">${tweet.tweetText}</p>
                        <div class="tweet-actions">
                            <span class="action">
                                <i class="fa-regular fa-comment"
                                data-comment="${tweet.uuid}"
                                ></i> ${tweet.replies.length}
                            </span>
                            <span class="action">
                                <i class="fa-solid fa-retweet ${retweetedIcon}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                            <span class="action">
                                <i class="fa-solid fa-heart ${likedIcon}"
                                data-heart="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="action">
                                <i class="fa-solid fa-share-nodes"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div class="hidden-replies" id="replies-${tweet.uuid}">
                    ${repliesHtml}
                </div>
            </div>
        `
    })

    return tweetsHtml
}

//displaying the app content to the page
function renderTweets(){
    document.getElementById("feed").innerHTML = setTweetsHtml()
}

renderTweets()