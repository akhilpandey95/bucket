
var stuff = React.createClass({
  render: function() {
    return (<div>
                    <img src={this.props.thing.image} height="50px" width="50px"/>
                     <h3>{this.props.thing.url}</h3>
                     <span>{this.props.thing.meta}</span>
            </div>       
    );
  }
});


var Stuff = React.createClass({
  render: function() {
    return (
            <div>
                   <h3> hello world </h3>
            </div>       
    );
  }
});

var stuffList = React.createClass( {
    render: function() {
        var rows = [];
        this.props.linkss.forEach(function(item) {
            console.log(item);
            rows.push(<stuff thing={item} />);
        });

        return (
                <div>
                    {rows}
                </div>
            );
    }
});

var stuffDisplay= React.createClass({
    render : function(){
        return (
                <Stuff />
            )
    }
})

var Links=[
{image: 'k.jpg',url:'test.html', meta:'meta test'},
{image: 'k.jpg',url:'test.html', meta:'meta test'},
{image: 'k.jpg',url:'test.html', meta:'meta test'},
{image: 'k.jpg',url:'test.html', meta:'meta test'},

];

console.log("hello world");

React.render(<stuffDisplay /> ,document.getElementById('testid'));