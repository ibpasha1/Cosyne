Test Commands:

curl -H "Content-Type: application/json" -X POST -d '{"email": "poop@poop.com", "username":"Jack Frost","password":"1234","first_name": "James", "last_name": "Bond", "account_type": "influencer"}' localhost:3000/register

curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
