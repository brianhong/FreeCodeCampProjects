"use strict"
import React from 'react';
import {render} from 'react-dom';

var DEFAULT_STREAMERS = [
  'ESL_SC2',
  'OgamingSC2',
  'cretetion',
  'freecodecamp',
  'storbeck',
  'habathcx',
  'RobotCaleb',
  'noobs2ninjas',
  'brunofin'
];

var SearchBar = React.createClass({
  handleSearch: function(){
      this.props.onUserInput(
        this.refs.filterInput.value
      );
  },
  render: function(){
    return(
        <form className='searchForm'>
          <input 
            type="text" 
            placeholder="Search..."
            value={this.props.filter}
            ref='filterInput'
            onChange={this.handleSearch}
          />
        </form>
    );
  }
});

class StreamList extends React.Component{
  render(){
    console.log(this.props.streams);
    var broadcasterNodes = this.props.streams.map((streamer) => {
      if(typeof streamer === 'undefined'){
        return 10;
      }
      if(this.props.filter.length == 0){
        return(
          <StreamDiv broadcaster={streamer.stream.channel.display_name} key={streamer.stream._id}>
            {streamer.stream.channel.url}
          </StreamDiv>
        );
      }
      else{
        return(
          <StreamDiv broadcaster={streamer.display_name} key={streamer._id}>
            {streamer.url}
          </StreamDiv>
        );
      }
    });
    return(
      <div className='streamList'>
        {broadcasterNodes}
      </div>
    );
  }
}

class StreamDiv extends React.Component{
  render(){
    return(
      <div className='streamRow'>
        <h4>
          {this.props.broadcaster}
        </h4>
        {this.props.children}
      </div>
    );
  }
}

function getStreamObj(streamer){
      $.getJSON("https://api.twitch.tv/kraken/streams/" + streamer + '?callback=?')
        .done(function(data){
          console.log(data);
          return data;
        }.bind(this))
        .fail(function(){
          console.log('getStreamObj ERROR');
        }.bind(this))
}

var FilterableStreamList = React.createClass({
  handleUserInput: function(new_filter){
    /* setState() creates pending transition, can potentially return existing value here */
    this.setState({
      filter: new_filter
    });
    if(new_filter === ''){
      this.setState({
        rendered_streams: this.props.streams.map(getStreamObj)
      });
    }
    else{
      var search_query = new_filter.trim();
      $.getJSON(this.props.url,{
        query: search_query,
        limit: 1
      })
      .done(function(data){
        this.setState({
          rendered_streams: data.channels
        });
      }.bind(this))
      .fail(function(){
        console.log('SearchBar ERROR');
      }.bind(this))
    }
  },
  getInitialState: function(){
    return{
      filter: '',
      rendered_streams: []
    };
  },
  /* Called immediately after initial render.
     componentDidMount() generally used for side-effects (e.g., AJAX to initialize state data) */
  componentDidMount: function(){ 
    this.setState({
      rendered_streams: this.props.streams.map(getStreamObj)
    });
  },
  shouldComponentUpdate(nextProps, nextState){
    return true;
  },
  render: function(){
    return(
      <div>
        <SearchBar 
          filter={this.state.filter} 
          onUserInput={this.handleUserInput}
        />
        <StreamList filter={this.state.filter} streams={this.state.rendered_streams} />
      </div>
    );
  }
});

render(<FilterableStreamList streams={DEFAULT_STREAMERS} url="https://api.twitch.tv/kraken/search/channels/?callback=?" />, document.getElementById('content'));

