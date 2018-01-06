var GIPHY_PUB_KEY = 'hSxVCrWIVNQnAYF1SropFDDiNYVyKpHk';
var GIPHY_API_URL = 'http://api.giphy.com';

App = React.createClass({
    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    getGif: function(searchingText) {
        return new Promise(function(resolve, reject) {
            var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = function() {
                if(xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText).data;
                    var gif = {
                        url: data.fixed_width_downsampled_url,
                        sourceUrl: data.url
                    };
                    resolve(gif);
                } else {
                    reject(new Error('Something went wrong'));
                }
            }
            xhr.send();
        });
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        });
        var self = this;
        this.getGif(searchingText)
            .then(function(gif) {
                self.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText
                });
        });
    },

  
    render: function() {

        var styles = {
            margin: '0 auto',
            textALign: 'center',
            width: '90%'
        };

        return (
            <div style={styles}>
                <h1>Wyszukiwarka GIFów!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search 
                    onSearch={this.handleSearch}/>
                <Gif 
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                    />
            </div>
        );
    }
});