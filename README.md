### create the database

postgres=# create database spatiabot;
CREATE DATABASE
postgres=# create user traduser with encrypted password 'trad';
CREATE ROLE
postgres=# grant all privileges on database spatiabot to traduser;
