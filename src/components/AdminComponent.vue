<template>
  <div class="users">
    <div class="text-center">
      <input type="button" v-on:click="updatePage" class="btn btn-primary w100" value="Save" />
      &nbsp;&nbsp;
      <input
        type="button"
        v-on:click="goBack"
        class="btn btn-default w100"
        value="Cancel"
      />
      <br />
      <br />
    </div>
    <div class="bd-callout bd-callout-primary">
      <h4 class="bold text-center text-info">
        <input
          type="text"
          name="headerSubTitle"
          v-model="ratePage.HeaderSubTitle"
          maxlength="96"
          placeholder="Header Subtitle"
          class="form-control"
        />
      </h4>
      <p class="text-justify text-dark">
        <textarea
          name="headerSubTitle"
          v-model="ratePage.HeaderDescription"
          maxlength="512"
          placeholder="Description"
          class="form-control"
          rows="5"
        />
      </p>
    </div>
    <p class="text-left mb-0">
      <i class="fa fa-envelope"></i>&nbsp; Email
      <input
        type="email"
        name="contactEmail"
        v-model="ratePage.contactEmail"
        maxlength="96"
        placeholder="Email"
        class="form-control"
      />
    </p>
    <br />
    <div class="view-users">
      <h3>
        Rates
        <a @click="addItem()" class="float-right">
          <i class="fa fa-plus"></i>
          &nbsp;Add Rate
        </a>
      </h3>
      <hr />
      <transition-group
        name="users"
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <div class="card" v-for="(rateData, index) in rates" :key="index">
          <div class="card-body">
            <div class="card-title">
              <a @click="deleteItem(rateData, index)" class="float-right">
                <i class="fa fa-trash"></i>
                &nbsp;Delete
              </a>
              <b>
                <i class="fa fa-clock-o"></i>&nbsp; Duration
                <input
                  type="text"
                  name="duration"
                  v-model="rateData.duration"
                  maxlength="96"
                  placeholder="Duration"
                  class="form-control"
                />
              </b>
            </div>
            <p class="card-text text-dark">
              <b>
                <i class="fa fa-dollar"></i>
                &nbsp;Hourly Rate
                <input
                  type="text"
                  name="perHourRate"
                  v-model="rateData.perHourRate"
                  maxlength="96"
                  placeholder="Hourly rate"
                  class="form-control"
                />
              </b>
            </p>
            <hr />
            <span class="card-subtitle mb-1 text-dark">
              <b>Work Description</b>
              <textarea
                name="workDescription"
                v-model="rateData.workDescription"
                maxlength="1024"
                placeholder="Description"
                class="form-control"
                rows="6"
              />
            </span>
          </div>
          <br />
        </div>
      </transition-group>
      <br />
    </div>
  </div>
</template>

<script>
import { database } from "../config/db";

export default {
  name: "rates",
  data() {
    return {
      rates: [],
      ratePage: {}
    };
  },
  methods: {
    updatePage: function() {
      /// init base data
      let ratePageData = Object.assign({}, this.ratePage);
      delete ratePageData.doc;

      // update page data
      database
        .collection("ratePage")
        .doc(this.ratePage.doc.id)
        .set(ratePageData);

      // update rates data
      this.rates.forEach(rate => {
        /// init data
        let rateData = Object.assign({}, rate);
        if (rate.doc) delete rateData.doc;

        // db call
        if (rate.doc)
          database
            .collection("rates")
            .doc(rate.doc.id)
            .set(rateData)
            .then(() => this.$router.push({ name: "rates" }));
        else
          database
            .collection("rates")
            .doc()
            .set(rateData)
            .then(() => this.$router.push({ name: "rates" }));
      });
    },
    goBack: function() {
      this.$router.push({ name: "rates" });
    },
    deleteItem: function(rate, index) {
      /// init data
      let rateData = Object.assign({}, rate);
      delete rateData.doc;

      // db call
      if (rate.doc) {
        database
          .collection("rates")
          .doc(rate.doc.id)
          .delete();
      }

      /// splice
      this.rates.splice(index, 1);
    },
    addItem: function() {
      /// add a new item to the bottom
      this.rates.push({
        duration: "",
        id: this.rates.length,
        perHourRate: "",
        workDescription: ""
      });
      window.scrollTo(0, document.body.scrollHeight);
    }
  },
  created() {
    /// set the rates for the site
    if (!this.rates) this.rates = [];
    if (!this.ratePage) this.ratePage = {};

    /// for page info
    database
      .collection("ratePage")
      .where("isActive", "==", true)
      .get()
      .then(resp => {
        let ratePage = null;
        resp.forEach(function(doc) {
          ratePage = doc.data();
          ratePage["doc"] = { id: doc.id };
        });
        this.ratePage = ratePage;
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.log("Error getting page info: ", error);
      });

    /// get data from Firebase Cloud
    database
      .collection("rates")
      .orderBy("id", "asc")
      .get()
      // eslint-disable-next-line no-console
      .then(resp => {
        resp.docs.forEach(doc => {
          let rateObj = doc.data();
          rateObj["doc"] = { id: doc.id };
          this.rates.push(rateObj);
        });
      })
      .catch(function(error) {
        // eslint-disable-next-line no-console
        console.log("Error getting rates: ", error);
      });
  }
};
</script>

<style scoped>
a {
  font-size: 14px;
}
a.cancelLink {
  font-size: inherit;
}
.card {
  margin: 10px 0;
}
input[type="text"].form-control {
}
.bd-callout {
  padding: 1.25rem;
  margin-bottom: 1.25rem;
  border: 1px solid #eee;
  border-left-width: 0.25rem;
  border-radius: 0.25rem;
}
.bd-callout + .bd-callout {
  margin-top: -0.25rem;
}
.bd-callout-primary {
  border-left-color: #5bc0de;
}
textarea {
  resize: none;
}
input[type="text"],
input[type="email"],
textarea {
  border-left: 3px solid #6c757d !important;
}
</style>

