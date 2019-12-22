<template>
  <div class="users">
    <div class="bd-callout bd-callout-primary">
      <h4 class="bold text-center text-info">COMMON PROJECTS & HOW LONG THEY TAKE</h4>
      <p class="text-justify text-dark">
        Below are a few of the things I am often asked to do by clients, along with how long those things take.
        These are only meant to give you a very rough idea — I’d encourage you to contact me in my below email address if you want a more specific time estimate.
      </p>
    </div>
    <p class="text-right mb-0">
      <i class="fa fa-envelope"></i>&nbsp;
      <a v-bind:href="'mailto:' + contactEmail" class="card-link">{{ contactEmail }}</a>
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
export default {
  name: "rates",
  data() {
    return {
      rates: [],
      hasError: false,
      contactEmail: "riaz@gmail.com"
    };
  },
  methods: {},
  created() {
    /// set the rates for the site
    if (!this.rates) this.rates = [];

    /// rates info
    setTimeout(() => {
      this.rates = [
        {
          duration: "0 to 3 HOURS",
          perHourRate: "125 per HOUR",
          workDescription: "e.g. Small website updates"
        },
        {
          duration: "3 to 10 HOURS",
          perHourRate: "100 per HOUR",
          workDescription:
            "Small-scope projects; e.g. extensive website updates, small-scope WordPress plugins or website features, custom page designs without builds"
        },
        {
          duration: "10 to 20 HOURS",
          perHourRate: "87 per HOUR",
          workDescription:
            "Small-scope design + build projects, like small single-page websites, custom opt-in pages, etc"
        },
        {
          duration: "20 to 30 HOURS",
          perHourRate: "82 per HOUR",
          workDescription:
            "Small-scope custom website projects, such as a bare-bones blog or podcast that has a focus on efficiency, rather than on going “all out” to make the site as kick-ass as possible. Relatively short sales pages also will often fall into this range."
        },
        {
          duration: "30 to 40 HOURS",
          perHourRate: "78 per HOUR",
          workDescription:
            "Relatively small-scope projects where I’m going “all out” will fall into this range. Or alternately, relatively large-scope projects where I am trying to be conservative on time spent and focusing on efficiency."
        },
        {
          duration: "40+ HOURS",
          perHourRate: "75 per HOUR",
          workDescription:
            "This is my catch-all rate for the types of projects I prefer to work on: sites where I’m really going the extra mile to make the site as kick-ass as possible. A standard-scope kick-ass site for a financial advisor, established blogger, established podcaster, etc. will generally be around 45 hours."
        }
      ];
    }, 500);
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

