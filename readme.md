## Some THeory (organise later)

Firebase's Cloud Firestore VS RealTime DB

1. In RealTime DB, you get whatever node of the tree you required and all of it's subnotes

   1. This meant you had to be really careful about how you structured your data

2. In Cloud FireStore, queries are shallow. You do not get all of the sub collection by default.

   1. Still need to be mindfull but less paranoid

Using Firestore

```javascript
firestore.collection("post");
firestore.collection("post").doc("sgoldfI170uzadsl");
firestore.collection("post").doc("sgoldfI170uzadsl").collection('comments);

//Using a Path-ish syntax instead
firestore.doc("post/sgoldfI170uzadsl");
firestore.collection("post/sgoldfI170uzadsl/comments");
```

Ordering
Has sql-ish querying ability, because of how it indexes.

Querying (New Ability)
Get sql-like queries out of a no-sql database

```javascript
firestore.collection("post").where("stars", ">=", 10);
```
