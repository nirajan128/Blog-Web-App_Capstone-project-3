import express from "express";
import bodyParser  from "body-parser";

const app = express();
const port = 3000;
let blog = [];

//middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

//shows the user input(title and content)
function newPostInfo(title,content){
    this.title = title
    this.content = content
    this.date = new Date();
    this.dateTime = this.date.toLocaleString()
}

//stores the input in storePost array
function addPost(title,content){
    let posts = new newPostInfo(title,content)
    blog.push(posts);
}

//delete post function
function deletePost(index){
    blog.splice(index,1)
}

//edit/updates post
function updatePost(index,title,content){
   blog[index] = new newPostInfo(title,content);
}

//routes
//Home page
app.get("/", (req,res)=>{
    res.render("index.ejs",{
        blog: blog
    })
})
//create post page
app.get("/create", (req,res)=>{
    res.render("create.ejs")
})

//display post page
app.get("/display/:id", (req,res)=>{
    //gets the id of the post
    let index = req.params.id

    //gets id no. of post in the blog array
    let currentPost = blog[index]

    //gets the edit page for exact edit page using id
    res.render("display.ejs",{
        postId : index,
        title : currentPost.title, //ex: blog[0].title gives the title for the particular page
        content: currentPost.content,
        dateTime: currentPost.dateTime

    })
    
})



//post content
app.post("/save", (req,res)=>{
    let title = req.body["title"]
    let content = req.body["content"]
    addPost(title,content)
    res.redirect("/")
})

//delete post
app.post("/delete", (req,res)=>{
  //gets id no. of post
  let index = req.body[
    "postId"]

  //redirect to the function
  deletePost(index);
  res.redirect("/")
  console.log(index)
})


//get update/edit post
app.get("/update/:id", (req,res)=>{
    let index = req.params.id;
    let currentPost = blog[index];
    res.render("create.ejs",{
        postId: index,
        title: currentPost.title,
        content: currentPost.content
    }) 
})
//update/edit post
app.post("/update",(req,res)=>{
    let index = req.body["index"]
    let title = req.body["title"];
    let content = req.body["content"]
    updatePost(index,title,content);
    res.redirect("/")

})



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});