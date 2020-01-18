<template>
  <div class="users">
    <div class="bd-callout bd-callout-primary">
      <h4 class="bold text-center text-info">{{ ratePage.HeaderSubTitle }}</h4>
      <p class="text-justify text-dark">{{ ratePage.HeaderDescription }}</p>
    </div>
    <p class="text-right mb-0">
      <i class="fa fa-envelope"></i>&nbsp;
      <a
        v-bind:href="'mailto:' + ratePage.contactEmail"
        class="card-link"
      >{{ ratePage.contactEmail }}</a>
    </p>
    <div class="view-users">
      <transition-group
        name="users"
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <div class="card" v-for="(rateData, index) in rates" :key="index">
          <div class="card-body">
            <h4 class="card-title">
              <b>
                <i class="fa fa-clock-o"></i>
                {{ rateData.duration }}
              </b>
            </h4>
            <p class="card-text text-primary">
              <b>
                <i class="fa fa-dollar"></i>
                {{ rateData.perHourRate }}
              </b>
            </p>
            <hr />
            <span class="card-subtitle mb-1 text-secondary">{{ rateData.workDescription }}</span>
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
  methods: {},
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
        this.rates = resp.docs.map(doc => doc.data());
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
  width: 50%;
}
.bd-callout-primary {
  border-left-color: #5bc0de;
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
</style>

