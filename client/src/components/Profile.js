import '../App.css';
import { fetchData } from "../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';

const Profile = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [post, setPost] = useState({
        post_name: '',
        post_content: ''
    });
    const { post_name, post_content } = post;
    const onChange = (e) => setPost({ ...post, [e.target.name]: e.target.value })
    const onSubmit = (e) => {
        e.preventDefault();
        console.log('submitted');
        const user_id = location.state.name;
        fetchData("/post/createcontent",
            {
                post_name,
                post_content,
                user_id
            },
            "POST")
            .then((data) => {
                if (!data.message) {
                    console.log(data)
                    setPost({
                        post_name: '',
                        post_content: ''
                    });
                    fetchData("/post/viewpost",
                        {
                            user_id
                        },
                        "POST")
                        .then((res) => {
                            console.log(res);
                            if (!res.message) {
                                navigate("/profile", { state: { name: user_id, data: res } });
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })

    }

    const deletePost = async (e,cont) => {
        e.preventDefault();
        console.log('delete', cont);
        const user_id = location.state.name;
        fetchData("/post/deletepost",
            {
                id: cont._id
            },
            "DELETE")
            .then((data) => {
                if (!data.message) {
                    console.log(data)
                    fetchData("/post/viewpost",
                        {
                            user_id
                        },
                        "POST")
                        .then((res) => {
                            console.log(res);
                            if (!res.message) {
                                navigate("/profile", { state: { name: user_id, data: res } });
                            }
                        })
                        .catch((error) => {
                            console.log(error)
                        })
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    let posts = [];
    for (let i = 0; i < Object.keys(location.state.data).length; i++) {
        posts.push({ _id: location.state.data[i]._id, post_name: location.state.data[i].post_name, post_content: location.state.data[i].post_content });
    }

    return (
        <div className="container mt-5 login">
            <h1 className="h1-main text-light">Welcome {location.state.name}</h1>
            <h2 className="text-light">Your Posts</h2> <br />


            <table className="table table-dark">
                <thead>
                    <tr>
                        <th scope="col">Post Name</th>
                        <th scope="col">Post Content</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(cont => (
                        <tr>
                            <th scope="row">{cont.post_name}</th>
                            <td>{cont.post_content}</td>
                            <td><button onClick={e=> deletePost(e,cont)}  className="btn btn-danger btn-sm btn-block">Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table><br /><br />

            <section className="container-fluid">
    
    <section className="row justify-content-center">
      <section className="col-12 col-sm-6 col-md-4 app">
        <form onSubmit={onSubmit} className="form-container">
        <h4 className="text-center font-weight-bold"> New Post!! </h4>
        <div className="form-user">
          <label htmlFor="post_name">Post name</label>
           <input type="text" className="form-control" placeholder="Enter Post name" name='post_name'
              id='post_name'
              onChange={onChange}
              value={post_name}
              required/>
        </div>

        <div className="form-user">
            <label htmlFor="post_content">Post content</label>
            <textarea type="text" className="form-control" name='post_content'
                                    id='post_content'
                                    onChange={onChange}
                                    value={post_content}
                                    required>
                                </textarea>
                            </div>
        
        <div className="submit">
        <button type="submit" className="btn btn-primary btn-block">Submit</button>
        </div>

        </form>
      </section>
    </section>
  </section>
        </div>
    );
}

export default Profile;