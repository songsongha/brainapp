import React, {Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'fbab00b327ff4b558a8cca7862f2606a'
});

const particlesOptions = {
  particles: {
    number: {
      value:80,
      density:{
        enable:true,
        value_area: 800   
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {  
      input: '',
      imageURL: '',
      box: [{
        leftCol: '',
        topRow: '',
        rightCol: '',
        bottomRow: ''
      }],
  }
}

calculateFaceLocation = (data) => {
  // const face = data.outputs[0].data.regions[0].region_info.bounding_box;
  const image = document.getElementById('inputimage');
  const width = Number(image.width);
  const height = Number(image.height);
  // console.log(data); //regions is the array to loop through
  let boxCoordinates = []
  data.outputs[0].data.regions.map(function(array,i) {
      const face = array.region_info.bounding_box
      boxCoordinates.push({
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width - (face.right_col * width),
        bottomRow: height - (face.bottom_row * height)
      })
  })
  console.log(boxCoordinates);
  return boxCoordinates;
}

displayFaceBox = (box) => {
  this.setState({box: box});

}

onInputChange = (event) => {
    this.setState({input: event.target.value}); //when the input changes update the state, make input = whatever is in the box
}

onButtonSubmit = () => {
    this.setState({imageURL: this.state.input}) // update the state, make imageURL = input
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch( err => console.log(err));
}

  render(){
    return (
      <div className="App">
      <Particles className='particles'
              params={particlesOptions}/>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
        <FaceRecognition boxArray={this.state.box} imageURL={this.state.imageURL} />
      </div>
    );
  }
}

export default App;
