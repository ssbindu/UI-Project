// 1. import mongoose
const mongoose = require("mongoose");

// 2. create schema for entity
const postSchema = new mongoose.Schema({
  post_name: { type: String, required: true},
  post_content: { type: String, required: true},
  user_id: { type: String, required: true}
 
})

// 3. create model of schema
const Post = mongoose.model("Post", postSchema);

// 4. create CRUD functions on model
//CREATE a post
async function createcontent(post_name, post_content, user_id) {

  const newPost = await Post.create({
    post_name: post_name,
    post_content: post_content,
    user_id: user_id
  });

  return newPost;
}


// UPDATE a post title
async function updatetitle(id, postname) {
  const post = await Post.updateOne({"_id": id}, {$set: { post_name: postname}});
  return post;
}

// UPDATE the content of the post
async function updatecontent(id, postcontent) {
    const post = await Post.updateOne({"_id": id}, {$set: { post_content: postcontent}});
    return post;
  }

async function viewPost(pid) {
    return await Post.find({"user_id": pid});
}

//DELETE
async function deletePost(id) {
  await Post.deleteOne({"_id": id});
};

// utility functions
async function readpost(userid) {
  return await Post.findOne({ "user_id": userid});
}

// 5. export all functions we want to access in route files
module.exports = { 
  createcontent,updatetitle,updatecontent,deletePost,viewPost,readpost
};