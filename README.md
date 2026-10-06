# VirtuCart - Ecommerce Platform


## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Screenshots](#screenshots)
4. [How to Use](#how-to-use)
5. [Project Structure](#project-structure)
6. [Technologies Used](#technologies-used)
7. [Testing Credentials](#testing-credentials)

## Overview

VirtuCart is a React-based ecommerce platform that utilizes technologies like Redux, Context, Tailwind CSS, Formik, Yup, SweetAlert, and the FakeStoreAPI. It offers a comprehensive shopping experience with features such as user authentication, product listing, detailed product information, shopping cart functionality, and more.

## Features

- **Product Listing:** Display a list of products available in the store, including images, titles, prices, and descriptions.

- **Product Details:** Show detailed information about each product, including specifications and customer reviews.

- **User Authentication:** Allow users to create accounts, log in, and log out. Keep track of user-specific information, such as order history.

- **Shopping Cart:** Enable users to add products to their shopping cart. Display the contents of the shopping cart with quantities and prices.

- **Checkout Process:** Guide users through a seamless checkout process. Collect shipping information and provide order summaries.

- **Search and Filtering:** Implement search functionality for users to find specific products. Provide filters based on categories, prices, and other criteria.

- **Responsive Design:** Ensure the application is accessible and user-friendly across various devices.

- **Wishlist:** Allow users to add products to a wishlist for future reference.

- **User Profile:** Display user-specific information and order history.

- **Form Validation:** Implement form validation using Formik and Yup for a seamless user experience.

- **Alerts:** Integrate SweetAlert for user-friendly alerts and notifications.

## Screenshots

Home Page
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/5742ab00-2a40-42ef-b0a0-2c849c11fd08)

Product Listing
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/9f70fcc4-2105-4703-9847-b92441396bb0)

Filters
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/e56928d8-b96c-4ebe-bde6-ccdd64683fea)

Product Details
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/69eee27e-26c0-43a7-a876-c6cdafaea005)

Add to cart
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/b36f666a-0051-49cf-b343-f111d02bfcf2)

Cart Page
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/2646bd1a-7c17-4d00-b73f-0219ac52c417)

Checkout
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/e4af8833-4a42-4bc2-8abd-5f5619288af0)

Profile
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/a32231d0-cb21-44d7-ab12-f3cd88136796)

Light Mode
![image](https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi/assets/63789702/db939d8a-3697-4a09-b491-0b243000ad04)

## How to Use

1. Clone the repository to your local machine.

   ```bash
   git clone https://github.com/utkarshgupta04092003/ecommerce-using-fakestoreapi.git
   ```

2. Navigate to the project directory.

   ```bash
   cd ecommerce-using-fakestoreapi
   ```

3. Install dependencies.

   ```bash
   npm install
   ```

4. Start the development server.

   ```bash
   npm run dev
   ```

5. Open your browser and visit [http://localhost:5173](http://localhost:5173) to explore VirtuCart.

## Support widget

The DevRev Plug widget lets customers contact support and raise tickets. Set
`VITE_DEVREV_APP_ID` to the public Unique App ID from DevRev Plug Settings in
your local `.env.local` and in the Render environment variables. No DevRev API
token is needed by this frontend.

## Project Structure

- **src/components:** Contains React components for different sections of the application.
- **src/context:** Manages dark mode features using React Context.
- **src/redux:** Implements state management with Redux, including slices for cart and wishlist functionality.
- **src/utils:** Includes utility functions and constants.
- **src/forms:** Integrates Formik and Yup for form validation.
- **src/alerts:** Utilizes SweetAlert for user-friendly alerts.
- **src/App.js:** Main application component defining the structure and routing.

## Technologies Used

- React
- Redux
- Context API
- Tailwind CSS
- FakeStoreAPI
- React Router DOM
- Formik
- Yup
- SweetAlert

## Testing Credentials

To test the website, use the following credentials:

- **Email:** don@gmail.com
- **Password:** ewedon
- Or
- **Email:** morrison@gmail.com
- **Password:** 83r5^_


Feel free to explore VirtuCart, an ecommerce platform offering a delightful shopping experience!
