var Stuff = React.createClass({
  render: function() {
    return (
            <div>   
                    <img src="{this.props.image}" />
                    <h3> {this.props.thing.url}</h3>
                    <span> {this.props.thing.meta} </span>
            </div>       
    );
  }
});

var inputForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();
    var content = React.findDOMNode(this.refs.content).value.trim();
    this.props.onCommentSubmit({content: content});
    React.findDOMNode(this.refs.content).value = '';
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input type="text" placeholder="A link to bundle" ref="content" />
        <input type="submit" value="Add to bundle" />
      </form>
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
      var comments = this.state.data;
      comments.push(comment);
    },

    getInitialState: function() {
    return {data: []};
    },

    render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <StuffList data={this.state.data} />
        <inputForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }
});

React.render(<StuffDisplay /> ,document.getElementById('testid'));