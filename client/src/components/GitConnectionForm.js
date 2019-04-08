import React from "react";
import Form from "./common/form";

class GitConnectionForm extends Form {
  username = React.createRef();

  render() {
    //if (auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div>
        <button
          className="btn btn-primary"
          style={{ margin: 10 }}
          onClick={() =>
            window.location.replace(
              "https://github.com/login/oauth/authorize?scope=user:TestUser001info&client_id=1acd98284d275423d24b"
            )
          }
        >
          <h4>Sync Github</h4>
        </button>
      </div>
    );
  }
}

export default GitConnectionForm;
