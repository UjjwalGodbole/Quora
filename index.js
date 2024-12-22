const express = require("express")
const app = express()
const port = 8080
const path = require("path")
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
uuidv4();

app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname,"public/css")))
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))


let posts = [
    {
        id : uuidv4(),
        username :"Humans instrutions",
        content:"Do humans really need friends ?",
        imgurl :"https://qph.cf2.quoracdn.net/main-qimg-9926239898fa6ecb9389b75cb22a6a09"
    },
    {
        id: uuidv4(),
        username:"flipkart seller hub",
        content:"Confused about selling online?it is easy with flipkart!",
        imgurl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVkWQ_Ml9gI_oz_NylDdcrDqjro7giZoHrQg&s"
    }
]
// posts route
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts})
})
// new route
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs")
})
//post route
app.post("/posts",(req,res)=>{
    let id = uuidv4()
    let {username,content,imgurl} = req.body
    posts.push({id,username,content,imgurl})
    res.redirect("/posts")
})
//show route
app.get("/posts/:id",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p)=> id === p.id)
    res.render("show.ejs",{post})
})
//delete route
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params
    posts = posts.filter((p)=> id !== p.id)
    res.redirect("/posts")
})
//update route
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params
    let post = posts.find((p)=>id === p.id)
    res.render("edit.ejs",{post})
})
//patch route
app.patch("/posts/:id",(req,res)=>{
    let {id} = req.params
    let {content} = req.body
    let newcontent = content
    let post = posts.find((p) => p.id === id || p.id === parseInt(id))
    post.content = newcontent
    res.redirect("/posts")
})

app.get("/",(req,res)=>{
    res.send("serach = /posts")
})

app.listen(port,()=>{
    console.log("server running!")
})