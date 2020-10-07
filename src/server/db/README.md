Instructions for connecting and setting up the local database:
    # 1. MySQL 8 has new authentication protocols not supported by nodeJS.
        Execute this script in mysql workbench before running the program (make sure to update the password). 

        ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'

    # 2. Create a .env file in the root of the folder (outside src). Add the following items to the .env file
        MYSQL_HOST='localhost'
        MYSQL_USER='root'
        MYSQL_PASSWORD='<PASSWORD>'

    # 3. run these scrpts:
        node src/server/createDB/create_db.js
        node src/server/createDB/create_sample_data.js

    # 4. Add this to .env:
        MYSQL_DATABASE='acpTheater'