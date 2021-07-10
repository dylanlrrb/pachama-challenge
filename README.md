# Pachama Challenge


## To start project


- make sure you have docker and docker-compose installed on your machine
- pull down or unzip repo and cd into the repo
- run "`docker-compose up`"
- navigate to [localhost:8080](http://localhost:8080/)


## Discussion points and improvements


Discussion:
- I opted to separate the app into 3 seperate parts, each running in it's own docker container and orchestrated with docker-compose
- on startup the mysql database is populated with mock data from some .csv files that I made, found in /database/data
- the backend container connects to the database and runs the flask app that serves the api
- the client was created with `create-react-app` and is served from it's own container where it makes requests to the api
- the api is designed for different components in the react app to call to lazily load just the data that it needs to render, these are "/api/search", "/api/details", "/api/carbon_details", and "/api/forest_types"
- the endpoints are passed query parameters specify what resources it should grab from the database, more info on valid params can be found in `/backend/app.py`


While unfortunately I did not have enough time to write tests for this challenge, if I did, I would include:
- client side integration tests for components asserting that they render as expected when specific props are passed in
- client side integration tests that assert that components make calls to the correct endpoints and with correct parameters
- backend tests asserting that correct SQL queries are made against the database when called with specific params


Improvements:
- I am not doing any param sanitization on the backend, so the database would be susceptible to SQL injection attacks
- I would want to build in caching of api requests either on the client side or backend to prevent querying the database more than necessary (since this data is unlikely to change quickly)
- I would want to build out a way to fuzzy match search keywords since currently a user has to spell the forest name correctly to find it (maybe with a levenshtein distance algorithm to find close matches to the submitted forest name)
- Image assets should be stored in some sort of blog storage like amazon s3; right now I just have them hosted from github and the url to the asset is stored in the database
- I would want to spend more time thinking about accessibility, I've used mostly semantic HTML to help a screen reader parse the page, but there is a lot more that could be done
- the column in the database for the long description that renders on the details page is of type `VARCHAR(255)`; it would need to be changed to accommodate a longer string if it was an actual long description
- the database password is hard coded in; if this was not a demo I would use environment variables to set the password
- data persistence between database container destruction could be achived by mounting a volume on the host file system and mapping in to /var/lib/mysql in the container 
