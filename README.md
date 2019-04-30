# Earnings

## CRUD API

### Create
##### '/id'
Developer only access. Create a new company ID to start tracking their earnings.

### Read
##### '/id'
Every module will need to grab the ID of a company when the it loads. Doing so will render the stock earnings of the company
when navigating to the company's stock profile.

##### '/api/earnings/id'
The request will return a report of company stock earnings over the past 5 quarters. It will return expected and actual stock
price earnings for each quarter.

### Update
##### '/id'
Developer only access. Update company profiles with new earnings data.

### Delete
##### '/id'
Developer only access. Delete a company from the database. 
