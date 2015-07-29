var Definition = React.createClass({
  render: function(){
    return <p>{this.props.def}</p>;
  }
});

var WordSearch = React.createClass({
  getInitialState: function(){
    return{
      word: ''
    }
  },
  handleChange: function(e){
    this.props.onClickHandler(e.target.value);
    this.setState(
      {word: e.target.value}
    );
  },
  render: function(){
    return (
      <div>
        <input type="text" value={this.state.word} onChange={this.handleChange} />
      </div>
    )
  }
});

var DictContainer = React.createClass({
  getInitialState: function(){
    return {
      word: '',
      def: ''
    }
  },
  lookupWord: function(e){
    $.getJSON( "http://api.wordnik.com/v4/word.json/" + e + "/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5", this.handleJson);
  },
  handleJson: function(json){
    if(json[0] != null){
      this.setState({def: json[0].text});
    }
  },
  render: function(){
    return(
      <div>
        <WordSearch onClickHandler={this.lookupWord} />
        <Definition def={this.state.def}/>
      </div>
    )
  }
});

React.render(
  <DictContainer />,
  document.getElementById('dict')
);
