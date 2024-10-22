# Event Management System

## Introduction
This project is an Event Management System built using NestJS and TypeORM. The application allows users to create new events, register users for events, and manage event information.

## Features
- **Create Events**: Ability to create new events with required details.
- **User Registration**: Users can register for events.
- **Manage Events**: Ability to delete and view event details.
- **EventEmitter Support**: Internal event handling for better functionality.

## Technologies
- **NestJS**: A framework for building scalable Node.js applications.
- **TypeORM**: ORM for managing database interactions.
- **PostgreSQL**: Database for storing information.
- **EventEmitter**: For managing events within the application.

## Setup
### Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or higher)

### Installation Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/aminabedi1368/event-management-system.git
   cd event-management-system
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Database**
   - Set up your PostgreSQL database and create a new database.
   - Configure the database information in the `.env` file.
     ```plaintext
     DATABASE_HOST=localhost
     DATABASE_PORT=5432
     DATABASE_USERNAME=your_username
     DATABASE_PASSWORD=your_password
     DATABASE_NAME=your_database_name
     ```

4. **Run Migrations**
   ```bash
   npm run migration:run
   ```

5. **Start the Application**
   ```bash
   npm run start:dev
   ```

## Usage
Once the application is running, you can access the API at [http://localhost:3000](http://localhost:3000).

## API Documentation
To view the API documentation, you can use documentation tools like Swagger. After starting the application, navigate to [http://localhost:3000/api](http://localhost:3000/api).

## Contributing
If you would like to contribute to this project, please follow these steps:
1. Fork the repository.
2. Create a new branch for your changes.
3. Submit a pull request.

## License
This project is licensed under the MIT License. For more details, please refer to the [LICENSE](LICENSE) file.
