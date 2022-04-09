# Spatiabot [![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)

## Gestion de projet

- [Trello : lien](https://trello.com/invite/b/2RdyhPXo/3e8926c47721b9b643b277948c4af690/spatiabot)

## Pour installer le projet

### Créer la base de données

Penser à changer spatiauser par le nom d'user que vous voulez (idem pour la base)
```
psql
postgres=# create database spatiabot;    
CREATE DATABASE    
postgres=# create user spatiauser with encrypted password 'spatiauser';    
CREATE ROLE    
postgres=# grant all privileges on database spatiabot to spatiauser;    
```

### .env

Copier le .env-dist vers .env    
Ouvrir .env et compléter les champs    
Reprenez ce que vous avez indiqué pour la bdd    

## Pour lancer le projet

```
npm i
npm run dev
```

`npm i` n'est utile que la première fois ou pour mettre à jour les dépendances
