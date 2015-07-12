var getTitle = function(url) {
    $.ajax({
      url: "http://decenturl.com/api-title?u=www.gamespot.com",
      type: 'GET',
      dataType: 'json',
      error: function(xhr, status, err) {
      }.bind(this),
      success: function(data) {
        console.log(data);
        return data[1];
      }.bind(this)
    });
};

var Stuff = React.createClass({
  render: function() {
        var ur = "http://www.google.com/s2/favicons?domain=" + this.props.thing.url.toString();
        var uri = "http://screenshotlayer.com/scl_api.php?url=" + this.props.thing.url.toString();
        var tit = getTitle(this.props.thing.url);
    return (
            <div>   
                    <img src={uri} width="300px" height="300px"/>
                    <h3> {this.props.thing.url}</h3>
                    <span> {tit}</span>
            </div>       
    );
  }
});

var StuffList = React.createClass({
  render: function() {
    var rows = [];
    var things = this.props.data;

    things.forEach(function(item) {
        rows.push(<Stuff thing={item} />);
    });

    return (
            <div>
                   {rows}
            </div>       
    );
  }
});

var StuffDisplay = React.createClass({
    handleCommentSubmit: function(comment) {
      var things = this.state.data;
      things.push(comment);
          this.setState({data: things}, function() {
      $.ajax({
        url: "localhost:5000",
        dataType: 'json',
        type: 'POST',
        data: things,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    });
    },

    getInitialState: function() {
    return {
        data: [{
            "url" : "http://www.google.com",
            "meta" : "metaaaa"
        }]
    };
    },

    render: function() {
    return (
      <div className="commentBox">
        <InputForm onCommentSubmit={this.handleCommentSubmit}/>
        <StuffList data={this.state.data} />
      </div>
    );
  }
});



var InputForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.inp).value.trim();
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({url: text, meta: text});
    React.findDOMNode(this.refs.inp).value = '';
  },

 render: function() {
    return (
    <form onSubmit={this.handleSubmit}>
        <input type="text" placeholder="Enter a link here!" ref="inp"/>
        <input type="submit" value="Add to bundle"/>
    </form>
    );
  }
});


React.render(<StuffDisplay /> ,document.getElementById('testid'));