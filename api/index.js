require('dotenv').config();
const express = require('express');
const cors = require('cors');
const os = require('os');  // Import os module to get hostname

const app = express();
const port = 3000;

// Get the hostname of the instance
const hostname = os.hostname();

app.use(cors());
app.use(express.json());

// Middleware to log the instance serving the request
app.use((req, res, next) => {
    console.log(`Request served by instance: ${hostname}`);
    next();
});

// Root endpoint to show success 200
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is running successfully', servedBy: hostname });
});

// Health check endpoint for load balancer
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'Healthy', servedBy: hostname });
});

// Static data for the users
const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', year: 2015, company: 'meta' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', year: 2016, company: 'google' },
    { id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com', year: 2017, company: 'dell' },
    { id: 4, name: 'Bob Brown', email: 'bob.brown@example.com', year: 2018, company: 'facebook' },
    { id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com', year: 2019, company: 'meta' },
    { id: 6, name: 'Diana Evans', email: 'diana.evans@example.com', year: 2020, company: 'google' },
    { id: 7, name: 'Eve Foster', email: 'eve.foster@example.com', year: 2021, company: 'dell' },
    { id: 8, name: 'Frank Green', email: 'frank.green@example.com', year: 2016, company: 'facebook' },
    { id: 9, name: 'Grace Harris', email: 'grace.harris@example.com', year: 2017, company: 'meta' },
    { id: 10, name: 'Hank Irving', email: 'hank.irving@example.com', year: 2018, company: 'google' },
    { id: 11, name: 'Ivy Jackson', email: 'ivy.jackson@example.com', year: 2019, company: 'dell' },
    { id: 12, name: 'Jack King', email: 'jack.king@example.com', year: 2020, company: 'facebook' },
    { id: 13, name: 'Kara Lee', email: 'kara.lee@example.com', year: 2021, company: 'meta' },
    { id: 14, name: 'Liam Miller', email: 'liam.miller@example.com', year: 2015, company: 'google' },
    { id: 15, name: 'Mia Nelson', email: 'mia.nelson@example.com', year: 2016, company: 'dell' },
    { id: 16, name: 'Noah Owens', email: 'noah.owens@example.com', year: 2017, company: 'facebook' },
    { id: 17, name: 'Olivia Perez', email: 'olivia.perez@example.com', year: 2018, company: 'meta' },
    { id: 18, name: 'Paul Quinn', email: 'paul.quinn@example.com', year: 2019, company: 'google' },
    { id: 19, name: 'Quincy Roberts', email: 'quincy.roberts@example.com', year: 2020, company: 'dell' },
    { id: 20, name: 'Rachel Scott', email: 'rachel.scott@example.com', year: 2021, company: 'facebook' }
];

// GET /api/users endpoint to return the static list of users
app.get('/api/users', (req, res) => {
    res.json(users);
});

// POST /api/users endpoint to filter the static list of users
app.post('/api/users', (req, res) => {
    const { query, year, company } = req.body;

    try {
        let filteredUsers = users;

        // Filter by query if provided
        if (query) {
            filteredUsers = filteredUsers.filter(user =>
                user.name.toLowerCase().includes(query.toLowerCase()) ||
                user.email.toLowerCase().includes(query.toLowerCase()) ||
                user.company.toLowerCase().includes(query.toLowerCase())
            );
        }

        // Filter by year if provided
        if (year) {
            filteredUsers = filteredUsers.filter(user => user.year === parseInt(year, 10));
        }

        // Filter by company if provided
        if (company) {
            filteredUsers = filteredUsers.filter(user => user.company.toLowerCase() === company.toLowerCase());
        }

        res.json(filteredUsers);
    } catch (err) {
        console.error('Error processing request:', err.stack);
        res.status(500).json({ error: 'Server Error', servedBy: hostname });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}, served by ${hostname}`);
});
