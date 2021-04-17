// Attraverso una chiamata ajax all'API di boolean
// https://flynn.boolean.careers/exercises/api/array/music
// avremo a disposizione una decina di dischi musicali.
// Utilizzando vue, stampiamo a schermo una card per ogni album.
// BONUS: Creare una select con tutti i generi dei dischi. In base a cosa scegliamo nella select, vedremo i corrispondenti cd.
// BONUS 2: Ordinare i dischi per anno di uscita.

function raccoltaMusicale () {
  new Vue ({
    el:'.container',
    data:{
      items:[],
      genres:[],
      selected: "",
    },
    methods: {
      getGenre: function (){
        for (var i = 0; i < this.items.length; i++) {
          const item = this.items[i];
          const genre = item.genre;
          if (!this.genres.includes(genre)) {
            this.genres.push(genre);
          }
        }
      },

      filteredGenre: function() {
        var test = this.items.filter( type =>  type.genre.includes(this.selected));
        return test;
      },
      sortedArray: function() {
        const sortedYear = this.filteredGenre().sort (
          function(a,b){
            if (a.year < b.year) {
             return -1;
            } else if (a.year > b.year) {
             return 1;
            }
            return 0;
          }
        );
          return sortedYear
        }
      },
      mounted() {
        axios.get('https://flynn.boolean.careers/exercises/api/array/music')
        .then(data => {
          this.items = data.data.response;
          this.getGenre();
        })
        .catch(() => console.log('error'));
      },


    });

  }

  function init() {
    raccoltaMusicale();
  }

  $(document).ready(init);
