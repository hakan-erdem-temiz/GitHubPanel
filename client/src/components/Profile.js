import React, { Component } from "react";
import GitConnectionForm from "./GitConnectionForm";
import { getUser } from "../services/userService";
import auth from "../services/authService";

class Profile extends Component {
  state = {
    githubdata: {},
    gitUserNameErr: "*Please check your git user name is valid in gitPanel!"
  };

  async populateProfil() {
    let user = auth.getCurrentUser();
    const { data: userData } = await getUser(user._id);

    const githubdata = userData.github;
    console.log(userData);
    console.log(githubdata);
    this.setState({ githubdata });
  }

  async componentDidMount() {
    await this.populateProfil();
  }

  render() {
    return (
      <div className="row">
        <div className="col-6">
          <div>
            <GitConnectionForm />
          </div>
        </div>
        <div className="col-6">
          <h3>Profile Informations</h3>
          <p>id:{this.state.githubdata.id}</p>
          <p>company:{this.state.githubdata.company}</p>
          <p>location:{this.state.githubdata.location}</p>
          <p>email:{this.state.githubdata.email}</p>
          <p>bio:{this.state.githubdata.bio}</p>
          <p>following:{this.state.githubdata.following}</p>
          <p>followers:{this.state.githubdata.followers}</p>
          <h5 style={{ color: "red" }}>
            {this.state.githubdata.github ? "" : this.state.gitUserNameErr}
          </h5>
        </div>
      </div>
    );
  }
}

export default Profile;
