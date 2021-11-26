### Badges

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

### create the database

postgres=# create database spatiabot;
CREATE DATABASE
postgres=# create user traduser with encrypted password 'trad';
CREATE ROLE
postgres=# grant all privileges on database spatiabot to traduser;
