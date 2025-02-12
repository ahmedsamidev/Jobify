# Job Application Management Website

## Overview

This web application is designed to help users efficiently manage their job applications. It allows users to add, edit, and delete job entries, track application statuses, and visualize application data through charts.

## Features

- **Add, Edit, Delete Jobs**: Users can create new job entries, modify existing ones, and remove them as needed.
- **Track Application Status**: Monitor the progress of each application with status indicators.
- **Data Visualization**: View application statistics through intuitive charts.
- **Search and Filter**: Easily find specific job entries using search and filter functionalities.

## Technologies Used

- **Frontend**:
  - React.js
  - Styled Components
- **Backend**:
  - Node.js
  - Express.js
  - MongoDB
- **Authentication**:
  - JSON Web Tokens (JWT)

## Installation

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/ahmedsamidev/Jobify
   cd Jobify
   ```

2. **Install Dependencies**:

   - For the backend:

     ```bash
     yarn install
     ```

   - For the frontend:

     ```bash
     cd client
     yarn install
     ```

3. **Environment Variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   JWT_LIFETIME=1d
   ```

   Replace `your_mongodb_connection_string` and `your_jwt_secret` with your actual MongoDB connection string and a secret key for JWT.

4. **Start the Application**:

   - In the root directory, start the backend server:

     ```bash
     node start
     ```

   - In the `client` directory, start the frontend development server:

     ```bash
     yarn run dev
     ```

## Contributing

Contributions are welcome! Please fork the repository and create a pull request with your changes. Ensure that your code follows the project's coding standards and includes appropriate tests.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
