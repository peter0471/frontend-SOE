import React, { Component } from 'react'
import Button  from '@mui/material/Button';
import { FormControl, Box,Radio, RadioGroup, FormControlLabel, FormLabel, TextField } from '@mui/material';
import axios, * as lol from 'axios';


export default class Feedback extends Component {
    constructor(props) {
        super(props);
        this.pred = this.props.pred;
        this.api = " http://127.0.0.1:8000/";
        this.complete = this.props.completed;
        this.img = this.props.img;
        this.myref = React.createRef();
        this.state = {
            disableText: true,
            predType: true  ,
            value: ""
        }
    }

    onradioclick = (e) => {
        const val = e.target.value;
        var disableText = true;
        var txt = this.state.predType;
        if (val == "Yes") {
            txt = true;
        } else {
            txt = false;
            disableText = false;
        }
        this.setState({predType: txt});
        this.setState({disableText: disableText});
    }

    report = async () => {
      const result = await axios.post(this.api + "update", { b64: this.img , label: (this.state.predType ? this.pred : this.state.value)});
      this.complete();
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
    }

    render() {
    return (
      <div>
          <div>
              Predicted Class : 
              {this.pred}
          </div>
          <div style={{display:"flex", flexDirection:"column"}}>
                <FormControl>
                <FormLabel id="demo-radio-buttons-group-label">
                    Is the prediction correct ? 
                </FormLabel>
                <RadioGroup
                 defaultValue="Yes"
                >
                     <FormControlLabel value="Yes" control={<Radio />} label="Yes"  onClick={this.onradioclick}/>
                     <FormControlLabel value="No" control={<Radio />} label="No" onClick={this.onradioclick} />
                  </RadioGroup>
                      <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
                <div>
            <TextField value={this.state.value} onChange={this.handleChange} disabled={this.state.disableText} id="outlined-basic" label="correct class" variant="outlined" defaultValue="gg">Hahah</TextField>
                </div>
                </Box>
                </FormControl>            
                <Button variant="outlined" onClick={this.report}>Submit</Button>
            </div>
      </div>
    )
  }
}