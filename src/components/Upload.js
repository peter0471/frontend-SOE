import React, { Component } from "react";
import Button from "@mui/material/Button";
import axios, * as lol from "axios";
import Feedback from "./Feedback";
import Webcam from "react-webcam";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import bg from "./cloud.svg";

export default class Upload extends Component {
  constructor(props) {
    super(props);
    this.api = " http://127.0.0.1:8000/";
    this.webcap = React.createRef();
    this.state = {
      image: bg,
      base64: null,
      currentPred: null,
      showForm: false,
      showdialog: false,
    };
  }

  getBase64 = (file) => {
    return new Promise((resolve) => {
      let baseURL = "";
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        baseURL = reader.result;
        resolve(baseURL);
      };
    });
  };

  processImage = (encoded) => {
    this.setState({
      base64: encoded,
      image: encoded,
      showForm: false,
      currentPred: null,
    });
  };

  onImageChange = (event) =>
    this.getBase64(event.target.files[0]).then((res) => this.processImage(res));

  onpredict = async () => {
    const result = await axios.post(this.api + "predict", {
      b64: this.state.base64,
    });
    this.setState({ showForm: true, currentPred: result.data["Class"] });
  };

  takephoto = () => {
    this.setState({ showdialog: true });
  };

  onfeedbackreceived = () => {
    this.setState({ showForm: false });
  };

  clickpic = () => {
    this.processImage(this.webcap.current.getScreenshot());
    this.setState({ showdialog: false });
  };

  render() {
    const flexcenter = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "25px",
    };

    const style = {
      width: 400,
      height: 400,
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: "30px",
      marginBottom: "30px",
    };
    return (
      <div>
        <div>
          <div>
            <Dialog open={this.state.showdialog}>
              <DialogContent>
                <Webcam screenshotFormat="image/jpeg" ref={this.webcap} />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.clickpic}>click </Button>
              </DialogActions>
            </Dialog>
            <div style={{ ...style }}>
              <img
                src={this.state.image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              ></img>
            </div>
            <div style={flexcenter}>
              <input type="file" id="imgupload" onChange={this.onImageChange} />
              <Button onClick={this.takephoto}>Take a photo</Button>
            </div>
          </div>
          <div style={{ textAlign: "center" }}>
            <Button
              onClick={this.onpredict}
              variant="outlined"
              style={{ margin: "5px" }}
            >
              Predict
            </Button>
          </div>
        </div>
        <div style={flexcenter}>
          {this.state.showForm ? (
            <Feedback
              img={this.state.base64}
              pred={this.state.currentPred}
              completed={this.onfeedbackreceived}
            />
          ) : (
            ""
          )}
          ;
        </div>
      </div>
    );
  }
}
