Vue.component("top", {
  props: ["user"],
  template: `
    <div>
    <div class="p-3 mb-2 bg-warning text-dark" align="center" >
    <button><h1>WELCOME TO ADMIN LOGGING PAGE</h1></button>
    </div>
    <div class="topnav">
    <a v-on:click="your_booking" class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample">
  YOUR BOOKINGS
</a>

            <div class="search-container">
                <form>
                    <input type="text" placeholder="Search by theatre/place/movie" name="search" v-model="search_name">
                    <button class="btn btn-outline-primary" type="submit" v-if="find">Reload</button>
                </form>
            </div>
    </div>
    <br>
    <div class="container">
        <div class="row g-2">
        <div v-for="venue in ven_list">
        <div class="card" style="width: 50rem;">
          <div class="card-body">
<!------------------------------------------------------------------------------------->
<!-- Button trigger modal -->
<h5><button v-on:click="define2(venue.venuename,venue.place,venue.location,venue.capacity)" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  {{venue["venuename"]}}
</button></h5>

<!-- Modal -->
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="staticBackdropLabel">ABOUT VENUES</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <p class="uppercase">VENUE NAME   : {{vn_name}} </p>
        <p class="uppercase">VENUE PLACE    : {{vn_place}} </p>
        <p class="uppercase">VENUE LOCATION   : {{vn_location}} </p>
        <p class="uppercase">VENUE CAPACITY: {{vn_cap}} </p>
  
        
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

<!------------------------------------------------------------------------------------------------->
              <h6 class="card-subtitle mb-2 text-muted">{{venue["place"]}}</h6>
              
  
  <!---   shows section --->
  
              <div v-for='show in venue["shows"]'>
              <div class="input-group mb-3" >
                          <button type="button" class="btn btn-outline-secondary">{{show["showname"]}}</button>
                          <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                              <span class="visually-hidden">Toggle Dropdown</span>
                          </button>
  <!---booking-------------------------------------------------------------------------------->
  <button v-on:click="define(venue.venuename,venue.venueid,show.showname,show.showid,show.price,show.timing1,show.timing2,venue.capacity)" class="btn btn-outline-warning" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">BOOK</button>
  <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
    <div class="offcanvas-header">
      <h5 id="offcanvasRightLabel">BOOKING SECTION</h5>
      <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
  
    <div class="modal-body">
    <div class="h4 pb-2 mb-4 text-danger border-bottom border-danger">
    
        <p class="uppercase">VENUE NAME   : {{vn_name}} </p>
        <p class="uppercase">SHOW NAME    : {{sh_name}} </p>
        <p class="uppercase">SHOW PRICE    : {{sh_price}} </p>
        <p class="uppercase">SHOW TIMING  : {{sh_time1}}-{{sh_time2}} </p>
        <p class="uppercase">VENUE CAPACITY: {{vn_cap}} </p>
  
    </div>
    <div>
    <form id="booking">
        <div class="row mb-9">
            <center><div><label for="bonumber" >NUMBER OF BOOKINGS:</label></div></center>
            <div class="col-sm-10">
                <input type="number" class="form-control" id="bonumber"  name="number" v-model="bonumber" required>
            </div>
            <br>
            <br>
            <button type="button" class="btn btn-outline-info">TOTAL PRICE OF BOOKINGS:{{total}}</button>
        </div>
       <br>
       <br>
        
        
        
        <center><button type="submit" class="btn btn-primary" v-on:click="book_show(vn_id)">CONFIRM BOOKING</button></center>
    </form>
    </div>

  
      
    </div>
  </div>
  </div>
  
  
  <!--------end booking------------------------------------------------------------------------>
  
              <input name="last" type="text" class="form-control" aria-label="Text input with segmented dropdown button">
              </div>
              </div>
  
  <!--- shows end section --->
  
  <!--- ADD SHOWS SECTION--->
  
  <!--- END ADD SHOWS SECTION--->
  
  <!---update decks---->

  <!----end update decks---->
        </div>
        </div>
        </div> 
        </div>
    </div>

<!-----YOUR BOOKING------->



<div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div class="offcanvas-header">
    <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
  <div class="container ">
  <div class="row g-2">
      <div v-for="data in datas">
      <div class="card" style="width: 50rem;">
          <div class="card-body">
            <h5 class="card-title">{{data["showname"]}}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{data["venuename"]}}</h6>
            <div class="input-group mb-3" >
              <button type="button" class="btn btn-outline-secondary">{{data["timing1"]}}-{{data["timing2"]}}</button>
              <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                  <span class="visually-hidden">Toggle Dropdown</span>
              </button>
              <ul class="dropdown-menu">
                  <li><a class="dropdown-item" > TOTAL PRICE :{{data["total"]}}</a></li>
                  <li><a class="dropdown-item" > TOTAL NO OF BOOKINGS :{{data["number"]}}</a></li>
                  <li><center><a class="btn btn-outline-warning" v-on:click="delete_booking(data['bookingid'])" role="button">Cancel This Show</a></center></li>
              </ul>
              <input type="text" class="form-control" aria-label="Text input with segmented dropdown button">
              </div>
        </div>
      </div>

      </div>

</div>

  </div>
</div>

</div>

<!----END YOUR BOOKINGS---->
  
  
        
    </div>
    `,
  
  data: function () {
    return {
      temp_flag: false,
      temp_showname: null,
      temp_shows: [],
      venue_list: [],
      venue_listt: [],
      ven_list: [],
      showname: null,
      search_name: null,
      tags: null,
      price: 0,
      rating: 1,
      timing1: null,
      timing2: null,
      btn_class: null,
      vn_name: null,
      vn_place: null,
      vn_location: null,
      sh_name: null,
      sh_price: null,
      sh_time1: null,
      sh_time2: null,
      vn_cap: null,
      bonumber: 0,
      new_venuename: null,
      new_timing1: null,
      new_timing2: null,
      vn_id: 0,
      sh_id: 0,
      tot: 0,
      datas: [],
      vn_capp: 0,
      resp: false,
      //shows : [],
      //showings :  [],
    }
  },
  
  methods: {
    delete_booking: function (bid, no) {
      fetch(`/api/booking_delete_api/${bid}`, {
        method: "GET",
      })
        .then((resp) => resp.json())
        .then(() => console.log("deleted venue--------------"))
        .catch((e) => console.log(e));
      document.location.reload(true);
    },
    define: function (vn_name, vn_id, sh_name, sh_id, sh_price, sh_time1, sh_time2, vn_cap) {
      this.vn_name = vn_name;
      this.vn_id = vn_id;
      this.sh_id = sh_id;
      this.sh_name = sh_name;
      this.sh_price = sh_price;
      this.sh_time1 = sh_time1;
      this.sh_time2 = sh_time2;
      this.vn_cap = vn_cap;
    },
    define2: function (vn_name, vn_place, vn_location, vn_cap) {
      this.vn_name = vn_name;
      this.vn_place = vn_place;
      this.vn_location = vn_location;
      this.vn_cap = vn_cap;
    },
    your_booking: function () {
      fetch(`/api/yourbooking/${this.user}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      }).then((resp) => resp.json()).then((data) => (this.datas.push(...data))).catch((e) => console.log(e + "error ------------------------!!"));
    },
    book_show: function (vn_id) {
      if (this.vn_cap >= 0) {
        
        fetch(`/api/bookingadd/${this.user}/${vn_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ showname: this.sh_name, venuename: this.vn_name, total: this.tot, price: this.sh_price, timing1: this.sh_time1, timing2: this.sh_time2, number: this.bonumber }),
        }).then((resp) => resp.json()).then(() => (console.log("good"))).catch((e) => console.log(e + "error ------------------------!!"));
        document.location.reload(true);
      
        fetch(`/api/venue_edit_api/${vn_id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ venuename: this.venuename, capacity: this.vn_cap }),
        })
          .then((resp) => resp.json())
          .then(() => console.log("edited deck name-------------------"))
          .catch((e) => console.log(e + "error ------------------------!!"));
        document.location.reload(true);

      }
    }

  },
  computed: {
    total: function () {
      ans = (this.bonumber) * (this.sh_price);
      this.tot = ans;
      this.vn_cap = this.vn_cap - this.bonumber
      return ans;
    },
    find: async function () {
      if (this.search_name != null) {
        this.resp = true;
        this.venue_list = [];
        this.venue_listt = [];
        this.ven_list = [];
        this.temp_showing = [];
        await fetch(`/api/booking/${this.user}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((response) => response.json()).then((data) => this.venue_list.push(...data))
          .catch((e) => console.log(e));
        for (const venue of this.venue_list) {
          var num = venue["venueid"];
          var ven_name = venue["venuename"]
          var ven_place = venue["place"]
          var ven_location = venue["location"]
          venue["shows"] = [];

          var shows = [];
          await fetch(`/api/${num}/show`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => response.json()).then((data) => shows.push(...data)).catch((e) => console.log(e));
          var vennnn = { "venuename": venue["venuename"], "venueid": venue["venueid"], "place": venue["place"], "location": venue["location"], "capacity": venue["capacity"], "shows": shows };
          this.venue_listt.push(vennnn);
        }
        for (const venue of this.venue_listt) {
          var num = venue["venueid"];
          var ven_name = venue["venuename"]
          var ven_place = venue["place"]
          var ven_location = venue["location"]
          var ven_shows = venue["shows"]
          this.temp_shows = []
          //venue["shows"] = [];
          //var num=Object.entries(venue)
          if (ven_name == this.search_name) {
              
              
            /*  var shows = [];
              await fetch(`/api/${num}/show`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                },
              }).then((response) => response.json()).then((data) => shows.push(...data)).catch((e) => console.log(e)); */
            //venue["shows"]=this.shows;
          
            var ven = { "venuename": venue["venuename"], "venueid": venue["venueid"], "place": venue["place"], "location": venue["location"], "capacity": venue["capacity"], "shows": venue["shows"] };
            this.ven_list.push(ven);
          }
          else if (ven_location == this.search_name) {
            var ven = { "venuename": venue["venuename"], "venueid": venue["venueid"], "place": venue["place"], "location": venue["location"], "capacity": venue["capacity"], "shows": venue["shows"] };
            this.ven_list.push(ven);

          }
            
          else {
            this.temp_shows = []
            for (const sw of venue["shows"]) {
              //this.temp_showname = sw["showname"]

              if (sw["showname"] == this.search_name) {
                this.temp_flag = true;
             // var venn = { "showid": sw["showid"], "showname": sw["showname"], "rating": sw["rating"], "timing1": sw["timing1"], "timing2": sw["timing2"], "tags": sw["tags"], "price": sw["price"], "venueid": sw["venueid"]}
              this.temp_shows.push(sw)
              //var ven = { "venuename": venue["venuename"], "venueid": venue["venueid"], "place": venue["place"], "location": venue["location"], "capacity": venue["capacity"], "shows": venue["shows"] };
              //this.ven_list.push(ven);

            //}
              }   
            }
            if (this.temp_flag == true) {
              var ven = { "venuename": venue["venuename"], "venueid": venue["venueid"], "place": venue["place"], "location": venue["location"], "capacity": venue["capacity"], "shows": this.temp_shows };
              this.ven_list.push(ven); 
              this.temp_flag = false;
            
          }
         
            

          /* else { 
            if (ven_show == this.search_name) { 

            }
            var ven = { "venuename": venue["venuename"], "venueid": venue["venueid"], "place": venue["place"], "location": venue["location"], "capacity": venue["capacity"], "shows": shows };
            this.ven_list.push(ven);
          } */
        } 
  

        }

        
        

      }
      
      
    }
  },
    mounted: async function () {
      // this.get_kyc();
      console.log(this.user_name + "----------------------------------");
      if (this.resp == false) {
        if (this.search_name == null) {
          await fetch(`/api/booking/${this.user}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }).then((response) => response.json()).then((data) => this.venue_list.push(...data))
            .catch((e) => console.log(e));
  
  
          for (const venue of this.venue_list) {
            var num = venue["venueid"];
            venue["shows"] = [];
            //var num=Object.entries(venue)
        
            var shows = [];
            await fetch(`/api/${num}/show`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }).then((response) => response.json()).then((data) => shows.push(...data)).catch((e) => console.log(e));
            //venue["shows"]=this.shows;
            var ven = { "venuename": venue["venuename"], "venueid": venue["venueid"], "place": venue["place"], "location": venue["location"], "capacity": venue["capacity"], "shows": shows };
            this.ven_list.push(ven);
          }
        }
      }
      //}
    },
    
  
  });
  
  var app = new Vue({
      el: "#app",
      
  })
    
    console.log("in js file =============================== ");
    