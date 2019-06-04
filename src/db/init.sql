CREATE DATABASE backend_boiler_dev;
CREATE USER dev_user WITH ENCRYPTED PASSWORD 'password';
GRANT ALL PRIVILEGES ON DATABASE backend_boiler_dev TO dev_user;
ALTER USER dev_user with superuser;