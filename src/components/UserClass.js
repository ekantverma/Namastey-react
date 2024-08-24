import React from "react";

class UserClass extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            userInfo : {
                name : "dummy",
                location : "USA",
                email : "johndeo@gmail.com",
                avatar_url : "lmao"
            }
        }
    }

    async componentDidMount(){ 
        const data = await fetch("https://api.github.com/users/ekantverma");
        const json = await data.json();

        this.setState({
            userInfo : json,
        });

        console.log(json);
     };

     
    render() {
        return (
            <div className="user-card-clas-component">
                <h1>User</h1>
                <img src={this.state.userInfo.avatar_url}/>
                <h4>Name: {this.state.userInfo.name}</h4>
                <p>Location: America</p>
                <p>Email: johndeo@gmail.com</p>
            </div>
        )
    }
}

export default UserClass;