# CollabPlan

This is the platform for Action Plans.  

<!-- toc -->

* [Local Development](#local-development)
* [Navigating the App](#navigating-the-app)

<!-- toc end -->

## Local Development

Install [Meteor](https://www.meteor.com/install) and [MongoDB](https://docs.mongodb.org/manual/installation/).

Clone the repo
```bash
$ meteor
```
Then, the web app should be available at [localhost:3000](http://localhost:3000)

## Navigating the App
There are 3 components to CollabPlan, and each has a corresponding view in the client/views directory.
* Composer (for experts to create action plans): [actionPlanCompose](https://github.com/NUDelta/collabplan2/tree/master/client/views/actionPlanCompose)
* Request (for learners to request action plans): [actionPlanRequestForm](https://github.com/NUDelta/collabplan2/tree/master/client/views/actionPlanRequestForm)
* Viewer (for learners to view finished action plans): [actionPlanRequestView](https://github.com/NUDelta/collabplan2/tree/master/client/views/actionPlanView)

These views make calls to server side methods, which can be found [here](https://github.com/NUDelta/collabplan2/blob/master/server/methods/ActionPlansMethods.js).
