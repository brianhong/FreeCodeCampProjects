import React from 'react';
import {render} from 'react-dom';

class Greeting extends React.Component{
  render(){
    return <h1>Hello</h1>;
  }
}

var ListBox = React.createClass({
  getInitialState: function(){
    /* Set up initial state of component */
    return {data: []};
  },
  componentDidMount: function(){
    $.getJSON(this.props.url,
        {
          limit: 3
        })
     .done(function(data){
       this.setState({data: data.top});
     }.bind(this))
     .fail(function(){
       console.log('ERROR');
     }.bind(this))
  },
  render: function(){
    return(
      <div className='listBox'>
        <h1>Box</h1>
        <BroadcasterDiv data={this.state.data} />
      </div>
    ); 
  }
});

class BroadcasterDiv extends React.Component{
  render(){
    var broadcasterNodes = this.props.data.map(function(broadcaster){
      return(
        <PictureDiv image={broadcaster.game.logo.large} broadcaster={broadcaster.game.name} key={broadcaster.game._id}>
          {broadcaster.viewers}
        </PictureDiv>
      );
    });
    return(
      <div className='broadcasterDiv'>
        {broadcasterNodes}
      </div>
    );
  }
}

var PictureDiv = React.createClass({
  render: function(){
    return(
      <div className='pictureDiv'>
        <img src={this.props.image}></img>
        <h2 className='picOwner'>
          {this.props.broadcaster}
        </h2>
        {this.props.children}
      </div>
    );
  }
});

var SearchForm = React.createClass({
  getInitialState: function(){
    return {data: []};
    //return {qs: '', data: []};
  },
  handleTextChange: function(e){
    //this.setState({qs: e.target.value});
    //var search_query = this.state.qs.trim();
    var search_query = e.target.value.trim();
    /*
    if(!qs){
      return;
    }
    */
    $.getJSON(this.props.url,
        {
          query: search_query,
          limit: 1
        })
      .done(function(data){
        this.setState({data: data.channels});
      }.bind(this))
      .fail(function(){
        console.log('ERROR');
      }.bind(this))
  },
  render: function(){
    var broadcasterNodes = this.props.data.map(function(broadcaster){
      return(
        <SearchDiv gameName={broadcaster.game}>
          {broadcaster.url}
        </SearchDiv>
      );
    });
    
    return(
      <div className='searchForm'>
        <form className='searchForm'>
          <input 
            type="text" 
            placeholder="Search..."
            //value={this.state.qs}
            onChange={this.handleTextChange}
          />
          <input type='submit' value='Search' />
        </form>
        /*
        <SearchDiv data={this.state.data} />
        */
        <div className='channelNodes'>
          {broadcasterNodes}
        </div>
      </div>
    );
  }
});

class SearchDiv extends React.Component{
  render(){
    return(
      <div className='searchDiv'>
        <h4>Search Div</h4>
        <h5 className='gameName'>
          {this.props.gameName}
        </h5>
      </div>
    );
  }
}

render(<SearchForm url="https://api.twitch.tv/kraken/search/channels?callback=?"/>, document.getElementById('searchDiv'));
render(<ListBox url="https://api.twitch.tv/kraken/games/top?callback=?" />, document.getElementById('content'));

