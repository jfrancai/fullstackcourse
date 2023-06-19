# Part11

## A) Introduction to CI/CD

### What is CI?

-> Lint: to keep our code clean and maintainable
-> Build: put all of our code together into runnable software bundle
-> Test: to ensure we don't break existing features
-> Package: Put it all together in an easily movable batch
-> Deploy: Make it available to the world


Main goal is to deploy faster and with more reliability

* How to make sure that tests run on all code that will be deployed?
* How to make sure that the main branch is deployable at all times?
* How to ensure that builds will be consisten and will always work on the platform it'd be deploying to?
* How to make sure that the changes don't overwrite each other?
* How to make deployments happen at the click of a button or automatically when one merges to the main branch?

### Self hosted set-up

Jenkins is the leading open source automation server

### Github Actions and other cloud-based solutions

## B) Getting started with GitHub Actions

workflows, jobs, event
a typical execution of a workflow looks like this: 

* Triggering event happens (for example, there is a push to the main branch)
* The workflow with that trigger is executed
* cleanup
