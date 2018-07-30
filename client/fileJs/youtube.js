let Youtube = new Vue({
    el: "#app",
    data: {
      result: [],
      queries: ""
  
    },
    methods: {
      search: function () {
        this.result = []
        gapi.client.setApiKey('AIzaSyD1v_WKGZyHBUokhKFvqTYWgNjgtrNWcOM');
        gapi.client.load('youtube', 'v3', function () {
          Youtube.getVideo();
        });
      },
  
  
      getVideo: function () {
        $('#results').empty()
        var q = this.queries 
        var request = gapi.client.youtube.search.list({
          q: q,
          part: 'snippet',
          maxResults: 10
        });
  
        request.execute(function (response) {
          console.log(response.items)
          console.log('?')
          for (let i = 0; i < response.items.length; i++) {
            Youtube.result.push(response.items[i])
            console.log(Youtube.result)
          }
        })
      }
    }
  })