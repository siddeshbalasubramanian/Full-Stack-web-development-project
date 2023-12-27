Vue.component("top",{
  props: ["user"],
  template: `
  <div>
  <div class="p-3 mb-2 bg-warning text-dark" align="center" >
  <button><h1>WELCOME TO ADMIN LOGGING PAGE</h1></button>
  </div>
  <div class="container">
      <div class="row g-2">
      <div v-for="venue in ven_list">
      <div class="card" style="width: 50rem;">
        <div class="card-body">
          <h5 class="card-title">{{venue["venuename"]}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{venue["place"]}}</h6>
            

<!---   shows section --->

            <div v-for='show in venue["shows"]'>
            <div class="input-group mb-3" >
                        <button type="button" class="btn btn-outline-secondary">{{show["showname"]}}</button>
                        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" v-on:click="delete_show(show['showid'])" >DELETE </a></li>
                            
                        </ul>
<!---update shows-------------------------------------------------------------------------------->

<button class="btn btn-outline-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" @click="calculate_vid2(show.showid)" aria-controls="offcanvasRight">UPDATE</button>

<div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasRightLabel">Offcanvas right</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">

  <div class="modal-body">
<form id="update_shows">
<!----linking starts-->

<div class="row mb-3">
<div class="col-sm-15">
    <label for="number" >NEW STARTING SHOW TIME</label>
    <input type="text" class="form-control" id="number"  name="showname" v-model="new_showname" placeholder="ENTER NEW SHOWNAME" >
</div>
</div>


<div class="row mb-3">
<div class="col-sm-10">
    
    <label for="time1" >NEW STARTING SHOW TIME</label><input type="time" name="timestamp1" v-model="new_timing1" id="time1" class="form-control">
    <label for="time2" >NEW ENDING SHOW TIME</label><input type="time" name="timestamp2" v-model="new_timing2" id="time2" class="form-control">
</div>
</div>



<!--- end linking-->


<button for="update_shows" class="btn btn-outline-secondary" v-on:click="update_show_func(sidd)" >UPDATE</button>


</form>

    
  </div>
</div>
</div>


<!--------end update shows------------------------------------------------------------------------>

            <input name="last" type="text" class="form-control" aria-label="Text input with segmented dropdown button">
            </div>
            </div>

<!--- shows end section --->

<!--- ADD SHOWS SECTION--->
<!----  new modal try -->                   
<div>
    <button
type="button"
class="btn btn-outline-warning"
data-bs-toggle="modal"
data-bs-target="#exampleModal"
@click="calculate_vid(venue.venueid)"
>
Add show
</button>

<!-- Modal -->
<div
class="modal fade"
id="exampleModal"
tabindex="-1"
aria-labelledby="exampleModalLabel"
aria-hidden="true"
>
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<h5 class="modal-title" id="exampleModalLabel">SHOW DETAILS</h5>

<button
type="button"
class="btn-close"
data-bs-dismiss="modal"
aria-label="Close"
></button>
</div>
<div class="modal-body">
<form id="add_shows" @submit.prevent="add_show_func(vidd)">
<!----linking starts-->

<div class="row mb-3">
<div class="col-sm-15">
    <input type="text" class="form-control" id="number"  name="showname" v-model="showname" placeholder="SHOW NAME" required>
</div>
</div>
<div class="row mb-3">
<div class="col-sm-15">
    <input type="text" class="form-control" id="tags"  name="tags" v-model="tags" placeholder="TAGS :     eg=action,thriller" required>
</div>
</div>
<div class="row mb-3">
<div class="col-sm-10">
    <input type="number" class="form-control" id="price"  name="price" v-model="price" placeholder="PRICE" required>
</div>
</div>
<div class="row mb-3">
<div class="col-sm-10">
    
    <label for="time1" >STARTING SHOW TIME</label><input type="time" name="timestamp1" v-model="timing1" id="time1" class="form-control" required>
    <label for="time2" >ENDING SHOW TIME</label><input type="time" name="timestamp2" v-model="timing2" id="time2" class="form-control" required>
</div>
</div>
<fieldset class="row mb-3">
<div><legend class="col-form-label col-sm-2 pt-0">RATING</legend></div>
<div class="col-sm-10">
    <div class="form-check">
        <input class="form-check-input" type="radio" name="completed_flag" id="gridRadios1"  value=1 >
        <label class="form-check-label" for="gridRadios1">
            1
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="completed_flag" id="gridRadios2"  value=2>
        <label class="form-check-label" for="gridRadios2">
            2
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="completed_flag" id="gridRadios3"  value=3 >
        <label class="form-check-label" for="gridRadios3">
            3
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="completed_flag" id="gridRadios4"  value=4 >
        <label class="form-check-label" for="gridRadios4">
            4
        </label>
    </div>
    <div class="form-check">
        <input class="form-check-input" type="radio" name="completed_flag" id="gridRadios5"  value=5 >
        <label class="form-check-label" for="gridRadios5">
            5
        </label>
    </div>
</div>
</fieldset>


<!--- end linking-->


<button  class="btn btn-outline-secondary" v-bind:class="btn_class" >ADD</button>

</form>

</div>
<div class="modal-footer">
<button
type="button"
class="btn btn-secondary"
data-bs-dismiss="modal"
>
Close
</button>
<!-- <button type="button" class="btn btn-primary">Add deck</button> -->
</div>
</div>
</div>
</div>


</div>
<!---end modal try-->


<!--- END ADD SHOWS SECTION--->

<!---update venues---->

<button class="btn btn-outline-warning" type="button" data-bs-toggle="offcanvas" @click="calculate_vid(venue.venueid)" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">UPDATE</button>


<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasLeftLabel">ENTER THE FIELDS YOU WANT TO MODIFY</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <form id="update_venue" >
                        <label for="new_venuename" class="form-label">NEW VENUE NAME</label>
                        <input  type="text" name="venuename" id="new_venuename" class="form-control"  placeholder="Enter New Venue Name" v-model="new_venuename"/>
                        <label for="new_capacity" class="form-label">NEW CAPACITY</label>
                        <input  type="number" name="capacity" id="new_capacity" class="form-control"  placeholder="Enter New Capacity" v-model="new_capacity"/>
                        <center><button id="venue_update_btn" class="btn btn-outline-secondary" v-on:click="update_venue_func(vidd)">
                        UPDATE
                        </button></center>  
                        </form>


    
  </div>
</div>



<!----end update venues---->


<!----delete venues---->
 
      <a class="btn btn-outline-warning" v-on:click="delete_venue(venue['venueid'])" role="button">DELETE</a>
<!----end delete venues----->

<!----export venues------>
      <a class="btn btn-outline-warning" v-on:click="export_download(venue['venueid'])" role="button">EXPORT @ DOWNLOAD</a>
<!----end export venues------->
      </div>
      </div>
      </div> 
      </div>
  </div>


      
  </div>
  `,

  data : function(){
    return {
      venue_list : [],  
      ven_list : [],
      showname : null,
      tags : null,
      price : 0,
      rating : 1,
      timing1 : null,
      timing2 : null,
      btn_class: null,
      vidd: 0,
      sidd:0,
      new_venuename: null,
      new_capacity: 0,
      new_showname: null,
      new_timing1: null,
      new_timing2: null,
      //shows : [],
      //showings :  [],
    }
  },

  methods: {
    export_download: async function (id) {
      await fetch(`/api/export/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then(() => console.log("exported deck-------------------"))
        .catch((e) => console.log(e + "error ------------------------!!"));
      // document.getElementById("deck_features_d").src = "static/CSV/deck.csv";
      window.location.href = "/static/CSV/show.csv";
      console.log("Download also done   -------------------");
    },

    add_show_func: function(num){
      this.btn_class = "btn btn-warning";
      fetch(`/api/${num}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({showname: this.showname, tags: this.tags, price: this.price, timing1: this.timing1, timing2: this.timing2, completed_flag: this.rating}),
      }).then((resp) => resp.json()).then(() => (this.btn_class = "btn btn-outline-success")).catch((e) => console.log(e + "error ------------------------!!"));
    document.location.reload(true);

    },
    calculate_vid: function(vid){
      this.vidd=vid;
    },

    calculate_vid2: function(sid){
      this.sidd=sid;
    },

    update_venue_func: function(id) {
      fetch(`/api/venue_edit_api/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ venuename: this.new_venuename, capacity: this.new_capacity }),
      })
        .then((resp) => resp.json())
        .then(() => console.log("edited deck name-------------------"))
        .catch((e) => console.log(e + "error ------------------------!!"));
      document.location.reload(true);
    },

    update_show_func: function(sid) {
      fetch(`/api/show_edit_api/${sid}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ showname: this.new_showname, timing1: this.new_timing1, timing2: this.new_timing2 }),
      })
        .then((resp) => resp.json())
        .then(() => console.log("edited Show name-------------------"))
        .catch((e) => console.log(e + "error ------------------------!!"));
      document.location.reload(true);
    },
    delete_venue: async function (venueid) {
      await fetch(`/api/deck_delete_api/${venueid}`, {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then(() => console.log("deleted venue--------------"))
        .catch((e) => console.log(e));
      document.location.reload(true);
    },
    delete_show: async function (showid) {
      await fetch(`/api/show_delete_api/${showid}`, {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then(() => console.log("deleted venue--------------"))
        .catch((e) => console.log(e));
      document.location.reload(true);
    },
  },
  computed: {
    
    
  },
  mounted: async function () {
      // this.get_kyc();
      console.log(this.user_name + "----------------------------------");
      await fetch(`/api/venue/${this.user}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((response) => response.json()).then((data) => this.venue_list.push(...data))
        .catch((e) => console.log(e));


     for(const venue of this.venue_list){
        var num=venue["venueid"];
        venue["shows"]=[];
        //var num=Object.entries(venue)
      
        var shows=[];
        await fetch(`/api/${num}/show`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => response.json()).then((data) => shows.push(...data)).catch((e) => console.log(e));
          //venue["shows"]=this.shows;
        var ven={"venuename":venue["venuename"],"venueid":venue["venueid"],"place":venue["place"],"location":venue["location"],"capacity":venue["capacity"],"shows":shows};
        this.ven_list.push(ven);
       }
      //}
    },
  

})

const add_venue = Vue.component("add_venue", {
  props: ["user"],
  data: function () {
    return {
      venuename: null,
      place: null,
      capacity: 0,
      location: null,
      btn_class: null,
    };
  },
  template: `
  <div>
  
  <form id="add_venue" @submit.prevent="add_venue_func">
                        <label for="venuename" class="form-label">VENUE name</label>
                        <input  type="text" name="venuename" id="venuename" class="form-control"  placeholder="Enter venue Name" v-model="venuename" required>
                        <label for="place" class="form-label">PLACE</label>
                        <input  type="text" name="place" id="place" class="form-control"  placeholder="Enter THE PLACE" v-model="place" required>
                        <label for="location" class="form-label">LOCATION</label>
                        <input  type="text" name="location" id="location" class="form-control"  placeholder="Enter THE LOCATION" v-model="location" required>
                        <label for="capacity" class="form-label">CAPACITY</label>
                        <input  type="number" name="capacity" id="capacity" class="form-control"  placeholder="Enter CAPACITY" v-model="capacity" required>
                        <center><button id="deck_add_btn" class="btn btn-outline-secondary" v-bind:class="btn_class" >
                         ADD
                        </button></center>  
                        </form>


  </div> 
    `,
  methods: {
    add_venue_func: function () {
      this.btn_class = "btn btn-warning";
      fetch(`/api/venue/${this.user}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ venuename: this.venuename, place: this.place, location: this.location, capacity: this.capacity }),
      })
        .then((resp) => resp.json())
        .then(() => (this.btn_class = "btn btn-outline-success"))
        .catch((e) => console.log(e));
      document.location.reload(true);
    },
  },
});

var app = new Vue({
    el: "#app",
    
})
  
  console.log("in js file =============================== ");
  