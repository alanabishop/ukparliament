# UK Parliament - Product Team Home Exercise For Frontend Developers

## Accessibility

This exercise includes some instructions in PDF format. We’ve taken steps to make it as accessible as possible, 
however, we recognise the room for improvement and are actively working to enhance PDF accessibility moving forward.

If you experience any difficulty with this PDF or need it in an alternative format, please don’t hesitate 
to reach out.

## Dependencies

Please ensure you have the following installed:

- [node.js](https://nodejs.org/), see .nvmrc for the version this test was developed with

## Introduction

Thank you for taking part in our home exercise. We've provided a template solution to minimize setup 
and allow you to focus on the core task.

### Getting Started

1. Clone this repository and open the solution in your development environment of choice
2. Install the dependencies listed in `package.json`
3. Run the project using the `start` script in the `package.json`
4. Verify that the project is running as expected using the instructions in `src/scripts/index.ts`

The project includes:

- configuration files for dependencies and the development environment in the project root
- a `public/` directory that contains the files distributed by the development server
- a `src/` directory that contains the source files for filetypes that need to be processed before they can be 
  distributed in the `public/` directory
- a PDF of the design specification for this task

## Submitting Your Test

1. Host your completed solution on GitHub (or another Git-based hosting platform)
2. Provide us with a link to the repository so we can review your solution 
3. You **do not** need to host the solution online to provide a live example. We will run the project locally to 
   assess the solution

## Test Instructions

### Objective

The goal of this task is to develop a new frontend component from a provided design specification, 
using HTML, SCSS, and TypeScript.

The task is focussed exclusively on frontend development. You do not need to implement any backend server or 
data layer. Instead, you will use TypeScript to consume data from one of Parliament's existing public APIs.

### Requirements

1. Extend the existing Webpack development environment with a build pipeline for [Sass](https://sass-lang.com/):
   - add a new directory at `src/styles/` that includes `.scss` files
   - add the necessary dependencies and configuration to `webpack.config.js` to compile the `.scss` files into a
     `.css` bundle that is served from the `public/` directory
   - include the `.css` bundle in the `public/index.html` file
2. Build the new frontend component based on the specification provided:
   - the required code **must** be authored in HTML, SCSS and TypeScript
   - we would like to see you demonstrate your understanding of these core technologies, and so would prefer to avoid 
     the use of frontend frameworks like Angular and React
3. Add dynamic data to the component:
   - use a Member's `id` to get the relevant data shown in the design specification 
   - Member `id`s can be found in the URL of our Members site, such as:
     [https://members.parliament.uk/member/4514/](https://members.parliament.uk/member/4514/)
   - use the [Members API](https://members-api.parliament.uk/) to get appropriate data using a chosen `id`
   - the Member `id` must be stored in the URL of the application, as a query parameter
   - use TypeScript to retrieve the `id` from the URL and to fetch and display the relevant data from our 
     API, such that changing the query parameter to a new `id` dynamically updates the component
   - use the `membershipEndDate` data from our API to fulfill the checks required for the conditional information 
     detailed in the design specification
