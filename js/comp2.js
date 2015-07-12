var getTitle = function(url) {
    $.ajax({
      url: "211",
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

var CrossButton = React.createClass({
    render: function() {
        return (
        <span data-toggle="tooltip" title="Delete" 
            className="fa fa-times cross" aria-hidden="true"
            onClick={this.props.removeaction.bind(this, this.props.keyy)}>
        </span>
        );
    }
});

var LinkImage = React.createClass({
    render: function() {
        var ur = "http://www.google.com/s2/favicons?domain=" + this.props.url.toString();

        return(
            <img className="link-image" src={ur} />
        );
    }
});

var LinkText = React.createClass({
    render: function() {
        return(
            <div className="col-md-7">
                <div className="row">
                    <div className="col-md-12">
                        <a className="link" href={this.props.url}>{this.props.url}</a>
                        <h4> {this.props.meta}</h4>
                    </div>
                </div>
            </div>
        );
    }
});

var LinkPrefixerEdit = React.createClass({
    render: function() {

        return(
                <div className=" col-md-offset-1 col-md-1">
                    <CrossButton keyy={this.props.keyy} removeaction={this.props.removeaction}/>
                    <LinkImage url={this.props.url} />
                </div>
        );
    }
});

var LinkPrefixerView = React.createClass({
    render: function() {
        return( 
            <div className=" col-md-offset-1 col-md-1">
                <LinkImage url={this.props.url} />
            </div>
        );
    }
});

var Stuff = React.createClass({
  render: function() {
        if(this.props.EditMode) {
            return (
            <div className="row">
                <LinkPrefixerEdit keyy={this.props.keyy} removeaction={this.props.removeaction} url={this.props.thing.url}/>
                <LinkText url={this.props.thing.url} meta={this.props.thing.url} />
            </div> 
        );
    } else {
            return (
            <div className="row">
                <LinkPrefixerView url={this.props.thing.url}/>
                <LinkText url={this.props.thing.url} meta={this.props.thing.url} />
            </div> 
        );
    }

  }
});

var StuffListEdit = React.createClass({
  
  render: function() {
    var rows = [];
    var things = this.props.data;
    var editmode = true;
    var de = this.props.del;

        things.map(function(item, index) {
            rows.push(<Stuff thing={item} keyy={index} EditMode={editmode} removeaction={de}/>);
        });

    return (
            <div transitionName="example" className="container-fluid link-container">
                   {rows}
            </div>       
    );
  }
});

var StuffList = React.createClass({
  
  render: function() {
    var rows = [];
    var things = this.props.data;
    var editmode = false;

        things.map(function(item, index) {
            rows.push(<Stuff thing={item} key={index} EditMode={editmode}/>);
        });



    return (
            <div transitionName="example" className="container-fluid link-container">
                   {rows}
            </div>       
    );
  }
});

var EditMode = React.createClass({
    handleCommentSubmit: function(thing) {
      var things = this.state.data;
      things.unshift(thing);
          this.setState({data: things});
    },
    handleTitleSubmit: function(title) {
          this.setState({title: title});
    },
    handleSaveSubmit: function(e) {
        e.preventDefault();
      $.ajax({
        url: "localhost:5000",
        dataType: 'json',
        type: 'POST',
        data: this.state,
        success: function(data) {
            console.log("Success");
        }.bind(this),
        error: function(xhr, status, err) {
          console.error("error:", status, err.toString());
        }.bind(this)
    });
    },

    titleDeleteAction: function() {
          this.setState({title: ""});
    },

    handleDelete : function(index) {
        var things = this.state.data;
        if (index > -1) {
            things.splice(index, 1);
        }
        
        this.setState({data: things});   
    },
    getInitialState: function() {
        return this.props.state;
    },

    render: function() {

        if(this.state.data.length != 0  ) {
            
            if(this.state.title != "") {
                return (
                        <div className="commentBox">
                          <div className="row">
                            <span data-toggle="tooltip" title="Delete"  className="col-md-offset-1 col-md-1 fa fa-times cross title-cross" aria-hidden="true" onClick={this.titleDeleteAction}></span>
                            <h1 className="col-md-8"> {this.state.title} </h1>
                          </div>
                          <InputForm onCommentSubmit={this.handleCommentSubmit}/>
                          <SaveButton onSave={this.handleSaveSubmit} />
                          <StuffListEdit data={this.state.data} del={this.handleDelete}/>
                          
                        </div>
                    );
            }

        return (
            <div className="commentBox">
              <TitleForm onCommentSubmit={this.handleTitleSubmit}/>
              <InputForm onCommentSubmit={this.handleCommentSubmit}/>
              <SaveButton onSave={this.handleSaveSubmit} />  
              <StuffListEdit data={this.state.data} del={this.handleDelete}/>
              
            </div>
        );
    }
            if(this.state.title != "") {
                return (
                        <div className="commentBox">
                          <div className="row">
                            <span className="col-md-offset-1 col-md-1 glyphicon glyphicon-remove cross title-cross" aria-hidden="true" onClick={this.titleDeleteAction}></span>
                            <h1 className="col-md-8"> {this.state.title} </h1>
                          </div>
                          <InputForm onCommentSubmit={this.handleCommentSubmit}/>
                          <StuffListEdit data={this.state.data} del={this.handleDelete}/>
                        </div>
                    );
            }
    return (
      <div className="commentBox">
        <InputForm onCommentSubmit={this.handleCommentSubmit}/>
        <StuffListEdit data={this.state.data} del={this.handleDelete}/>
      </div>
    );
  }
});

var SaveButton= React.createClass({
    render: function(){
        return (
          <div>
          
<button className="btn btn-primary save-btn" type="submit"  onClick={this.props.onSave}> <span className="fa fa-floppy-o"></span></button>
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
    if (!text.match(/^[a-zA-Z]+:\/\//))
    {   
        text = 'http://' + text;
    }
      
      if(!/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(text)){
      alert('The entered URL is not valid');
          return;
      }
    
    this.props.onCommentSubmit({url: text, meta: text});
    React.findDOMNode(this.refs.inp).value = '';
  },

 render: function() {
    return (
        <div className="row nomar">
    <form onSubmit={this.handleSubmit}>
        <input className="inp col-md-offset-2 col-md-8" type="text" placeholder="Enter a link here!" ref="inp"/>
    </form>
        </div>
    );
  }
});
var TitleForm = React.createClass({

  handleSubmit: function(e) {
    e.preventDefault();
    var text = React.findDOMNode(this.refs.titl).value.trim();
    if (!text) {
      return;
    }
    this.props.onCommentSubmit({title: text});
    React.findDOMNode(this.refs.titl).value = '';
  },

 render: function() {
    return (
        <div className="row nomar">
    <form onSubmit={this.handleSubmit}>
        <input className="inp2 inp col-md-offset-2 col-md-8" type="text" placeholder="Enter a Title here!" ref="titl"/>
    </form>
        </div>
    );
  }
});

var ViewMode = React.createClass({
    getInitialState: function() {
        return this.props.state;
    },

    render: function() {
        return (
        <div>
            <div className="row">
                <h1 className="col-md-offset-2 col-md-8 title-head"> {this.state.title} </h1>
            </div>
            <StuffList data={this.state.data}/>
        </div>
        );
    }
});

var Controller = React.createClass({
    getInitialState: function() {
        return {
            data: [],
            title : "",
            bucket_id : false,
            editmode : true,
        };
    },

    render: function() {
        if(this.state.editmode) {
            return <EditMode state={this.state} />
        } else {
            return <ViewMode state={this.state} />
        }
    }
});

React.render(<Controller /> ,document.getElementById('testid'));